import { NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const nonce = Math.floor(Math.random() * 1000000);
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("metamask_metadata->>address", res.address)
      .single();
    if (!data || error) {
      const { data: user, error: upsertError } = await supabase
        .from("users")
        .upsert([
          {
            metamask_metadata: {
              address: res.address,
              nonce: nonce.toString(),
            },
            auth: {
              lastLoggedinTime: new Date().toISOString(),
              lastAuthStatus: "pending",
              lastLoggedinProvider: "metamask"
            }
          }
        ])
        .select();
      if (user || !upsertError) {
        return NextResponse.json({ user }, { status: 200 });
      }
      throw new Error("Failed to create user");
    }
    const { data: user, error: updateError } = await supabase
      .from("users")
      .update([
        {
          metamask_metadata: {
            address: res.address,
            nonce: nonce.toString(),
          },
          auth: {
            lastLoggedinTime: new Date().toISOString(),
            lastAuthStatus: "pending",
            lastLoggedinProvider: "metamask"
          }
        }
      ])
      .eq("metamask_metadata->>address", res.address)
      .select();

    if (user || !updateError) {
      return NextResponse.json({ user }, { status: 200 });
    }
    throw new Error("Failed to update user");
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
