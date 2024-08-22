import { useRef, useMemo, useState, useCallback } from 'react';

import { useStripe } from 'src/provider/Stripe';

export default function usePayStripeGooglePayment(getPaymentIntent: any, confirmPaymentMethod: any, successCallback: any) {
    const {
        confirmCardPayment,
        paymentRequest: _CreatePaymentRequest,
    } = useStripe();

    const successCallbackRef = useRef(successCallback);
    successCallbackRef.current = successCallback;

    const getPaymentIntentRef = useRef(getPaymentIntent);
    getPaymentIntentRef.current = getPaymentIntent;

    const confirmPaymentMethodRef = useRef(confirmPaymentMethod);
    confirmPaymentMethodRef.current = confirmPaymentMethod;

    const [paymentRequest, _SetPaymentRequest] = useState<any>(null);
    const [email, setEmail] = useState("");
    const paymentRequestRef = useRef<any>(paymentRequest);
    const setPaymentRequest = useCallback((value: any) => {
        paymentRequestRef.current = value;
        _SetPaymentRequest(value);
    }, [paymentRequestRef, _SetPaymentRequest]);

    const _ConfirmPaymentMethod = useCallback(async (e: any, paymentIntent: any) => {
        try {
            if (typeof confirmPaymentMethodRef.current === 'function') {
                // eslint-disable-next-line @typescript-eslint/return-await
                return await confirmPaymentMethodRef.current(
                    e,
                    paymentIntent
                );
            }
            // eslint-disable-next-line @typescript-eslint/return-await
            return await confirmCardPayment(
                paymentIntent.client_secret,
                {
                    payment_method: e.paymentMethod.id,
                },
                {
                    handleActions: false
                }
            );
        } catch (error) {
            console.warn(error);
        }
        return null;
    }, [confirmCardPayment, confirmPaymentMethodRef]);

    const _ConfirmPaymentMethodRef = useRef(_ConfirmPaymentMethod);
    _ConfirmPaymentMethodRef.current = _ConfirmPaymentMethod;

    const _OnPaymentMethod = useCallback(async (e: any, payerEmail: string) => {
        const paymentIntent = await getPaymentIntentRef.current(payerEmail);
        if (!paymentIntent) {
            e.complete("fail");
            return;
        }
        const { client_secret } = paymentIntent;
        if (!client_secret) {
            e.complete("fail");
            return;
        }

        const confirmedCardPayment = await _ConfirmPaymentMethodRef.current(e, paymentIntent);

        if (!confirmedCardPayment) {
            e.complete("fail");
            return;
        }

        if (confirmedCardPayment.error) {
            const { payment_intent: paymentIntentInError } = confirmedCardPayment.error;
            if (!paymentIntentInError || paymentIntentInError.status !== 'succeeded') {
                e.complete("fail");
                return;
            }
        }
        e.complete("success");
        if (typeof successCallbackRef.current === 'function') {
            successCallbackRef.current();
        }
    }, [_ConfirmPaymentMethodRef, getPaymentIntentRef, successCallbackRef]);

    const _OnPaymentMethodRef = useRef(_OnPaymentMethod);
    _OnPaymentMethodRef.current = _OnPaymentMethod;

    const createPaymentRequest = useCallback(async (label: string, amountInCents: any) => {
        console.log('Creating Google Pay request: ', label, amountInCents);
        const pr = await (async () => {
            if (paymentRequestRef.current) {
                paymentRequestRef.current.update({
                    total: {
                        label,
                        amount: amountInCents,
                    },
                });
                const result = await paymentRequestRef.current.canMakePayment();
                console.log('Google Pay availability:', result);
                if (!result || !result.googlePay) {
                    console.error("Google Pay is not available.", result);
                    setPaymentRequest(null);
                }
                return false;
            }
            const request = {
                country: 'US',
                currency: 'usd',
                total: {
                    label,
                    amount: amountInCents,
                },
                // requestPayerName: true,
                requestPayerEmail: true,
            }
            // eslint-disable-next-line @typescript-eslint/return-await
            return await _CreatePaymentRequest(request);
        })();
        if (pr === false) {
            return paymentRequestRef.current;
        }
        if (!pr) {
            setPaymentRequest(null);
            return paymentRequestRef.current;
        }
        // Check the availability of the Payment Request API.
        pr.on('paymentmethod', (e: any) => {
            const { payerEmail } = e;
            setEmail(payerEmail);
            _OnPaymentMethodRef.current(e, payerEmail);
        });
        const result = await pr.canMakePayment();
        console.log("Google Pay availability: ", result);
        if (result && result.googlePay) {
            setPaymentRequest(pr);
        } else {
            console.error("Google Pay is not available.", result);
            setPaymentRequest(null);
        }
        return paymentRequestRef.current;
    }, [paymentRequestRef, _OnPaymentMethodRef, setPaymentRequest, setEmail, _CreatePaymentRequest]);

    const actions = useMemo(() => (
        {
            createPaymentRequest,
            setPaymentRequest
        }
    ), [createPaymentRequest, setPaymentRequest]);

    return [paymentRequest, actions];
}