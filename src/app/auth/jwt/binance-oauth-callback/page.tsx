'use client';

import React, { useCallback } from 'react';

import axios from 'src/utils/axios';

import { GuestGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';
import { BINANCE_API, PROJECT_URL } from 'src/config-global';

export default function OAuthPage() {
  const { loginWithBinance } = useAuthContext();
  // const encodedRedirectUri = encodeURIComponent('http://localhost:8083/dashboard');
  const redirect_uri = `${PROJECT_URL}/auth/jwt/binance-oauth-callback`;
  const fetchData = useCallback(async (code: string) => {
    console.log('code12', code);
    const response = await axios.post(
      `https://accounts.binance.com/oauth/token?client_id=${BINANCE_API.clientId}&client_secret=${BINANCE_API.clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`
    );
    console.log('response', response);
    const { data } = response;
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    if (accessToken && refreshToken) {
      const userInfo = await axios.get(`https://www.binanceapis.com/oauth-api/user-info`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        params: {
          access_token: accessToken,
        },
      });
      const userData = userInfo.data;
      await loginWithBinance(userData.data.email);
      // window.location.href = '/dashboard';
    }
  }, [redirect_uri, loginWithBinance]);

  React.useEffect(() => {
    const callbackURL = new URL(window.location.href);
    const code = callbackURL.searchParams.get('code');
    if (code) {
      fetchData(code);
    }
  }, [fetchData]);
  return (
    <GuestGuard>
      <h1>Authenticating...</h1>
    </GuestGuard>
  );
}
