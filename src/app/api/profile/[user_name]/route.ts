import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(
  req: NextRequest,
  { params }: { params: { user_name: string } }
) {
  try {
    const { data, error } = await supabase
      .from("users_profile")
      .select("*")
      .eq("user_name", params.user_name)
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data)
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    );
  }
}
