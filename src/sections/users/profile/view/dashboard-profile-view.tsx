'use client';

import { Box } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

export default function DashboardProfileView() {
    const smUp = useResponsive('up', 'sm');

    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            Profile View
        </Box>
    );
}
