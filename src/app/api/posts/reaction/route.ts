import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { post_id, user_id, reaction_type } = await req.json();

    const { data, error } = await supabase
      .from("post_reactions")
      .upsert(
        { post_id, user_id, reaction_type },
        {
          onConflict: "post_id,user_id",
          ignoreDuplicates: false,
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Reaction added/updated successfully",
      reaction: data,
    });
  } catch (error) {
    console.error("Error adding/updating reaction:", error);
    return NextResponse.json(
      { error: "Failed to add/update reaction" },
      { status: 500 }
    );
  }
}
