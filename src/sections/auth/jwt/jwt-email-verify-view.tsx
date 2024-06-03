'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { EmailInboxIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';
import { useSnackbar, VariantType } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function JwtEmailVerifyView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const loadFlag = useBoolean(false);
    const [confirmFlag, setConfirm] = useState(0); // 0: loading, 1: success, 2: failed
    const { enqueueSnackbar } = useSnackbar();

    const actionHandle = useCallback((color: VariantType, text: string = "") => {
        enqueueSnackbar(text, {
            variant: color,
        });
    }, [enqueueSnackbar]);

    const emailConfirmToken = searchParams.get('token');

    if (emailConfirmToken && loadFlag.value === false) {
        loadFlag.onTrue();
        console.log(emailConfirmToken);
        const [token, id] = emailConfirmToken.split('__');
        console.log(token, id);
        (async () => {
            try {
                const res = await axios.post(endpoints.auth.confirmEmail, {
                    token,
                    id,
                });
                const { success, message } = res.data;
                if (success) {
                    setConfirm(1);
                    actionHandle('success', message);
                    router.push(paths.auth.jwt.phoneVerify);
                } else {
                    setConfirm(2);
                    actionHandle('error', message);
                }
                sessionStorage.setItem('user_profile_id', id);
            } catch (error) {
                console.error(error);
                setConfirm(2);
                actionHandle('error', error.message);
            }
        })();
    }

    const handleResendEmail = useCallback(async () => {
        console.log('Resend email');
        try {
            setConfirm(0);
            const userProfileId = sessionStorage.getItem('user_profile_id');
            const res = await axios.post(endpoints.auth.resendEmail, {
                id: userProfileId,
            });
            const { success, message } = res.data;
            if (success) {
                setConfirm(1);
                actionHandle('success', message);
                router.push(paths.auth.jwt.emailCheck);
            } else {
                setConfirm(2);
                actionHandle('error', message);
            }
        } catch (error) {
            setConfirm(2);
            actionHandle('error', error.message);
        }
    }, [actionHandle, setConfirm, router]);

    const renderHead = (
        <>
            <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

            <Typography variant="h3" sx={{ mb: 1 }}>
                Email Verification
            </Typography>

            <Stack spacing={1} sx={{ color: 'text.secondary', typography: 'body2', mb: 5 }}>
                {
                    confirmFlag === 0 && (
                        <Typography variant="subtitle1" sx={{
                            color: 'text.secondary'
                        }}> We are verifing your email</Typography>
                    )
                }
                {
                    confirmFlag === 1 && (
                        <Typography variant="subtitle1" sx={{
                            color: 'primary.main'
                        }}>Your email has been verified</Typography>
                    )
                }
                {
                    confirmFlag === 2 && (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            gap: 2,
                        }}>
                            <Typography variant="subtitle1" sx={{
                                color: 'error.main'
                            }}>Failed to verify your email</Typography>
                            <Button variant="outlined" color='error' onClick={handleResendEmail}>Resend</Button>
                        </Box>
                    )
                }
            </Stack>
        </>
    );

    return (
        <>
            {renderHead}

            <Button
                component={RouterLink}
                href={paths.auth.jwt.login}
                size="large"
                color="inherit"
                variant="contained"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                sx={{ alignSelf: 'center' }}
            >
                Return to sign in
            </Button>
        </>
    );
}
