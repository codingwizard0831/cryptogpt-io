import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("notification_settings")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching notification settings: ", error);
    return NextResponse.json(
      { error: "Failed to fetch notification settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user_id, email_notification, push_notification } = await req.json();

    const { data, error } = await supabase
      .from("notification_settings")
      .upsert(
        { user_id, email_notification, push_notification },
        { onConflict: "user_id" }
      )
      .select();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data[0]);
  } catch (error) {
    console.log("Error updating notification settins: ", error);
    return NextResponse.json(
      { error: "Failed to update notification settings" },
      { status: 500 }
    );
  }
}
