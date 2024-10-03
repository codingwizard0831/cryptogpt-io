import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
  const userHeader = req.headers.get("x-user") as string;

  if (!userHeader) {
    return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
  }
  const user = JSON.parse(userHeader);
  console.log("userId", user);
  try {
    const body = await req.json();
    const { usdt, usdc, crgpt, dot, sol, avax } = body;

    const balances = {
      usdt,
      usdc,
      crgpt,
      dot,
      sol,
      avax
    };

    const { data, error } = await supabase
      .from('user_metamask_balance_history')
      .insert({
        user_id: user.id,
        balance: balances
      });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error saving balance history:", error);
    return NextResponse.json(
      { error: "Failed to save balance history" },
      { status: 500 }
    );
  }
}
