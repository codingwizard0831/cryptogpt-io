import { useState, useEffect, useCallback, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import usePayStripeCardPayment from 'src/hooks/use-pay-stripe-card-payment';

import axios, { endpoints } from 'src/utils/axios';

import Stripe from 'src/provider/Stripe';
import { MembershipPlan } from 'src/provider/MembershipPlansProvider/types';
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from 'src/assets/icons';
import { useLoadMembershipPlans, useMembershipPlansContext } from 'src/provider/MembershipPlansProvider';
import { useLoadUserMembershipPlans, useCancelUserMembershipPlan, useLastPossibleSubsriptionUserMembershipPlan } from 'src/provider/UserMembershipPlansProvider';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CardElement from 'src/components/stripe-card';
import LoadingCubeScreen from 'src/components/loading-screen/loading-cube-screen';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'Pro Pass',
    label: 'Pro Pass',
  },
  {
    value: 'Premium Subscription',
    label: 'Premium Subscription',
  },
  {
    value: 'Elite Annual Subscription',
    label: 'Elite Annual Subscription',
  }
];

const UIComponents = () => {
  const [loading, setLoading] = useState(true);
  const [cardPaymentState, setCardPaymentState] = useState({
    errorMessage: ''
  });

  const [cardElementState, setCardElementState] = useState({
    errorMessage: '',
    complete: false,
  });

  const [cancelState, setCancelState] = useState({
    submitting: false,
    error: '',
    success: '',
  })

  const [upgradingState, setUpgradingState] = useState({
    submitting: false,
    error: '',
    success: '',
  })

  const payStripeCardPayment = usePayStripeCardPayment();

  const cancelUserMembershipPlan = useCancelUserMembershipPlan();

  const _OnCardElementChange = useCallback(({ error, complete }: { error: any, complete: any }) => {
    setCardPaymentState({
      errorMessage: ''
    });
    setCardElementState({
      errorMessage: !error ? undefined : error.message,
      complete
    });
  }, [setCardElementState]);

  const loadUserMembershipPlans = useLoadUserMembershipPlans();
  const loadMembershipPlans = useLoadMembershipPlans();

  const [selectedPlan, setSelectedPlan] = useState("");
  const [currentTab, setCurrentTab] = useState('Premium Subscription');
  const { membershipPlanDict } = useMembershipPlansContext();
  const current_user_plan = useLastPossibleSubsriptionUserMembershipPlan();

  const [plansByTab, setPlansByTab] = useState<MembershipPlan[]>(membershipPlanDict[currentTab]);

  const [loadFlag, setLoadFlag] = useState<Boolean>(true);
  useEffect(() => {
    const loadMembershipPlansPromise = loadMembershipPlans();
    loadUserMembershipPlans()
      .then(() => {
        loadMembershipPlansPromise.then(() => {
          setLoading(false);
        });
      })
      .catch((e: any) => {
        setLoading(false);
        if (e.message === 'Unauthorized') {
          console.log(e)
        }
      });
  }, [loadFlag, loadMembershipPlans, loadUserMembershipPlans]);

  useEffect(() => {
    setPlansByTab(membershipPlanDict[currentTab]);
  }, [currentTab, membershipPlanDict]);

  const handleChangeTab = useCallback((event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleSelectPlan = useCallback((newValue: string) => {
    if (current_user_plan?.plan_id !== newValue && (!current_user_plan?.expires_at && current_user_plan?.status !== "past_due")) {
      setSelectedPlan(newValue);
    } else if (!!current_user_plan?.expires_at || current_user_plan?.status === "past_due") {
      setSelectedPlan(newValue);
    }
  }, [current_user_plan]);

  const shouldEnterCardElement = !current_user_plan || (!!current_user_plan?.expires_at && current_user_plan?.status === "past_due");

  const _OnContinue = useCallback(async () => {
    setUpgradingState({
      error: '',
      success: '',
      submitting: true
    });
    try {
      setCardPaymentState({
        errorMessage: '',
      });
      if (!current_user_plan || shouldEnterCardElement) {
        const { data } = await axios.post(endpoints.membership.createPaymentIntent,
          {
            "plan_id": selectedPlan
          }
        );

        const { success, result: paymentIntent } = data;
        // console.log('success', success)
        // console.log('paymentIntent', paymentIntent)
        if (success) {
          const payResult = await payStripeCardPayment({
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
              setLoadFlag(!loadFlag);
              setSelectedPlan('');
              setUpgradingState({
                submitting: false,
                error: '',
                success: '',
              });
            }
          } catch (err) {
            console.error(err)
            setUpgradingState({
              submitting: false,
              error: err,
              success: '',
            });
          }

        } else if (paymentIntent && paymentIntent.error) {
          setCardPaymentState({
            errorMessage: paymentIntent.error
          });
          setUpgradingState({
            submitting: false,
            error: paymentIntent.error,
            success: '',
          });
        } else {
          setCardPaymentState({
            errorMessage: `The server responded`
          });
          setUpgradingState({
            submitting: false,
            error: `The server responded`,
            success: '',
          });
        }
      } else {
        const { data } = await axios.post(endpoints.membership.ugradeUserPlan(current_user_plan?._id),
          {
            "plan_id": selectedPlan
          }
        );
        const { success, result } = data;
        if (success) {
          setLoadFlag(!loadFlag);
          setSelectedPlan('');
          setUpgradingState({
            submitting: false,
            error: '',
            success: '',
          });
        } else {
          setCardPaymentState({
            errorMessage: result.error
          });
          setUpgradingState({
            success: '',
            submitting: false,
            error: result.error
          });
        }
      }
    } catch (e: any) {
      setUpgradingState({
        success: '',
        submitting: false,
        error: e?.message
      });
      setCardPaymentState({
        errorMessage: e.message
      });
    }
  }, [payStripeCardPayment, setCardPaymentState, selectedPlan, current_user_plan, shouldEnterCardElement, setLoadFlag, loadFlag, setUpgradingState]);

  const _OnCancel = useCallback(async () => {
    setCancelState({
      error: '',
      success: '',
      submitting: true
    });
    cancelUserMembershipPlan(current_user_plan?._id)
      .then(({ status, success, result }: any) => {
        if (success) {
          setCancelState({
            submitting: false,
            error: '',
            success: '',
          });
          setLoadFlag(!loadFlag);
        } else if (status === 401) {
          // router.replace('/login');
        } else {
          setCancelState({
            submitting: false,
            error: result.error,
            success: '',
          });
        }
      }).catch((e: any) => {
        setCancelState({
          submitting: false,
          error: e.message,
          success: '',
        });
      });
  }, [cancelUserMembershipPlan, setCancelState, current_user_plan, setLoadFlag, loadFlag])

  const isUpgradeButtonDisabled = (shouldEnterCardElement && (!!cardElementState.errorMessage || !!cardPaymentState.errorMessage || !cardElementState.complete)) || !selectedPlan;
  const isCancelButtonDisabled = !current_user_plan || (!!current_user_plan?.expires_at || current_user_plan?.status === "past_due");
  const renderPlans = plansByTab.map((plan) => (
    <Grid xs={12} md={4} key={plan.id}>
      <Stack
        component={Paper}
        variant="outlined"
        onClick={() => handleSelectPlan(plan.id)}
        sx={{
          p: 2.5,
          position: 'relative',
          cursor: 'pointer',
          ...((current_user_plan?.plan_id === plan.id && (!current_user_plan?.expires_at && current_user_plan?.status !== "past_due")) && {
            opacity: 0.48,
            cursor: 'default',
          }),
          ...(plan.id === selectedPlan && {
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
          }),
        }}
      >
        {(current_user_plan?.plan_id === plan.id && (!current_user_plan?.expires_at && current_user_plan?.status !== "past_due")) && (
          <Label
            color="info"
            startIcon={<Iconify icon="eva:star-fill" />}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Current
          </Label>
        )}

        <Box sx={{ width: 48, height: 48 }}>
          {plan.type === 'Pro Pass' && <PlanFreeIcon />}
          {plan.type === 'Premium Subscription' && <PlanStarterIcon />}
          {plan.type === 'Elite Annual Subscription' && <PlanPremiumIcon />}
        </Box>

        <Box
          sx={{
            typography: 'subtitle2',
            mt: 2,
            mb: 0.5,
            textTransform: 'capitalize',
          }}
        >
          {plan.type}
        </Box>

        <Stack direction="row" alignItems="center" sx={{ typography: 'h4' }}>
          {plan.price || 'Free'}

          {!!plan.price && (
            <Box component="span" sx={{ typography: 'body2', color: 'text.disabled', ml: 0.5 }}>
              /{plan.billing_period}
            </Box>
          )}
        </Stack>
      </Stack>
    </Grid>
  ));

  return (
    <>
      {loading && <LoadingCubeScreen />}
      <Card sx={{ visibility: loading ? 'hidden' : 'visible' }}>
        <CardHeader title="Membership" />
        <Stack direction="row" justifyContent="center">
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              mt: { xs: 3, md: 5 },
              backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
              border: theme => `1px solid ${alpha(theme.palette.primary.main, 1)}`,
              marginBottom: 0,
              borderRadius: 30,
              '.MuiTabs-indicator': {
                backgroundColor: 'transparent',
                top: 0,
              },
              '.MuiTab-root': {
                color: theme => theme.palette.primary.main,
                fontSize: { xs: '12px', md: '14px' },
                lineHeight: '12px',
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                marginRight: "0px !important",
                borderLeft: theme => `1px solid ${theme.palette.primary.main}`,
                borderRight: theme => `1px solid ${theme.palette.primary.main}`,
                '&:first-of-type': {
                  border: 0,
                },
                '&:last-of-type': {
                  border: 0,
                },
                '&.Mui-selected': {
                  color: theme => theme.palette.common.white,
                },
              },
              ".Mui-selected": {
                backgroundColor: theme => theme.palette.primary.main,
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Stack>

        <Grid container spacing={2} sx={{ p: 3 }}>
          {plansByTab && renderPlans}
        </Grid>

        {shouldEnterCardElement && <Stack direction="column" sx={{ width: "100%", p: 3, "#card-element": { width: '100%' } }}>
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
        </Stack>}
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ p: 3 }}>
          <LoadingButton
            size="medium"
            onClick={_OnCancel}
            loading={cancelState.submitting}
            variant="outlined"
            disabled={isCancelButtonDisabled || upgradingState.submitting}
          >
            Cancel Membership
          </LoadingButton>
          <LoadingButton
            size="medium"
            onClick={_OnContinue}
            loading={upgradingState.submitting}
            variant="contained"
            disabled={isUpgradeButtonDisabled || cancelState.submitting}
          >
            Upgrade Membership
          </LoadingButton>
        </Stack>
      </Card >
    </>
  );
}

const AccountMembershipPlan: any = () => (
  <Stripe>
    <UIComponents />
  </Stripe>
);

export default AccountMembershipPlan;