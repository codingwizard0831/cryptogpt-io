'use client';

import { useMemo } from 'react';

import { Box, Link, alpha, BoxProps, useTheme, Typography, IconButton } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import EmptyItem from 'src/components/empty-item';
import Carousel, { useCarousel } from 'src/components/carousel';

import DeliverRestaurantItem from '../deliver-restaurant-item';
import { DeliverDiscoveryItemType } from '../deliver-discovery-item';

interface ProfileOrderAgainSectionProps extends BoxProps {
}

export default function ProfileOrderAgainSection({ sx, ...other }: ProfileOrderAgainSectionProps) {
    const theme = useTheme();
    const upXl = useResponsive('up', 'xl');
    const betweenXlLg = useResponsive('between', 'lg', 'xl');
    const betweenLgMd = useResponsive('between', 'md', 'lg');
    const betweenMdSm = useResponsive('between', 'sm', 'md');
    const downSm = useResponsive('down', 'sm');

    const restaurantNumberOfShowedSlides: number = useMemo(() => {
        if (upXl) return 4;
        if (betweenXlLg) return 3;
        if (betweenLgMd || betweenMdSm) return 2;
        if (downSm) return 1;
        return 1;
    }, [upXl, betweenXlLg, betweenLgMd, betweenMdSm, downSm]);
    const restaurantAutoPlay = useMemo(() => dummyDataRestaurants.length >= restaurantNumberOfShowedSlides, [restaurantNumberOfShowedSlides]);
    const restaurantCarousel = useCarousel({
        slidesToShow: 4,
        autoplay: restaurantAutoPlay,
        speed: 1000,
        autoplaySpeed: 20000,
        responsive: [
            {
                breakpoint: theme.breakpoints.values.xl,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: theme.breakpoints.values.lg,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: theme.breakpoints.values.sm,
                settings: { slidesToShow: 1 },
            },
        ],
    });

    return <Box sx={{
        ...sx,
    }} {...other}>
        <Box sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <Typography variant='h5'>Order again</Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                <Link href="" component={RouterLink} sx={{
                    p: 1,
                }}>See all</Link>
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
                }
            }}
        >
            <Carousel ref={restaurantCarousel.carouselRef} {...restaurantCarousel.carouselSettings}>
                {dummyDataRestaurants.map((_, index) => (
                    <DeliverRestaurantItem data={_} key={`restaurent${index}`} isShortly />
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
}

const dummyDataRestaurants: DeliverDiscoveryItemType[] = [
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
    // {
    //     type: 'article',
    //     title: 'Bring your friends to test test Wolt!',
    //     description: 'They get 6€, you get 6€ 💰',
    //     image: '/assets/images/deliver/3.avif',
    //     link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    // },
];