'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import { Link, alpha, useTheme, IconButton, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import EmptyItem from 'src/components/empty-item';
import Carousel, { useCarousel } from 'src/components/carousel';

export default function FindYourTasteSocial() {
    const theme = useTheme();
    const upXl = useResponsive('up', 'xl');
    const betweenXlLg = useResponsive('between', 'lg', 'xl');
    const betweenLgMd = useResponsive('between', 'md', 'lg');
    const betweenMdSm = useResponsive('between', 'sm', 'md');
    const betweenXsSm = useResponsive('between', 'xs', 'sm');
    const downXs = useResponsive('down', 'xs');

    const socialNumberOfShowedSlides: number = useMemo(() => {
        if (upXl) return 3;
        if (betweenXlLg) return 3;
        if (betweenLgMd) return 2;
        if (betweenMdSm) return 2;
        if (betweenXsSm) return 1;
        if (downXs) return 1;
        return 1;
    }, [upXl, betweenXlLg, betweenLgMd, betweenMdSm, betweenXsSm, downXs]);
    const socialAutoPlay = useMemo(() => dummyDataSocials.length > socialNumberOfShowedSlides, [socialNumberOfShowedSlides]);
    const socialCarousel = useCarousel({
        slidesToShow: 3,
        autoplay: socialAutoPlay,
        speed: 1000,
        autoplaySpeed: 20000,
        responsive: [
            {
                breakpoint: theme.breakpoints.values.xl,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: theme.breakpoints.values.md,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: theme.breakpoints.values.sm,
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
                <Typography variant='h5'>Socials</Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <Link href="" component={RouterLink} sx={{
                        p: 1,
                    }}>See all</Link>
                    {
                        socialAutoPlay && <>
                            <IconButton color="primary" sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            }} onClick={socialCarousel.onPrev}>
                                <Iconify icon="lucide:arrow-left" />
                            </IconButton>
                            <IconButton color="primary" sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            }} onClick={socialCarousel.onNext}>
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
                <Carousel ref={socialCarousel.carouselRef} {...socialCarousel.carouselSettings}>
                    {dummyDataSocials.map((_, index) => (
                        <Link key={index} href={_.link} component={RouterLink} sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                        }}>
                            <Box>
                                <Image src={_.image} sx={{
                                    width: '100%',
                                    aspectRatio: '16 / 9',
                                    borderRadius: '10px',
                                }} />
                            </Box>
                        </Link>
                    ))}
                    {
                        dummyDataSocials.length < socialNumberOfShowedSlides && Array.from({ length: socialNumberOfShowedSlides - dummyDataSocials.length }).map((_, index) => (
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

const dummyDataSocials = [
    {
        image: '/assets/images/deliver/social/facebook.avif',
        link: 'https://wolt.com/en/grc/athens/social/coffee-island-spata',
    },
    {
        image: '/assets/images/deliver/social/instagram.avif',
        link: 'https://wolt.com/en/grc/athens/social/coffee-island-spata',
    },
];