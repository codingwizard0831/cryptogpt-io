"use client"

import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

import { Box, Button, Divider, Typography } from '@mui/material';

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
      console.log('Starting WebAuthn registration');
      const optionsResponse = await fetch('/api/auth/webauthn-register', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const { success, options } = await optionsResponse.json();
      if (success) {
        console.log('Received options:', options);

        console.log('Starting registration with options');
        const attestationResponse = await startRegistration(options);
        console.log('Attestation response:', attestationResponse);

        console.log('Sending verification request');
        const verificationResponse = await fetch('/api/auth/webauthn-register', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ attestationResponse }),
        });

        console.log('Verification response status:', verificationResponse.status);
        console.log('Verification response:', verificationResponse);
        const verificationResult = await verificationResponse.json();
        console.log('Verification result:', verificationResult);

        if (verificationResponse.ok) {
          console.log('WebAuthn registration successful');
        } else {
          console.error('WebAuthn registration failed');
        }
      } else {
        console.error('Error during WebAuthn registration:');
      }
    } catch (error) {
      console.error('Error during WebAuthn registration:', error);
    }
  };

  const handleWebAuthnLogin = async () => {
    try {
      const optionsResponse = await fetch('/api/auth/webauthn-login', {
        method: 'POST',
      });
      const { success, options } = await optionsResponse.json();
      if (success) {
        console.log('Received options:', options);

        console.log('Starting login with options');
        const assertionResponse = await startAuthentication(options);
        console.log('Assertion response:', assertionResponse);

        console.log('Sending verification request');
        const verificationResponse = await fetch('/api/auth/webauthn-login', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ assertionResponse }),
        });

        console.log('Verification response status:', verificationResponse.status);
        console.log('Verification response:', verificationResponse);
        const verificationResult = await verificationResponse.json();
        console.log('Verification result:', verificationResult);

        if (verificationResponse.ok) {
          const { session: authSession } = await verificationResponse.json();
          setSession(authSession);
          console.log('WebAuthn authentication successful');
        } else {
          console.error('WebAuthn authentication failed');
        }
      } else {
        console.error('Error during WebAuthn registration:');
      }

    } catch (error) {
      console.error('Error during WebAuthn authentication:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {!session ? (
        <>
          <Button
            variant="contained"
            onClick={() => handleSignIn('goldstar105000117@gmail.com', 'User$123')}
          >
            Sign In
          </Button>
          <Divider />
          <Button variant="contained" onClick={handleWebAuthnLogin}>
            WebAuthn Login
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1">
            Logged in as {session.user.email}
          </Typography>
          <Divider />
          <Button variant="contained" onClick={handleWebAuthnRegister}>
            Register WebAuthn
          </Button>
          <Divider />
          <Button variant="contained" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </Button>
        </>
      )}
    </Box>
  );
}