import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("educational_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (error) {
    console.log("Error fetching educational resources: ", error);
    return NextResponse.json(
      { error: "Failed to fetch educational resources" },
      { status: 500 }
    );
  }
}
