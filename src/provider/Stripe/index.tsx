import { useRef, useCallback } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useElements,
    useStripe as useOriginalStripe,
} from "@stripe/react-stripe-js";

import { STRIPE_API_KEY } from 'src/config-global';

const loadStripePromise = () => {
    const fn = async (resolve: any, reject: any) => {
        try {
            const result = await loadStripe(STRIPE_API_KEY);
            resolve(result);
        } catch (e) {
            console.warn(e);
            setTimeout(fn, 100);
        }
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fn(resolve, reject);
        }, 0);
    });
}

const stripePromiseRef: any = {
    current: null,
}

export default function Stripe(props: any) {
    if (!stripePromiseRef.current) {
        stripePromiseRef.current = loadStripePromise();
    }
    return (
        <Elements stripe={stripePromiseRef.current} {...props} />
    )
}

function useStaticCallback(callback: any, depends: any) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const _Callback = useCallback(callback, depends);
    const _CallbackRef = useRef(_Callback);
    _CallbackRef.current = _Callback;
    return useCallback((...args: any) => _CallbackRef.current(...args), [_CallbackRef]);
}

export function useStripe() {
    const stripe: any = useOriginalStripe();
    const elements = useElements();
    const getElement = useStaticCallback((ElementNode: any) => new Promise((resolve, reject) => {
        if (!stripe || !elements) {
            setTimeout(() => {
                getElement(ElementNode).then(resolve).catch(reject);
            }, 100);
            return;
        }
        resolve(elements.getElement(ElementNode));
    }), [stripe, elements]);

    const getCardElement = useStaticCallback(() => getElement(CardElement), [getElement]);

    const createPaymentMethod = useStaticCallback((billing_details: any) => (async () => {
        const cardElement = await getCardElement();
        if (!cardElement) {
            return null;
        }
        const { paymentMethod, error, ...others } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            ...(() => {
                if (!billing_details) {
                    return {}
                }
                return {
                    billing_details
                }
            })()
        });
        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        return {
            paymentMethod, error, ...others
        };
    })(), [stripe, getCardElement]);

    const confirmCardPayment = useStaticCallback((clientSecret: any, data: any) => new Promise((resolve, reject) => {
        if (!stripe) {
            setTimeout(() => {
                confirmCardPayment(clientSecret, data).then(resolve).catch(reject);
            }, 100);
            return;
        }
        stripe.confirmCardPayment(clientSecret, data).then(resolve).catch(reject);
    }), [stripe]);

    const confirmCardPaymentWithCardElement = useStaticCallback((clientSecret: any, data: any, ...params: any) => (async () => {
        const cardElement = await getCardElement();
        if (!cardElement) {
            return null;
        }
        const { payment_method, return_url, ...rest } = data;
        const result = await confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                ...(() => {
                    if (!payment_method) {
                        return {};
                    }
                    const { billing_details, ...other } = payment_method;
                    return !billing_details ? other : payment_method;
                })(),
            },
            ...(() => !return_url ? {} : { return_url })(),
            ...rest
        }, ...params);
        return result;
    })(), [confirmCardPayment, getCardElement]);

    const retrievePaymentIntent = useStaticCallback((client_secret: any) => stripe.retrievePaymentIntent(client_secret), [stripe]);
    const paymentRequest = useStaticCallback((options: any) => new Promise((resolve, reject) => {
        if (stripe) {
            resolve(stripe.paymentRequest(options));
            return;
        }
        setTimeout(() => {
            paymentRequest(options).then(resolve).catch(reject);
        }, 100);
    }), [stripe]);

    const retrieveSetupIntent = useStaticCallback((setupIntentClientSecret: any) => new Promise((resolve, reject) => {
        if (!stripe) {
            setTimeout(() => {
                retrieveSetupIntent(setupIntentClientSecret).then(resolve).catch(reject);
            }, 100);
            return;
        }
        stripe.retrieveSetupIntent(setupIntentClientSecret).then(resolve).catch(reject);
    }), [stripe]);


    const confirmCardSetup = useStaticCallback((setupIntentClientSecret: any, data: any) => new Promise((resolve, reject) => {
        if (!stripe) {
            setTimeout(() => {
                confirmCardSetup(setupIntentClientSecret, data).then(resolve).catch(reject);
            }, 100);
            return;
        }
        stripe.confirmCardSetup(setupIntentClientSecret, data).then(resolve).catch(reject);
    }), [stripe]);

    const confirmCardSetupWithCardElement = useStaticCallback((setupIntentClientSecret: any, data: any, ...params: any) => (async () => {
        const cardElement = await getCardElement();
        if (!cardElement) {
            return null;
        }
        const { payment_method, return_url, ...rest } = data;
        const result = await confirmCardSetup(setupIntentClientSecret, {
            payment_method: {
                card: cardElement,
                ...(() => {
                    if (!payment_method) {
                        return {};
                    }
                    const { billing_details, ...other } = payment_method;
                    return !billing_details ? other : payment_method;
                })(),
            },
            ...(() => !return_url ? {} : { return_url })(),
            ...rest
        }, ...params);
        return result;
    })(), [confirmCardSetup, getCardElement]);

    return {
        stripe,
        elements,
        getElement,
        getCardElement,
        createPaymentMethod,
        confirmCardPayment,
        confirmCardPaymentWithCardElement,
        retrievePaymentIntent,
        paymentRequest,
        retrieveSetupIntent,
        confirmCardSetup,
        confirmCardSetupWithCardElement,
    };
}
