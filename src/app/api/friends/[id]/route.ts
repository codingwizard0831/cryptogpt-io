import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("friends")
      .select("*")
      .eq("id", params.id)
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data)
      return NextResponse.json(
        { error: "Friend relationship not found" },
        { status: 404 }
      );
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch friend data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from("friends")
      .update(body)
      .eq("id", params.id)
      .select()
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({
      message: "Friend relationship updated successfully",
      data,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update friend relationship" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("friends")
      .delete()
      .eq("id", params.id);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({
      message: "Friend relationship deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete friend relationship" },
      { status: 500 }
    );
  }
}
