import { NextRequest, NextResponse } from 'next/server';

import { supabase } from 'src/lib/supabase';

export async function GET(req: NextRequest) {
    try {
        // Get all profiles
        const { data, error } = await supabase.from('users_profile').select('*');
        if (error) return NextResponse.json({ code: error.code, error: error.message }, { status: 500 });
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching user profiles:', error)
        return NextResponse.json({ error: 'Failed to fetch profile data' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { data, error } = await supabase.from('users_profile').insert([body]).select().single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ message: 'User profile created successfully', data })
    } catch (error) {
        console.error('Error creating user profile:', error)
        return NextResponse.json({ error: 'Failed to create profile data' }, { status: 500 })
    }
}