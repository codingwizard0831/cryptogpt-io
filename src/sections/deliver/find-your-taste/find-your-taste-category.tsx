'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import { Link, alpha, useTheme, IconButton, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import EmptyItem from 'src/components/empty-item';
import Carousel, { useCarousel } from 'src/components/carousel';

import DeliverCategoryItem, { DeliverCategoryItemType } from '../deliver-category-item';

export default function FindYourTasteCategory() {
    const theme = useTheme();
    const upXl = useResponsive('up', 'xl');
    const betweenXlLg = useResponsive('between', 'lg', 'xl');
    const betweenLgMd = useResponsive('between', 'md', 'lg');
    const betweenMdSm = useResponsive('between', 'sm', 'md');
    const betweenXsSm = useResponsive('between', 'xs', 'sm');
    const downXs = useResponsive('down', 'xs');

    const categoryNumberOfShowedSlides: number = useMemo(() => {
        if (upXl) return 6;
        if (betweenXlLg) return 5;
        if (betweenLgMd) return 4;
        if (betweenMdSm) return 3;
        if (betweenXsSm) return 2;
        if (downXs) return 1;
        return 1;
    }, [upXl, betweenXlLg, betweenLgMd, betweenMdSm, betweenXsSm, downXs]);
    const categoryAutoPlay = useMemo(() => dummyDataRestaurants.length > categoryNumberOfShowedSlides, [categoryNumberOfShowedSlides]);
    const categoryCarousel = useCarousel({
        slidesToShow: 6,
        autoplay: categoryAutoPlay,
        speed: 1000,
        autoplaySpeed: 20000,
        responsive: [
            {
                breakpoint: theme.breakpoints.values.xl,
                settings: { slidesToShow: 5 },
            },
            {
                breakpoint: theme.breakpoints.values.lg,
                settings: { slidesToShow: 4 },
            },
            {
                breakpoint: theme.breakpoints.values.md,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: theme.breakpoints.values.sm,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: theme.breakpoints.values.xs,
                settings: { slidesToShow: 1 },
            },
        ],
    });

    return (
        <Box sx={{
            mb: 6,
        }}>
            <Box sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography variant='h5'>Category</Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <Link href="" component={RouterLink} sx={{
                        p: 1,
                    }}>See all</Link>
                    {
                        categoryAutoPlay && <>
                            <IconButton color="primary" sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            }} onClick={categoryCarousel.onPrev}>
                                <Iconify icon="lucide:arrow-left" />
                            </IconButton>
                            <IconButton color="primary" sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            }} onClick={categoryCarousel.onNext}>
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
                <Carousel ref={categoryCarousel.carouselRef} {...categoryCarousel.carouselSettings}>
                    {dummyDataRestaurants.map((_, index) => (
                        <DeliverCategoryItem data={_} key={`restaurent${index}`} />
                    ))}
                    {
                        dummyDataRestaurants.length < categoryNumberOfShowedSlides && Array.from({ length: categoryNumberOfShowedSlides - dummyDataRestaurants.length }).map((_, index) => (
                            <Box key={`empty${index}`} sx={{ height: 1, borderRadius: '10px' }}>
                                <EmptyItem />
                            </Box>
                        ))
                    }
                </Carousel>
            </Box>
        </Box>
    )
}

const dummyDataRestaurants: DeliverCategoryItemType[] = [
    {
        title: 'Sandwich',
        amount: 1,
        image: '/assets/images/deliver/category/1.avif',
        link: 'https://wolt.com/en/grc/athens/category/coffee-island-spata',
    },
    {
        title: 'Cafe',
        amount: 1,
        image: '/assets/images/deliver/category/2.avif',
        link: 'https://wolt.com/en/grc/athens/category/coffee-island-spata',
    },
    {
        title: 'Crepe',
        amount: 4,
        image: '/assets/images/deliver/category/3.avif',
        link: 'https://wolt.com/en/grc/athens/category/coffee-island-spata',
    },
    {
        title: 'Ice cream',
        amount: 1,
        image: '/assets/images/deliver/category/4.avif',
        link: 'https://wolt.com/en/grc/athens/category/coffee-island-spata',
    },
    {
        title: 'Bakery',
        amount: 3,
        image: '/assets/images/deliver/category/5.avif',
        link: 'https://wolt.com/en/grc/athens/category/coffee-island-spata',
    },
    {
        title: 'Greek',
        amount: 2,
        image: '/assets/images/deliver/category/6.avif',
        link: 'https://wolt.com/en/grc/athens/category/coffee-island-spata',
    },
];