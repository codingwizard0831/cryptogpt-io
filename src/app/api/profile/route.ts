import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    // Get all profiles
    const { data, error } = await supabase.from("users_profile").select("*");
    if (error)
      return NextResponse.json(
        { code: error.code, error: error.message },
        { status: 500 }
      );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if user_name already exists
    const { data: existingUsername } = await supabase
      .from("users_profile")
      .select("user_name")
      .eq("user_name", body.user_name)
      .single();

    if (existingUsername) {
      return NextResponse.json(
        { error: "user_name already exists" },
        { status: 409 }
      );
    }

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from("users_profile")
      .select("email")
      .eq("email", body.email)
      .single();

    if (existingEmail) {
      return NextResponse.json(
        { error: "email already exists" },
        { status: 409 }
      );
    }

    // If both checks pass, insert the new profile
    const { data, error } = await supabase
      .from("users_profile")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "User profile created successfully",
      data,
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile data" },
      { status: 500 }
    );
  }
}
