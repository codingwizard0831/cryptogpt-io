import { useCallback } from 'react';
import { useStripe } from 'src/provider/Stripe';

export default function usePayStripeCardPayment() {
    const {
        confirmCardPaymentWithCardElement
    } = useStripe();

    const _ConfirmCardPaymentWithCardElement = useCallback((options: any) => {
        const { name, client_secret } = options;
        return confirmCardPaymentWithCardElement(client_secret, {
            payment_method: {
                billing_details: {
                    name,
                }
            },
            return_url: window.location.href,
        }, { handleActions: true });

    }, [confirmCardPaymentWithCardElement])


    return useCallback(async (paymentIntent: any, options: any) => {
        if (!paymentIntent) {
            throw new Error('Payment is available.');
        }
        const { client_secret } = paymentIntent;
        if (!client_secret) {
            throw new Error('Client Secret is not available in payment.')
        }
        const { name } = options || { name: '' };
        const confirmedCardPayment = await _ConfirmCardPaymentWithCardElement({
            client_secret,
            name,
        });
        if (!confirmedCardPayment) {
            throw new Error('Card Payment is invalid.')
        }
        if (confirmedCardPayment.error) {
            const { payment_intent } = confirmedCardPayment.error;
            if (!payment_intent || payment_intent.status !== 'succeeded') {
                throw confirmedCardPayment.error;
            }
        } else if (confirmedCardPayment.status === 'requires_action') {
            window.location.href = confirmedCardPayment.next_action.redirect_to_url.url;
        }
        return confirmedCardPayment;
    }, [_ConfirmCardPaymentWithCardElement])
}