'use client';

import { Box } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';


export default function HomeView() {
    const smUp = useResponsive("up", "sm")

    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: smUp ? "row" : "column",
            justifyContent: 'start',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            Home Page
        </Box>
    );
}
