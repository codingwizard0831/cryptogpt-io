import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await req.json();
  console.log('test', res);
  const { assertionResponse } = res;
  console.log('assertionResponse', assertionResponse);
  return NextResponse.json({ success: true })
}
