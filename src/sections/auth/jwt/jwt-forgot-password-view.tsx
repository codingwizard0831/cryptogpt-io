'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';
import { PasswordIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtForgotPasswordView() {
    const { forgotPassword } = useAuthContext();

    const router = useRouter();

    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    });

    const defaultValues = {
        email: '',
    };

    const methods = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axios.post(endpoints.auth.passwordResetRequest, {
                email: data.email,
            });
            // await forgotPassword?.(data.email);

            router.push(paths.auth.jwt.emailCheck);
        } catch (error) {
            console.error(error);
        }
    });

    const renderForm = (
        <Stack spacing={3} alignItems="center">
            <RHFTextField name="email" label="Email address" />

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
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

            <FormProvider methods={methods} onSubmit={onSubmit}>
                {renderForm}
            </FormProvider>
        </>
    );
}
