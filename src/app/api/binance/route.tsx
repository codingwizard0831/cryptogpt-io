import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const res = await req.json();
        const { url } = res;
        const { data } = res;
        const { headers } = res;

        // const response = await fetch(url, {
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify(data)
        // });
        const response = await axios.post(url, data, { headers });
        console.log('response', response);

        return NextResponse.json({ ...response.data });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to call the endpoint' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get('url');
        const apiKey = searchParams.get('apiKey');
        console.log('url', url);
        console.log('apiKey', apiKey);

        if (!url || !apiKey) {
            return NextResponse.json({ error: 'Missing url or apiKey' }, { status: 400 });
        }

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': apiKey,
            }
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.log(error.response.data);
        return NextResponse.json({ error: 'Failed to call the endpoint' }, { status: 500 });
    }
}