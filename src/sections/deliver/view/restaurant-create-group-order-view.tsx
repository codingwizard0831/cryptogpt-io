'use client';

import { useState } from 'react';

import { Box, alpha, Container, IconButton, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import GroupOrderCreateStepName from '../group-order/group-order-create-step-name';
import GroupOrderCreateStepInvite from '../group-order/group-order-create-step-invite';
import GroupOrderCreateStepDetail from '../group-order/group-order-create-step-detail';


// ----------------------------------------------------------------------

export default function DeliverRestaurantCreateGroupOrderView() {
    const settings = useSettingsContext();
    const [step, setStep] = useState(2);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 6,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    {
                        (step === 2 || step === 3) &&
                        <IconButton sx={{
                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                        }} onClick={() => setStep(step - 1)}>
                            <Iconify icon="eva:arrow-back-outline" sx={{
                                color: 'primary.main',
                            }} />
                        </IconButton>
                    }
                    <Typography>{step} / 3</Typography>
                </Box>
                <IconButton sx={{
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                }}>
                    <Iconify icon="material-symbols:close" sx={{
                        color: 'primary.main',
                    }} />
                </IconButton>
            </Box>
            {
                step === 1 && <GroupOrderCreateStepName />
            }
            {
                step === 2 && <GroupOrderCreateStepDetail />
            }
            {
                step === 3 && <GroupOrderCreateStepInvite />
            }
        </Container>
    );
}