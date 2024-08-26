// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';

import { supabase } from 'src/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();
    const nonce = uuidv4();

    const { data: user, error } = await supabase
      .from('users')
      .upsert(
        {
          metamask_address: address,
          metamask_nonce: nonce,
          auth: {
            lastLoggedinTime: new Date().toISOString(),
            lastAuthStatus: 'pending',
            lastLoggedinProvider: 'metamask',
          },
        },
        { onConflict: ['metamask_address'] } // This is a unique column
      )
      .select();

    if (error) return NextResponse.json({ error: 'Could not login to Metamask' }, { status: 400 });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Could not login to Metamask' }, { status: 400 });
  }
}
