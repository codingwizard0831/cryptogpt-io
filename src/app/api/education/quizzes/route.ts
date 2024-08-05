import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("educational_quizzes")
      .select("*, educational_quiz_questions (id, question, options)")
      .order("created_at", { ascending: false });
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (error) {
    console.log("Error fetching quizzes: ", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}
