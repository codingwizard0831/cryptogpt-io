// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: "https://mui.com/store/items/minimal-dashboard/",
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      emailCheck: `${ROOTS.AUTH}/jwt/email-check`,
      emailVerify: `${ROOTS.AUTH}/jwt/email-verify`,
      phoneCheck: `${ROOTS.AUTH}/jwt/phone-check`,
      phoneVerify: `${ROOTS.AUTH}/jwt/phone-verify`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    models: `${ROOTS.DASHBOARD}/model`,
    modelCreate: `${ROOTS.DASHBOARD}/model/create`,
    trading: `${ROOTS.DASHBOARD}/trading`,
    tracking: `${ROOTS.DASHBOARD}/tracking`,
    strategy: `${ROOTS.DASHBOARD}/strategy`,
    profile: `${ROOTS.DASHBOARD}/profile`,
    deliver: {
      me: {
        root: `${ROOTS.DASHBOARD}/deliver/me/favorite`,
        favorite: `${ROOTS.DASHBOARD}/deliver/me/favorite`,
        address: `${ROOTS.DASHBOARD}/deliver/me/address`,
        orderAgain: `${ROOTS.DASHBOARD}/deliver/me/order-again`,
        orderHistory: `${ROOTS.DASHBOARD}/deliver/me/order-history`,
      },
      group: {
        root: (id: string) => `${ROOTS.DASHBOARD}/deliver/group/${id}`,
        join: (id: string) => `${ROOTS.DASHBOARD}/deliver/group/${id}/join`,
        order: (id: string) => `${ROOTS.DASHBOARD}/deliver/group/${id}/order`,
      },
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      billing: `${ROOTS.DASHBOARD}/user/billing`,
      connection: `${ROOTS.DASHBOARD}/user/connection`,
      security: `${ROOTS.DASHBOARD}/user/security`,
    },
  },

  error: {
    somethingWrong: "/something-wrong",
  },
};
