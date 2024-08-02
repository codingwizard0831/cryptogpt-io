// Desc: This file contains the content of the strategy dashboard.


import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { Box, Stack, Select, BoxProps, MenuItem, Typography, ButtonBase } from '@mui/material';
import {
    LinePlot,
    MarkPlot,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';

import Image from 'src/components/image';

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
    }}>
        <Typography variant="h4" color="primary" sx={{ textAlign: "center", my: 2 }}>Choose the cryptocurrency pairs you want to trade.</Typography>
        <Stack direction='row' alignItems="center" spacing={2} sx={{ width: '90%', mb: 2 }}>
            <Typography variant="h4" sx={{
                whitespace: 'nowrap',
            }}>1. Start, Select Pair</Typography>
            <DashboardStrategyCoinSelector currency="Bitcon" />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <ButtonBase sx={{
                }}>
                    <Image src="/assets/icons/project/ethereum-to-dollar-swap.png" alt="swap" sx={{
                        width: '96px',
                        height: '96px',
                    }} />
                </ButtonBase>
            </Box>

            <DashboardStrategyCoinSelector currency="USDT" />
        </Stack>


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
                    backdropFilter: 'blur(10px)',
                    backgroundColor: '#ffffff11',
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
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                <Select size="small" value="5m" sx={{
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                }}>
                    <MenuItem value="5m">5m</MenuItem>
                    <MenuItem value="10m">10m</MenuItem>
                    <MenuItem value="15m">15m</MenuItem>
                    <MenuItem value="30m">30m</MenuItem>
                    <MenuItem value="1h">1h</MenuItem>
                    <MenuItem value="4h">4h</MenuItem>
                </Select>

                <Box sx={{
                    height: '38px',
                    position: 'relative',
                    flex: 1,
                    backgroundImage: 'linear-gradient(to right, #0063ff,#08ff10,#ffb300)',
                }}>
                    <Box sx={{
                        position: 'absolute',
                        left: '50%',
                        bottom: '38px',
                        width: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Box component="span" sx={{
                            display: 'inline-block',
                            height: '32px',
                            color: '#ffffff',
                            lineHeight: '32px',
                            textAlign: 'center',
                            fontWeight: '700',
                            whiteSpace: 'nowrap',
                            borderRadius: 0.5,
                            backgroundColor: 'success.darker',
                        }}>
                            <Typography component="span" sx={{
                                color: "white",
                                fontWeight: '700',
                                p: 0.25,
                                mx: 0.5,
                            }}>$67.230,23</Typography>
                            <Typography component="span" sx={{
                                color: "success.main",
                            }}>(+7%)</Typography>
                        </Box>
                        <Box sx={{
                            width: '5px',
                            height: '10px',
                            backgroundColor: '#ffffff',
                        }} />
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                width: "320px",
                height: '40px',
                position: 'relative',
                flex: 1,
                mt: 0.25,
            }}>
                <Box sx={{
                    position: 'absolute',
                    left: '0px',
                    width: '100%',
                    height: '8px',
                    top: '16px',
                    background: 'linear-gradient(to right, #0063ff 0%, #0063ff 25%, transparent 25%, transparent 75%, #ffb300 75%, #ffb300 100%)',
                }} />

                <Box sx={{
                    position: 'absolute',
                    left: '0px',
                    width: '100%',
                    height: '24px',
                    top: '8px',
                    background: 'linear-gradient(to right, transparent 0%, transparent 25%, #08ff10 25%, #08ff10 75%, transparent 75%, transparent 100%)',
                }} />
                <Box sx={{
                    position: 'absolute',
                    left: '0px',
                    width: '100%',
                    height: '40px',
                    top: '0px',
                    background: 'linear-gradient(to right, transparent 0%, transparent 85%, #fff 85%, #fff 87%, transparent 85.5%, transparent 100%)',
                }} />
            </Box>
        </Box>

    </Box>
}