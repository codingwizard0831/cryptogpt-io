import React from 'react';

import {
    Box,
    Typography,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import CircularProgressChart from './circle-progress-chart';

interface ChartItem {
    value: number;
    limit_value: string;
    percentage: number;
}

const PlanUsageModalChart: React.FC<ChartItem> = ({ value, limit_value, percentage }) => {
    const smUp = useResponsive("up", "sm");
    return (
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 2, mb: 2, flexDirection: smUp ? 'row' : 'column' }}>
            <CircularProgressChart percentage={percentage} />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: smUp ? 'flex-start' : 'center' }}>
                <Typography variant="h6" component="div" fontWeight="bold">
                    {value}
                </Typography>
                <Typography variant="h6" component="div" fontWeight="bold">
                    {`${limit_value} limit`}
                </Typography>
            </Box>
        </Box >
    )
};


export default PlanUsageModalChart;