import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        // Fetch all prices from MEXC
        const response = await fetch('https://api.mexc.com/api/v3/ticker/price?symbols=all');
        const data = await response.json();

        // Extract specific pairs
        const pairs = ['ETHUSDT', 'DOTUSDT', 'SOLUSDT', 'AVAXUSDT', 'USDCUSDT', 'CRGPTUSDT'];
        const filteredPrices = data.filter((item: { symbol: string }) => pairs.includes(item.symbol));

        // Format response to be easier to work with
        const prices = filteredPrices.reduce((acc: { [key: string]: number }, item: { symbol: string, price: string }) => {
            const token = item.symbol.replace('USDT', '');
            acc[token] = parseFloat(item.price);
            return acc;
        }, {});

        return NextResponse.json(prices);
    } catch (error) {
        console.error('Error fetching data from MEXC:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
