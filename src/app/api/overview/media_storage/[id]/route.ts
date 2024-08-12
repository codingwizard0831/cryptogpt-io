import { NextRequest, NextResponse } from "next/server";
import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { data, error } = await supabase
            .from('media_files')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        return NextResponse.json(data)
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: "Error" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { error } = await supabase
            .from('media_files')
            .delete()
            .eq('id', id);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "File deleted successfully" });
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: 'Error' }, { status: 500 })
    }
}