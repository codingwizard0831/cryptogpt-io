import { NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { email } = res;
    const { phone } = res;
    const { token } = res;
    const { type } = res;
    const options =
      type === "email"
        ? {
            email,
            token,
            type: "email" as any,
          }
        : {
            phone,
            token,
            type: "sms" as any,
          };
    const response = await supabase.auth.verifyOtp(options);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}
