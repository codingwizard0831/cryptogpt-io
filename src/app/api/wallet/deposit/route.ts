import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { wallet_id, amount } = await req.json();

    if (!wallet_id || !amount) {
      return NextResponse.json(
        { error: "Wallet ID and amount are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        wallet_id,
        type: "deposit",
        amount,
        status: "completed",
      })
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error to deposit money: ", error);
    return NextResponse.json(
      { error: "Failed to deposit money" },
      { status: 500 }
    );
  }
}
