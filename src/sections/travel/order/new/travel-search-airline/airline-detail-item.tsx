'use client';

import React from 'react';

import { Box, alpha, Button, BoxProps, useTheme, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import FlightDetailItem from './flight-detail-item';

export interface AirlineDetailItemProps extends BoxProps {
}

export default function AirlineDetailItem({ sx, ...other }: AirlineDetailItemProps) {
    const theme = useTheme();
    const isShowTimeline = useBoolean(false);

    return <Box sx={{
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        backgroundColor: alpha(theme.palette.background.default, 0.2),
        cursor: 'pointer',
        mb: 2,
        ...sx,
    }} onClick={isShowTimeline.onToggle}>
        <FlightDetailItem isShowTimeline={isShowTimeline.value} />

        <Box sx={{
            display: 'flex',
            alignItems: 'end',
            gap: 1,
            p: 2,
        }}>
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>From</Typography>
            <Typography variant='h6' sx={{ color: 'text.secondary', flex: 1, }}>€41.49</Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                {
                    isShowTimeline.value ?
                        <Button variant='contained' size='small' color='primary'>Select</Button>
                        : <>
                            <Iconify icon="ph:warning-circle" sx={{ color: theme.palette.error.main }} />
                            <Typography variant='body2' >Offer expired</Typography>
                        </>
                }
            </Box>
        </Box>
    </Box>
}