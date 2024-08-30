import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST() {
  const supabase = createCustomServerClient();
  try {
    await supabase.auth.signOut();
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(error);
  }
}
