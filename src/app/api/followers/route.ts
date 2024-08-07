import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const followerId = searchParams.get("followerId");

    if (userId) {
      const { data, error } = await supabase
        .from("followers")
        .select("follower_id, status")
        .eq("user_id", userId)
        .eq("status", true);
      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }
    if (followerId) {
      const { data, error } = await supabase
        .from("followers")
        .select("user_id, status")
        .eq("follower_id", followerId)
        .eq("status", true);
      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }

    const { data, error } = await supabase
      .from("followers")
      .select("*")
      .eq("status", true);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching follower data:", error);
    return NextResponse.json(
      { error: "Failed to fetch follower data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user_id, follower_id } = await req.json();

    // Check if the relationship already exists
    const { data: existingData, error: existingError } = await supabase
      .from("followers")
      .select("*")
      .eq("user_id", user_id)
      .eq("follower_id", follower_id)
      .single();

    if (existingError && existingError.code !== "PGRST116") {
      return NextResponse.json(
        { error: existingError.message },
        { status: 500 }
      );
    }

    if (existingData) {
      const newStatus = !existingData.status;
      const { data, error } = await supabase
        .from("followers")
        .update({ status: newStatus, followed_at: new Date() })
        .eq("id", existingData.id)
        .select()
        .single();

      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({
        message: newStatus
          ? "User followed successfully"
          : "User unfollowed successfully",
        data,
      });
    }

    const { data, error } = await supabase
      .from("followers")
      .insert([{ user_id, follower_id, status: true }])
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ message: "User followed successfully", data });
  } catch (error) {
    console.error("Error managing follow relationship:", error);
    return NextResponse.json(
      { error: "Failed to manage follow relationship" },
      { status: 500 }
    );
  }
}
