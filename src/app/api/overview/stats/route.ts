import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { date, hour, files_uploaded, storage_bytes_ingested, api_calls, io_tokens_consumed } = body;

        const { data, error } = await supabase
            .from('stats')
            .upsert({
                date, hour, files_uploaded, storage_bytes_ingested, api_calls, io_tokens_consumed
            }, { onConflict: "date,hour" })
            .select();
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json(data[0], { status: 200 })
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: 'Error' }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const date = searchParams.get('date');

    if (!date) {
        return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 })
    }

    const { data, error } = await supabase
        .from('stats')
        .select('*')
        .eq('date', date)
        .order('hour', { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 })
}