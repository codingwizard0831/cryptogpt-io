import { supabase } from 'src/lib/supabase';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const new_password = res.new_password;
    const response = await supabase.auth.updateUser({
      password: new_password
    })
    return NextResponse.json(response)
  } catch (error) {
    console.log(error);
  }
}