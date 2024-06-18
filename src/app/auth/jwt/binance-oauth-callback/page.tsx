'use client';

import React from 'react';
import { setAccessToken, setRefreshToken } from 'src/auth/context/jwt/utils';
import { GuestGuard } from 'src/auth/guard';
import { BINANCE_API, PROJECT_URL } from 'src/config-global';
import axios, { endpoints } from 'src/utils/axios';

export default function OAuthPage() {
  // const encodedRedirectUri = encodeURIComponent('http://localhost:8083/dashboard');
  const redirect_uri = `${PROJECT_URL}/auth/jwt/binance-oauth-callback`;
  const fetchData = async (code: string) => {
    console.log('code12', code);
    const response = await axios.post(
      `https://accounts.binance.com/oauth/token?client_id=${BINANCE_API.clientId}&client_secret=${BINANCE_API.clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`
    );
    console.log('response', response);
    const data = response.data;
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      const userInfo = await axios.get(
        `https://www.binanceapis.com/oauth-api/user-info?access_token=${accessToken}`
      );
      const user = userInfo.data;
      const response = await axios.post(endpoints.auth.loginWithBinance, {
        email: user.data.email,
      });
      const { data, error } = response.data;
      if (error) {
        throw new Error(error);
      } else {
        const { user } = data;
        if (user) {
          console.log('user', user);
          // setUserInfo(user);
        }
      }
      window.location.href = '/dashboard';
    }
  };
  React.useEffect(() => {
    const callbackURL = new URL(window.location.href);
    const code = callbackURL.searchParams.get('code');
    if (code) {
      fetchData(code);
    }
  }, []);
  return (
    <GuestGuard>
      <h1>Authenticating...</h1>
    </GuestGuard>
  );
}
