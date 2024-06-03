import React from 'react';

import { Box } from '@mui/material';

import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import MessageCardSource from './message-card-source';

const MessageSource: React.FC = () => {
    const carousel = useCarousel({
        slidesToShow: 3,
        swipe: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, centerPadding: '0' },
            },
        ],
    })
    return <>
        {/* Source Card List */}
        <Box sx={{
            width: "100%",
            overflow: 'hidden',
            position: 'relative',
        }}>
            <CarouselArrows
                filled
                icon="ic:round-navigate-next"
                onNext={carousel.onNext}
                onPrev={carousel.onPrev}
            >
                <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                    {
                        [1, 2, 3, 4].map((item, index) => <Box key={`key-${index}`} sx={{
                            px: 0.5
                        }}>
                            <MessageCardSource />
                        </Box>)
                    }
                </Carousel>
            </CarouselArrows>
        </Box>
    </>;
}

export default MessageSource;