import { NextRequest, NextResponse } from "next/server";

import { decrypt, encrypt } from "src/utils/encryption";

import { supabase } from "src/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const userHeader = req.headers.get("x-user") as string;
        if (!userHeader) {
            return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
        }
        const user = JSON.parse(userHeader);
        const body = await req.json();
        console.log('body', body);

        const { id, exchange_id, api_key, secret_key, name } = body;
        const encryptedApiKey = encrypt(api_key);
        const encryptedSecretKey = encrypt(secret_key);
        console.log('encryptedApiKey', encryptedApiKey);

        const { data, error } = await supabase
            .from('exchange_keys')
            .upsert({
                id,
                exchange_id,
                user_id: user.id,
                api_key: encryptedApiKey,
                secret_key: encryptedSecretKey,
                name,
            }, { onConflict: "id" })
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data[0], { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const userHeader = req.headers.get("x-user") as string;
        if (!userHeader) {
            return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
        }
        const user = JSON.parse(userHeader);

        const { data, error } = await supabase
            .from('exchange_keys')
            .select('id, exchange_id, api_key, secret_key, name')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json(null, { status: 404 });
        }

        if (data.length > 0) {
            data.forEach((key: any) => {
                key.api_key = key.api_key ? decrypt(key.api_key) : null;
                key.secret_key = key.secret_key ? decrypt(key.secret_key) : null;
            });
        }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const userHeader = req.headers.get("x-user") as string;
        if (!userHeader) {
            return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
        }
        const user = JSON.parse(userHeader);
        const body = await req.json();

        const { id, exchange_id, api_key, secret_key, name } = body;
        const encryptedApiKey = encrypt(api_key);
        const encryptedSecretKey = encrypt(secret_key);

        console.log(body);

        const { data, error } = await supabase
            .from('exchange_keys')
            .update({ exchange_id, api_key: encryptedApiKey, secret_key: encryptedSecretKey, name })
            .eq('id', id)
            .eq('user_id', user.id)
            .select('id, exchange_id, name, created_at');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data[0], { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const userHeader = req.headers.get("x-user") as string;
        if (!userHeader) {
            return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
        }
        const user = JSON.parse(userHeader);

        const id = req.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('exchange_keys')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}