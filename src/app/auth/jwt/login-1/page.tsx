"use client"

import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

import { supabase } from "src/lib/supabase";

export default function Home() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // eslint-disable-next-line @typescript-eslint/no-shadow
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) console.error('Error signing in:', error);
    else console.log('Sign in successful:', data);
  };

  const handleWebAuthnRegister = async () => {
    try {
      const options = await (await fetch('/api/auth/webauthn-register', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
      })).json();
      const attestationResponse = await startRegistration(options);
      const verificationResponse = await fetch('/api/auth/webauthn-register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ attestationResponse }),
      });

      if (verificationResponse.ok) {
        console.log('WebAuthn registration successful');
      } else {
        console.error('WebAuthn registration failed');
      }
    } catch (error) {
      console.error('Error during WebAuthn registration:', error);
    }
  };

  const handleWebAuthnLogin = async () => {
    try {
      const options = await (await fetch('/api/auth/webauthn-login', { method: 'POST' })).json();
      const assertionResponse = await startAuthentication(options);
      const verificationResponse = await fetch('/api/auth/webauthn-login', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assertionResponse }),
      });

      if (verificationResponse.ok) {
        const { session: authSession } = await verificationResponse.json();
        setSession(authSession);
        console.log('WebAuthn authentication successful');
      } else {
        console.error('WebAuthn authentication failed');
      }
    } catch (error) {
      console.error('Error during WebAuthn authentication:', error);
    }
  };

  return (
    <div>
      {!session ? (
        <>
          <button onClick={() => handleSignIn('goldstar105000117@gmail.com', 'User$123')}>Sign In</button>
          <hr></hr>
          <button onClick={handleWebAuthnLogin}>WebAuthn Login</button>
        </>
      ) : (
        <>
          <p>Logged in as {session.user.email}</p>
          <hr></hr>
          <button onClick={handleWebAuthnRegister}>Register WebAuthn</button>
          <hr></hr>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </>
      )}
    </div>
  );
}