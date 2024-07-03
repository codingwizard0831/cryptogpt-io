'use client';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Stack, BoxProps, Typography } from '@mui/material';

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

            <DateCalendar views={['day']} />
        </Box>
    );
}