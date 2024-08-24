import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';

import { supabase } from 'src/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();
    const nonce = uuidv4();

    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('id')
      .eq('metamask_metadata->>address', address)
      .single();

    if (existingUser) {
      // Update the user's nonce
      const { data: user, error } = await supabase
        .from('users')
        .update({
          metamask_metadata: { address, nonce },
          auth: {
            lastLoggedinTime: new Date().toISOString(),
            lastAuthStatus: 'pending',
            lastLoggedinProvider: 'metamask',
          },
        })
        .eq('id', existingUser.id)
        .select();

      if (error) throw new Error('Failed to update user');

      return NextResponse.json({ user }, { status: 200 });
    }

    // If no existing user, create a new user
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        metamask_metadata: { address, nonce },
        auth: {
          lastLoggedinTime: new Date().toISOString(),
          lastAuthStatus: 'pending',
          lastLoggedinProvider: 'metamask',
        },
      })
      .select();

    if (error) throw new Error('Failed to create user');

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
