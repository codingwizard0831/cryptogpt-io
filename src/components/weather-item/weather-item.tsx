import React from 'react';

import { weatherIcons } from 'src/components/effect-items/weather-card/weather-card';
import { WeatherCardPropsType } from 'src/components/effect-items/weather-card/types';

import Iconify from '../iconify';

export default function WeatherItem({ weather = 'sun', temperature = 20, sx, ...other }: WeatherCardPropsType) {
    return (
        <Iconify
            icon={weatherIcons[weather]}
            sx={{
                width: '32px',
                height: '32px',
                ...sx,
            }}
        />
    );
};