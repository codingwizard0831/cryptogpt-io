import { NextResponse } from "next/server";

import { supabase } from 'src/lib/supabase';

export async function POST() {
  const { data, error } = await supabase
    .from('users_profile')
    .select(`
      user_name,
      user_ranking!inner (points)
    `)
    .order('user_ranking.points', { ascending: false })

  if (error) {
    return NextResponse.json({ success: false, error: 'Failed to create new user plan.' }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, data });
}