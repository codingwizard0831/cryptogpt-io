'use client';


import Box from '@mui/material/Box';
import { Card, useTheme } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';


export default function DashboardView() {
    const theme = useTheme();
    const settings = useSettingsContext();

    return (
        <Box sx={{
            height: '100%',
            pb: 2,
        }}>
            <Card sx={{
                p: 2,
                borderRadius: 1,
                boxShadow: 2,
                height: '300px',
            }}>
                <Box>
                    Dashboard
                </Box>
            </Card>
        </Box>
    );
}
