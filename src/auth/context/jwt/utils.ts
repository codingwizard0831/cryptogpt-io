import { paths } from 'src/routes/paths';

import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  console.log('decoded', decoded)
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    sessionStorage.removeItem('accessToken');

    window.location.href = paths.auth.jwt.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setAccessToken = (accessToken: string | null) => {
  if (accessToken) {
    sessionStorage.setItem('access_token', accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    tokenExpired(exp);
  } else {
    sessionStorage.removeItem('access_token');

    delete axios.defaults.headers.common.Authorization;
  }
};

export const getAccessToken = () => sessionStorage.getItem('access_token');

export const getRefreshToken = () => sessionStorage.getItem('refresh_token');


export const setRefreshToken = (refreshToken: string | null) => {
  if (refreshToken) {
    sessionStorage.setItem('refresh_token', refreshToken);
  } else {
    sessionStorage.removeItem('refresh_token');
  }
}

export const setUserInfo = (user: any) => {
  if (user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('user');
  }
}

export const getUserInfo = () => {
  const userInfoByString = sessionStorage.getItem('user');
  if (userInfoByString) return JSON.parse(userInfoByString);
  return {};
}