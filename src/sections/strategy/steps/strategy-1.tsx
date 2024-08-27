import { Area, XAxis, YAxis, Tooltip, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';

import { Box, Stack, Select, Button, BoxProps, MenuItem, Typography, ButtonBase, IconButton, FormControl, OutlinedInput, InputAdornment } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from "src/store/strategy/useStrategy";

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { StyledDialog } from 'src/components/styled-component';

import DashboardStrategyCoinSelector from '../dashboard-strategy-coin-selector';

interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}

interface DashboardStrategyStep1Props extends BoxProps {

};

export default function DashboardStrategyStep1({ sx, ...other }: DashboardStrategyStep1Props) {
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);
    const topAmountCase = useStrategy((state) => state.topAmountCase);
    const setTopAmountCase = useStrategy((state) => state.setTopAmountCase);
    const selectedPair = useStrategy((state) => state.selectedPair);
    const setSelectedPair = useStrategy((state) => state.setSelectedPair);
    const timeframe = useStrategy((state) => state.timeframe);
    const setTimeframe = useStrategy((state) => state.setTimeframe);
    const smUp = useResponsive("up", 'sm');
    const isPercentageForBalance = useBoolean(false);
    const isTradingPairSelectModalShow = useBoolean(false);

    const handleSwapCoin = () => {
        const [temp1, temp2] = [coin1, coin2];
        setCoin1(temp2);
        setCoin2(temp1);
    }

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Typography variant={smUp ? "h4" : 'h6'} color="primary" sx={{
            textAlign: smUp ? "center" : 'left',
            my: 2,
        }}>Choose the cryptocurrency pairs you want to trade.</Typography>

        <Stack direction="column" spacing={2} sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
        }}>

            <Stack direction='column' spacing={2}>
                <Typography variant="h4" sx={{
                    whitespace: 'nowrap',
                    mr: 11,
                }}>1. Start, Select Pair</Typography>

                <Stack direction="row" alignItems='center' justifyContent="space-between">
                    <IconButton onClick={() => isTradingPairSelectModalShow.onTrue()}>
                        <Iconify icon="tabler:search" sx={{
                            color: 'primary.main',
                            width: '24px',
                            height: '24px',
                        }} />
                    </IconButton>

                    <Stack direction="row" alignItems='center' justifyContent="center" spacing={2}>
                        <DashboardStrategyCoinSelector size={smUp ? "medium" : 'small'} currency={coin1} handleChange={setCoin1} />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <ButtonBase sx={{
                            }} onClick={() => handleSwapCoin()}>
                                <Image src="/assets/images/ethereum-to-dollar-swap.png" alt="swap" sx={{
                                    width: smUp ? '32px' : '24px',
                                    height: smUp ? '32px' : '24px',
                                }} />
                            </ButtonBase>
                        </Box>
                        <DashboardStrategyCoinSelector size={smUp ? "medium" : 'small'} currency={coin2} handleChange={setCoin2} />

                        <Select size={smUp ? "medium" : 'small'}
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value as string)}
                            sx={{
                                border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                            }}>
                            {
                                timeframesDummyData.map((item) => <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>)
                            }
                        </Select>
                    </Stack>

                    <IconButton onClick={() => isTradingPairSelectModalShow.onTrue()}>
                        <Iconify icon="tabler:search" sx={{
                            color: 'primary.main',
                            width: '24px',
                            height: '24px',
                        }} />
                    </IconButton>
                </Stack>
            </Stack>

            <Stack direction="column" sx={{
                width: '100%',
            }}>
                <Box
                    sx={{
                        position: 'relative',
                    }}
                >
                    <Box sx={{
                        width: '100%',
                        aspectRatio: '3 / 2',
                        maxHeight: '200px',
                    }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffd70055" strokeWidth={4} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#ddd"
                                    tick={{ fill: '#ddd' }}
                                />
                                <YAxis
                                    stroke="#ddd"
                                    tick={{ fill: '#ddd' }}
                                    domain={[0, 32000]}
                                    ticks={[0, 7500, 15000, 22500, 30000]}
                                />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            const changePercent = data.change !== 0 ? (data.change / (data.price - data.change) * 100).toFixed(2) : 0;
                                            return (
                                                <Box sx={{
                                                    p: 1,
                                                    borderRadius: 1,
                                                    backgroundColor: '#100e0d',
                                                }}>
                                                    <Typography sx={{ color: 'primary.main' }}>{`Time: ${label}`}</Typography>
                                                    <Typography sx={{ color: 'primary.main' }}>{`Price: ${data.price.toFixed(2)}`}</Typography>
                                                    <Typography sx={{ color: data.change > 0 ? "success.main" : "error.main" }}>{`Change: ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${changePercent}%)`}</Typography>
                                                    {
                                                        data.action &&
                                                        <Typography sx={{ color: data.action === 'Buy' ? "success.main" : "error.main" }}>{`Action: ${data.action}`}</Typography>
                                                    }
                                                </Box>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <defs>
                                    <linearGradient id="neonGradient-FFD700" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#ffd700"
                                    strokeWidth={6}
                                    fill="url(#neonGradient-FFD700)"
                                    filter="url(#neonGlow)"
                                />

                                <defs>
                                    <filter id="neonGlow" height="300%" width="300%" x="-75%" y="-75%">
                                        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {data.map((entry: DataPoint, index) => {
                                    if (entry.change !== 0) {
                                        return (
                                            <ReferenceLine
                                                key={`referenceline - ${index}`}
                                                x={entry.date}
                                                stroke={entry.change > 0 ? "#006400" : "#8B0000"}
                                                strokeWidth={2}
                                                label={{
                                                    value: entry.change > 0 ? '+' : '-',
                                                    position: 'top',
                                                    fill: entry.change > 0 ? "#006400" : "#8B0000",
                                                    style: { textShadow: `0 0 8px ${entry.change > 0 ? "#006400" : "#8B0000"}` }
                                                }}
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </AreaChart>
                        </ResponsiveContainer>

                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                        }}>

                            <FormControl size="small" variant="outlined" fullWidth>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type='text'
                                    startAdornment={
                                        <InputAdornment position="end">
                                            <Typography sx={{ color: 'primary.main' }}>{isPercentageForBalance.value ? "%" : "$"}</Typography>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <Button sizem="small" variant="contained" color="primary"
                                onClick={() => isPercentageForBalance.onToggle()}
                            >
                                {isPercentageForBalance.value ? "On" : "Off"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Stack>

            <Button variant="contained" color="primary" fullWidth>Continue/Select  Indicators</Button>
        </Stack>


        <StyledDialog maxWidth="lg" open={isTradingPairSelectModalShow.value} onClose={() => isTradingPairSelectModalShow.onFalse()}>
            <Box sx={{
                width: '60vw',
                maxWidth: '800px',
                minWidth: '400px',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                <Box sx={{
                    borderRadius: 1,
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Typography variant="h6" sx={{
                        color: 'primary.main',
                    }}>Traing Pair</Typography>

                    <Box sx={{
                        width: '100%',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                        }}>
                            {
                                pairAmountDummyData.map((item) => <Button variant={item.value === topAmountCase.value ? "contained" : 'outlined'} color="primary" key={item} startIcon={<Iconify icon="mingcute:down-line" />}
                                    onClick={() => setTopAmountCase(item)}
                                    sx={{
                                        flexShrink: 0,
                                    }}
                                >TOP {item.label}</Button>)
                            }
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        flexWrap: 'wrap',
                    }}>
                        {
                            pairsDummyData.filter((item) => item.amount <= topAmountCase.value).map((item) => <Button variant={item.value === selectedPair ? "contained" : 'outlined'} color="primary" key={item} onClick={() => setSelectedPair(item.value)}>{item.label}</Button>)
                        }
                    </Box>
                </Box>


                <Box sx={{
                    width: '100%',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: 1,

                    }}>
                        {
                            pairsDummyData.map((item) => <Button variant={item.value === selectedPair ? "contained" : 'outlined'} color="primary" key={`${item}-pair`}
                                onClick={() => setSelectedPair(item.value)}
                                sx={{
                                    flexShrink: 0,
                                }}
                            >{item.label}</Button>)
                        }
                    </Box>
                </Box>

                <Box sx={{
                    borderRadius: 1,
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Typography variant="h6" sx={{
                        color: 'primary.main',
                    }}>Time Frame</Typography>


                    <Box sx={{
                        width: '100%',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            gap: 1,
                        }}>
                            {
                                timeframesDummyData.map((item) => <Button variant={item.value === timeframe ? "contained" : 'outlined'} color="primary" key={`${item}-timeframe`}
                                    onClick={() => setTimeframe(item.value)}
                                    sx={{
                                        flexShrink: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.5,
                                    }}
                                >
                                    <Iconify icon={item.icon} />
                                    <Typography variant="caption">{item.label}</Typography>
                                    <Iconify icon="et:strategy" />
                                </Button>)
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </StyledDialog>
    </Box>
}

const data: DataPoint[] = [
    { date: '2023-01', price: 16500, change: 0 },
    { date: '2023-02', price: 21000, change: 0 },
    { date: '2023-03', price: 18500, change: -0.1, action: 'Sell' },
    { date: '2023-04', price: 15500, change: 0.1, action: 'Buy' },
    { date: '2023-05', price: 17500, change: 0.1 },
    { date: '2023-06', price: 11000, change: -0.1, action: 'Sell' },
    { date: '2023-07', price: 19500, change: 0.0 },
    { date: '2023-08', price: 16500, change: -0.1, action: 'Sell' },
];

const pairAmountDummyData = [
    {
        value: 100,
        label: '100',
    },
    {
        value: 200,
        label: '200',
    },
    {
        value: 300,
        label: '300',
    },
    {
        value: 400,
        label: '400',
    },
    {
        value: 500,
        label: '500',
    },
    {
        value: 1000,
        label: '1k',
    },
];

const pairsDummyData = [
    {
        value: "BTC/USDT",
        label: "BTC/USDT",
        amount: 100,
    },
    {
        value: "ETH/USDT",
        label: "ETH/USDT",
        amount: 200,
    },
    {
        value: "BNB/USDT",
        label: "BNB/USDT",
        amount: 300,
    },
    {
        value: "ADA/USDT",
        label: "ADA/USDT",
        amount: 400,
    },
    {
        value: "SOL/USDT",
        label: "SOL/USDT",
        amount: 500,
    },
    {
        value: "DOT/USDT",
        label: "DOT/USDT",
        amount: 1000,
    },
];

const timeframesDummyData = [
    {
        value: "5m",
        label: "5m",
        icon: "mingcute:time-line",
    },
    {
        value: "10m",
        label: "10m",
        icon: "mingcute:time-line",
    },
    {
        value: "15m",
        label: "15m",
        icon: "mingcute:time-line",
    },
    {
        value: "30m",
        label: "30m",
        icon: "mingcute:time-line",
    },
    {
        value: "1h",
        label: "1h",
        icon: "mingcute:time-line",
    },
    {
        value: "4h",
        label: "4h",
        icon: "mingcute:time-line",
    },
    {
        value: "1d",
        label: "1d",
        icon: "lets-icons:date-today",
    },
    {
        value: "1w",
        label: "1w",
        icon: "lets-icons:date-today",
    },
    {
        value: "1m",
        label: "1m",
        icon: "lets-icons:date-today",
    },
    {
        value: "1y",
        label: "1y",
        icon: "lets-icons:date-today",
    },
];