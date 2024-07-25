import { NextResponse } from "next/server";
import { subHours, compareAsc } from 'date-fns';

import { supabase } from 'src/lib/supabase';
import { createCustomer, createSubscription, cancelSubscription, retrieveSubscription } from 'src/lib/stripeLib';

export async function POST(req: Request) {
  try {
    const { user_id, email, plan_id } = await req.json();

    if (!user_id || !plan_id) {
      return NextResponse.json({ success: false, error: 'Missing user_id or plan_id' }, { status: 400 });
    }

    // console.log('user_id', user_id);

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
      .eq('user_id', user_id)
      .eq('plan_id', plan_id)
      .eq('complete', false)
      .order('id', { ascending: false });
    console.log(userPlans)
    console.log(userPlansError)
    if (userPlansError) {
      return NextResponse.json({ success: false, error: 'Error fetching user plans' }, { status: 500 });
    }

    const { data: stripeCustomer, error: stripeCustomerError } = await supabase
      .from('stripe_customer')
      .select()
      .eq('user_id', user_id);

    if (stripeCustomerError) {
      return NextResponse.json({ success: false, error: 'Error fetching stripe customer' }, { status: 500 });
    }

    let customer_id: string = "";
    // console.log('stripeCustomer', stripeCustomer.length)
    if (!stripeCustomer.length) {
      const customer = await createCustomer(email);
      customer_id = customer.id;
      const { error } = await supabase
        .from('stripe_customer')
        .insert({ customer_id, user_id })

      if (error) {
        return NextResponse.json({ success: false, error: 'Error creating stripe customer' }, { status: 500 });
      }
    } else {
      customer_id = stripeCustomer[0]?.customer_id;
    }

    let isTrial: boolean = false;
    let clientSecret: any = "";

    if (!userPlans.length) {
      const subscription: any = await createSubscription(customer_id, plan.product_id, email);
      const { subscription_id, status, is_trial, client_secret } = subscription;
      const { error } = await supabase
        .from('user_plans')
        .insert([
          {
            plan_id,
            user_id,
            provider_id: subscription_id,
            status
          }
        ])

      if (error) {
        console.error('Error creating user plan:', error)
        return { success: false, error: 'Failed to create new user plan.' }
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
        const subscription: any = await createSubscription(customer_id, plan.product_id, email);
        const { subscription_id, status, is_trial, client_secret } = subscription;
        const { error } = await supabase
          .from('user_plans')
          .insert([
            {
              plan_id,
              user_id,
              provider_id: subscription_id,
              status
            }
          ])

        if (error) {
          console.error('Error creating user plan:', error)
          return { success: false, error: 'Failed to create new user plan.' }
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