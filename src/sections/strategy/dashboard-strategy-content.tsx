// Desc: This file contains the content of the strategy dashboard.

import { Box, Stack, BoxProps } from '@mui/material';

import Image from 'src/components/image/image';

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
            {/* <Button variant="contained" size="large" color="warning" sx={{
                color: 'white',
            }}>Prev</Button>
            <Button variant="contained" size="large" color="primary" sx={{
                color: 'white',
            }}>Next</Button> */}
            <Image src="/assets/icons/project/backward.png" alt='prev' sx={{
                width: '56px',
                height: '56px',
            }} />
            <Image src="/assets/icons/project/forward.png" alt='next' sx={{
                width: '56px',
                height: '56px',
            }} />
        </Stack>
    </Box>
}