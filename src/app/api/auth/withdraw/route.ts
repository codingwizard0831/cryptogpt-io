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

    const params = {
      coin: 'CRGPT',
      address: '0x48FaEcE9C8AaB4Be382c71a67c9e7850BdA6F067',
      amount: '100',
      netWork: 'ETH',
      timestamp: Date.now().toString()
    };

    // Sort the params alphabetically
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

    const url = `https://api.mexc.com/api/v3/capital/withdraw?${queryString}&signature=${signature}`;

    console.log('Request URL:', url);
    console.log('Request Body:', finalParams);

    const response = await axios({
      method: 'post',
      url,
      data: finalParams,
      headers: {
        'X-MEXC-APIKEY': mexcAccessKey,
        'Content-Type': 'application/json'
      }
    });

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