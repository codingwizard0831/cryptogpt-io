import { format } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

import { createCustomServerClient } from "src/utils/supabase";

import { constructWebhookEvent } from 'src/lib/stripeLib';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

async function getOrCreateUserPlanInvoice({
  invoice_id,
  provider_id,
  user_plan_id
}: {
  invoice_id: string;
  provider_id: string;
  user_plan_id: number;
}) {
  const supabase = createCustomServerClient();
  const { data: existUserPlanInvoice, error } = await supabase
    .from('user_plan_invoice')
    .select('*')
    .eq('invoice_id', invoice_id)
    .eq('provider_id', provider_id);

  if (error) {
    return {};
  }

  let result;
  if (existUserPlanInvoice?.length > 0) {
    const { error: error1 } = await supabase
      .from('user_plan_invoice')
      .update({ user_plan_id })
      .eq('id', existUserPlanInvoice[0].id);

    if (error1) {
      return {};
    }

    const { data: updatedInvoice } = await supabase
    .from('user_plan_invoice')
    .select('*')
    .eq('id', existUserPlanInvoice[0].id);

    result = updatedInvoice?.length? updatedInvoice[0]: {};
  } else {
    const { error: error2 } = await supabase
      .from('user_plan_invoice')
      .insert({
        invoice_id,
        provider_id,
        user_plan_id
      });
    if (error2) {
      return {};
    }

    const { data: newInvoice } = await supabase
      .from('user_plan_invoice')
      .select('*')
      .eq('invoice_id', invoice_id)
      .eq('provider_id', provider_id)
      .eq('user_plan_id', user_plan_id);

    result = newInvoice?.length? newInvoice[0]: {};
  }
  return result || {};
}

export async function POST(req: NextRequest) {
  const supabase = createCustomServerClient();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No Stripe signature found' }, { status: 400 });
  }

  try {
    const body = await req.text();
    const result: any = constructWebhookEvent(body, sig);

    if (result?.id) {
      console.log('Webhook event processed:', result);
      const { data: userPlans, error: userPlansError } = await supabase
        .from('user_plans')
        .select()
        .eq('provider_id', result.id);

      if (userPlansError) {
        return NextResponse.json({ success: false, error: 'Error fetching user plans' }, { status: 500 });
      }
      if (userPlans.length) {
        if (result.type.includes('invoice')) {
          const invoice: any = await getOrCreateUserPlanInvoice({
            invoice_id: result.invoice_id,
            provider_id: result.id,
            user_plan_id: userPlans[0]?.id
          });
          console.log('invoice', invoice)
          const { status } = result;
          const paid = result.paid ?? invoice.paid;
          const amount = result.amount ?? invoice.amount;
          const currency = result.currency ?? invoice.currency;
          console.log('test1', paid, amount, amount, currency)
          const { error } = await supabase
            .from('user_plan_invoice')
            .update({
              status,
              paid,
              amount,
              currency
            })
            .eq('id', invoice.id)

          if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
          }
        }
        if (result.type.includes('customer.subscription') || result.type.includes('payment_intent')) {
          const complete = result.complete ?? userPlans[0].complete;
          const { status } = result;
          const { error } = await supabase
            .from('user_plans')
            .update({
              status,
              complete
            })
            .eq('id', userPlans[0].id)

          if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
          }
          if (userPlans[0].status !== 'past_due') {
            if (userPlans[0].expires_at && !result.expires_at) {
              const { error: expiresError } = await supabase
                .from('user_plans')
                .update({
                  expires_at: null
                })
                .eq('id', userPlans[0].id)

              if (expiresError) {
                return NextResponse.json({ success: false, error: expiresError.message }, { status: 400 });
              }
            } else if (result.expires_at) {
              const expiresAtDate = new Date(result.expires_at * 1000);
              const formattedExpiresAt = format(expiresAtDate, 'MM/dd/yyyy, hh:mm:ss a');

              const { error: expiresError } = await supabase
                .from('user_plans')
                .update({
                  expires_at: formattedExpiresAt
                })
                .eq('id', userPlans[0].id)

              if (expiresError) {
                return NextResponse.json({ success: false, error: expiresError.message }, { status: 400 });
              }
            }
          }
        }
      }
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'An unknown error occurred' },
      { status: 400 }
    );
  }
}