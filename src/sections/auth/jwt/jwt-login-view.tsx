'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
// import { cookies } from 'next/headers'
import { MuiOtpInput } from 'mui-one-time-password-input';

import LoadingButton from '@mui/lab/LoadingButton';
import { Link, Alert, Stack, Button, Divider, TextField, Typography, IconButton, InputAdornment } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { isEmail, isPhoneNumber } from 'src/utils/validators';

import { supabase } from 'src/lib/supabase';
import { useAuthContext } from 'src/auth/hooks';
import { BINANCE_API, PROJECT_URL } from 'src/config-global';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { open, close } = useWeb3Modal()
  const { loginWithEmailAndPassword, loginWithCodeSend, loginWithCodeVerify, loginWithMetamask } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const { isConnected } = useAccount();
  console.log('isConnected', isConnected);

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const isShowPassword = useBoolean(false);
  const isSubmitting = useBoolean(false);
  const isShowLoginOptions = useBoolean(false);
  const [valueState, setValueState] = useState<null | 'email' | 'phone'>(null);
  const isEmailWithPasswordCase = useBoolean(false);
  const isEmailWithCodeCase = useBoolean(false);
  const isPhoneWithCodeCase = useBoolean(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEmail(e.target.value)) {
      setValueState('email');
    } else if (isPhoneNumber(e.target.value)) {
      setValueState('phone');
    } else {
      setValueState(null);
    }
    setEmail(e.target.value);
  }

  const handleContinue = (async (type: "password" | "code" | undefined) => {
    setErrorMsg('');
    if (type === 'password') {
      isEmailWithPasswordCase.onTrue();
      isEmailWithCodeCase.onFalse();
      isPhoneWithCodeCase.onFalse();
    } else if (type === 'code') {
      const succcess = await handleLoginWithCodeSend(email, "");
      if (succcess) {
        isEmailWithCodeCase.onTrue();
        isEmailWithPasswordCase.onFalse();
        isPhoneWithCodeCase.onFalse();
      }
    } else {
      const succcess = await handleLoginWithCodeSend("", email);
      if (succcess) {
        isPhoneWithCodeCase.onTrue();
        isEmailWithPasswordCase.onFalse();
        isEmailWithCodeCase.onFalse();
      }
    }
  });

  const handleTryAgain = () => {
    setErrorMsg('');
    isEmailWithPasswordCase.onFalse();
    isEmailWithCodeCase.onFalse();
    isPhoneWithCodeCase.onFalse();
  }

  const handleLoginWIthEmailAndPassword = async () => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      await loginWithEmailAndPassword(email, password);
      isSubmitting.onFalse();
      router.push(returnTo || paths.dashboard.root);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
      isSubmitting.onFalse();
    }
  }

  const handleLoginWithCodeSend = async (_email: string, _phone: string) => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      await loginWithCodeSend(_email, _phone);
      enqueueSnackbar("6-digital Code sent successful", { variant: 'success' });
      isSubmitting.onFalse();
      return true;
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : (error.message ? error.message : error.error));
      enqueueSnackbar(typeof error === 'string' ? error : (error.message ? error.message : error.error), { variant: 'error' });
      isSubmitting.onFalse();
      return false;
    }
  }

  const handleLoginWithCodeVerify = async (_email: string, _phone: string, _code: string) => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      await loginWithCodeVerify(_email, _phone, _code);
      enqueueSnackbar("Login successful", { variant: 'success' });
      isSubmitting.onFalse();
    } catch (error) {
      console.error(error);
      setCode('');
      setErrorMsg(typeof error === 'string' ? error : (error.message ? error.message : error.error));
      enqueueSnackbar(typeof error === 'string' ? error : (error.message ? error.message : error.error), { variant: 'error' });
      isSubmitting.onFalse();
    }
  }

  const handleCodeComplete = (value: string) => {
    if (isEmailWithCodeCase.value) {
      handleLoginWithCodeVerify(email, "", value);
    } else if (isPhoneWithCodeCase.value) {
      handleLoginWithCodeVerify("", email, value);
    }
  }

  const handleLoginWithMetamask = async () => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      await loginWithMetamask();
      enqueueSnackbar("Login successful", { variant: 'success' });
      isSubmitting.onFalse();
    } catch (error) {
      console.error(error);
      isSubmitting.onFalse();
      enqueueSnackbar("Something wrong!", { variant: 'error' });
    }
  }

  const handleLoginWithTest = async () => {
    try {
      window.location.href = `https://accounts.binance.com/en/oauth/authorize?response_type=code&client_id=${BINANCE_API.clientId}&redirect_uri=${PROJECT_URL}/auth/jwt/binance-oauth-callback&scope=user:openId`;
      // window.location.href = `https://accounts.binance.com/en/oauth/authorize?response_type=code&client_id=${BINANCE_API.clientId}&redirect_uri=${PROJECT_URL}&scope=user:openId`;
      // open({ view: 'Connect' });
      // return;
      // const token = getAccessToken();
      // const headers = {
      //   global: {
      //     headers: { Authorization: `Bearer ${token}` }
      //   },
      //   auth: { persistSession: false }
      // }

      // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
      // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
      // const supabaseWithAuth = createClient(supabaseUrl, supabaseKey, headers);
      // console.log('supabaseWithAuth', supabaseWithAuth);
      // const { data } = await supabaseWithAuth.auth.getUser()
      // console.log('user: ', data);

      // const { data: userData } = await supabaseWithAuth.from('users').select('*').eq('address', '0x0000001006').single()
      // console.log('user: ', userData);
      // const { data: authUsersData, error: authUsersError } = await supabaseWithAuth.from('auth.users').select('*')
      // console.log('auth User: ', authUsersData, authUsersError);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLoginWithGoogle = async () => {
    console.log('Login with Google');
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/jwt/supabase-oauth-callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  }

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to CryptoGPT</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack>
      <Stack spacing={2}>
        {
          (!isEmailWithPasswordCase.value && !isEmailWithCodeCase.value && !isPhoneWithCodeCase.value) && (
            <Stack spacing={2}>
              <TextField fullWidth type='text' label="Email or phone" placeholder='Enter phonenumber or email'
                value={email} onChange={handleEmailChange}
              />
              {
                valueState === "email" && (
                  <Stack direction="row" spacing={2}>
                    <Button fullWidth color='primary' variant="contained" onClick={() => handleContinue('password')} startIcon={<Iconify icon="material-symbols:password" />}>Password</Button>
                    <Button fullWidth color='primary' variant="contained" onClick={() => handleContinue('code')} startIcon={<Iconify icon="tabler:square-rounded-number-6" />}>Code</Button>
                  </Stack>
                )
              }
              {
                valueState !== "email" && <LoadingButton
                  fullWidth
                  variant="contained"
                  color='primary'
                  type='button'
                  loading={isSubmitting.value}
                  disabled={valueState === null}
                  onClick={() => handleContinue(undefined)}
                >
                  Continue
                </LoadingButton>
              }
            </Stack>
          )
        }

        {
          isEmailWithPasswordCase.value && (
            <Stack spacing={1}>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>{email || "Email"}</Typography>
                <IconButton onClick={isEmailWithPasswordCase.onToggle}>
                  <Iconify icon='clarity:edit-line' color='primary' />
                </IconButton>
              </Stack>
              <TextField
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isShowPassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={isShowPassword.onToggle} edge="end">
                        <Iconify icon={isShowPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Link
                component={RouterLink}
                href={paths.auth.jwt.forgotPassword}
                variant="subtitle2"
                sx={{
                  alignItems: 'center',
                  display: 'inline-flex',
                }}
              >
                Forgot your password?
              </Link>
              <LoadingButton
                fullWidth
                variant="contained"
                color='primary'
                loading={isSubmitting.value}
                onClick={() => handleLoginWIthEmailAndPassword()}
              >
                Sign in
              </LoadingButton>
            </Stack>
          )
        }

        {
          (isEmailWithCodeCase.value || isPhoneWithCodeCase.value) && (
            <Stack spacing={2}>

              <MuiOtpInput
                autoFocus
                gap={1}
                length={6}
                TextFieldsProps={{
                  placeholder: '-',
                }}
                value={code}
                onChange={(value) => setCode(value)}
                onComplete={(value) => handleCodeComplete(value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '48px',
                  },
                  '& input': {
                    textAlign: 'center',
                  },
                }}
              />

              <LoadingButton
                fullWidth
                loading={isSubmitting.value}
                color='primary'
                variant="contained"
                onClick={handleTryAgain}
              >
                Try again
              </LoadingButton>
            </Stack>
          )
        }

        <Divider />

        <Button fullWidth endIcon={<Iconify
          icon="mingcute:down-line"
          sx={{
            transition: 'transform 0.3s',
            transform: isShowLoginOptions.value ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />} onClick={isShowLoginOptions.onToggle}>More options</Button>
      </Stack>


      <Stack spacing={2} sx={{
        transition: 'height 0.3s',
        height: isShowLoginOptions.value ? '232px' : 0,
        overflow: 'hidden',
      }}>
        <LoadingButton
          fullWidth
          variant="outlined"
          color='primary'
          startIcon={<Image src="/assets/icons/project/logo-metamask.png" alt='metamask' width={24} height={24} />}
          loading={isSubmitting.value}
          onClick={() => handleLoginWithMetamask()}
          sx={{
            mt: 2,
          }}
        >
          Continue with MetaMask
        </LoadingButton>
        <LoadingButton
          fullWidth
          variant="outlined"
          color='primary'
          startIcon={<Image src="/assets/icons/project/logo-binance.svg" alt='binance' width={24} height={24} />}
          loading={isSubmitting.value}
          onClick={() => handleLoginWithTest()}
        >
          Continue with Binance
        </LoadingButton>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
              onClick={() => handleLoginWithGoogle()}
            >
              <Image src="/assets/icons/project/logo-google.png" alt='google' width={36} height={36} />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Iconify icon="logos:facebook" />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Iconify icon="logos:apple" />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Image src="/assets/icons/project/logo-okex.svg" alt='okex' width={36} height={36} />
            </LoadingButton>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Iconify icon="logos:twitter" />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Image src="/assets/icons/project/logo-slack.svg" alt='slack' width={36} height={36} />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Image src="/assets/icons/project/logo-telegram.svg" alt='telegram' width={36} height={36} />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Iconify icon="mdi:github" />
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack >
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      {renderForm}
    </>
  );
}
