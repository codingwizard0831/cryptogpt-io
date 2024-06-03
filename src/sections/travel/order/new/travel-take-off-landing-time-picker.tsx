import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, alpha, Button, Slider, BoxProps, Typography, IconButton } from '@mui/material';

import Iconify from "src/components/iconify";

interface TravelTakeOffLandingTimePickerProps extends BoxProps {
    onClose?: () => void;
    takeOffTime?: number[];
    landingTime?: number[];
    onChangeTakeOffTime?: (newValue: number[]) => void;
    onChangeLandingTime?: (newValue: number[]) => void;
}

export default function TravelTakeOffLandingTimePicker({ onClose,
    takeOffTime: defaultTakeOffTime = [0, 24],
    landingTime: defaultLandingTime = [0, 24],
    onChangeTakeOffTime,
    onChangeLandingTime,
    sx, ...other }: TravelTakeOffLandingTimePickerProps) {
    const [takeOffTime, setTakeOffTime] = useState<number[]>([...defaultTakeOffTime]);
    const [landingTime, setLandingTime] = useState<number[]>([...defaultLandingTime]);

    const handleChangeTakeOffTime = (event: Event, newValue: number | number[]) => {
        setTakeOffTime(newValue as number[]);
    };

    const handleChangeLandingTIme = (event: Event, newValue: number | number[]) => {
        setLandingTime(newValue as number[]);
    };

    const handleConfirm = () => {
        if (onChangeTakeOffTime) {
            onChangeTakeOffTime(takeOffTime);
        }
        if (onChangeLandingTime) {
            onChangeLandingTime(landingTime);
        }
        if (onClose) onClose();
    }

    return (
        <Box sx={{
            width: '90vw',
            maxWidth: '400px',
            borderRadius: 1,
            boxShadow: 2,
            p: 3,
            backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
            backdropFilter: 'blur(10px)',
            ...sx,
        }} {...other}>
            <Box sx={{
                mb: 2,
            }}
            >

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Iconify icon="mdi:airplane-takeoff" sx={{ width: '24px', height: '24px', mr: 1 }} />
                    <Typography sx={{ fontSize: '14px', flex: 1 }}>Take-off</Typography>
                    {
                        takeOffTime[0] === 0 && takeOffTime[1] === 24 ?
                            <Typography sx={{ height: '30px', color: theme => theme.palette.primary.main, fontSize: '12px' }}>at any time</Typography>
                            :
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <Typography sx={{ color: theme => theme.palette.primary.main, fontSize: '12px', mr: 1 }}>
                                    {filterValueToTime(takeOffTime[0])} - {filterValueToTime(takeOffTime[1])}
                                </Typography>
                                <IconButton onClick={() => setTakeOffTime([0, 24])} size='small'><CloseIcon fontSize='small' /></IconButton>
                            </Box>
                    }
                </Box>
                <Box sx={{ px: 2 }}>
                    <Slider
                        marks={markPrices}
                        value={takeOffTime}
                        min={0}
                        max={24}
                        onChange={handleChangeTakeOffTime}
                        getAriaValueText={filterValueToTime}
                    />
                </Box>
            </Box>
            <Box sx={{
                mb: 2,
            }} >

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Iconify icon="mdi:airplane-landing" sx={{ width: '24px', height: '24px', mr: 1 }} />
                    <Typography sx={{ fontSize: '14px', flex: 1 }}>Landing</Typography>
                    {
                        landingTime[0] === 0 && landingTime[1] === 24 ?
                            <Typography sx={{ height: '30px', color: theme => theme.palette.primary.main, fontSize: '12px' }}>at any time</Typography>
                            :
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <Typography sx={{ color: theme => theme.palette.primary.main, fontSize: '12px', mr: 1 }}>
                                    {filterValueToTime(landingTime[0])} - {filterValueToTime(landingTime[1])}
                                </Typography>
                                <IconButton onClick={() => setTakeOffTime([0, 24])} size='small'><CloseIcon fontSize='small' /></IconButton>
                            </Box>
                    }
                </Box>

                <Box sx={{ px: 2 }}>
                    <Slider
                        marks={markPrices}
                        value={landingTime}
                        min={0}
                        max={24}
                        onChange={handleChangeLandingTIme}
                        getAriaValueText={filterValueToTime}
                    />
                </Box>
            </Box>

            <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained" size="small" color="primary" onClick={handleConfirm}>Confirm</Button>
            </Stack>
        </Box>
    );
}


const markPrices = [
    { value: 0, label: '00:00' },
    { value: 8, label: '08:00' },
    { value: 16, label: '16:00' },
    { value: 24, label: '23:59' },
];


function filterValueToTime(value: number) {
    return value > 9 ? `${value}:00` : `0${value}:00`;
}