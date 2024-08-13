import { NextRequest, NextResponse } from "next/server";
import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get('user_id');

        console.log(userId)

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('plan_usage')
            .select('*')
            .eq('user_id', userId)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);

    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: 'Error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { user_id, type, value, limit_value, unit, percentage } = body;

        if (!user_id || !type || limit_value === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('plan_usage')
            .upsert({
                user_id, type, value, limit_value, unit, percentage
            }, { onConflict: 'user_id,type' })
            .select();
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        console.log('Error', error);
        return NextResponse.json({ error: "Error" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { user_id, type, value } = body;

        if (!user_id || !type || value === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const { data: currentData, error: fetchError } = await supabase
            .from('plan_usage')
            .select('*')
            .eq('user_id', user_id)
            .eq('type', type)
            .single();

        if (fetchError) {
            return NextResponse.json({ error: fetchError.message }, { status: 500 })
        }

        if (!currentData) {
            return NextResponse.json({ error: "Plan usage data not found" }, { status: 404 })
        }

        const newPercentage = (value / currentData.limit_value) * 100;

        const { data, error } = await supabase
            .from('plan_usage')
            .update({ value, percentage: newPercentage })
            .eq('user_id', user_id)
            .eq('type', type)
            .select()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data[0])
    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ error: 'Error' }, { status: 500 })
    }
}