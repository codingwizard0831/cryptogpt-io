// Desc: This file contains the content of the strategy dashboard.


import { Box, Button, BoxProps } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Iconify from 'src/components/iconify/iconify';
import MobileMenu from 'src/components/mobile-tab/mobile-tab';

import DashboardStrategyStep1 from './steps/strategy-1';
import DashboardStrategyStep2 from './steps/strategy-2';
import DashboardStrategyStep3 from './steps/strategy-3';
import DashboardStrategyStep4 from './steps/strategy-4';
import DashboardStrategyChat from './dashboard-strategy-chat';
import DashboardStrategySummary from './dashboard-strategy-summary';

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
    const smUp = useResponsive("up", 'sm');
    const isPreview = useStrategy((state) => state.isPreview);
    const setIsPreview = useStrategy((state) => state.setIsPreview);
    const isShowSummary = useStrategy((state) => state.isShowSummary);

    return <Box sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        ...sx,
    }} {...other}>
        <DashboardStrategyChat />

        <Box sx={{
            width: isShowSummary ? '33%' : '50%',
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            ...(
                (!isPreview && !smUp) && {
                    display: 'none',
                }
            ),
            ...(
                (isShowSummary && !smUp) && {
                    display: 'none',
                }
            ),
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between',
            }}>
                <MobileMenu size={smUp ? "medium" : "small"} data={menuButtons} value={step} handleChange={setStep} />

                {
                    !smUp &&
                    <Button size="small" variant="outlined" sx={{
                    }}
                        onClick={() => setIsPreview(!isPreview)}
                    >Chat</Button>
                }
            </Box>

            <Box sx={{
                height: 0,
                flex: 1,
                width: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
                px: 0.25,
            }}>
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
            </Box>
        </Box>

        <DashboardStrategySummary sx={{
        }} />
    </Box>
}