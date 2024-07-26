import { NextRequest, NextResponse } from 'next/server';

import { supabase } from 'src/lib/supabase';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { data, error } = await supabase.from('users_profile').select('*').eq('id', params.id).single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        if (!data) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching user profile:', error)
        return NextResponse.json({ error: 'Failed to fetch profile data' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { data, error } = await supabase.from('users_profile').update(body).eq('id', params.id).select().single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ message: 'User profile updated successfully', data })
    } catch (error) {
        console.error('Error updating user profile:', error)
        return NextResponse.json({ error: 'Failed to update profile data' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { error } = await supabase.from('users_profile').delete().eq('id', params.id);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ message: 'Profile deleted successfully' })
    } catch (error) {
        console.error('Error deleting user profile:', error)
        return NextResponse.json({ error: 'Failed to delete profile data' }, { status: 500 })
    }
}