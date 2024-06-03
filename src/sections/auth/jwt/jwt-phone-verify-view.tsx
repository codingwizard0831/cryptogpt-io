'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

// import { useCountdownSeconds } from 'src/hooks/use-countdown';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';
import { EmailInboxIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtPhoneVerifyView() {
    const router = useRouter();

    const searchParams = useSearchParams();

    const email = searchParams.get('email');

    const { confirmRegister, resendCodeRegister } = useAuthContext();

    //   const { countdown, counting, startCountdown } = useCountdownSeconds(60);

    const VerifySchemaSchema = Yup.object().shape({
        code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
    });

    const defaultValues = {
        code: '',
    };

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(VerifySchemaSchema),
        defaultValues,
    });

    const {
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const userProfileId = sessionStorage.getItem('user_profile_id');
            await axios.post(endpoints.auth.confirmPhone, {
                id: userProfileId,
                token: data.code,
            });
            router.push(paths.auth.jwt.login);
        } catch (error) {
            console.error(error);
        }
    });

    const renderForm = (
        <Stack spacing={3} alignItems="center">
            <RHFCode name="code" />

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
            >
                Verify
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
            <EmailInboxIcon sx={{ height: 96 }} />

            <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
                <Typography variant="h3">Please check your phone!</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    We have sent a 6-digit confirmation code to your phone, please enter the code in below box to verify your phone.
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
