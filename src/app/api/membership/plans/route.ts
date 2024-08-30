import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST() {
  const supabase = createCustomServerClient();
  try {
    const response = await supabase.from('plans').select().eq('is_active', true);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}