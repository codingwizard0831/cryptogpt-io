// Desc: This file contains the content of the strategy dashboard.

import { Box, Stack, Button, BoxProps } from '@mui/material';

import DashboardStrategyStep1 from './steps/strategy-1';

interface DashboardStrategyContentProps extends BoxProps {

}

export default function DashboardStrategyContent({ sx, ...other }: DashboardStrategyContentProps) {
    return <Box sx={{
        width: '1280px',
        height: '680px',
        border: "1px solid white",
        backdropFilter: "blur(10px)",
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
    }} {...other}>
        <DashboardStrategyStep1 />

        <Stack direction='row' justifyContent="space-between">
            <Button variant="contained" size="large" color="warning" sx={{
                color: 'white',
            }}>Prev</Button>
            <Button variant="contained" size="large" color="primary" sx={{
                color: 'white',
            }}>Next</Button>
        </Stack>
    </Box>
}