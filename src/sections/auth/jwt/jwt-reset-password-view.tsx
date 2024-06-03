'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtResetPasswordView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const loadFlag = useBoolean(false);
    const [confirmFlag, setConfirm] = useState(0); // 0: loading, 1: success, 2: failed
    const { enqueueSnackbar } = useSnackbar();
    const password = useBoolean();
    const repassword = useBoolean();

    const actionHandle = useCallback((color: VariantType, text: string = "") => {
        enqueueSnackbar(text, {
            variant: color,
        });
    }, [enqueueSnackbar]);

    const resetPasswordToken = searchParams.get('token');

    if (resetPasswordToken && loadFlag.value === false) {
        loadFlag.onTrue();
        const [token, id] = resetPasswordToken.split('__');
        (async () => {
            try {
                const res = await axios.post(endpoints.auth.passwordResetValidate, {
                    token,
                    id,
                });
                const { success, message } = res.data;
                if (success) {
                    setConfirm(1);
                    actionHandle('success', message);
                } else {
                    setConfirm(2);
                    actionHandle('error', message);
                    router.push(paths.error.somethingWrong);
                }
                sessionStorage.setItem('user_profile_id', id);
            } catch (error) {
                setConfirm(2);
                actionHandle('error', error.message);
                router.push(paths.error.somethingWrong);
            }
        })();
    }

    const [errorMsg, setErrorMsg] = useState('');

    const LoginSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        repassword: Yup.string()
            .nullable()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required'),
    });

    const defaultValues = {
        password: '',
        repassword: '',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (resetPasswordToken === null) {
                throw new Error("resetPasswordToken is null");
            }

            const [token, id] = resetPasswordToken.split('__');
            const res = await axios.post(endpoints.auth.passwordResetConfirm, {
                token,
                id,
                new_password: data.password,
            });
            const { success, message } = res.data;
            if (success) {
                actionHandle('success', message);
                router.push(paths.auth.jwt.login);
            } else {
                actionHandle('error', message);
            }
        } catch (error) {
            console.error(error);
            reset();
            setErrorMsg(typeof error === 'string' ? error : error.message);
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
            <RHFTextField
                name="password"
                label="Password"
                type={password.value ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={password.onToggle} edge="end">
                                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <RHFTextField
                name="repassword"
                label="Password Confirm"
                type={repassword.value ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={repassword.onToggle} edge="end">
                                <Iconify icon={repassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
            >
                Update Password
            </LoadingButton>
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

            <FormProvider methods={methods} onSubmit={onSubmit}>
                {renderForm}
            </FormProvider>

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
