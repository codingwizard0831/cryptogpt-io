import React, { useMemo } from 'react';

import { Box, Grid, alpha, useTheme, BoxProps, Typography, IconButton } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import EmptyItem from 'src/components/empty-item';
import Carousel, { useCarousel } from 'src/components/carousel';

import DeliverYourOrderItem from '../deliver-your-order-item';
import DeliverStoreProductItem from '../deliver-store-product-item';


interface DeliverYourOrderSectionProps extends BoxProps {
    id: string;
    isDrawer?: boolean;
}

export default function DeliverYourOrderSection({ id, isDrawer = false, sx, ...other }: DeliverYourOrderSectionProps) {
    const theme = useTheme();
    const upXl = useResponsive('up', 'xl');
    const betweenXlLg = useResponsive('between', 'lg', 'xl');
    const betweenLgMd = useResponsive('between', 'md', 'lg');
    const betweenMdSm = useResponsive('between', 'sm', 'md');
    const betweenXsSm = useResponsive('between', 'xs', 'sm');
    const downXs = useResponsive('down', 'xs');

    const restaurantNumberOfShowedSlides: number = useMemo(() => {
        if (isDrawer) return 1;
        if (upXl) return 6;
        if (betweenXlLg) return 5;
        if (betweenLgMd) return 4;
        if (betweenMdSm) return 3;
        if (betweenXsSm) return 2;
        if (downXs) return 1;
        return 1;
    }, [isDrawer, upXl, betweenXlLg, betweenLgMd, betweenMdSm, betweenXsSm, downXs]);
    const restaurantAutoPlay = useMemo(() => dummyDataRestaurants.length >= restaurantNumberOfShowedSlides, [restaurantNumberOfShowedSlides]);
    const restaurantCarousel = useCarousel({
        slidesToShow: isDrawer ? 1 : 4,
        autoplay: restaurantAutoPlay,
        speed: 1000,
        autoplaySpeed: 20000,
        responsive: [
            {
                breakpoint: theme.breakpoints.values.xl,
                settings: { slidesToShow: isDrawer ? 1 : 4 },
            },
            {
                breakpoint: theme.breakpoints.values.lg,
                settings: { slidesToShow: isDrawer ? 1 : 3 },
            },
            {
                breakpoint: theme.breakpoints.values.md,
                settings: { slidesToShow: isDrawer ? 1 : 3 },
            },
            {
                breakpoint: theme.breakpoints.values.sm,
                settings: { slidesToShow: isDrawer ? 1 : 2 },
            },
            {
                breakpoint: theme.breakpoints.values.xs,
                settings: { slidesToShow: 1 },
            },
        ],
    });

    return (<Box sx={{
        mb: 2,
        ...sx,
    }} {...other}>

        <Box sx={{
            mb: 4,
        }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Your order</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 6} xl={isDrawer ? 12 : 4}>
                    <DeliverYourOrderItem />
                </Grid>
                <Grid item xs={12} sm={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 6} xl={isDrawer ? 12 : 4}>
                    <DeliverYourOrderItem />
                </Grid>
                <Grid item xs={12} sm={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 6} xl={isDrawer ? 12 : 4}>
                    <DeliverYourOrderItem />
                </Grid>
                <Grid item xs={12} sm={12} md={isDrawer ? 12 : 6} lg={isDrawer ? 12 : 6} xl={isDrawer ? 12 : 4}>
                    <DeliverYourOrderItem />
                </Grid>
            </Grid>
        </Box>

        <Box sx={{
            mb: 4,
        }}>
            <Box sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography variant='h5'>Recommendation</Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    {
                        restaurantAutoPlay && <>
                            <IconButton color="primary" sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            }} onClick={restaurantCarousel.onPrev}>
                                <Iconify icon="lucide:arrow-left" />
                            </IconButton>
                            <IconButton color="primary" sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            }} onClick={restaurantCarousel.onNext}>
                                <Iconify icon="lucide:arrow-right" />
                            </IconButton>
                        </>
                    }
                </Box>
            </Box>
            <Box
                sx={{
                    '.slick-slider .slick-list .slick-track': {
                        gap: 2,
                    },
                }}
            >
                <Carousel ref={restaurantCarousel.carouselRef} {...restaurantCarousel.carouselSettings}>
                    {dummyDataRestaurants.map((_, index) => (
                        <DeliverStoreProductItem key={`restaurent${index}`} />
                    ))}
                    {
                        dummyDataRestaurants.length < restaurantNumberOfShowedSlides && Array.from({ length: restaurantNumberOfShowedSlides - dummyDataRestaurants.length }).map((_, index) => (
                            <Box key={`empty${index}`} sx={{ height: 1, borderRadius: '10px' }}>
                                <EmptyItem />
                            </Box>
                        ))
                    }
                </Carousel>
            </Box>
        </Box>
    </Box>
    );
}

const dummyDataRestaurants = [
    {
        type: 'aBring your friends to test test Wolt!Bring your friends to test test Wolt!e',
        title: 'A few words about us! 🥳',
        description: '',
        image: '/assets/images/deliver/4.avif',
        link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    },
    {
        type: 'restaurant',
        title: 'Coffee Island Spata',
        description: 'Unique coffee for unique people!',
        image: '/assets/images/deliver/1.avif',
        link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    },
    {
        type: 'restaurant',
        title: 'Hliana Bakery',
        description: 'Puff pastry and sweets at their best!',
        image: '/assets/images/deliver/2.avif',
        link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    },
    {
        type: 'article',
        title: 'Bring your friends to test test Wolt!',
        description: 'They get 6€, you get 6€ 💰',
        image: '/assets/images/deliver/3.avif',
        link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    },
    {
        type: 'article',
        title: 'Bring your friends to test test Wolt!',
        description: 'They get 6€, you get 6€ 💰',
        image: '/assets/images/deliver/3.avif',
        link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    },
];