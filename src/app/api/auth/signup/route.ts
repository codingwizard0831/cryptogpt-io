import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
  try {
    const res = await req.json();
    const { email } = res;
    const { password } = res;
    const response = await supabase.auth.signUp({ email, password })
    const userId = response?.data?.user?.id;
    const { data, error } = await supabase.from('users').select('id').eq('userId', userId).single();
    if (!data || error) {
      const { error: upsertError } = await supabase
        .from('users')
        .upsert([
          {
            userId,
            email_metadata: { email },
            auth: {
              lastLoggedinTime: new Date().toISOString(),
              lastAuthStatus: "pending",
              lastLoggedinProvider: "email"
            }
          }
        ])
        .select()
      if (upsertError) {
        throw new Error("Failed to put data to users table")
      }
    }
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}
