import { NextResponse } from 'next/server'

import { createCustomServerClient } from "src/utils/supabase";

export async function GET(request: Request) {
  const supabase = createCustomServerClient();

  const requestUrl = new URL(request.url);
  const code: any = requestUrl.searchParams.get('code');
  const { data:  result, error: errorText } = await supabase.auth.exchangeCodeForSession(code);
  // console.log('result, errorText', result, errorText)
  const { origin } = new URL(request.url)
  const redirectUrl = `${origin}/auth/jwt/supabase-oauth-callback/#access_token=${result?.session?.access_token}&refresh_token=${result?.session?.refresh_token}`;
  console.log(redirectUrl)
  return NextResponse.redirect(redirectUrl)
}