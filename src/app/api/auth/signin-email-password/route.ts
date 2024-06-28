import { NextResponse } from "next/server";

import { supabase } from 'src/lib/supabase';

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { email } = res;
    const { password } = res;
    const response = await supabase.auth.signInWithPassword({ email, password })
    console.log('response', response)
    const userId = response?.data?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Failed to sign in' }, { status: 500 })
    }
    const { error: upsertError } = await supabase
      .from('users')
      .update([
        {
          auth: {
            lastLoggedinTime: new Date().toISOString(),
            lastAuthStatus: "success",
            lastLoggedinProvider: "email"
          }
        }
      ])
      .eq('userId', userId)
    if (upsertError) {
      throw new Error("Failed to put data to users table")
    }
    return NextResponse.json(response)
  } catch (error) {
    console.log(error);
  }
}