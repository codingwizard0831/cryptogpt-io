import { NextResponse } from "next/server";

import { supabase } from 'src/lib/supabase';
import { retrievePaymentIntent } from 'src/lib/stripeLib';

export async function POST(req: Request) {
  try {
    const { user_id, payment_intent_id, amount } = await req.json();

    if (!user_id || !payment_intent_id || !amount) {
      return NextResponse.json({ success: false, error: 'Missing user_id or payment_intent_id or amount' }, { status: 400 });
    }

    const payment_intent = await retrievePaymentIntent(payment_intent_id);

    const { data: stripeCustomer, error: stripeCustomerError } = await supabase
      .from('stripe_customer')
      .select()
      .eq('user_id', user_id);

    if (stripeCustomerError) {
      return NextResponse.json({ success: false, error: 'Error fetching stripe customer' }, { status: 500 });
    }

    const customer_id = stripeCustomer[0]?.customer_id;

    if (payment_intent.customer === customer_id && payment_intent.status === 'succeeded') {
      const { data: existingUserCredit, error: fetchError } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', user_id)
        .single();

      if (fetchError) {
        return NextResponse.json({ success: false, error: fetchError }, { status: 400 });
      }

      if (existingUserCredit) {
        const totalAmount = existingUserCredit.amount + amount;
        const { error } = await supabase
          .from('user_credits')
          .update({ amount: totalAmount })
          .eq('user_id', user_id);
        if (error) return NextResponse.json({ success: false, error }, { status: 400 });
      } else {
        const { error } = await supabase
          .from('user_credits')
          .insert([{ user_id, amount }]);
        if (error) return NextResponse.json({ success: false, error }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}