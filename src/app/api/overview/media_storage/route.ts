import { NextRequest, NextResponse } from "next/server";
import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const user_id = searchParams.get('user_id');

        if (!user_id) {
            return NextResponse.json({ error: 'User ID is required' })
        }

        const { data, error } = await supabase
            .from('media_files')
            .select('*')
            .eq('user_id', user_id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        const fileType = ['Video', 'Youtube', 'Image', 'Audio', 'Document'];
        const summary = fileType.reduce((acc, type) => {
            acc[type] = {
                count: data.filter(file => file.file_type === type).length,
                size: data.filter(file => file.file_type === type).reduce((sum, file) => sum + file.size, 0)
            };
            return acc;
        }, {} as Record<string, { count: Number; size: number }>);

        return NextResponse.json({ files: data, summary })
    } catch (error) {
        console.log('Error');
        return NextResponse.json({ error: "Error" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { user_id, name, file_type, size, extension } = body;

    if (!user_id || !name || !file_type || !size) {
        return NextResponse.json({ error: 'Missing reuqired files' }, { status: 400 })
    }

    const { data, error } = await supabase
        .from('media_files')
        .insert({
            user_id, name, file_type, size, extension, processing_status: 'pending'
        })
        .select()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
}

