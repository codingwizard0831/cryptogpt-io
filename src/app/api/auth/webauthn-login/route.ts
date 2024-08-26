import { NextResponse } from "next/server";
// eslint-disable-next-line import/no-extraneous-dependencies
import { generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server';

import { supabase } from "src/lib/supabase";

const rpID = 'cryptogpt.app';
const origin = `https://${rpID}`;

export async function POST(req: Request) {
  try {
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: 'required',
    });

    console.log('post-options', options);
    
    const { error } = await supabase.from('webauthn_challenges').insert({
      challenge: options.challenge,
    });

    if (error) {
      console.error('Error inserting challenge:', error);
      return NextResponse.json({ success: false, error: 'Failed to save challenge' }, { status: 500 });
    }

    return NextResponse.json({ success: true, options });
  } catch (error) {
    console.error('Error in WebAuthn login:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const res = await req.json();
  const { assertionResponse } = res;

  const { data: challengeData }: any = await supabase
    .from('webauthn_challenges')
    .select('challenge')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const expectedChallenge = challengeData?.challenge || "";

  const { data: credentialData } = await supabase
    .from('webauthn_credentials')
    .select('*')
    .eq('credential_id', Buffer.from(assertionResponse.id, 'base64').toString('base64'))
    .single();

  if (!credentialData) {
    return NextResponse.json({ success: false, error: "Credential not found" }, { status: 400 })
  }
  const authenticator: any = {
    credentialID: Buffer.from(credentialData.credential_id, 'base64'),
    credentialPublicKey: Buffer.from(credentialData.public_key, 'base64'),
    counter: credentialData.counter,
  };

  const verification = await verifyAuthenticationResponse({
    response: assertionResponse,
    expectedChallenge: `${expectedChallenge}`,
    expectedOrigin: origin,
    expectedRPID: rpID,
    authenticator,
  });
  console.log('put-verification', verification)

  if (verification.verified) {
    await supabase.from('webauthn_credentials').update({
      counter: verification.authenticationInfo.newCounter,
    }).eq('credential_id', credentialData.credential_id);

    const { data: userData } = await supabase.from('users').select('*').eq('id', credentialData.user_id).single();

    const { data: session, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: 'User$123',
    });

    if (error) {
      return NextResponse.json({ success: false, error: "Failed to create session" }, { status: 400 })
    }

    return NextResponse.json({ success: true, session })
  }

  return NextResponse.json({ success: false, error: "Registration failed" }, { status: 400 })
}
