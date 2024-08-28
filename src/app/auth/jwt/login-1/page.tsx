"use client"

import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

import { Box, Button, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

export default function Home() {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [submetting, setSubmetting] = useState(false);

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-shadow
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   // eslint-disable-next-line @typescript-eslint/no-shadow
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  // const handleSignIn = async (email: string, password: string) => {
  //   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  //   if (error) console.error('Error signing in:', error);
  //   else console.log('Sign in successful:', data);
  // };

  const handleWebAuthnRegister = async () => {
    setSubmetting(true);
    try {
      console.log('Starting WebAuthn registration');
      const optionsResponse = await fetch('/api/webauthn-register', {
        method: 'POST',
        // headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const { success, options } = await optionsResponse.json();
      if (success) {
        console.log('Received options:', options);

        console.log('Starting registration with options');
        const attestationResponse = await startRegistration(options);
        console.log('Attestation response:', attestationResponse);

        console.log('Sending verification request');
        const verificationResponse = await fetch('/api/webauthn-register', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ attestationResponse }),
        });

        console.log('Verification response status:', verificationResponse.status);
        console.log('Verification response:', verificationResponse);
        const verificationResult = await verificationResponse.json();
        console.log('Verification result:', verificationResult);

        setIsRegistered(true)
        if (verificationResponse.ok) {
          console.log('WebAuthn registration successful');
        } else {
          console.error('WebAuthn registration failed');
        }
      } else {
        console.error('Error during WebAuthn registration:');
      }
      setSubmetting(false);
    } catch (error) {
      console.error('Error during WebAuthn registration:', error);
      setSubmetting(false);
    }
  };

  const handleWebAuthnLogin = async () => {
    setSubmetting(true);
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

        await fetch('/api/auth/webauthn-test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ verificationResponse }),
        });

        console.log('Verification response status:', verificationResponse.status);
        console.log('Verification response:', verificationResponse);
        const { success: verificationSuccess, session } = await verificationResponse.json();
        if (session.ok) {
          router.push(paths.dashboard.user.profileSetup);
          console.log('WebAuthn authentication successful');
          return;
        }
        alert(`verificationSuccess: ${verificationSuccess}`);
        if (verificationSuccess) {
          router.push(paths.dashboard.root);
          return;
        }

        alert(`all faild`);
        router.push(paths.dashboard.user.profile);
        console.error('WebAuthn authentication failed');
      } else {
        alert(`full error`);
        console.error('Error during WebAuthn registration:');
      }
      setSubmetting(false);

    } catch (error) {
      console.error('Error during WebAuthn authentication:', error);
      setSubmetting(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* {!session ? (
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
      )} */}
      {isRegistered && <Button variant="contained" onClick={handleWebAuthnLogin} disabled={submetting}>
        WebAuthn Login
      </Button>}
      {!isRegistered && <Button variant="contained" onClick={handleWebAuthnRegister} disabled={submetting}>
        Register WebAuthn
      </Button>}
    </Box>
  );
}