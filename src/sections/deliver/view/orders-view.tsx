'use client';


import { Box, Link, Container, Typography, Breadcrumbs } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';

import DeliverOrdersSection from '../order-section/deliver-orders-section';


// ----------------------------------------------------------------------

export default function OrdersView() {
    const settings = useSettingsContext();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <Box sx={{
                width: 1,
                height: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Breadcrumbs>
                        <Link color="inherit" href="#">
                            Deliver
                        </Link>
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'text.primary',
                            }}
                        >
                            Orders
                        </Typography>
                    </Breadcrumbs>
                </Box>

                <DeliverOrdersSection sx={{
                    my: 4,
                }} />
            </Box>
        </Container>
    );
}