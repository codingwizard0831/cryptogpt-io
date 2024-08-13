import { NextRequest, NextResponse } from "next/server";
import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const { data, error } = await supabase
            .from('agents')
            .select('*')
            .eq('agent_id', id)
            .single();
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        if (!data) {
            return NextResponse.json({ error: "Agent not found" }, { status: 404 });
        }
        return NextResponse.json(data)
    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ error: 'Error' }, { status: 500 })
    }

}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        console.log(id)
        const body = await req.json();
        const { name, type, category, status, icon } = body;

        const { data, error } = await supabase
            .from('agents')
            .update({ name, type, category, status, icon })
            .eq('agent_id', id)
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
        }

        return NextResponse.json(data[0])

    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: 'Error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { error } = await supabase
            .from('agents')
            .delete()
            .eq('agent_id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Agent deleted successfully" })
    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ error: "Error" }, { status: 500 })
    }
}