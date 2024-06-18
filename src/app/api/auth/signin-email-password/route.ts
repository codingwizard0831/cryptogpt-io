import { NextResponse } from "next/server";

import { supabase } from 'src/lib/supabase';

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { email } = res;
    const { password } = res;
    const response = await supabase.auth.signInWithPassword({ email, password })
    return NextResponse.json(response)
  } catch (error) {
    console.log(error);
  }
}