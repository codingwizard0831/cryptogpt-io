import { NextRequest, NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST(req: NextRequest) {
  const supabase = createCustomServerClient();
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `https://cryptogpt.app/auth/jwt/supabase-oauth-callback1?`,
      },
    });
    console.log(data, error)
    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}