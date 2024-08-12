import { NextRequest, NextResponse } from "next/server";
import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type');

    let query = supabase.from('agents').select('*');
    if (type) {
        query = query.eq('type', type);
    }
    const { data, error } = await query.order('last_modified', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, agent_id, type, category, status, icon } = body;

    if (!name || !agent_id || !type || !category || !status || !icon) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('agents')
        .insert({ name, agent_id, type, category, status, icon })
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 200 })
}