import { NextRequest, NextResponse } from "next/server";
import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabase
            .from('models')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ error: 'Error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { model_name, hugging_face_repo_id, model_size, hugging_face_repo_token, status } = body;

    if (!model_name || !hugging_face_repo_id || !model_size || !hugging_face_repo_token || !status) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabase
        .from('models')
        .insert({
            model_name, hugging_face_repo_id, model_size, hugging_face_repo_token, status
        })
        .select()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 })
}