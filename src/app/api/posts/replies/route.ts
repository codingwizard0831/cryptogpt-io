import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const { data, error } = await supabase
      .from("post_replies")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch replies" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const { user_id, content, parent_reply_id } = await req.json();
    const { data, error } = await supabase
      .from("post_replieds")
      .insert({ post_id: postId, user_id, content, parent_reply_id })
      .select()
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      message: "Reply added successfully",
      reply: data,
    });
  } catch {
    return NextResponse.json({ error: "Failed to add reply" }, { status: 500 });
  }
}
