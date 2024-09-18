import { NextResponse } from "next/server";
// eslint-disable-next-line import/no-extraneous-dependencies
import { verifyRegistrationResponse, generateRegistrationOptions } from '@simplewebauthn/server';

import { createCustomServerClient } from "src/utils/supabase";

const rpName = 'cryptogpt';
const rpID = 'cryptogpt.app';
const origin = `https://${rpID}`;

async function checkUserPassword(userId) {
  const supabase = createCustomServerClient();
  const { data, error } = await supabase
    .from('auth.users')
    .select('encrypted_password')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking user password:', error);
    return false;
  }

  return data.encrypted_password != null && data.encrypted_password !== '';
}

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
  function uuidToUint8Array(uuid: string): Uint8Array {
    return new Uint8Array(uuid.replace(/-/g, '').match(/.{2}/g)!.map(byte => parseInt(byte, 16)));
  }

  const userHeader = req.headers.get('x-user') as string;

  if (!userHeader) {
    return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
  }
  const user = JSON.parse(userHeader);

  try {
    const userId = user?.id;
    const userIdBuffer = uuidToUint8Array(userId);

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: userIdBuffer,
      userName: user?.email,
      attestationType: 'none',
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
      },
    });

    const { error } = await supabase.from('webauthn_challenges').insert({
      user_id: userId,
      challenge: options.challenge,
    });
    console.log('post-error', error)

    if (error) {
      console.error('Error inserting challenge:', error);
      return NextResponse.json({ success: false, error: 'Failed to save challenge' }, { status: 500 });
    }

    console.log('post-options', options)
    return NextResponse.json({ success: true, options });

  } catch (e) {
    console.error('Error in WebAuthn registration:', e);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const supabase = createCustomServerClient();
  const res = await req.json();

  const { attestationResponse } = res;

  const userHeader = req.headers.get('x-user') as string;

  if (!userHeader) {
    return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
  }
  const user = JSON.parse(userHeader);
  console.log('put-attestationResponse', attestationResponse)

  const { data: challengeData }: any = await supabase
    .from('webauthn_challenges')
    .select('challenge')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const expectedChallenge = challengeData.challenge;

  const verification: any = await verifyRegistrationResponse({
    response: attestationResponse,
    expectedChallenge: `${expectedChallenge}`,
    expectedOrigin: origin,
    expectedRPID: rpID,
  });
  console.log('put-verification', verification)

  if (verification.verified) {
    const { credentialID, credentialPublicKey }: any = verification.registrationInfo;

    await supabase.from('webauthn_credentials').insert({
      user_id: user?.id,
      credential_id: credentialID,
      public_key: Buffer.from(credentialPublicKey).toString('base64'),
      counter: verification.registrationInfo.counter,
    });
    const hasPassword = await checkUserPassword(user?.id);
    console.log('User has set a password:', hasPassword)

    if (hasPassword) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ success: true, message: "no_password" })
  }

  return NextResponse.json({ success: false, error: "Registration failed" }, { status: 400 })
}
