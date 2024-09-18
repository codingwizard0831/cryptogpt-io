import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
export const ASSETS_API = process.env.NEXT_PUBLIC_ASSETS_API;
export const STRIPE_API_KEY = process.env.NEXT_PUBLIC_STRIPE_API_KEY || '';
export const STABLE_DIFUSSION_API_KEY = process.env.NEXT_PUBLIC_STABLE_DIFUSSION_API_KEY || '';
export const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';

export const FIREBASE_API = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const AMPLIFY_API = {
  userPoolId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_ID,
  userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID,
  region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION,
};

export const AUTH0_API = {
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  callbackUrl: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL,
};

export const SUPABASE_API = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  serviceRoleKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '',
  jwtSecret: process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET || '',
};

export const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'

export const WEB3_WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WEB3_WALLET_CONNECT_PROJECT_ID;

export const BINANCE_OAUTH_CREDENTIALS = {
  clientId: process.env.NEXT_PUBLIC_BINANCE_CLIENT_ID || '',
  clientSecret: process.env.NEXT_PUBLIC_BINANCE_SECRET_KEY || '',
  loginUri: process.env.NEXT_PUBLIC_BINANCE_LOGIN_URI || '',
  redirectUri: process.env.NEXT_PUBLIC_BINANCE_REDIRECT_URI || '',
  accessTokenUri: process.env.NEXT_PUBLIC_BINANCE_ACCESS_TOKEN_URI || ''
};

export const TAAPI_API_KEY = process.env.NEXT_PUBLIC_TAAPI_API_KEY;

// STRIPE

export const NEXT_PUBLIC_STRIPE_SECRET_API_KEY =
  process.env.NEXT_PUBLIC_STRIPE_SECRET_API_KEY || '';

export const NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET =
  process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET || '';

export const NEXT_PUBLIC_RUST_WEBSOCKET_URL = process.env.NEXT_PUBLIC_RUST_WEBSOCKET_URL || '';

export const MEXC_API = {
  accessKey: process.env.NEXT_PUBLIC_MEXC_ACCESS_KEY,
  secretKey: process.env.NEXT_PUBLIC_MEXC_SECRET_KEY,
};
// Ecryption
export const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';

// RUST

export const RUST_WEBSOCKET_URL = process.env.NEXT_PUBLIC_RUST_WEBSOCKET_URL || '';