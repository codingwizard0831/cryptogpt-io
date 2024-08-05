import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const notificationId = searchParams.get("notificationId");

    if (userId) {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }

    if (notificationId) {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("id", notificationId);
      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }

    const { data, error } = await supabase.from("notifications").select("*");
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching notification data: ", error);
    return NextResponse.json(
      { error: "Failed to fetch notification data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user_id, content, type } = await req.json();
    const { data, error } = await supabase
      .from("notifications")
      .insert({ user_id, content, type })
      .select();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error creating notification: ", error);
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, is_read } = await req.json();
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read })
      .eq("id", id)
      .select();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data[0]);
  } catch (error) {
    console.log("Error updating notifications", error);
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    );
  }
}
