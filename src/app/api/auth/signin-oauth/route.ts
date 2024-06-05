import { supabase } from 'src/lib/supabase';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const provider = res.provider;
    const response = await supabase.auth.signInWithOAuth({ provider });
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error);
  }
}