import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const friendId = searchParams.get("friendId");

    if (userId) {
      const { data, error } = await supabase
        .from("friends")
        .select("friend_id, status")
        .eq("user_id", userId)
        .eq("status", true);
      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }
    if (friendId) {
      const { data, error } = await supabase
        .from("friends")
        .select("user_id, status")
        .eq("friend_id", friendId)
        .eq("status", true);
      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }
    const { data, error } = await supabase
      .from("friends")
      .select("*")
      .eq("status", true);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch friend data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user_id, friend_id } = await req.json();
    const { data: existingData, error: existingError } = await supabase
      .from("friends")
      .select("*")
      .eq("user_id", user_id)
      .eq("friend_id", friend_id)
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
        .from("friends")
        .update({ status: newStatus, followed_at: new Date() })
        .eq("id", existingData.id)
        .select()
        .single();
      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({
        message: newStatus
          ? "Friend followed successfully"
          : "Friend unfollowed successfully",
        data,
      });
    }
    const { data, error } = await supabase
      .from("friends")
      .insert([{ user_id, friend_id, status: true }])
      .select()
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ message: "Friend followed successfully", data });
  } catch {
    return NextResponse.json(
      { error: "Failed to manage friend relationship" },
      { status: 500 }
    );
  }
}
