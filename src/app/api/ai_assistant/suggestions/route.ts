import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const suggestionType = searchParams.get("type");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    let query = supabase
      .from("goldie_suggestions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (suggestionType) {
      query = query.eq("suggestion_type", suggestionType);
    }

    const { data, error } = await query.limit(5);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching Goldie suggestions:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI suggestions" },
      { status: 500 }
    );
  }
}
