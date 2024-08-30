import { format } from 'date-fns';
import { NextResponse } from "next/server";

import { createCustomServerClient } from "src/utils/supabase";

import { updateSubscriptionEndPeriod } from 'src/lib/stripeLib';

export async function POST(req: Request) {
  const supabase = createCustomServerClient();
  try {
    const { user_plan_id } = await req.json();

    if (!user_plan_id) {
      return NextResponse.json({ success: false, error: 'Missing user_plan_id' }, { status: 400 });
    }

    const { data: userPlan, error: userPlanError } = await supabase
      .from('user_plans')
      .select()
      .eq('id', user_plan_id)
      .single();

    if (userPlanError) {
      return NextResponse.json({ success: false, error: 'Error fetching user plan' }, { status: 500 });
    }

    if (userPlan?.is_active) {
      const subscription: any = await updateSubscriptionEndPeriod(userPlan.provider_id, true);
      const expiresAt = format(new Date(subscription.cancel_at * 1000), 'MM/dd/yyyy, hh:mm:ss a');
      const { error: expiresError } = await supabase
        .from('user_plans')
        .update({
          expires_at: expiresAt
        })
        .eq('id', user_plan_id)

      if (expiresError) {
        return NextResponse.json({ success: false, error: expiresError.message }, { status: 400 });
      }

      const { data: updatedPlan, error: updatedPlanError } = await supabase
        .from('user_plans')
        .select()
        .eq('id', user_plan_id)
        .single();
        
      if (updatedPlanError) {
        return NextResponse.json({ success: false, error: updatedPlanError.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, 'result': updatedPlan });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}