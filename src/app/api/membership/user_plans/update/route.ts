import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

import { modifySubscription, updateSubscriptionEndPeriod } from 'src/lib/stripeLib';

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
  try {
    const { user_plan_id, plan_id } = await req.json();

    if (!user_plan_id || !plan_id) {
      return NextResponse.json({ success: false, error: 'Missing plan_id or user_plan_id' }, { status: 400 });
    }

    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select()
      .eq('id', plan_id)
      .single();

    if (planError || !plan) {
      return NextResponse.json({ success: false, error: 'Invalid plan' }, { status: 400 });
    }

    const { data: userPlan, error: userPlanError } = await supabase
      .from('user_plans')
      .select()
      .eq('id', user_plan_id)
      .single();

    if (userPlanError) {
      return NextResponse.json({ success: false, error: `Error fetching user plan: ${userPlanError}` }, { status: 500 });
    }

    if (userPlan.plan_id !== plan.id) {
      await modifySubscription(userPlan.provider_id, plan.product_id);
      const { error } = await supabase
        .from('user_plans')
        .update({ plan_id: plan.id, expires_at: null })
        .eq('id', user_plan_id)

      if (error) {
        return NextResponse.json({ success: false, error: 'Error updating user plan' }, { status: 500 });
      }
    } else {
      await updateSubscriptionEndPeriod(userPlan.provider_id, false);
      const { error: expiresError } = await supabase
        .from('user_plans')
        .update({
          expires_at: null
        })
        .eq('id', user_plan_id)

      if (expiresError) {
        return NextResponse.json({ success: false, error: expiresError.message }, { status: 400 });
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}