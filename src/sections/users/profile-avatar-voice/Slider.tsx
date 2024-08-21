'use client';

import React from 'react';

import {
    Box,
    Slider,
    Typography,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAuthContext } from 'src/auth/hooks';

interface SliderItem {
    startText: string;
    endText: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

const SliderComponent: React.FC<SliderItem> = ({ startText, endText, value, setValue }) => {
    const smUp = useResponsive('up', 'sm');
    const { user } = useAuthContext();

    const handleValueChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>{startText}</Typography>
                <Slider
                    value={value}
                    onChange={handleValueChange}
                    sx={{
                        width: '80%',
                        color: theme => theme.palette.primary.main,
                        '& .MuiSlider-thumb': {
                            bgcolor: theme => theme.palette.primary.main
                        },
                        '& .MuiSlider-track': {
                            bgcolor: theme => theme.palette.primary.main
                        }
                    }}
                />
                <Typography>{endText}</Typography>
            </Box>
            <Typography sx={{ textAlign: "center" }}>{value}%</Typography>
        </>
    );
}

export default SliderComponent;