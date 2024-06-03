'use client';

import { Box, alpha, BoxProps, useTheme, Typography } from "@mui/material";

import Iconify from "src/components/iconify";

interface FareOptionItemProps extends BoxProps {
    isSelected?: boolean;
}

export default function FareOptionItem({ isSelected = false, sx, ...other }: FareOptionItemProps) {
    const theme = useTheme();

    return <Box sx={{
        width: '300px',
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        backdropFilter: 'blur(10px)',
        flexShrink: 0,
        borderRadius: '10px',
        transition: 'all .3s',
        cursor: 'pointer',
        ...(isSelected && {
            borderColor: alpha(theme.palette.primary.main, 0.2),
            boxShadow: `0px 0px 10px 4px ${alpha(theme.palette.primary.main, 0.2)}`,
        }),
        '&:hover': {
            boxShadow: `0px 0px 10px 4px ${alpha(theme.palette.divider, 0.2)}`,
        },
        ...sx,
    }} {...other}>
        <Box sx={{
            p: 2,
            pb: 5,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
            }}>
                <Box>
                    <Typography variant='body2' sx={{ fontStyle: 'normal', color: theme.palette.text.secondary }}>ECONOMY</Typography>
                    <Typography variant='body2' sx={{ color: theme.palette.text.primary }}>Basic</Typography>
                </Box>
                <Iconify icon="lets-icons:check-fill" sx={{
                    width: '36px',
                    height: '36px',
                    fontSize: 'primary.main',
                    transition: 'all .3s',
                    opacity: isSelected ? 1 : 0,
                }} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Iconify icon="material-symbols:airplane-ticket-outline" sx={{ color: 'text.secondary' }} />
                <Typography sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Changeable (£50.00 fee)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Iconify icon="gridicons:refund" sx={{ color: 'text.secondary' }} />
                <Typography sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Refundable (£50.00 fee)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Iconify icon="mingcute:time-line" sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Hold space for 3 days</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Iconify icon="mingcute:time-line" sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Hold price for 2 days</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Iconify icon="mdi:bag-suitcase" sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Includes carry-on bags</Typography>
            </Box>
        </Box>

        <Box sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.2),
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'end',
            gap: 1,
            p: 2,
            pt: 5,
        }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>total amount from</Typography>
            <Typography variant="subtitle1">€356.63</Typography>
        </Box>
    </Box>
}