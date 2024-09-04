'use client';

import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import { Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import EmailInboxIcon from 'src/assets/icons/email-inbox-icon';

import Iconify from 'src/components/iconify';
import { useSnackbar, VariantType } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function JwtResetPasswordView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();
    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');
    const isShowPassword = useBoolean(false);
    const isShowRPassword = useBoolean(false);
    const isSubmitting = useBoolean(false);

    const actionHandle = useCallback((color: VariantType, text: string = "") => {
        enqueueSnackbar(text, {
            variant: color,
        });
    }, [enqueueSnackbar]);

    const resetPasswordToken = searchParams.get('resetToken');
    const email = searchParams.get('email');

    const validateForm = useCallback(() => {
        if (!password) {
            actionHandle('error', "The password is required.");
            return false;
        }
        if (password !== rPassword) {
            actionHandle('error', "Passwords do not match.");
            return false;
        }
        if (password.length < 6) {
            actionHandle('error', "Password should be at least 6 characters long.");
            return false;
        }
        return true;
    }, [actionHandle, password, rPassword]);

    const onSubmit = (async () => {
        if (!validateForm()) return;

        if (!email || !resetPasswordToken) {
            actionHandle('error', "Email or reset token is missing.");
            return;
        }

        isSubmitting.onTrue();
        try {
            const { data, status } = await axios.post(endpoints.auth.passwordResetConfirm, {
                resetPasswordToken,
                email,
                new_password: password,
            });

            if (status === 200) {
                actionHandle('success', data.message);
                router.push(paths.auth.jwt.login);
            } else {
                actionHandle('error', data.error);
            }
            isSubmitting.onFalse();
        } catch (error) {
            isSubmitting.onFalse();
            actionHandle('error', error.error);
        }
    });

    const renderHead = (
        <Stack spacing={2} sx={{ mb: 5 }}>
            <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

            <Typography variant="h3" sx={{ mb: 1 }}>
                Reset Password
            </Typography>
        </Stack>
    );

    const renderForm = (
        <Stack spacing={2.5}>
            <TextField
                name="password"
                label="Password"
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
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
            />

            <TextField
                name="rpassword"
                label="Re-type Password"
                type={isShowRPassword.value ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={isShowRPassword.onToggle} edge="end">
                                <Iconify icon={isShowRPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                value={rPassword}
                onChange={(e) => { setRPassword(e.target.value) }}
            />

            <LoadingButton
                fullWidth
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting.value}
                onClick={onSubmit}
            >
                Update Password
            </LoadingButton>
        </Stack>
    );

    return (
        <>
            {renderHead}

            {renderForm}

            <Button
                component={RouterLink}
                href={paths.auth.jwt.login}
                size="large"
                color="inherit"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                sx={{ alignSelf: 'center', mt: 2 }}
            >
                Return to sign in
            </Button>
        </>
    );
}
