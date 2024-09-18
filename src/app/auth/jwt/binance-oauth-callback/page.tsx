'use client';

import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';

import { supabase } from 'src/utils/supabaseClient';

import { GuestGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';
import { BINANCE_OAUTH_CREDENTIALS } from 'src/config-global';

export default function OAuthPage() {
  const { loginWithBinance } = useAuthContext();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const authorizeUser = useCallback(async (authorizationCode) => {
    if (!authorizationCode) {
      console.warn('[CryptoGPT] Login with Binance failed');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(BINANCE_OAUTH_CREDENTIALS.accessTokenUri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "grant_type": "authorization_code",
          "code": authorizationCode,
          "client_id": BINANCE_OAUTH_CREDENTIALS.clientId,
          "client_secret": BINANCE_OAUTH_CREDENTIALS.clientSecret,
          "redirect_uri": BINANCE_OAUTH_CREDENTIALS.redirectUri
        })
      });

      if (!response.ok) {
        console.warn('[CryptoGPT] Login with Binance failed');
        return;
      }

      const { access_token: accessToken } = await response.json();

      if (accessToken) {
        const userResponse = await fetch(`https://www.binanceapis.com/oauth-api/v1/user-info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!userResponse.ok) {
          console.warn('[CryptoGPT] Login with Binance failed');
          return;
        }

        const { userId } = await userResponse.json();

        await loginWithBinance(userId);
      }
      window.location.href = '/dashboard';
    } catch (err) {
      console.warn('[CryptoGPT] Login with Binance failed');
    }

    setLoading(false);
  }, [loginWithBinance]);

  useEffect(() => {
    supabase.auth.getUser()
      .then((user) => {
        if (user) {
          window.location.href = '/dashboard';
        }
      }).finally(() => setLoading(false));
  }, [])


  useEffect(() => {
    if (!loading && router.isReady) {
      const authorizationCode = router.query.code;

      if (!authorizationCode) {
        console.warn('[CryptoGPT] Login with Binance failed');
        return;
      }

      authorizeUser(authorizationCode);
    }

  }, [authorizeUser, loading, router.isReady, router.query.code])

  return (
    <GuestGuard>
      <h1>Authenticating...</h1>
    </GuestGuard>
  );
}
