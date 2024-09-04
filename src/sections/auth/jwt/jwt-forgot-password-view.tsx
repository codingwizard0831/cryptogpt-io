'use client';


import { useState } from 'react';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PasswordIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function JwtForgotPasswordView() {
    const { forgotPassword } = useAuthContext();

    const router = useRouter();
    const [email, setEmail] = useState('');
    const isSubmitting = useBoolean(false);

    const handleSendRequest = async () => {
        try {
            isSubmitting.onTrue();
            if (forgotPassword) {
                await forgotPassword(email);
                router.push(paths.auth.jwt.emailCheck);
            }
        } catch (error) {
            console.error(error);
            isSubmitting.onFalse();
        }
    };

    const renderForm = (
        <Stack spacing={3} alignItems="center">
            <TextField fullWidth type='text' label="Email or phone" placeholder='Enter phonenumber or email'
                value={email} onChange={(e) => setEmail(e.target.value)}
            />

            <LoadingButton
                fullWidth
                size="large"
                variant="outlined"
                color='primary'
                loading={isSubmitting.value}
                onClick={handleSendRequest}
            >
                Send Request
            </LoadingButton>

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

    const renderHead = (
        <>
            <PasswordIcon sx={{ height: 96 }} />

            <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
                <Typography variant="h3">Forgot your password?</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Please enter the email address associated with your account and We will email you a link
                    to reset your password.
                </Typography>
            </Stack>
        </>
    );

    return (
        <>
            {renderHead}

            {renderForm}
        </>
    );
}
