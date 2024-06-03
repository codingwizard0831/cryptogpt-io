'use client';

import Image from 'next/image';
import { useState } from 'react';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Divider, TextField } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const isSubmitting = useBoolean(false);
  const isShowLoginOptions = useBoolean(false);



  const onSubmit = (async () => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      isSubmitting.onFalse();
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
      isSubmitting.onFalse();
    }
  });

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
        <TextField fullWidth type='text' label="Email or phone" placeholder='Enter phonenumber or email'
          value={email} onChange={(e) => setEmail(e.target.value)}
        />

        <LoadingButton
          fullWidth
          variant="contained"
          color='primary'
          loading={isSubmitting.value}
          onClick={onSubmit}
        >
          Continue
        </LoadingButton>

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
          onClick={onSubmit}
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
          onClick={onSubmit}
        >
          Continue with Binance
        </LoadingButton>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              onClick={onSubmit}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Image src="/assets/icons/project/logo-google.png" alt='google' width={36} height={36} />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              onClick={onSubmit}
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
              onClick={onSubmit}
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
              onClick={onSubmit}
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
              onClick={onSubmit}
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
              onClick={onSubmit}
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
              onClick={onSubmit}
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
              onClick={onSubmit}
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
    </Stack>
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
