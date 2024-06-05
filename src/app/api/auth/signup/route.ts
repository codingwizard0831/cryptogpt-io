import { supabase } from 'src/lib/supabase';
import { NextResponse } from "next/server";

export const signUp = async (email: string, password: string) => {
}

export async function POST(req: Request) {
    try {
      const res = await req.json();
      console.log('res', res);
      const email = res.email;
      const password = res.password;
      const response = await supabase.auth.signUp({ email, password })
  
      return NextResponse.json(response.data);
    } catch (error) {
      console.log(error);
    }
}