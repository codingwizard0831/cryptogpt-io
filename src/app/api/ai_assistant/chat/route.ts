import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function processWithAI(message: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Goldie, an AI assistant for a trading platform",
        },
        { role: "user", content: message },
      ],
      max_tokens: 150,
    });

    return (
      (completion.choices[0].message.content &&
        completion.choices[0].message.content.trim()) ||
      "I'm sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.log("Error processing message with AI:", error);
    return "I'm sorry, I couldn't process your request at this time.";
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, message } = await req.json();
    if (!userId || !message) {
      return NextResponse.json(
        { error: "User ID and message are required" },
        { status: 500 }
      );
    }
    const aiResponse = await processWithAI(message);

    const { data, error } = await supabase
      .from("goldie_chat_interaction")
      .insert({
        user_id: userId,
        user_message: message,
        ai_response: aiResponse,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process chat with Goldie" },
      { status: 500 }
    );
  }
}
