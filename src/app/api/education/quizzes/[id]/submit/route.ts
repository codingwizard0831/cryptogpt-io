import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const quizId = params.id;
  const { answers } = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: quizData, error: quizError } = await supabase
      .from("educational_quiz_questions")
      .select("id, correct_answer")
      .eq("quiz_id", quizId);
    if (quizError)
      return NextResponse.json({ error: quizError.message }, { status: 500 });
    let score = 0;
    quizData?.forEach((question) => {
      if (answers[question.id] === question.correct_answer) {
        score += 1;
      }
    });
    const { data, error } = await supabase
      .from("educational_quiz_submissions")
      .insert({
        user_id: user.id,
        quiz_id: quizId,
        score,
      })
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: { score, total: quizData.length } });
  } catch (error) {
    console.log("Error summitting quiz: ", error);
    return NextResponse.json(
      { error: "Failed to submit quiz" },
      { status: 500 }
    );
  }
}
