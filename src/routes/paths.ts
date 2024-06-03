// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
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
    chat: `${ROOTS.DASHBOARD}/chat`,
    solar: `${ROOTS.DASHBOARD}/solar`,
    discover: `${ROOTS.DASHBOARD}/discover`,
    balance: `${ROOTS.DASHBOARD}/balance`,
    travel: {
      root: `${ROOTS.DASHBOARD}/travel`,
      newOrder: `${ROOTS.DASHBOARD}/travel/order/new`,
      order: `${ROOTS.DASHBOARD}/travel/order`,
      airline: `${ROOTS.DASHBOARD}/travel/airline`,
    },
    deliver: {
      root: `${ROOTS.DASHBOARD}/deliver`,
      restaurant: `${ROOTS.DASHBOARD}/deliver/restaurants`,
      store: `${ROOTS.DASHBOARD}/deliver/stores`,
      order: `${ROOTS.DASHBOARD}/deliver/orders`,
      // me: `${ROOTS.DASHBOARD}/deliver/me`,
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
    createproject: `${ROOTS.DASHBOARD}/createproject`,
    knowledge: {
      private: `${ROOTS.DASHBOARD}/knowledge/private`,
      public: `${ROOTS.DASHBOARD}/knowledge/public`,
      other: `${ROOTS.DASHBOARD}/knowledge/other`,
      graph: `${ROOTS.DASHBOARD}/knowledge/graph`,
      settings: `${ROOTS.DASHBOARD}/knowledge/settings`,
    },
    wallet: `${ROOTS.DASHBOARD}/wallet`,
    community: `${ROOTS.DASHBOARD}/community`,
    settings: `${ROOTS.DASHBOARD}/settings`,
    help: `${ROOTS.DASHBOARD}/help`,
    user: {
      account: `${ROOTS.DASHBOARD}/user/account`,
      profile: `${ROOTS.DASHBOARD}/user/profile`
    },
    agents: `${ROOTS.DASHBOARD}/agents`,

    one: `${ROOTS.DASHBOARD}/one`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },

  error: {
    somethingWrong: '/something-wrong',
  },
};
