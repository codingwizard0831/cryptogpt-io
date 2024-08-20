// Desc: This file contains the content of the strategy dashboard.

import { Box, BoxProps } from '@mui/material';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Iconify from 'src/components/iconify/iconify';
import MobileMenu from 'src/components/mobile-tab/mobile-tab';

import DashboardStrategyStep1 from './steps/strategy-1';
import DashboardStrategyStep2 from './steps/strategy-2';
import DashboardStrategyStep3 from './steps/strategy-3';
import DashboardStrategyStep4 from './steps/strategy-4';


interface MenuButton {
    icon: React.ReactNode;
    id: string;
}

const menuButtons: MenuButton[] = [
    { icon: <Iconify icon="pepicons-pop:coins" />, id: '1.2.choose-pair' },
    { icon: <Iconify icon="hugeicons:bitcoin-invoice" />, id: '3.detail' },
    { icon: <Iconify icon="carbon:chart-multitype" />, id: '4.backtesting' },
    { icon: <Iconify icon="vaadin:chart-3d" />, id: '5.review' },
];

interface DashboardStrategyContentProps extends BoxProps {

}

export default function DashboardStrategyContent({ sx, ...other }: DashboardStrategyContentProps) {
    const step = useStrategy(state => state.step);
    const setStep = useStrategy(state => state.setStep);

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
        {
            step === "1.2.choose-pair" &&
            <DashboardStrategyStep1 />
        }
        {
            step === "3.detail" &&
            <DashboardStrategyStep2 />
        }
        {
            step === "4.backtesting" &&
            <DashboardStrategyStep3 />
        }
        {
            step === "5.review" &&
            <DashboardStrategyStep4 />
        }


        <Box sx={{
            mt: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            <MobileMenu data={menuButtons} value={step} handleChange={setStep} />
        </Box>
    </Box>
}