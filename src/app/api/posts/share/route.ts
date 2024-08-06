import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { original_post_id, user_id, text } = await req.json();

    const { data: sharedPost, error } = await supabase
      .from("posts")
      .insert({ original_post_id, user_id, text })
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    await supabase
      .from("posts")
      .update({ share_count: supabase.rpc("increment") })
      .eq("id", original_post_id);

    return NextResponse.json({
      message: "Post shared successfully",
      sharedPost,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to share post" },
      { status: 500 }
    );
  }
}
