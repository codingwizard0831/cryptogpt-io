import { supabase } from 'src/lib/supabase';
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await supabase.auth.signOut();
    return NextResponse.json({success: true})
  } catch (error) {
    console.log(error);
  }
}