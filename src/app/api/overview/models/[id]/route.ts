import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { error } = await supabase
            .from('models')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Model unsubscribed successfully" });
    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ error: "Error unsubscribing model" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { data, error } = await supabase
            .from('models')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: "Model not found" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching model:', error);
        return NextResponse.json({ error: "Error fetching model" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();
        const { model_name, hugging_face_repo_id, model_size, hugging_face_repo_token, status } = body;

        const { data, error } = await supabase
            .from('models')
            .update({ model_name, hugging_face_repo_id, model_size, hugging_face_repo_token, status })
            .eq('id', id)
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('Error updating model:', error);
        return NextResponse.json({ error: "Error updating model" }, { status: 500 });
    }
}
