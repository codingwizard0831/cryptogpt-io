import { supabase } from 'src/lib/supabase';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const email = res.email;
    const phone = res.phone;
    if(typeof email !== 'undefined') {
      const response = await supabase.auth.signInWithOtp({
        email: email,
        // options: {
        //   emailRedirectTo: 'https://example.com/welcome'
        // }
      })
      return NextResponse.json(response);
    } else {
      const response = await supabase.auth.signInWithOtp({
        phone: phone,
        // options: {
        //   phoneRedirectTo: 'https://example.com/welcome'
        // }
      })
      return NextResponse.json(response);
    }
  } catch (error) {
    console.log(error);
  }
}