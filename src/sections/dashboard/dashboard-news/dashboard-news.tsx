

import { Box, Stack, BoxProps, useTheme } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { MAIN_CHART_PANEL } from 'src/layouts/config-layout';

import Carousel, { useCarousel } from 'src/components/carousel';

import DashboardNewsTopic from './dashboard-news-topic';
import DashboardNewsContent from './dashboard-news-content';


// ----------------------------------------------------------------------

interface DashboardLineChartProps extends BoxProps {
}

export default function DashboardNews({ sx, ...other }: DashboardLineChartProps) {
    const theme = useTheme();
    const smUp = useResponsive("up", "sm");

    const carousel = useCarousel({})
    return (
        <Box sx={{
            height: `${MAIN_CHART_PANEL.W_DESKTOP}px`,
            // overflowX: 'hidden',
            // overflowY: 'auto',
            ...sx,
        }} {...other}>
            {
                smUp &&
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ height: '100%' }}>
                    <DashboardNewsContent />
                    <DashboardNewsTopic />
                </Stack>
            }
            {
                !smUp &&
                <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                    <DashboardNewsContent onMoveRight={carousel.onNext} />
                    <DashboardNewsTopic onMoveLeft={carousel.onPrev} />
                </Carousel>
            }
        </Box >
    );
}