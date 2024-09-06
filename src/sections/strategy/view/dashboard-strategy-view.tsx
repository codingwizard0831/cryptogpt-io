'use client';


import Slider from "react-slick";

import { Box, Card } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Carousel, { useCarousel } from 'src/components/carousel';

import DashboardStrategyCard from '../dashboard-strategy-card';


export default function DashboardStrategyView() {
  const isShowSummary = useStrategy((state) => state.isShowSummary);
  const setIsShowSummary = useStrategy((state) => state.setIsShowSummary);
  const smUp = useResponsive("up", 'sm');

  const carousel = useCarousel({
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  })
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
        pb: 2,
      }}
    >
      <Card
        sx={{
          p: 1,
          flex: 1,
          borderRadius: 1,
          boxShadow: 2,
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >

        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => <Box key={`key-${index}`} sx={{
              px: 0.5,
              width: '300px',
            }}>
              <DashboardStrategyCard />
            </Box>)
          }
        </Carousel>

        <Slider {...settings}>
          <div style={{ width: 100 }}>
            <p>100</p>
          </div>
          <div style={{ width: 200 }}>
            <p>200</p>
          </div>
          <div style={{ width: 75 }}>
            <p>75</p>
          </div>
          <div style={{ width: 300 }}>
            <p>300</p>
          </div>
          <div style={{ width: 225 }}>
            <p>225</p>
          </div>
          <div style={{ width: 175 }}>
            <p>175</p>
          </div>
        </Slider>
      </Card>
    </Box>
  );
}
