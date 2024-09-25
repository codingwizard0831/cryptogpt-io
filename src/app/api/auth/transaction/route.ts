import axios from 'axios';
import crypto from 'crypto';
import { NextResponse } from "next/server";

import { MEXC_API } from 'src/config-global';

function createSignature(queryString: string, secretKey: string): string {
  return crypto
    .createHmac('sha256', secretKey)
    .update(queryString)
    .digest('hex');
}

export async function POST(req: Request) {
  console.log('MEXC_API', MEXC_API);
  try {
    const mexcAccessKey = MEXC_API.accessKey || '';
    const mexcSecretKey = MEXC_API.secretKey || '';

    if (!mexcAccessKey.trim() || !mexcSecretKey.trim()) {
      return NextResponse.json({ error: 'Could not send money to customers.' }, { status: 400 });
    }
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const startTime = twoDaysAgo.getTime().toString();

    const params = {
      coin: 'CRGPT',
      timestamp: Date.now().toString(),
      startTime
    };

    const sortedParams = Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});

    const queryString = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    console.log('Query string before signature:', queryString);

    const signature = createSignature(queryString, mexcSecretKey);

    console.log('Generated signature:', signature);

    const finalParams = { ...sortedParams, signature };

    const url = `https://api.mexc.com/api/v3/capital/withdraw/history?${queryString}&signature=${signature}`;

    const response = await axios({
      method: 'get',
      url,
      data: finalParams,
      headers: {
        'X-MEXC-APIKEY': mexcAccessKey,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response:', response);
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    if (axios.isAxiosError(error) && error.response) {
      // console.error('MEXC API Error Response:', error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: error.response.status });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}