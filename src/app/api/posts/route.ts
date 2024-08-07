import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, post_media (*), post_reactions (*), post_comments (*)")
      .order("created_at", { ascending: false });
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user_id, text, media, visibility } = await req.json();
    const { data: post, error: postError } = await supabase
      .from("posts")
      .insert({ user_id, text, visibility })
      .select()
      .single();
    if (postError)
      return NextResponse.json({ error: postError.message }, { status: 500 });
    if (media && media.length > 0) {
      const mediaInserts = media.map((m: { type: string; url: string }) => ({
        post_id: post.id,
        media_type: m.type,
        media_url: m.url,
      }));

      const { error: mediaError } = await supabase
        .from("post_media")
        .insert(mediaInserts);

      if (mediaError)
        return NextResponse.json(
          { error: mediaError.message },
          { status: 500 }
        );
    }
    return NextResponse.json({ message: "Post Created successfully", post });
  } catch {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
