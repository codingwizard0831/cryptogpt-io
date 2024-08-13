import { NextResponse } from "next/server";

import { supabase } from 'src/lib/supabase';
import { retrievePaymentIntent } from 'src/lib/stripeLib';

export async function POST(req: Request) {
  try {
    const { payment_intent_id } = await req.json();

    if (!payment_intent_id) {
      return NextResponse.json({ success: false, error: 'Missing payment_intent_id' }, { status: 400 });
    }

    const userHeader = req.headers.get('x-user') as string;

    if (!userHeader) {
      return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
    }
    const user = JSON.parse(userHeader);

    const payment_intent = await retrievePaymentIntent(payment_intent_id);
    // console.log('payment_intent', payment_intent)
    const { data: userPlans, error: userPlansError } = await supabase
      .from('user_plans')
      .select()
      .eq('user_id', user?.id)
      .order('id', { ascending: false }).single();

    if (userPlansError) {
      return NextResponse.json({ success: false, error: 'Error fetching user plan' }, { status: 500 });
    }

    // console.log('userPlans', userPlans)
    const { data: stripeCustomer, error: stripeCustomerError } = await supabase
      .from('stripe_customer')
      .select()
      .eq('user_id', user?.id);

    if (stripeCustomerError) {
      return NextResponse.json({ success: false, error: 'Error fetching stripe customer' }, { status: 500 });
    }

    const customer_id = stripeCustomer[0]?.customer_id;

    if (userPlans && payment_intent.customer === customer_id && payment_intent.status === 'succeeded') {
      const { error } = await supabase
        .from('user_plans')
        .update({ is_active: true })
        .eq('id', userPlans.id)

      if (error) {
        return NextResponse.json({ success: false, error: 'Error activating user plan' }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}