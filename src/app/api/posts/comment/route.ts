import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { post_id, user_id, content } = await req.json();
    const { data, error } = await supabase
      .from("post_comments")
      .insert({ post_id, user_id, content })
      .select()
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      message: "Comment added successfully",
      comment: data,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
