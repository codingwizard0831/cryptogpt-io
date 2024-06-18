import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/check-auth/',
    register: '/api/auth/signup/',
    logout: '/api/auth/signout/',
    loginWithEmailAndPassword: '/api/auth/signin-email-password/',
    loginWithCodeSend: '/api/auth/signin-send-token/',
    loginWithCodeVerify: '/api/auth/signin-verify-token/',

    loginWithOAuth: '/api/auth/signin-oauth/',

    loginWithMetamaskNonce: '/api/auth/signin-metamask/nonce/',
    loginWithMetamaskSignin: '/api/auth/signin-metamask/signin/',
    loginWithMetamask: '/api/auth/signin-metamask/sign/',

    loginWithBinance: '/api/auth/signin-binance/',

    confirmEmail: '/auth/confirm_email/',
    resendEmail: '/auth/resend_email_token/',
    confirmPhone: '/auth/confirm_phone/',
    passwordResetRequest: '/auth/password_reset/',
    passwordResetValidate: '/auth/password_reset/validate_token/',
    passwordResetConfirm: '/auth/password_reset/confirm/',
    passwordUpdate: '/auth/update_password/',

    profileUpdate: '/auth/user/profile/update/',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
