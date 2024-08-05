import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("followers")
      .select("*")
      .eq("id", params.id)
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data)
      return NextResponse.json(
        { error: "Follower relationship not found" },
        { status: 404 }
      );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching follower relationship:", error);
    return NextResponse.json(
      { error: "Failed to fetch follower relationship" },
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
      .from("followers")
      .update(body)
      .eq("id", params.id)
      .select()
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({
      message: "Follower relationship updated successfully",
      data,
    });
  } catch (error) {
    console.error("Error updating follower relationship:", error);
    return NextResponse.json(
      { error: "Failed to update follower relationship" },
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
      .from("followers")
      .delete()
      .eq("id", params.id);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({
      message: "Follower relationship deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting follower relationship:", error);
    return NextResponse.json(
      { error: "Failed to delete follower relationship" },
      { status: 500 }
    );
  }
}
