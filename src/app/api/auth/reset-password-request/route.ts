import { NextResponse } from "next/server";

import { supabase } from 'src/lib/supabase';

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { email } = res;
    const response = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://example.com/update-password',
    })
    return NextResponse.json(response)
  } catch (error) {
    console.log(error);
  }
}