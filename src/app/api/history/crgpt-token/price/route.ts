import axios from 'axios';
import crypto from 'crypto';
import { NextResponse } from "next/server";

import { MEXC_API } from 'src/config-global';

export async function POST(req: Request) {
  console.log('MEXC_API', MEXC_API);
  try {
    const mexcAccessKey = MEXC_API.accessKey || '';
    const mexcSecretKey = MEXC_API.secretKey || '';

    if (!mexcAccessKey.trim() || !mexcSecretKey.trim()) {
      return NextResponse.json({ error: 'Could not send money to customers.' }, { status: 400 });
    }

    const params = {
      symbol: "CRGPTUSDT"
    };

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    console.log('Query string before signature:', queryString);

    const url = `https://api.mexc.com/api/v3/avgPrice?${queryString}`;

    console.log('Request URL:', url);
    console.log('Request Body:', params);

    const response = await axios({
      method: 'get',
      url,
      data: params,
      headers: {
        'X-MEXC-APIKEY': mexcAccessKey,
        'Content-Type': 'application/json'
      }
    });
    console.log('Response:', response);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    // console.error('Error:', error);
    if (axios.isAxiosError(error) && error.response) {
      // console.error('MEXC API Error Response:', error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: error.response.status });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}