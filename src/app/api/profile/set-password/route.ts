import { NextRequest, NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST(req: NextRequest) {
  const supabase = createCustomServerClient();
  const userHeader = req.headers.get("x-user") as string;

  if (!userHeader) {
    return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
  }
  const user = JSON.parse(userHeader);
  console.log("userId", user)
  try {
    const { password, rpassword } = await req.json();
    if (!password || !rpassword) {
      return NextResponse.json({ success: false, message: 'Missing password or rpassword' }, { status: 400 });
    }
    if (password !== rpassword) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    
    const { data, error:sessionError } = await supabase.auth.getSession()

    console.log('data, error', data, sessionError)

    const { error } = await supabase.auth.updateUser({
      password
    });

    if (error) {
      console.error("Error changing password:", error);
      return NextResponse.json({ success: false, message: 'Error changing password' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Set password successfully!"
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    return NextResponse.json(
      { error: "Failed to set new password." },
      { status: 500 }
    );
  }
}
