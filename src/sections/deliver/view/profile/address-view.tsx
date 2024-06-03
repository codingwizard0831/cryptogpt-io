'use client';


import { Box, useTheme, Container } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileAddressSection from '../../profile/profile-address-section';

// ----------------------------------------------------------------------

export default function ProfileAddressView() {
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
                    <CustomBreadcrumbs
                        links={[
                            { name: 'Deliver', href: paths.dashboard.root },
                            { name: 'My Slice', href: paths.dashboard.root },
                            { name: 'Address' },
                        ]}
                    />
                </Box>

                <ProfileAddressSection />
            </Box>
        </Container>
    );
}