import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

import { HOST_API } from 'src/config-global';

export async function POST(req: Request) {
  try {
    const supabase = createCustomServerClient();
    const res = await req.json();
    const { email } = res;
    const response = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${HOST_API}auth/jwt/reset-password/`,
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}
