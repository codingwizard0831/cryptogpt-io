'use client';

import { useState, useCallback } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

import Alert from '@mui/material/Alert';
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
    const loadFlag = useBoolean(false);
    const [confirmFlag, setConfirm] = useState(0); // 0: loading, 1: success, 2: failed
    const { enqueueSnackbar } = useSnackbar();
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const isShowPassword = useBoolean(false);
    const isSubmitting = useBoolean(false);

    const actionHandle = useCallback((color: VariantType, text: string = "") => {
        enqueueSnackbar(text, {
            variant: color,
        });
    }, [enqueueSnackbar]);

    const resetPasswordToken = searchParams.get('token');

    if (resetPasswordToken && loadFlag.value === false) {
        // loadFlag.onTrue();
        // const [token, id] = resetPasswordToken.split('__');
        // (async () => {
        //     try {
        //         const res = await axios.post(endpoints.auth.passwordResetValidate, {
        //             token,
        //             id,
        //         });
        //         const { success, message } = res.data;
        //         if (success) {
        //             setConfirm(1);
        //             actionHandle('success', message);
        //         } else {
        //             setConfirm(2);
        //             actionHandle('error', message);
        //             router.push(paths.error.somethingWrong);
        //         }
        //         sessionStorage.setItem('user_profile_id', id);
        //     } catch (error) {
        //         setConfirm(2);
        //         actionHandle('error', error.message);
        //         router.push(paths.error.somethingWrong);
        //     }
        // })();
    }

    const [errorMsg, setErrorMsg] = useState('');


    const onSubmit = (async () => {
        try {
            if (resetPasswordToken === null) {
                throw new Error("resetPasswordToken is null");
            }

            const [token, id] = resetPasswordToken.split('__');
            const res = await axios.post(endpoints.auth.passwordResetConfirm, {
                token,
                id,
                new_password: password,
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
            <MuiOtpInput
                autoFocus
                gap={1}
                length={6}
                TextFieldsProps={{
                    placeholder: '-',
                }}
                value={code}
                onChange={(value) => setCode(value)}
                onComplete={(value) => { console.log(value) }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        height: '48px',
                    },
                    '& input': {
                        textAlign: 'center',
                    },
                }}
            />

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
            />

            <LoadingButton
                fullWidth
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting.value}
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
