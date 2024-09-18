import { NextRequest, NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function GET(req: NextRequest) {
  const supabase = createCustomServerClient();
  const userHeader = req.headers.get("x-user") as string;

  if (!userHeader) {
    return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
  }
  const user = JSON.parse(userHeader);
  console.log("userId", user)
  try {
    const { data, error } = await supabase.from("user_crgpt_token_history").select("*").eq("user_id", user?.id).order("created_at", {ascending: false});
    if (error)
      return NextResponse.json(
        { code: error.code, error: error.message },
        { status: 500 }
      );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user CRGPT token history:", error);
    return NextResponse.json(
      { error: "Failed to fetch history data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const supabase = createCustomServerClient();
  const userHeader = req.headers.get("x-user") as string;

  if (!userHeader) {
    return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
  }
  const user = JSON.parse(userHeader);
  console.log("userId", user)
  try {
    const { data, error } = await supabase.from("user_crgpt_token_history").select("*").eq("user_id", user?.id).eq("status", "admin_waiting").order("created_at", {ascending: false});
    if (error)
      return NextResponse.json(
        { code: error.code, error: error.message },
        { status: 500 }
      );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user CRGPT token history:", error);
    return NextResponse.json(
      { error: "Failed to fetch history data" },
      { status: 500 }
    );
  }
}