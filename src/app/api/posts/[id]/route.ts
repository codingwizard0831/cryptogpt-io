import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, post_media (*), post_reactions (*), post_comments (*)")
      .eq("id", params.id)
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) {
      return NextResponse.json({ error: "Post Not Found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { text, media, visibility } = await req.json();
    const { data: post, error: postError } = await supabase
      .from("posts")
      .update({ text, visibility })
      .eq("id", params.id)
      .select()
      .single();
    if (postError)
      return NextResponse.json({ error: postError.message }, { status: 500 });
    if (media) {
      await supabase.from("post_media").delete().eq("post_id", params.id);
      const mediaInserts = media.map((m: { type: string; url: string }) => ({
        post_id: params.id,
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
    return NextResponse.json({ message: "Post updated successfully", post });
  } catch {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await supabase.from("post_media").delete().eq("post_id", params.id);
    await supabase.from("post_reactions").delete().eq("post_id", params.id);
    await supabase.from("post_comments").delete().eq("post_id", params.id);
    const { error: postError } = await supabase
      .from("posts")
      .delete()
      .eq("id", params.id);
    if (postError)
      return NextResponse.json({ error: postError.message }, { status: 500 });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
