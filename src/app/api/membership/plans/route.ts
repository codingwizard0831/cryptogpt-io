import { NextResponse } from "next/server";

import { supabase } from 'src/lib/supabase';

export async function POST() {
  try {
    const response = await supabase.from('plans').select().eq('is_active', true);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}