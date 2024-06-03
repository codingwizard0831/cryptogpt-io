'use client';

import { Box, BoxProps, useTheme, Typography } from "@mui/material";

import Iconify from "src/components/iconify";
import Image from "src/components/image/image";

interface FareRouteItemProps extends BoxProps {
    isComment?: boolean;
}

export default function FareRouteItem({ isComment = true, sx, ...other }: FareRouteItemProps) {
    const theme = useTheme();

    return (
        <Box sx={{
            mb: 2,
            ...sx,
        }} {...other}>
            <Box sx={{
                width: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}>
                <Image src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BP.svg" sx={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>22:27</Typography>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>BVA</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography variant="body2" sx={{ fontSize: "12px", color: 'text.secondary' }}>11h 06m</Typography>
                    <Box sx={{
                        width: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Box sx={{
                            flex: 1,
                            width: '100px',
                            height: '2px',
                            backgroundColor: theme.palette.text.secondary,
                        }} />
                        <Iconify icon="fluent-mdl2:airplane" sx={{ color: 'text.secondary' }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: "12px", color: 'text.secondary' }}>Direct</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>03:33<Typography variant="caption" sx={{ position: 'relative', bottom: '5px' }}>+1</Typography></Typography>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>DFW</Typography>
                </Box>
            </Box>

            {
                isComment && <Typography variant="body2" sx={{ fontSize: '12px', color: 'text.secondary', mt: 1 }}>Choose a fare option for the previous flight to see the available fares for this flight.
                </Typography>
            }
        </Box>
    );
}