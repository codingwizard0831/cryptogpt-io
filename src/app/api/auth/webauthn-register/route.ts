import { NextResponse } from "next/server";
// eslint-disable-next-line import/no-extraneous-dependencies
import { verifyRegistrationResponse, generateRegistrationOptions } from '@simplewebauthn/server';

import { supabase } from "src/lib/supabase";

const rpName = 'cryptogpt';
const rpID = 'cryptogpt.app';
const origin = `https://${rpID}`;

export async function POST(req: Request) {
  function uuidToUint8Array(uuid: string): Uint8Array {
    return new Uint8Array(uuid.replace(/-/g, '').match(/.{2}/g)!.map(byte => parseInt(byte, 16)));
  }
  try {
    const userId = "50df3478-f7ae-4d41-b4fb-bd10ee613a05";
    const userIdBuffer = uuidToUint8Array(userId);

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: userIdBuffer, // Use the Uint8Array instead of the string
      userName: "goldstar105000117@gmail.com",
      attestationType: 'none',
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
      },
    });

    console.log('post-options', options)
    const { error } = await supabase.from('webauthn_challenges').insert({
      user_id: userId,
      challenge: options.challenge,
    });

    if (error) {
      console.error('Error inserting challenge:', error);
      return NextResponse.json({ success: false, error: 'Failed to save challenge' }, { status: 500 });
    }

    return NextResponse.json({ success: true, options });

  } catch (e) {
    console.error('Error in WebAuthn registration:', e);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const res = await req.json();
  const { attestationResponse } = res;
  console.log('put-attestationResponse', attestationResponse)

  const { data: challengeData }: any = await supabase
    .from('webauthn_challenges')
    .select('challenge')
    .eq('user_id', "50df3478-f7ae-4d41-b4fb-bd10ee613a05")
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
      user_id: "50df3478-f7ae-4d41-b4fb-bd10ee613a05",
      credential_id: Buffer.from(credentialID).toString('base64'),
      public_key: Buffer.from(credentialPublicKey).toString('base64'),
      counter: verification.registrationInfo.counter,
    });

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false, error: "Registration failed" }, { status: 400 })
}
