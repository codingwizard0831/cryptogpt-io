// Desc: This file contains the content of the strategy dashboard.


import { Line, LineChart, ResponsiveContainer } from 'recharts';

import Link from '@mui/material/Link';
import { Box, Chip, Stack, Button, BoxProps, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CardFlip from 'src/components/card-flip/card-flip';

interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}

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
            width: '300px',
            ...sx,
        }}
        frontContent={
            <Box sx={{
                height: '100%',
                border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 2,
                backgroundColor: '#674b2e',
                backdropFilter: 'blur(10px)',
                ...sx,
            }} {...other}>
                <Box>
                    <Stack direction="row" alignItems="start" justifyContent="space-between" spacing={1}>
                        <Box sx={{
                            position: 'relative',
                            pr: 4,
                        }}>
                            <Image src="/images/bnb-bnb-logo.png" alt="" sx={{
                                width: '32px',
                                hegiht: '32px',
                                borderRadius: '50%',
                                border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                                backdropFilter: 'blur(10px)',
                                p: 0.25,
                            }} />
                            <Image src="/images/tether-usdt-logo.png" alt="" sx={{
                                width: '32px',
                                hegiht: '32px',
                                borderRadius: '50%',
                                border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                                backdropFilter: 'blur(10px)',
                                p: 0.25,
                                position: 'absolute',
                                left: '20px',
                            }} />
                        </Box>
                        <Typography variant="h5" sx={{
                            whiteSpace: "nowrap",
                            width: 0,
                            flex: 1,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                        }}>V-DP Strategy</Typography>
                        <Box sx={{
                            width: '40px',
                            minWidth: '40px',
                            height: '40px',
                            p: 0.25,
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                            borderRadius: '50%',
                        }}>
                            <Image src="/images/what-is-trading-strategy-1000x375.jpg" alt="" sx={{
                                overflow: 'hidden',
                                borderRadius: '50%',
                                width: '100%',
                                height: '100%',
                            }} />
                        </Box>
                    </Stack>
                    <Typography variant="body1" sx={{
                        whiteSpace: "nowrap",
                        width: 1,
                        textOverflow: 'ellipsis',
                        lineHeight: '100%',
                        overflow: 'hidden',
                    }}>V-DP Strategy xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Typography>
                </Box>

                <Box sx={{
                    borderRadius: 1.5,
                    backgroundColor: '#00000088',
                    p: 1,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 1,
                        position: 'relative',
                        flex: 1,
                    }}>

                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            p: 1,
                        }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    {/* <XAxis
                                        dataKey="date"
                                        stroke="#ddd"
                                        tick={{ fill: '#ddd' }}
                                    />
                                    <YAxis
                                        stroke="#ddd"
                                        tick={{ fill: '#ddd' }}
                                        domain={[0, 32000]}
                                        ticks={[0, 7500, 15000, 22500, 30000]}
                                    /> */}
                                    <Line
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#ffd700"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>

                        <Stack direction="row" spacing={2} sx={{
                            position: 'absolute',
                            left: '4px',
                            top: '4px',
                        }}>
                            <Typography sx={{ color: 'success.main' }}>Win: 10</Typography>
                            <Typography sx={{ color: 'error.main' }}>Loss: 2</Typography>
                        </Stack>
                        <Stack direction="row" sx={{
                            position: 'absolute',
                            right: '4px',
                            bottom: '4px',
                        }}>
                            <Typography sx={{}}>Profit: 20%</Typography>
                        </Stack>
                    </Box>

                    <Stack direction="column" alignItems="center" sx={{
                        width: '100%',
                        borderTop: (theme: any) => `2px dashed ${theme.palette.primary.main}`,
                        py: 1,
                    }}>
                        <Typography variant="h6" sx={{ lineHeight: '100%', mb: 1 }}>MAX DRAWDOWN</Typography>
                        <Typography variant="h6" sx={{ lineHeight: '100%', mb: 1 }}>PER % WEEK</Typography>
                        <Stack direction="row" alignItems="center" sx={{
                            width: '100%'
                        }}>
                            <Iconify icon="material-symbols:thumb-up" sx={{
                                width: '24px',
                                height: '24px',
                                color: 'primary.main',
                            }} />
                            <Typography variant="h6" sx={{ ml: 1, mr: 2 }}>2</Typography>

                            <Iconify icon="hugeicons:setup-02" sx={{
                                width: '24px',
                                height: '24px',
                                color: 'primary.main',
                            }} />
                            <Typography variant="h6" sx={{ ml: 1, mr: 2 }}>2</Typography>

                            <Iconify icon="hugeicons:setup-02" sx={{
                                width: '24px',
                                height: '24px',
                                color: 'primary.main',
                            }} />
                            <Typography variant="h6" sx={{ ml: 1, mr: 2 }}>2</Typography>
                            <Box sx={{ flex: 1 }} />
                            <Box sx={{
                                position: 'relative',
                                cursor: 'pointer',
                                ":hover": {
                                    '.owner-detail': {
                                        opacity: 1,
                                        visibility: 'visible',
                                    }
                                }
                            }}>
                                <Iconify icon="ooui:user-active" sx={{
                                    width: '32px',
                                    height: '32px',
                                    color: 'primary.main',
                                }} />
                                <Box className="owner-detail" sx={{
                                    position: 'absolute',
                                    right: '0px',
                                    bottom: '40px',
                                    width: '240px',
                                    backgroundColor: '#674b2e33',
                                    backdropFilter: 'blur(10px)',
                                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                                    borderRadius: 1,
                                    p: 1,
                                    opacity: 0,
                                    visibility: 'hidden',
                                    transition: 'all 0.3s',
                                }}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Link component={RouterLink} href="/" underline="none" color="inherit">
                                            <Image src="/assets/images/bitcoin.png" sx={{
                                                width: '32px',
                                                height: '32px',
                                            }} />
                                        </Link>
                                        <Box>
                                            <Typography variant="body2" sx={{ fontSize: '10px' }}>Post</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: '600' }}>23</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" sx={{ fontSize: '10px' }}>Followers</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: '600' }}>326</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" sx={{ fontSize: '10px' }}>Following</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: '600' }}>120</Typography>
                                        </Box>
                                    </Stack>
                                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Neelesh Chaudhary</Typography>
                                    <Typography sx={{ fontSize: '10px', color: 'text.secondary' }}>UI / UX Designer</Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{
                        width: '100%',
                    }}>
                        <Button variant="contained" color="primary" size="small">+ Plugin</Button>
                        <Button variant="contained" color="primary" size="small">Analytics</Button>
                    </Stack>
                </Box>
            </Box>
        }
        backContent={
            <Box sx={{
                border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 2,
                backgroundColor: '#674b2e',
                backdropFilter: 'blur(10px)',
                height: '100%',
                ...sx,
            }} {...other}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                    <Iconify icon="mdi:bitcoin" sx={{
                        width: '32px',
                        height: '32px',
                    }} />
                    <Box>
                        <Chip label="Elite" color="primary" variant="outlined" />
                    </Box>
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
                        <Box sx={{
                            width: '100%',
                            aspectRatio: '1/1',
                            mb: 2,
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                            borderRadius: 1,
                            boxShadow: '',
                        }}>
                            <Link href="">
                                <Image src="/assets/images/qrcode.png" alt="" sx={{
                                    width: '100%',
                                    hegiht: '100%',
                                }} />
                            </Link>
                        </Box>
                        <Typography variant="h6" sx={{ lineHeight: '100%', mb: 1 }}>John Doe</Typography>
                    </Box>

                    <Stack direction="row" justifyContent="space-between" spacing={1} sx={{
                        width: '100%',
                        borderTop: (theme: any) => `2px dashed ${theme.palette.primary.main}`,
                        pt: 2,
                    }}>
                        <Stack direction="row" spacing={1}>
                            <Iconify icon="material-symbols:rewarded-ads" sx={{
                                width: '28px',
                                height: '28px',
                                color: 'primary.main',
                            }} />
                            <Iconify icon="material-symbols:rewarded-ads" sx={{
                                width: '28px',
                                height: '28px',
                                color: 'primary.main',
                            }} />
                        </Stack>
                        <Button size="small" variant="contained" color="primary">follow</Button>
                    </Stack>
                </Box>
            </Box>
        }
    />
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