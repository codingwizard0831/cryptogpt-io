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

  // HOME
  home: "/home",

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    models: `${ROOTS.DASHBOARD}/model`,
    agents: `${ROOTS.DASHBOARD}/agents`,
    files: `${ROOTS.DASHBOARD}/files`,
    modelCreate: `${ROOTS.DASHBOARD}/model/create`,
    modelUpdate: (id: string) => `${ROOTS.DASHBOARD}/model/update/${id}`,
    trading: `${ROOTS.DASHBOARD}/trading`,
    tracking: `${ROOTS.DASHBOARD}/tracking`,
    strategy: {
      root: `${ROOTS.DASHBOARD}/strategy`,
      beta: `${ROOTS.DASHBOARD}/strategy/beta`,
      create: `${ROOTS.DASHBOARD}/strategy/create`,
    },
    profile: `${ROOTS.DASHBOARD}/profile`,
    avatarCreate: `${ROOTS.DASHBOARD}/user/profile-voice-avatar`,
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
      profileSetup: `${ROOTS.DASHBOARD}/user/profile-setup`,
      profileSetupAvatar: `${ROOTS.DASHBOARD}/user/profile-setup-avatar`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      billing: `${ROOTS.DASHBOARD}/user/billing`,
      connection: `${ROOTS.DASHBOARD}/user/connection`,
      security: `${ROOTS.DASHBOARD}/user/security`,
    },
  },

  user: {
    profile: (id: string) => `${ROOTS.DASHBOARD}/user/${id}`,
  },

  error: {
    somethingWrong: "/something-wrong",
  },
};
