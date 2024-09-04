import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST(req: Request) {
  try {
    const supabase = createCustomServerClient();
    const { email, resetPasswordToken, new_password } = await req.json();

    // Validate input
    if (!email || !resetPasswordToken || !new_password) {
      return NextResponse.json({ 
        error: "Email, OTP code, and new password are required" 
      }, { status: 400 });
    }

    // Verify OTP
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: resetPasswordToken,
      type: 'recovery'
    });

    if (verifyError) {
      return NextResponse.json({ error: verifyError.message }, { status: 400 });
    }

    // Update password
    const { error }: any = await supabase.auth.updateUser({
      password: new_password,
    });

    if (error?.code === "same_password") {
      return NextResponse.json({ 
        message: "Password updated successfully"
      });
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      message: "Password updated successfully"
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ 
      error: "An unexpected error occurred" 
    }, { status: 500 });
  }
}