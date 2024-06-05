import { supabase } from 'src/lib/supabase';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const email = res.email;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://example.com/update-password',
    })
    return NextResponse.json({ success: data })
  } catch (error) {
    console.log(error);
  }
}