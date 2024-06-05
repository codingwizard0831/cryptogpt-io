import { supabase } from 'src/lib/supabase';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const email = res.email;
    const phone = res.phone;
    const token = res.token;
    const type = res.type;
    const options = type === "email"
      ? {
        email,
        token,
        type: "email"
      } : {
        phone,
        token,
        type: "sms"
      };
    const response = await supabase.auth.verifyOtp(options);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error);
  }
}