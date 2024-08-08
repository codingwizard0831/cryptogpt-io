// Desc: This file contains the content of the strategy dashboard.

import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { Box, Stack, alpha, BoxProps, Typography } from '@mui/material';
import {
    LinePlot,
    MarkPlot,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CardFlip from 'src/components/card-flip/card-flip';


interface DashboardStrategyCardProps extends BoxProps {

};

export default function DashboardStrategyCard({ sx, ...other }: DashboardStrategyCardProps) {

    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    return <CardFlip
        sx={{
            height: '440px',
        }}
        frontContent={
            <Box sx={{
                height: '100%',
                border: "1px solid white",
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 2,
                backgroundColor: (theme: any) => alpha(theme.palette.primary.dark, 0.2),
                backdropFilter: 'blur(10px)',
                ...sx,
            }} {...other}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                    <Iconify icon="mdi:bitcoin" sx={{
                        width: '32px',
                        height: '32px',
                    }} />
                    <Box>
                        <Typography variant="h5">Title</Typography>
                        <Typography variant="h6">Subtitle</Typography>
                    </Box>
                    <Image src="/assets/images/bitcoin.png" alt="" sx={{
                        width: '36px',
                        hegiht: '36px',
                        mb: 2,
                    }} />
                </Stack>

                <Box sx={{
                    borderRadius: 1.5,
                    backgroundColor: '#00000088',
                    p: 1,
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 1,
                    }}>

                        <ChartContainer
                            width={320}
                            height={164}
                            series={[
                                { type: 'line', data: [2400, 1398, 9800, 3908, 4800, 3800, 4300], color: '#FFAB00' },
                            ]}
                            xAxis={[{ scaleType: 'point', data: xLabels }]}
                            sx={{
                                [`& .${lineElementClasses.root}`]: {
                                    strokeWidth: 6,
                                },
                                [`& .${markElementClasses.root}`]: {
                                    scale: '0.6',
                                    fill: '#fff',
                                    strokeWidth: 6,
                                },
                            }}
                            disableAxisListener
                        >
                            <LinePlot />
                            <MarkPlot />
                        </ChartContainer>

                        <Typography variant="h4">MAX DRAWDOWN</Typography>
                        <Typography variant="h4">PER % WEEK</Typography>
                    </Box>

                    <Stack direction="row" justifyContent="space-between" sx={{
                        width: '100%',
                        borderTop: (theme: any) => `4px solid ${theme.palette.primary.main}`,
                        p: 1,
                    }}>
                        <Typography variant="h4">25%</Typography>
                        <Typography variant="h4">PER</Typography>
                        <Typography variant="h4">Week</Typography>
                    </Stack>
                </Box>
            </Box>
        }
        backContent={
            <Box sx={{
                border: "1px solid white",
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 2,
                backgroundColor: (theme: any) => alpha(theme.palette.primary.dark, 0.2),
                backdropFilter: 'blur(10px)',
                height: '100%',
                ...sx,
            }} {...other}>
                Back
            </Box>
        }
    />
}