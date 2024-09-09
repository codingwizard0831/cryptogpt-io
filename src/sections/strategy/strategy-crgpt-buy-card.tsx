import { Line, LineChart, ResponsiveContainer } from 'recharts';

import { Box, Stack, ButtonBase, Typography } from "@mui/material";

import Image from "src/components/image";

interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}

export default function StrategyCrgptBuyCard() {
    return (
        <Box sx={{
            width: "280px",
            height: '360px',
            border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
            p: 1,
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            backgroundColor: '#674b2e',
            backdropFilter: 'blur(10px)',
        }}>
            <Typography variant="h6" sx={{
                color: 'primary.main',
            }}>Need CRYPTO GPT today?</Typography>

            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Image src="/logo/crgpt-icon-full.png" alt="Trade" sx={{
                        width: '52px',
                        height: '52px',
                        borderRadius: 1,
                    }} />
                    <Stack direction="column" gap={0.5}>
                        <Typography variant="body1" sx={{}}>CRGPT/USDT</Typography>
                        <Stack direction="row" gap={1}>
                            <ButtonBase sx={{
                                backgroundColor: theme => theme.palette.primary.main,
                                fontSize: '14px',
                                borderRadius: 0.5,
                                p: '2px 8px',
                            }}>Buy CRGPT</ButtonBase>
                        </Stack>
                    </Stack>
                </Stack>

                <Typography variant="caption" sx={{
                }}>~ 0.076 USDT</Typography>
            </Stack>


            <Box sx={{
                width: '100%',
                flex: 1,
                backgroundColor: '#00000088',
                p: 1,
                borderRadius: 1,
            }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#ffd700"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            <Typography variant="caption">BUY NOW or with CREDIT CARD add points and receive tokens in your Metamask Wallet, login.</Typography>
        </Box>
    );
}
const data: DataPoint[] = [
    { date: '2023-01', price: 8500, change: 0 },
    { date: '2023-02', price: 11000, change: 0 },
    { date: '2023-03', price: 18500, change: -0.1, action: 'Sell' },
    { date: '2023-04', price: 5500, change: 0.1, action: 'Buy' },
    { date: '2023-05', price: 17500, change: 0.1 },
    { date: '2023-06', price: 11000, change: -0.1, action: 'Sell' },
    { date: '2023-07', price: 19500, change: 0.0 },
    { date: '2023-08', price: 500, change: -0.1, action: 'Sell' },
];