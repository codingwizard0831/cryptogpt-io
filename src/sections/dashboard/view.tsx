'use client';


import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';


export default function DashboardView() {
    const theme = useTheme();
    const settings = useSettingsContext();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <Box>
                Dashboard
            </Box>
        </Container>
    );
}
