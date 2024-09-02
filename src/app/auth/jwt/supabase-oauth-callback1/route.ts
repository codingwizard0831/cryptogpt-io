import { NextRequest, NextResponse } from 'next/server';

import { createCustomServerClient } from "src/utils/supabase";

export async function GET(request: NextRequest) {
  console.log('Received request:', request.url);
  
  try {
    const supabase = createCustomServerClient();
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    console.log('Extracted code:', code);

    if (!code) {
      console.error('No code provided in URL');
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    console.log('Attempting to exchange code for session');
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data?.session) {
      console.error('No session returned from exchangeCodeForSession');
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }

    const redirectUrl = new URL('https://cryptogpt.app/auth/jwt/supabase-oauth-callback/');
    redirectUrl.hash = `access_token=${encodeURIComponent(data.session.access_token)}&refresh_token=${encodeURIComponent(data.session.refresh_token)}`;

    console.log('Redirecting to:', redirectUrl.toString());
    return NextResponse.redirect(redirectUrl.toString(), 307);

  } catch (error) {
    console.error('Caught unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}