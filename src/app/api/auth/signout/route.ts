import { NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST() {
  try {
    await supabase.auth.signOut();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}
