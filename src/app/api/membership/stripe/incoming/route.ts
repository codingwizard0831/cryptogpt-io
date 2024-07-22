import { NextApiRequest, NextApiResponse } from 'next';

import { buffer } from 'micro';

import { supabase } from 'src/lib/supabase';
import { constructWebhookEvent } from 'src/lib/stripeLib';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const buf: any = await buffer(req);
  const sig = req.headers['stripe-signature'] as string | undefined;

  if (!sig) {
    return res.status(400).send('No Stripe signature found');
  }

  try {
    const result: any = constructWebhookEvent(buf, sig);
    if (result) {
      console.log('Webhook event processed:', result);
      // Handle the event (e.g., update database, send notifications, etc.)
      res.status(200).json({ received: true, result });
    } else {
      res.status(200).json({ received: true });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
}