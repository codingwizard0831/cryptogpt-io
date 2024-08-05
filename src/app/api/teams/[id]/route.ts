import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { name, description } = await req.json();
  const { data, error } = await supabase
    .from("teams")
    .update({ name, description })
    .eq("id", params.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase.from("teams").delete().eq("id", params.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: "Team deleted successfully" });
}
