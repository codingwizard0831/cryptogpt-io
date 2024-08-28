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

    token: '/api/auth/token/',

    confirmEmail: '/auth/confirm_email/',
    resendEmail: '/auth/resend_email_token/',
    confirmPhone: '/auth/confirm_phone/',
    passwordResetRequest: '/auth/password_reset/',
    passwordResetValidate: '/auth/password_reset/validate_token/',
    passwordResetConfirm: '/auth/password_reset/confirm/',
    passwordUpdate: '/auth/update_password/',

    profileUpdate: '/auth/user/profile/update/',

    registerFaceId: '/api/webauthn-register/',
  },
  membership: {
    plans: '/api/membership/plans/',
    userPlans: '/api/membership/user_plans/',
    createPaymentIntent: '/api/membership/user_plans/payment_intent/create/',
    confirmPaymentIntent: '/api/membership/user_plans/payment_intent/confirm/',
    cancelUserPlan: '/api/membership/user_plans/cancel/',
    ugradeUserPlan: '/api/membership/user_plans/update/',
  },
  credits: {
    credits: '/api/credits/',
    createPaymentIntent: '/api/credits/payment_intent/create/',
    confirmPaymentIntent: '/api/credits/payment_intent/confirm/',
  },
  binance: "/api/binance",

  kanban: '/api/kanban',
  calendar: '/api/calendar',
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
  dashboard: {
    'plan_usage': '/api/overview/plan_usage',
    'media_storage': '/api/overview/media_storage',
    'agents': '/api/overview/agents',
    'models': '/api/overview/models',
    'hugging_face': '/api/overview/hugging_face',
    'stats': '/api/overview/stats',
    'price_charts': '/api/overview/priceCharts',
  },
  profile: {
    index: '/api/profile',
    models: '/api/profile/image/models',
    generateImage: '/api/profile/image/generate',
    updateAvatar: '/api/profile/image',
  }
};

