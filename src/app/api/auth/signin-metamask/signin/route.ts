import { ethers } from 'ethers';
import { NextRequest, NextResponse } from 'next/server';
import { signToken } from 'src/lib/utils';
import { supabase, supabaseServiceRole } from 'src/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { address, signedMessage, nonce } = await req.json();

    // Fetch the user by MetaMask address
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, metamask_nonce')
      .eq('metamask_address', address)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify the nonce and signed message
    const recoveredAddress = ethers.verifyMessage(nonce, signedMessage);
    if (user.metamask_nonce !== nonce || recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid nonce or signature' }, { status: 401 });
    }

    let userId;
    const { data: authUser, error: authUserError } = await supabase
      .from('auth_users')
      .select('id')
      .eq('raw_user_meta_data->>address', address)
      .single();

    if (!authUser) {
      const { data: newUser, error: newUserError } =
        await supabaseServiceRole.auth.admin.createUser({
          email: '',
          user_metadata: { address },
          email_confirm: true,
        });

      if (newUserError || !newUser) {
        return NextResponse.json({ error: 'Could not login to Metamask' }, { status: 400 });
      }
      userId = newUser.user.id;
    } else {
      userId = authUser.id;
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({
        userId,
        metamask_nonce: nonce,
        auth: {
          lastLoggedinTime: new Date().toISOString(),
          lastAuthStatus: 'success',
          lastLoggedinProvider: 'metamask',
        },
      })
      .eq('id', user.id);

    if (updateError) {
      return NextResponse.json({ error: 'Could not login to Metamask' }, { status: 400 });
    }

    const token = await signToken(
      { address, sub: userId, aud: 'authenticated' },
      { expiresIn: '24h' }
    );
    return NextResponse.json({ token, user: { id: userId, address } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Could not login to Metamask' }, { status: 400 });
  }
}
