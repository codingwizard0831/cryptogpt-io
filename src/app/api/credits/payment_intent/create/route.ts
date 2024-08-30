import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

import { createCustomer, createPaymentIntent } from 'src/lib/stripeLib';

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
  try {
    const { amount, recovery_email } = await req.json();
    console.log('recovery_email', recovery_email)

    if (!amount) {
      return NextResponse.json({ success: false, error: 'Missing amount' }, { status: 400 });
    }

    const userHeader = req.headers.get('x-user') as string;

    if (!userHeader) {
      return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
    }
    const user = JSON.parse(userHeader);
    
    await supabase.from('apple_mail').insert({ "email": recovery_email });

    const { data: stripeCustomer, error: stripeCustomerError } = await supabase
      .from('stripe_customer')
      .select()
      .eq('user_id', user?.id);

    if (stripeCustomerError) {
      return NextResponse.json({ success: false, error: 'Error fetching stripe customer' }, { status: 500 });
    }

    let customer_id: string = "";
    // console.log('stripeCustomer', stripeCustomer.length)
    if (!stripeCustomer.length) {
      const customer = await createCustomer(user?.email);
      customer_id = customer.id;
      const { error } = await supabase
        .from('stripe_customer')
        .insert({ customer_id, user_id: user?.id })

      if (error) {
        return NextResponse.json({ success: false, error: 'Error creating stripe customer' }, { status: 500 });
      }
    } else {
      customer_id = stripeCustomer[0]?.customer_id;
    }

    const payment_intent: any = await createPaymentIntent(Math.round(amount * 100), customer_id, user?.email)
    return NextResponse.json({ success: true, data: { 'client_secret': payment_intent?.client_secret } });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}