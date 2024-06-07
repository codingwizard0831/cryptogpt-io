import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const res = await req.json();
        const { address } = res;


    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}