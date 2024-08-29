import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST(req: Request) {
  const res = await req.json();
  const { token } = res;

  if (!token) {
    return NextResponse.json({ success: false, error: 'Token is required' }, { status: 400 })
  }

  const supabase = createCustomServerClient();
  try {
    const { data: tokenData, error: tokenError } = await supabase
      .from('user_tokens')
      .select('user_id, expires_at, access_token')
      .eq('token', token)
      .single()

    if (tokenError || !tokenData) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 })
    }

    const now = new Date()
    if (new Date(tokenData.expires_at) < now) {
      return NextResponse.json({ success: false, error: 'Token has expired' }, { status: 401 })
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(tokenData.access_token)

    if (userError) {
      return NextResponse.json({ success: false, error: 'Failed to authenticate user' }, { status: 401 })
    }

    const newExpiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    await supabase
      .from('user_tokens')
      .update({ expires_at: newExpiresAt })
      .eq('token', token)

    return NextResponse.json({ success: true, data: { user, access_token: tokenData.access_token } }, { status: 200 })

  } catch (error) {
    console.error('Error in login-with-token:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
