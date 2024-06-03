import React from 'react';

import { Box } from '@mui/material';

import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import MessageCardCrypto from './message-card-crypto';

const MessageCrypto: React.FC = () => {
    const carousel = useCarousel({
        slidesToShow: 2,
        swipe: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, centerPadding: '0' },
            },
        ],
    })

    return <Box sx={{
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
                    [1, 2, 3, 4].map((item, index) => <Box key={`carousel-key-${index}`} sx={{
                        px: 0.5
                    }}>
                        <MessageCardCrypto />
                    </Box>)
                }
            </Carousel>
        </CarouselArrows>
    </Box>;
}

export default MessageCrypto;