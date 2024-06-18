import { NextResponse } from "next/server";

import { supabase } from 'src/lib/supabase';

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { provider } = res;
    const response = await supabase.auth.signInWithOAuth({ provider });
    return NextResponse.json(response)
  } catch (error) {
    console.log(error);
  }
}