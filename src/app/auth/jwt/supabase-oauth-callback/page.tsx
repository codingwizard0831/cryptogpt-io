"use client"

import React from 'react';

import { GuestGuard } from 'src/auth/guard';
import { supabase } from "src/lib/supabase";
import { setUserInfo, setAccessToken, setRefreshToken } from 'src/auth/context/jwt/utils';

export default function OAuthPage() {
  // React.useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.hash.substring(1));
  //   const accessToken = searchParams.get('access_token');
  //   const refreshToken = searchParams.get('refresh_token');
  //   if (accessToken && refreshToken) {
  //     setAccessToken(accessToken);
  //     setRefreshToken(refreshToken);
  //     window.location.href = `${window.location.origin}/dashboard`;
  //   }
  // }, []);
  React.useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');

        if (!accessToken) throw new Error('No access token found');

        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        });

        if (error) throw error;

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          console.log('User authenticated:', user);
          setAccessToken(accessToken);
          setUserInfo(user);
          if (refreshToken) setRefreshToken(refreshToken);
          window.location.href = `${window.location.origin}/dashboard`;
        } else {
          throw new Error('User is null after authentication');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };

    handleAuthCallback();
  }, []);
  return <GuestGuard><h1>Authenticating...</h1></GuestGuard>;
}
