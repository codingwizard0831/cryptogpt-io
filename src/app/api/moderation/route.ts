import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { reporter_id, content_id, reason } = await req.json();

    const { data: contentData, error: contentError } = await supabase
      .from("contents")
      .select("id, status")
      .eq("id", content_id)
      .single();

    if (contentError || !contentData) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    if (contentData.status !== "active") {
      return NextResponse.json(
        { error: "Content is not active" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("content_reports")
      .insert({ reporter_id, content_id, reason })
      .select();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      message: "Content reported successfully",
      report: data[0],
    });
  } catch (error) {
    console.log("Error reporting content:", error);
    return NextResponse.json(
      { error: "Failed to report content" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "pending";

    // TODO: Add admin check here
    // const isAdmin = await checkIfUserIsAdmin(req);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }

    const { data, error } = await supabase
      .from("content_reports")
      .select(
        `
        *,
        contents:content_id (
          id,
          user_id,
          content_type,
          content,
          status
        )
      `
      )
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching moderation queue:", error);
    return NextResponse.json(
      { error: "Failed to fetch moderation queue" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, status, resolved_by } = await req.json();

    // TODO: Add admin check here
    // const isAdmin = await checkIfUserIsAdmin(req);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }

    const { data, error } = await supabase
      .from("content_reports")
      .update({ status, resolved_at: new Date().toISOString(), resolved_by })
      .eq("id", id)
      .select();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Report resolved", report: data[0] });
  } catch (error) {
    console.log("Error resolving report:", error);
    return NextResponse.json(
      { error: "Failed to resolve report" },
      { status: 500 }
    );
  }
}
