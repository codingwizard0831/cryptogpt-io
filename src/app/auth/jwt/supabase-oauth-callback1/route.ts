// import { NextRequest, NextResponse } from 'next/server';
// import { createCustomServerClient } from "src/utils/supabase";

// export async function GET(request: NextRequest) {
//   console.log('Received request:', request.url);

//   try {
//     const supabase = createCustomServerClient();
//     const requestUrl = new URL(request.url);
//     const code = requestUrl.searchParams.get('code');

//     console.log('Extracted code:', code);

//     if (!code) {
//       console.error('No code provided in URL');
//       return new Response(JSON.stringify({ error: 'No code provided' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     console.log('Attempting to exchange code for session');
//     const { data, error } = await supabase.auth.exchangeCodeForSession(code);

//     if (error) {
//       console.error('Error exchanging code for session:', error);
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     if (!data?.session) {
//       console.error('No session returned from exchangeCodeForSession');
//       return new Response(JSON.stringify({ error: 'Failed to create session' }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     const redirectUrl = new URL('https://cryptogpt.app/auth/jwt/supabase-oauth-callback/');
//     redirectUrl.hash = `access_token=${encodeURIComponent(data.session.access_token)}&refresh_token=${encodeURIComponent(data.session.refresh_token)}`;

//     console.log('Redirecting to:', redirectUrl.toString());

//     return new Response(null, {
//       status: 302,
//       headers: {
//         Location: redirectUrl.toString(),
//         'Cache-Control': 'no-store, max-age=0',
//         'Pragma': 'no-cache'
//       }
//     });

//   } catch (error) {
//     console.error('Caught unexpected error:', error);
//     return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }

import { NextResponse } from 'next/server'

import { createCustomServerClient } from "src/utils/supabase";

export async function GET(request: Request) {
  console.log(request)
  try {
    const { origin } = new URL(request.url)
    const supabase = createCustomServerClient();
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    console.log('Extracted code:', code);

    if (!code) {
      console.error('No code provided in URL');
      return new Response(JSON.stringify({ error: 'No code provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Attempting to exchange code for session');
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Error exchanging code for session:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!data?.session) {
      console.error('No session returned from exchangeCodeForSession');
      return new Response(JSON.stringify({ error: 'Failed to create session' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return NextResponse.redirect(`${origin}/auth/jwt/supabase-oauth-callback`)
  } catch (error) {
    console.error('Caught unexpected error:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}