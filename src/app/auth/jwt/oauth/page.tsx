"use client"

import React from 'react';

import { GuestGuard } from 'src/auth/guard';
import { setAccessToken, setRefreshToken } from 'src/auth/context/jwt/utils';

export default function OAuthPage() {
  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = '/dashboard';
    }
  }, []);
  return <GuestGuard><h1>Authenticating...</h1></GuestGuard>;
}
