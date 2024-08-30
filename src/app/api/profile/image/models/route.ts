import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST() {
  const supabase = createCustomServerClient();
  try {
    const response = await supabase.from('stablediffusion_models').select().eq('is_active', true);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}