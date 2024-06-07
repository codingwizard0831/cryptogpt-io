'use client';

import { useState } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { EmailInboxIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function JwtEmailVerifyView() {
    const router = useRouter();
    const isSubmitting = useBoolean(false);
    const [code, setCode] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const searchParams = useSearchParams();

    const handleTryAgain = () => {
        // handleLoginWithCodeSend(email);
    }

    const handleCodeComplete = (value: string) => {
        // handleLoginWithCodeVerify(email, "", value);
    }

    const renderHead = (
        <>
            <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

            <Typography variant="h3" sx={{ mb: 1 }}>
                Email Verification
            </Typography>

            <Stack spacing={1} sx={{ color: 'text.secondary', typography: 'body2', mb: 5 }}>

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
