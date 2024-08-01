import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const { reporter_id, content_id, reason } = await req.json()
        const { data: contentData, error: contentError } = await supabase
            .from('contents')
            .select('id, status')
            .eq('id', content_id)
            .single()
        if (contentError || !contentData) {
            return NextResponse.json({ error: "Content not found" }, { status: 404 })
        }
        if (contentData.status !== 'active') {
            return NextResponse.json({ error: "Content is not active" }, { status: 400 })
        }
        const { data, error } = await supabase
            .from('content_reports')
            .insert({ reporter_id, content_id, reason })
            .select()
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
        return NextResponse.json({ message: "Content reported successfully", report: data[0] })
    } catch (error) {
        console.log('Error reporting content:', error);
        return NextResponse.json({ error: "Failed to report content" }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {

    } catch (error) {
        console.log('Error fetching moderation queue:', error);
        return NextResponse.json({ error: "Failed to fetch moderation queue" }, { status: 500 })
    }
}