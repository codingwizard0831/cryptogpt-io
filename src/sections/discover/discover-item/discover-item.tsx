'use client';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Card, Avatar, IconButton, Typography } from '@mui/material';

import Image from 'src/components/image/image';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

const DiscoverItem = () => {
    const carousel = useCarousel({
        // autoplay: true,
        ...CarouselDots({
            rounded: true,
            sx: {
            },
        }),
    });
    return <Card sx={{
        bgcolor: (theme) => alpha(theme.palette.background.default, 0.2),
        backdropFilter: 'blur(10px)',
    }}>
        <Box sx={{
            position: 'relative',
            width: "100%",
        }}>
            <Box sx={{
                position: 'absolute',
                left: '10px',
                top: '10px',
                display: 'flex',
                zIndex: 10,
                gap: 1,
            }}>
                <Typography variant='caption' sx={{
                    px: 1,
                    py: 0.5,
                    color: theme => theme.palette.grey[800],
                    backgroundColor: theme => alpha(theme.palette.grey[100], 0.8),
                    backdropFilter: 'blur(10px)',
                    lineHeight: "1!important",
                    borderRadius: "15px !important",
                }}>Books</Typography>
                <Typography variant='caption' sx={{
                    px: 1,
                    py: 0.5,
                    color: theme => theme.palette.grey[800],
                    backgroundColor: theme => alpha(theme.palette.grey[100], 0.8),
                    backdropFilter: 'blur(10px)',
                    lineHeight: "1!important",
                    borderRadius: "15px !important",
                }}>Gallery</Typography>
            </Box>
            <Box sx={{
                position: 'absolute',
                right: '5px',
                top: '5px',
                zIndex: 10,
            }}>
                <IconButton sx={{
                    backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
                    backdropFilter: 'blur(10px)',
                }}>
                    <BookmarkBorderIcon fontSize='small' />
                </IconButton>
            </Box>

            <CarouselArrows
                filled
                shape="rounded"
                onNext={carousel.onNext}
                onPrev={carousel.onPrev}
            >
                <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                    {
                        [1, 2, 3, 4, 5, 6].map((item, index) => <Box key={index} sx={{
                            aspectRatio: '1 / 1',
                        }}>
                            <Image src='/assets/images/project/test.webp' width="100%" height="100%" alt='cover' />
                        </Box>)
                    }
                </Carousel>
            </CarouselArrows>
        </Box>
        <Box sx={{
            display: 'flex',
            p: 2,
        }}>
            <Avatar src='https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg' sx={{
                width: '36px',
                height: '36px'
            }} />
            <Box sx={{
                ml: 1,
            }}>
                <Typography variant='h6' sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    fontSize: '1rem !important',

                }}>Mind games: How gaming can play a positive role in</Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 1,
                }}>
                    <Typography variant='subtitle2'>Ester Howard</Typography>
                    <Typography variant='caption' sx={{ ml: 1 }}>Aug 24, 2023</Typography>
                </Box>
            </Box>
        </Box>
    </Card>
}

export default DiscoverItem;