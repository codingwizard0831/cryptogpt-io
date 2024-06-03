import React from 'react';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface ProgressCircleBarProps {
    value: number;
    size?: number;
}

export default function ProgressCircleBar({ value, size = 200 }: ProgressCircleBarProps) {

    // Calculate the stroke dash offset
    const normalizedValue = (value / 100) * 100;
    const strokeDashoffset = 100 - normalizedValue;

    return (
        <Box sx={{
            position: 'relative',
            display: 'inline-block',
            width: size,
            height: size,
            borderRadius: '50%',
            overflow: 'hidden',
        }}>
            <CircularProgress
                variant="determinate"
                value={100}  // Full circle background
                size={size}
                thickness={1.8}
                sx={{
                    color: '#e2eff0',  // Background circle color
                    transform: 'rotate(-90deg)',
                    '&& .MuiCircularProgress-circleDeterminate': {
                        strokeLinecap: 'round',
                    }
                }}
            />
            <CircularProgress
                variant="determinate"
                value={value}
                size={size}
                thickness={1.8}
                sx={{
                    color: '#78bec7',  // Progress circle color
                    transform: 'rotate(-90deg)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    strokeDasharray: '100 100',
                    strokeDashoffset,
                    transition: 'stroke-dashoffset 1s ease-in-out',
                    strokeLinecap: 'round',
                }}
            />
        </Box>
    );
}