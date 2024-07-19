import Stripe from 'stripe';

if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_API_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_SECRET_API_KEY is not set in the environment variables');
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_API_KEY, {
  apiVersion: '2024-06-20'
});

export async function createCustomer(email: string): Promise<Stripe.Customer> {
  try {
    const customer = await stripe.customers.create({ email });
    return customer;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
}

export async function createSubscription(customerId: string, productId: string, email: string) {
  const paymentBehavior: Stripe.SubscriptionCreateParams.PaymentBehavior = 'default_incomplete';
  const paymentSettings: Stripe.SubscriptionCreateParams.PaymentSettings = {
    save_default_payment_method: 'on_subscription',
  };

  const expand: string[] = ['latest_invoice.payment_intent'];

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: productId,
        },
      ],
      expand,
      payment_behavior: paymentBehavior,
      payment_settings: paymentSettings,
      metadata: { email },
    });

    let clientSecret: any;
    if (subscription.pending_setup_intent) {
      clientSecret = subscription.pending_setup_intent;
    } else {
      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;
      clientSecret = paymentIntent.client_secret;
    }

    return {
      subscription_id: subscription.id,
      client_secret: clientSecret,
      status: (subscription.latest_invoice as Stripe.Invoice).status,
      is_trial: false,
    };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error retrieving PaymentIntent:', error);
    throw error;
  }
}

export default stripe;