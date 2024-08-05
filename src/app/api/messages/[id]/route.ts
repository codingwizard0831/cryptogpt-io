import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const conversationPartnerId = params.id;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${user.id}, recipient_id.eq.${conversationPartnerId}),and(sender_id.eq.${conversationPartnerId},recipient_id.eq.${user.id})`
      )
      .order("created_at", { ascending: false });
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation" },
      { status: 500 }
    );
  }
}
