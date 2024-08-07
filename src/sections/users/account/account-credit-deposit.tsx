import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import usePayStripeCardPayment from 'src/hooks/use-pay-stripe-card-payment';

import axios, { endpoints } from 'src/utils/axios';

import Stripe from 'src/provider/Stripe';

import Label from 'src/components/label';
import CardElement from 'src/components/stripe-card';

// ----------------------------------------------------------------------

const UIComponents = () => {
  const [cardPaymentState, setCardPaymentState] = useState({
    errorMessage: ''
  });

  const [cardElementState, setCardElementState] = useState({
    errorMessage: '',
    complete: false,
  });

  const [depositState, setDepositState] = useState({
    submitting: false,
    error: '',
    success: '',
  })

  const payStripeCardPayment = usePayStripeCardPayment();

  const _OnCardElementChange = useCallback(({ error, complete }: { error: any, complete: any }) => {
    setCardPaymentState({
      errorMessage: ''
    });
    setCardElementState({
      errorMessage: !error ? undefined : error.message,
      complete
    });
  }, [setCardElementState]);

  const [amount, setAmount] = useState(0);

  const _OnContinue = useCallback(async () => {
    setDepositState({
      error: '',
      success: '',
      submitting: true
    });
    try {
      setCardPaymentState({
        errorMessage: '',
      });
      const { data } = await axios.post(endpoints.membership.createPaymentIntent,
        {
          "plan_id": amount
        }
      );

      const { success, result: paymentIntent } = data;
      // console.log('success', success)
      // console.log('paymentIntent', paymentIntent)
      if (success) {
        const payResult: any = await payStripeCardPayment({
          client_secret: paymentIntent.client_secret
        }, {
          name: ''
        }
        );
        // console.log('payResult', payResult)
        try {
          if (payResult && payResult.paymentIntent && payResult.paymentIntent.status === 'succeeded') {
            await axios.post(endpoints.membership.confirmPaymentIntent,
              {
                "payment_intent_id": payResult.paymentIntent.id
              }
            );
            setAmount(0);
            setDepositState({
              submitting: false,
              error: '',
              success: '',
            });
          }
        } catch (err) {
          console.error(err)
          setDepositState({
            submitting: false,
            error: err,
            success: '',
          });
        }

      } else if (paymentIntent && paymentIntent.error) {
        setCardPaymentState({
          errorMessage: paymentIntent.error
        });
        setDepositState({
          submitting: false,
          error: paymentIntent.error,
          success: '',
        });
      } else {
        setCardPaymentState({
          errorMessage: `The server responded`
        });
        setDepositState({
          submitting: false,
          error: `The server responded`,
          success: '',
        });
      }

    } catch (e: any) {
      setDepositState({
        success: '',
        submitting: false,
        error: e?.message
      });
      setCardPaymentState({
        errorMessage: e.message
      });
    }
  }, [payStripeCardPayment, setCardPaymentState, amount, setDepositState]);

  const isDepositButtonDisabled = !!cardElementState.errorMessage || !!cardPaymentState.errorMessage || !cardElementState.complete;

  return (
    <Card sx={{ marginTop: 3 }}>
      <CardHeader title="Deposit" />

      <Stack direction="column" sx={{ width: "100%", p: 3, "#card-element": { width: '100%' } }}>
        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Number"
          defaultValue={0}
          InputLabelProps={{ shrink: true }}
        />
        {(cardElementState.errorMessage || cardPaymentState.errorMessage) && <Label
          color="error"
          sx={{
            background: 'transparent',
            justifyContent: 'left',
            padding: 0,
            marginTop: 1
          }}
        >
          {cardElementState.errorMessage || cardPaymentState.errorMessage || <>&nbsp;</>}
        </Label>}
      </Stack>

      <Stack direction="column" sx={{ width: "100%", p: 3, "#card-element": { width: '100%' } }}>
        <CardElement
          onChange={_OnCardElementChange}
        />
        {(cardElementState.errorMessage || cardPaymentState.errorMessage) && <Label
          color="error"
          sx={{
            background: 'transparent',
            justifyContent: 'left',
            padding: 0,
            marginTop: 1
          }}
        >
          {cardElementState.errorMessage || cardPaymentState.errorMessage || <>&nbsp;</>}
        </Label>}
      </Stack>

      <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ p: 3, paddingTop: 0 }}>
        <LoadingButton
          size="medium"
          sx={{ paddingLeft: 5, paddingRight: 5 }}
          onClick={_OnContinue}
          loading={depositState.submitting}
          variant="contained"
          disabled={isDepositButtonDisabled}
        >
          Deposit
        </LoadingButton>
      </Stack>
    </Card >
  );
}

const AccountCreditDeposit: any = () => (
  <Stripe>
    <UIComponents />
  </Stripe>
);

export default AccountCreditDeposit;