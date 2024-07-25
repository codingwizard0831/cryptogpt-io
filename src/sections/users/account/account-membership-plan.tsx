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
import { useAuthContext } from 'src/auth/hooks';
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
    value: 'Starter Pass',
    label: 'Starter Pass',
  },
  {
    value: 'Basic Plan',
    label: 'Basic Plan',
  },
  {
    value: 'Standard Plan',
    label: 'Standard Plan',
  },
  {
    value: 'Premium Plan',
    label: 'Premium Plan',
  },
  {
    value: 'Pro Plan',
    label: 'Pro Plan',
  },
  {
    value: 'Elite Plan',
    label: 'Elite Plan',
  }
];

const PlanTABS = [
  {
    value: 'Features',
    label: 'Features',
  },
  {
    value: 'AI Functions',
    label: 'AI Functions',
  }
];

const UIComponents = () => {
  const { user } = useAuthContext();
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

  const [selectedPlan, setSelectedPlan] = useState(0);
  const [currentTab, setCurrentTab] = useState('Premium Plan');
  const [currentPlanTab, setCurrentPlanTab] = useState<Any>({});
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

  const handleChangePlanTab = useCallback((newValue: string, planType: number) => {
    setCurrentPlanTab((prev: any) => ({
      ...prev,
      [planType]: newValue
    }));
  }, []);

  const handleSelectPlan = useCallback((newValue: number) => {
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
        const { data }: { success: boolean, data: any } = await axios.post(endpoints.membership.createPaymentIntent,
          {
            "plan_id": selectedPlan,
            "user_id": user?.id,
            "email": user?.email
          }
        );

        const { success, data: paymentIntent } = data;
        console.log('success', success)
        console.log('paymentIntent', paymentIntent)
        if (success) {
          const payResult = await payStripeCardPayment({
            client_secret: paymentIntent.client_secret
          }, {
            name: ''
          }
          );
          console.log('payResult', payResult)
          try {
            if (payResult && payResult.paymentIntent && payResult.paymentIntent.status === 'succeeded') {
              await axios.post(endpoints.membership.confirmPaymentIntent,
                {
                  "user_id": user?.id,
                  "payment_intent_id": payResult.paymentIntent.id
                }
              );
              setLoadFlag(!loadFlag);
              setSelectedPlan(0);
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
        const { data } = await axios.post(endpoints.membership.ugradeUserPlan,
          {
            "plan_id": selectedPlan,
            "user_plan_id": current_user_plan?.id
          }
        );
        const { success, result } = data;
        if (success) {
          setLoadFlag(!loadFlag);
          setSelectedPlan(0);
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
  }, [payStripeCardPayment, setCardPaymentState, selectedPlan, current_user_plan, shouldEnterCardElement, setLoadFlag, loadFlag, setUpgradingState, user]);

  const _OnCancel = useCallback(async () => {
    setCancelState({
      error: '',
      success: '',
      submitting: true
    });
    cancelUserMembershipPlan(current_user_plan?.id)
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
  console.log('plansByTab', plansByTab)
  const renderPlans = plansByTab?.map((plan) => (
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
          {(plan.type === 'Starter Pass' || plan.type === 'Basic Plan') && <PlanFreeIcon />}
          {(plan.type === 'Standard Plan' || plan.type === 'Premium Plan') && <PlanStarterIcon />}
          {(plan.type === 'Pro Plan' || plan.type === 'Elite Plan') && <PlanPremiumIcon />}
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
          <Box component="span" sx={{ textDecoration: 'line-through' }}>
            €{plan.price}
          </Box>

          {plan.discount && <Box component="span" sx={{ backgroundColor: theme => theme.palette.primary.main, padding: "0px 5px", borderRadius: "5px", marginLeft: "7px" }}>
            €{plan.price * (100 - plan.discount) / 100}
          </Box>}

          {!!plan.price && (
            <Box component="span" sx={{ typography: 'body2', color: 'text.disabled', ml: 0.5 }}>
              /{plan.billing_period}
            </Box>
          )}

          {plan.discount && <Box component="span" sx={{ backgroundColor: "gray", textWrap: 'nowrap', fontSize: "14px", padding: "2px 7px", borderRadius: "5px", marginLeft: "7px" }}>
            Saved {plan.discount}%
          </Box>}
        </Stack>
        <Stack direction="column" alignItems="left" sx={{ typography: 'p' }}>
          <Box component="span" sx={{ marginTop: '10px' }}>
            Description:
          </Box>
          <Box component="span" sx={{ fontSize: "12px" }}>
            {plan.description}
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Tabs
            value={currentPlanTab[plan.id] || "Features"}
            onChange={(event: SyntheticEvent, newValue: string) => handleChangePlanTab(newValue, plan.id)}
            sx={{
              mt: 2,
              backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
              border: theme => `1px solid ${alpha(theme.palette.primary.main, 1)}`,
              marginBottom: 3,
              borderRadius: 30,
              '.MuiTabs-indicator': {
                backgroundColor: 'transparent',
                top: 0,
              },
              '.MuiTab-root': {
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
            {PlanTABS.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Stack>

        {(!currentPlanTab[plan.id] || currentPlanTab[plan.id] === "Features") && (
          <Stack direction="column" alignItems="left" sx={{ typography: 'p' }}>
            {plan.features?.map((item: any, index: number) => (
              <Stack key={index} direction="row" alignItems="center">
                <Box sx={{ width: "13px", height: "13px" }}>
                  <Iconify icon="game-icons:check-mark" width={13} color={theme => theme.palette.primary.main} />
                </Box>
                <Box component="span" sx={{ fontSize: "12px", marginLeft: '8px' }}>
                  {item}
                </Box>
              </Stack>
            ))}
          </Stack>
        )}

        {(!currentPlanTab[plan.id] || currentPlanTab[plan.id] === "AI Functions") && (
          <Stack direction="column" alignItems="left" sx={{ typography: 'p' }}>
            {plan.goldie?.map((item: any, index: number) => (
              <Stack key={index} sx={{ marginTop: "10px" }} direction="row" alignItems="center">
                <Box sx={{ width: "13px", height: "13px" }}>
                  <Iconify icon="game-icons:check-mark" width={13} color={theme => theme.palette.primary.main} />
                </Box>
                <Box component="span" sx={{ fontSize: "12px", marginLeft: '8px' }}>
                  {item}
                </Box>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Grid >
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

        <Grid container spacing={2} sx={{ p: 3, justifyContent: 'center' }}>
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