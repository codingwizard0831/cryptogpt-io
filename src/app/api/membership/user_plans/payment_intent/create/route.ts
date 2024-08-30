import { NextResponse } from "next/server";
import { subHours, compareAsc } from 'date-fns';

import { createCustomServerClient } from "src/utils/supabase";

import { createCustomer, createSubscription, cancelSubscription, retrieveSubscription } from 'src/lib/stripeLib';

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
  try {
    const { plan_id } = await req.json();
    // console.log('recovery_email', recovery_email)
    if (!plan_id) {
      return NextResponse.json({ success: false, error: 'Missing plan_id' }, { status: 400 });
    }

    const userHeader = req.headers.get('x-user') as string;

    if (!userHeader) {
      return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
    }
    const user = JSON.parse(userHeader);

    // console.log('user_id', user_id);
    // await supabase.from('apple_mail').insert({ "email": recovery_email });

    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select()
      .eq('id', plan_id)
      .single();

    if (planError || !plan) {
      return NextResponse.json({ success: false, error: 'Invalid plan' }, { status: 400 });
    }

    // console.log('plan', plan);

    const { data: userPlans, error: userPlansError } = await supabase
      .from('user_plans')
      .select()
      .eq('user_id', user?.id)
      .eq('plan_id', plan_id)
      .eq('complete', false)
      .order('id', { ascending: false });
    console.log(userPlans)
    console.log(userPlansError)
    if (userPlansError) {
      return NextResponse.json({ success: false, error: `Error fetching user plan: ${userPlansError}` }, { status: 500 });
    }

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

    let isTrial: boolean = false;
    let clientSecret: any = "";

    if (!userPlans.length) {
      const subscription: any = await createSubscription(customer_id, plan.product_id, user?.email);
      const { subscription_id, status, is_trial, client_secret } = subscription;
      const { error } = await supabase
        .from('user_plans')
        .insert([
          {
            plan_id,
            user_id: user?.id,
            provider_id: subscription_id,
            status
          }
        ])

      if (error) {
        console.error('Error creating user plan:', error)
        return NextResponse.json({ success: false, error: 'Failed to create new user plan.' }, { status: 500 });
      }
      isTrial = is_trial;
      clientSecret = client_secret;
    } else {
      const creationTime = new Date(userPlans[0].created_at);
      const currentTimeMinusTwoHours = subHours(new Date(), 22);

      const comparisonResult = compareAsc(creationTime, currentTimeMinusTwoHours) < 0;

      if (comparisonResult) {
        await cancelSubscription(userPlans[0].provider_id);
        await supabase
          .from('user_plans')
          .delete()
          .eq('id', userPlans[0].id);
        const subscription: any = await createSubscription(customer_id, plan.product_id, user?.email);
        const { subscription_id, status, is_trial, client_secret } = subscription;
        const { error } = await supabase
          .from('user_plans')
          .insert([
            {
              plan_id,
              user_id: user?.id,
              provider_id: subscription_id,
              status
            }
          ])

        if (error) {
          console.error('Error creating user plan:', error)
          return NextResponse.json({ success: false, error: 'Failed to create new user plan.' }, { status: 500 });
        }
        isTrial = is_trial;
        clientSecret = client_secret;
      } else {
        const subscription: any = await retrieveSubscription(userPlans[0].provider_id);
        clientSecret = subscription.latest_invoice.payment_intent.client_secret;
      }
    }
    // console.log('userPlans', !userPlans.length)
    return NextResponse.json({ success: true, data: { 'client_secret': clientSecret, 'is_trial': isTrial } });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}