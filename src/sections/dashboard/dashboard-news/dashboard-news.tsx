

import { Box, Stack, BoxProps, useTheme } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

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
            height: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
            ...sx,
        }} {...other}>
            {
                smUp &&
                <Stack direction="row" spacing={2} justifyContent="space-between">
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