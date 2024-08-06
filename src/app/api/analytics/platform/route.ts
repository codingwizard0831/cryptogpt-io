import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("analytics_platform_statistics")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Failed to fetch data: ", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
