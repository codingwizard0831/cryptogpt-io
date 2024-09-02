import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  console.log(request)
  const { origin } = new URL(request.url)
  return NextResponse.redirect(`${origin}/auth/jwt/supabase-oauth-callback`)
}