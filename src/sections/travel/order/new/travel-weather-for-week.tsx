import React from "react";

import { Box, alpha, BoxProps, useTheme, Typography } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import WeatherItem from "src/components/weather-item/weather-item";


type TravelWeatherForWeekProps = {
    short?: boolean;
} & BoxProps;

const TravelWeatherForWeek: React.FC<TravelWeatherForWeekProps> = ({ short = false, sx, ...other }: TravelWeatherForWeekProps) => {
    const theme = useTheme();
    const upMd = useResponsive('up', 'md');

    return (
        <Box sx={{
            width: upMd ? '500px' : '100%',
            ...sx,
        }}>
            {short === false &&
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: alpha(theme.palette.background.default, 0.2),
                    border: `dashed 1px ${theme.palette.divider}`,
                    borderRadius: '10px',
                    boxShadow: 1,
                    overflowX: 'auto',
                    p: 1,
                    mb: 2,
                }}>
                    <WeatherItem weather="cloud" sx={{ width: upMd ? '86px' : '56px', height: '56px' }} />
                    <Box sx={{
                        flex: 1,
                        mx: 1,
                    }}>
                        <Typography sx={{ fontSize: 24 }}>Rain</Typography>
                        <Typography sx={{ fontSize: 14, color: theme.palette.text.secondary }}>{filterViewToShortDate(`${new Date()}`)}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: 16 }}>3.5 °C</Typography>
                        <Typography sx={{ fontSize: 14, color: theme.palette.text.secondary, textAlign: 'right' }}>95%</Typography>
                    </Box>
                </Box>
            }

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                backdropFilter: 'blur(10px)',
                backgroundColor: alpha(theme.palette.background.default, 0.2),
                border: `dashed 1px ${theme.palette.divider}`,
                borderRadius: '10px',
                boxShadow: 1,
                overflowX: 'auto',
                p: 1,
            }} {...other} >
                {
                    weatherDataForWeek.map((item, index) => <Box key={index} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "64px",
                        position: 'relative',
                        ml: 1,
                    }}>
                        <Typography variant="subtitle2" sx={{ fontSize: 14 }}>{filterViewFromDateToDay(item.date)}</Typography>
                        <WeatherItem weather={item.weather} sx={{ width: '42px', height: '42px' }} />
                        <Typography sx={{ fontSize: 11, }}>{filterViewToShortDate(item.date)}</Typography>
                        <Typography sx={{
                            fontSize: 10,
                            color: theme.palette.text.secondary,
                        }}>{item.temperature} °C</Typography>
                    </Box>)
                }
            </Box>
        </Box>
    );
}

export default TravelWeatherForWeek;

const weatherDataForWeek = [
    { day: "Monday", weather: "rain", temperature: 23, date: "2021-10-11" },
    { day: "Tuesday", weather: "cloud", temperature: 22, date: "2021-10-12" },
    { day: "Wednesday", weather: "sun", temperature: 24, date: "2021-10-13" },
    { day: "Thursday", weather: "rain", temperature: 23, date: "2021-10-14" },
    { day: "Friday", weather: "cloud", temperature: 22, date: "2021-10-15" },
    { day: "Saturday", weather: "sun", temperature: 24, date: "2021-10-16" },
    { day: "Sunday", weather: "rain", temperature: 23, date: "2021-10-17" },
] as const;

const filterViewFromDateToDay = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { weekday: 'short' });
}

const filterViewToShortDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}