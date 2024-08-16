import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { id } = params;
        const { data, error } = await supabase
            .from('plan_usage')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        if (!data) {
            return NextResponse.json({ error: "Plan usage not found" }, { status: 404 })
        }
        return NextResponse.json(data)
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error }, { status: 500 })
    }
}


export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { id } = params;
        const body = await req.json();

        const { data, error } = await supabase
            .from('plan_usage')
            .update(body)
            .eq('id', id)
            .select()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        if (data.length === 0) {
            return NextResponse.json({ 'error': "Plan usage not found" }, { status: 404 })
        }
        return NextResponse.json(data[0])
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error }, { status: 500 })
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { id } = params;
        const { error } = await supabase
            .from('plan_usage')
            .delete()
            .eq('id', id);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Plan usage deleted successfully" }, { status: 200 })
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error }, { status: 500 })
    }
}