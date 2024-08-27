import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await req.json();
  console.log('test', res);
  const { verificationResponse } = res;
  console.log('verificationResponse', verificationResponse);
  return NextResponse.json({ success: true })
}
