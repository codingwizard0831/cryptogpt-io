import React from "react";

import { Box, BoxProps } from "@mui/material";

import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import SolarSliderBoxItem from "./solar-slider-box-item";

type SolarSliderBoxProps = {} & BoxProps;

const SolarSliderBox: React.FC<SolarSliderBoxProps> = ({ sx, ...other }: SolarSliderBoxProps) => {

    const carousel = useCarousel({
        slidesToShow: 3,
    })

    return (
        <Box sx={{
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            boxShadow: 1,
            p: 1,
            ...sx
        }} {...other} >
            <CarouselArrows
                filled
                icon="ic:round-navigate-next"
                onNext={carousel.onNext}
                onPrev={carousel.onPrev}
                leftButtonProps={{
                    size: 'small',
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(10px)',
                        fontSize: 20,
                        left: 0,
                        ':hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        }
                    }
                }}
                rightButtonProps={{
                    size: 'small',
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(10px)',
                        fontSize: 20,
                        right: 0,
                        ':hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        }
                    }
                }}
            >
                <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                    {
                        [0, 1, 2, 3, 4].map((item, index) => <Box key={index} sx={{
                            px: 0.5,
                        }}>
                            <SolarSliderBoxItem sx={{ mx: 'auto' }} />
                        </Box>)
                    }
                </Carousel>
            </CarouselArrows>
        </Box>
    );
}

export default SolarSliderBox;