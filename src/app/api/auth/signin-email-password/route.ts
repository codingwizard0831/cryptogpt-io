import { supabase } from 'src/lib/supabase';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const email = res.email;
    const password = res.password;
    const response = await supabase.auth.signInWithPassword({ email, password })
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error);
  }
}