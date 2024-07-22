import { NextRequest, NextResponse } from 'next/server';

import { constructWebhookEvent } from 'src/lib/stripeLib';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No Stripe signature found' }, { status: 400 });
  }

  try {
    const body = await req.text();
    const result = constructWebhookEvent(body, sig);

    if (result) {
      console.log('Webhook event processed:', result);
      // Handle the event (e.g., update database, send notifications, etc.)
      return NextResponse.json({ received: true, result });
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'An unknown error occurred' },
      { status: 400 }
    );
  }
}