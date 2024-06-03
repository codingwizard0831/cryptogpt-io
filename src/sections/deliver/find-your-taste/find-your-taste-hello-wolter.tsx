'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import { useTheme, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image/image';
import EmptyItem from 'src/components/empty-item';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import DeliverDiscoveryItem, { DeliverDiscoveryItemType } from '../deliver-discovery-item';

export default function FindYourTasteHelloWolter() {
    const theme = useTheme();
    const upXl = useResponsive('up', 'lg');
    const betweenXlLg = useResponsive('between', 'xl', 'lg');
    const betweenLgMd = useResponsive('between', 'lg', 'md');
    const betweenMdSm = useResponsive('between', 'md', 'sm');
    const downSm = useResponsive('down', 'sm');

    const discoveryNumberOfShowedSlides = useMemo(() => {
        if (upXl || betweenXlLg) return 2;
        if (betweenLgMd) return 1;
        return 1;
    }, [upXl, betweenXlLg, betweenLgMd]);
    const discoveryAutoPlay = useMemo(() => dummyDataRestaurants.length >= discoveryNumberOfShowedSlides, [discoveryNumberOfShowedSlides]);
    const discoveryCarousel = useCarousel({
        slidesToShow: 2,
        // swipe: true,
        autoplay: discoveryAutoPlay,
        speed: 1000,
        autoplaySpeed: 20000,
        responsive: [
            {
                breakpoint: theme.breakpoints.values.lg,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: theme.breakpoints.values.md,
                settings: { slidesToShow: 1 },
            },
        ],
    });

    return (
        <Box sx={{
            mb: 6,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'space-between',
            }}>
                <Box sx={{
                    width: '100%',
                    maxWidth: 400,
                    py: 2,
                }}>
                    <Typography variant='h3' gutterBottom>Hello Wolter 🧳💙</Typography>
                    <Typography variant='body2'>✈️ Orders to the airport are exclusively delivered at the Departure/Arrival gates. Please mention in the delivery instructions the level you are on (e.g., Arrivals or Departures) as well as the gate number (e.g., Arrivals 2). ✈️</Typography>
                </Box>

                <Box sx={{
                    flex: 1,
                    height: '240px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    <Image src='/assets/images/deliver/wolter.png' sx={{
                        height: '300px',
                        width: '300px',
                        position: 'absolute',
                        left: betweenMdSm ? '0%' : '50%',
                        display: downSm ? 'none' : 'block',
                        top: '0px',
                    }} />
                </Box>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    '& .slick-list': {
                        borderRadius: 2,
                    },
                    '.slick-slider .slick-list .slick-track': {
                        gap: 2,
                    }
                }}
            >
                <CarouselArrows filled shape="rounded" onNext={discoveryCarousel.onNext} onPrev={discoveryCarousel.onPrev}>
                    <Carousel ref={discoveryCarousel.carouselRef} {...discoveryCarousel.carouselSettings}>
                        {dummyDataRestaurants.map((_, index) => (
                            <DeliverDiscoveryItem data={_} key={`discovery${index}`} />
                        ))}
                        {
                            dummyDataRestaurants.length <= discoveryNumberOfShowedSlides && Array.from({ length: discoveryNumberOfShowedSlides - dummyDataRestaurants.length }).map((_, index) => (
                                <Box key={`empty${index}`} sx={{ height: 1, borderRadius: '10px' }}>
                                    <EmptyItem />
                                </Box>
                            ))
                        }
                    </Carousel>
                </CarouselArrows>
            </Box>
        </Box>
    );
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