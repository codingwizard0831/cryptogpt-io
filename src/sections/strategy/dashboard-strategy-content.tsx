// Desc: This file contains the content of the strategy dashboard.

import { Box, BoxProps } from '@mui/material';

import MobileMenu from 'src/components/mobile-tab/mobile-tab';

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


        <Box sx={{
            mt: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            <MobileMenu />
        </Box>
    </Box>
}