import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

function generateRandom(length: number = 32): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let result: string = '';

  // eslint-disable-next-line no-plusplus
  for (let i: number = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
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
    const token = generateRandom();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    const { data: existingToken, error: fetchError } = await supabase
      .from('user_tokens')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error("Error fetching existing token")
    }

    if (existingToken) {
      const { error } = await supabase
        .from('user_tokens')
        .update({
          token,
          access_token: response?.data?.session?.access_token,
          expires_at: expiresAt
        })
        .eq('user_id', userId)

      if (error) {
        throw new Error("Error updating token")
      }
    } else {
      const { error } = await supabase
        .from('user_tokens')
        .insert({
          user_id: userId,
          token,
          access_token: response?.data?.session?.access_token,
          expires_at: expiresAt
        })

      if (error) {
        throw new Error("Error updating token")
      }
    }
    return NextResponse.json(response)
  } catch (error) {
    console.log(error);
  }
}
