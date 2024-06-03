'use client';


import { Box, Link, useTheme, Container, Typography, Breadcrumbs } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';

import ProfileOrderHistorySection from '../../profile/profile-order-history-section';


// ----------------------------------------------------------------------

export default function ProfileOrderHistoryView() {
    const settings = useSettingsContext();
    const theme = useTheme();

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
                    mb: 4,
                }}>
                    <Breadcrumbs>
                        <Link color="inherit" href="#">
                            Deliver
                        </Link>
                        <Link color="inherit" href="#">
                            My Slice
                        </Link>
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'text.primary',
                            }}
                        >
                            Order History
                        </Typography>
                    </Breadcrumbs>
                </Box>

                <ProfileOrderHistorySection />
            </Box>
        </Container>
    );
}