import { NextResponse } from "next/server";

import { supabase } from 'src/lib/supabase';

export async function POST(req: Request) {
  const res = await req.json();
  const { user_id } = res;
  try {
    const response = await supabase.from('user_credits').select().eq('user_id', user_id).order('id', { ascending: false });
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}