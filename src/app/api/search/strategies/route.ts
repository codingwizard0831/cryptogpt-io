import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("freq_strategies")
      .select(
        "*, freq_strategy_parameters (*), freq_signals (*), freq_trades (*)"
      )
      .select();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching strategies:", error);
    return NextResponse.json(
      { error: "Failed to fetch strategies" },
      { status: 500 }
    );
  }
}
