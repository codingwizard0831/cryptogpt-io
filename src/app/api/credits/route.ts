import { NextResponse } from "next/server";

import { supabase } from 'src/lib/supabase';

export async function POST(req: Request) {
  const userHeader = req.headers.get('x-user') as string;

  if (!userHeader) {
    return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
  }
  const user = JSON.parse(userHeader);
  try {
    const response = await supabase.from('user_credits').select().eq('user_id', user?.id).order('id', { ascending: false });
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}