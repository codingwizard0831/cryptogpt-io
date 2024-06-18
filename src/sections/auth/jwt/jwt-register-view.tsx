'use client';

import { useState } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register, loginWithCodeSend, loginWithCodeVerify } = useAuthContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const isSubmitting = useBoolean(false);
  const isShowPassword = useBoolean(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const isShowEmailVerifyForm = useBoolean(false);

  const onSubmit = (async () => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      await register(email, password);
      isSubmitting.onFalse();
      isShowEmailVerifyForm.onTrue();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
      isSubmitting.onFalse();
    }
  });

  const handleResend = () => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      loginWithCodeSend(email, '');
      isSubmitting.onFalse();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
      isSubmitting.onFalse();
    }
  }

  const handleVerify = () => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      loginWithCodeVerify(email, "", code);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
      isSubmitting.onFalse();
    }
  }

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <TextField fullWidth type='text' label="Email address" placeholder='Enter your email'
        value={email} onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        placeholder='Enter your password'
        type={isShowPassword.value ? 'text' : 'password'}
        value={password} onChange={(e) => setPassword(e.target.value)}
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

      <LoadingButton
        fullWidth
        size="large"
        variant="contained"
        color='primary'
        loading={isSubmitting.value}
        onClick={onSubmit}
      >
        Create account
      </LoadingButton>
    </Stack>
  );

  const renderEmailVerifyForm = (
    <Stack spacing={2.5}>
      <MuiOtpInput
        autoFocus
        gap={1}
        length={6}
        TextFieldsProps={{
          placeholder: '-',
        }}
        value={code}
        onChange={(value) => setCode(value)}
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
        size="large"
        variant="contained"
        onClick={handleVerify}
      >
        Verify
      </LoadingButton>

      <Typography variant="body2">
        {`Don’t have a code? `}
        <Link
          variant="subtitle2"
          onClick={handleResend}
          sx={{
            cursor: 'pointer',
          }}
        >
          Resend code
        </Link>
      </Typography>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      {
        isShowEmailVerifyForm.value ? (
          renderEmailVerifyForm
        ) : (
          <>
            {renderForm}
            {renderTerms}
          </>
        )
      }

    </>
  );
}
