// Desc: This file contains the content of the strategy dashboard.


import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { Box, Stack, Select, BoxProps, MenuItem, Typography } from '@mui/material';
import {
    LinePlot,
    MarkPlot,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';

import DashboardStrategyCoinSelector from '../dashboard-strategy-coin-selector';

interface DashboardStrategyStep1Props extends BoxProps {

}

export default function DashboardStrategyStep1({ sx, ...other }: DashboardStrategyStep1Props) {

    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    return <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
    }}>
        <Typography variant="h3" color="primary" sx={{ textAlign: "center", my: 2 }}>Choose the cryptocurrency pairs you want to trade.</Typography>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>This selection will determine the market data used for your strategy.</Typography>

        <Box sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ChartContainer
                width={320}
                height={260}
                series={[
                    { type: 'line', data: [2400, 1398, 9800, 3908, 4800, 3800, 4300], color: '#FFAB00' },
                    { type: 'line', data: [0, 2000, 1398, 9800, 3908, 4800, 3800], color: '#00C853' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                sx={{
                    [`& .${lineElementClasses.root}`]: {
                        strokeWidth: 6,
                    },
                    [`& .${markElementClasses.root}`]: {
                        scale: '0.6',
                        fill: '#fff',
                        strokeWidth: 8,
                    },
                }}
                disableAxisListener
            >
                <LinePlot />
                <MarkPlot />
            </ChartContainer>

            <Box sx={{
                width: '320px',
                height: '40px',
                position: 'relative',
            }}>
                <Box sx={{
                    position: 'absolute',
                    left: '0px',
                    width: '100%',
                    height: '8px',
                    top: '16px',
                    backgroundColor: "#FFAB00",
                }} />

                <Box sx={{
                    position: 'absolute',
                    left: '0px',
                    width: '100%',
                    height: '24px',
                    top: '8px',
                    background: 'linear-gradient(to right, transparent 0%, transparent 25%, #FFAB00 25%, #FFAB00 75%, transparent 75%, transparent 100%)',
                }} />
                <Box sx={{
                    position: 'absolute',
                    left: '0px',
                    width: '100%',
                    height: '40px',
                    top: '0px',
                    background: 'linear-gradient(to right, transparent 0%, transparent 85%, #FFAB00 85%, #FFAB00 87%, transparent 85.5%, transparent 100%)',
                }} />
            </Box>
        </Box>

        <Stack direction='row' justifyContent="space-around" sx={{ width: '100%' }}>
            <DashboardStrategyCoinSelector currency="BNB" />

            <Select value="Bitcoin">
                <MenuItem value="CrGPT">CrGPT</MenuItem>
                <MenuItem value="Bitcoin">Bitcoin</MenuItem>
                <MenuItem value="USDT">USDT</MenuItem>
            </Select>
        </Stack>
        <Typography variant="h5" sx={{
            textAlign: "center",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            color: 'white',
            backgroundColor: 'primary.main',
        }}>The quick brawn fox jumps over the lazy dog</Typography>
    </Box>
}