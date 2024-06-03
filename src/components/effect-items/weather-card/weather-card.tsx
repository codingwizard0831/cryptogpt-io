import React from 'react';

import { Box, alpha, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

import { WeatherCardPropsType } from './types';

type WeatherIconMappingType = {
    [key in WeatherCardPropsType['weather']]: string;
}

export const weatherIcons: WeatherIconMappingType = {
    rain: 'meteocons:raindrop-fill',
    sun: 'meteocons:sunset-fill',
    cloud: 'meteocons:cloud-up-fill',
    fog: 'meteocons:extreme-night-fog',
    snow: 'meteocons:snowflake-fill',
    storm: 'meteocons:flag-storm-warning-fill',
    wind: 'meteocons:dust-wind-fill',
    thunder: 'meteocons:thunderstorms',
    drizzle: 'meteocons:extreme-night-drizzle',
    hail: 'meteocons:hail-fill',
    sleet: 'icon-sleet',
    mist: 'icon-mist',
    smoke: 'icon-smoke',
    haze: 'icon-haze',
    dust: 'icon-dust',
    sand: 'icon-sand',
    ash: 'icon-ash',
    squall: 'icon-squall',
    tornado: 'icon-tornado',
    clear: 'icon-clear',
    clouds: 'meteocons:overcast-day-smoke-fill',
    "tropical-storm": 'icon-tropical-storm',
    hurricane: 'icon-hurricane',
    cold: 'icon-cold',
    hot: 'icon-hot',
    windy: 'icon-windy',
    calm: 'icon-calm',
    "light-breeze": 'icon-light-breeze',
    "gentle-breeze": 'icon-gentle-breeze',
    "moderate-breeze": 'icon-moderate-breeze',
    "fresh-breeze": 'icon-fresh-breeze',
    "strong-breeze": 'icon-strong-breeze',
    "high-wind": 'icon-high-wind',
    gale: 'icon-gale',
    "severe-gale": 'icon-severe-gale',
    "violent-storm": 'icon-violent-storm',
    '': 'icon-default'
}

export default function WeatherCard({ city = 'Dunmore, Ireland', temperature = 23, weather = "rain", sx, ...other }: WeatherCardPropsType) {
    return <Box sx={{
        bgcolor: (theme) => alpha(theme.palette.background.default, 0.2),
        borderRadius: "10px",
        backdropFilter: 'blur(10px)',
        px: 2,
        display: 'flex',
        alignItems: 'center',
        ...sx
    }} {...other}>
        <Iconify
            icon={weatherIcons[weather]} sx={{ width: '55px', height: '55px', mr: 1 }}
        />
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant='subtitle2' component='div' sx={{ fontSize: '20px', lineHeight: '24px' }}>{temperature} °C</Typography>
            <Typography variant='caption' component='p'>{city}</Typography>
        </Box>
    </Box>
}