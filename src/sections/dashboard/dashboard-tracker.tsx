'use client';

import { Box, Stack, BoxProps, Typography } from '@mui/material';

import { Calendar } from 'src/components/calendar';

interface DashboardTrackerProps extends BoxProps {
}

export function DashboardTracker({ sx, ...other }: DashboardTrackerProps) {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            height: '100%',
            ...sx,
        }} {...other}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
            }}>
                <Typography variant="h6">Tracker</Typography>
            </Stack>

            <Calendar />
        </Box>
    );
}