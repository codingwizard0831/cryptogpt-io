'use client';

import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';

export default function ModelCreateView() {

    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'start',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Box>It's model create view</Box>
        </Box>
    );
}
