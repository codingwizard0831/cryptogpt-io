import { NextRequest, NextResponse } from 'next/server';

import { signToken } from 'src/lib/utils';
import { verifyMessageWithMetamask } from 'src/lib/metamask';
import { supabase, supabaseServiceRole } from 'src/lib/supabase';
import { ethers } from 'ethers';

export async function POST(req: NextRequest) {
  try {
    const { address, signedMessage, nonce } = await req.json();

    // Fetch the user by MetaMask address
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, metamask_metadata')
      .eq('metamask_metadata->>address', address)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify the nonce
    if (user.metamask_metadata.nonce !== nonce) {
      return NextResponse.json({ error: 'Nonce verification failed' }, { status: 401 });
    }

    // Verify the signed message
    const recoveredAddress = ethers.verifyMessage(nonce, signedMessage);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Fetch or create the corresponding auth user
    let authUser;
    const { data: existingAuthUser, error: authUserError } = await supabase
      .from('auth_users')
      .select('*')
      .eq('raw_user_meta_data->>address', address)
      .single();

    if (!existingAuthUser) {
      const { data: newUser, error: newUserError } =
        await supabaseServiceRole.auth.admin.createUser({
          email: `${address}@cryptogpt.io`,
          user_metadata: { address },
          email_confirm: true,
        });

      if (newUserError || !newUser) {
        return NextResponse.json({ error: 'Failed to create auth user' }, { status: 500 });
      }
      authUser = newUser.user;
    } else {
      authUser = existingAuthUser;
    }

    // Update user record with auth user ID
    const { error: updateError } = await supabase
      .from('users')
      .update({
        userId: authUser.id,
        metamask_metadata: { address, nonce },
        auth: {
          lastLoggedinTime: new Date().toISOString(),
          lastAuthStatus: 'success',
          lastLoggedinProvider: 'metamask',
        },
      })
      .eq('id', user.id);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    // Sign and return the JWT token
    const token = await signToken(
      {
        address,
        sub: authUser.id,
        aud: 'authenticated',
      },
      { expiresIn: `${60 * 60 * 24}s` }
    );

    return NextResponse.json({ token, user: authUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
