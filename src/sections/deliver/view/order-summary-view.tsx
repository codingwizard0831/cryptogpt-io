'use client';

import React from 'react';

import { Box, Link, Container, Typography, Breadcrumbs } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';

import DeliverOrderSummarySection from '../order-section/deliver-order-summary-section';

type Props = {
    id: string;
};

export default function DeliverOrderSummaryView({ id }: Props) {
    const settings = useSettingsContext();
    // const theme = useTheme();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>

                <Box sx={{
                    mb: 4,
                }}>
                    <Breadcrumbs>
                        <Link color="inherit" href="#">
                            Deliver
                        </Link>
                        <Link color="inherit" href="#">
                            Order
                        </Link>
                        <Link color="inherit" href="#">
                            {id}
                        </Link>
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'text.primary',
                            }}
                        >
                            Summary
                        </Typography>
                    </Breadcrumbs>
                </Box>

                <DeliverOrderSummarySection id={id} />
            </Box>
        </Container>
    );
}
