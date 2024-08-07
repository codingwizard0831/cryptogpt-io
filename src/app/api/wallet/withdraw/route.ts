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
    const { data: wallet, error: walletError } = await supabase
      .from("wallets")
      .select("balance")
      .eq("id", wallet_id)
      .single();

    if (walletError)
      return NextResponse.json({ error: walletError.message }, { status: 400 });
    if (wallet.balance < amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }
    const { data, error } = await supabase
      .from("transactions")
      .insert({
        wallet_id,
        type: "withdraw",
        amount,
        status: "completed",
      })
      .select()
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error to withdraw money: ", error);
    return NextResponse.json(
      { error: "Failed to withdraw money" },
      { status: 500 }
    );
  }
}
