import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function PUT(
  req: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    const body = await req.json();

    // If user_name is being updated, check for uniqueness
    if (body.user_name) {
      const { data: existingUsername } = await supabase
        .from("users_profile")
        .select("user_name")
        .eq("user_name", body.user_name)
        .neq("user_id", params.user_id) // Exclude the current user
        .single();

      if (existingUsername) {
        return NextResponse.json(
          { error: "user_name already exists" },
          { status: 409 }
        );
      }
    }

    // If email is being updated, check for uniqueness
    if (body.email) {
      const { data: existingEmail } = await supabase
        .from("users_profile")
        .select("email")
        .eq("email", body.email)
        .neq("user_id", params.user_id) // Exclude the current user
        .single();

      if (existingEmail) {
        return NextResponse.json(
          { error: "email already exists" },
          { status: 409 }
        );
      }
    }

    // If checks pass, update the profile
    const { data, error } = await supabase
      .from("users_profile")
      .update(body)
      .eq("user_id", params.user_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User profile updated successfully",
      data,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile data" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    const { error } = await supabase
      .from("users_profile")
      .delete()
      .eq("user_id", params.user_id);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    return NextResponse.json(
      { error: "Failed to delete profile data" },
      { status: 500 }
    );
  }
}
