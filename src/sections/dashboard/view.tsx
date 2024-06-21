'use client';



import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Tab, Card, Tabs, Stack, Button, InputLabel, Typography, FormControl, OutlinedInput, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody, alpha, TextField } from '@mui/material';

import { DashboardNews } from './dashboard-news';
import DashboardLineChart from './dashboard-line-chart';
import DashBoardTradingChart from './dashboard-trading-chart';
import Iconify from 'src/components/iconify';
import { HEADER, SPACING } from 'src/layouts/config-layout';

import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';


export default function DashboardView() {
    const [currentTab, setCurrentTab] = useState('candle');

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const carousel = useCarousel({
        slidesToShow: 2,
        swipe: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, centerPadding: '0' },
            },
        ],
    });

    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{
                flexGrow: 0,
                flexShrink: 0,
                aspectRatio: '2.5/1',
                minHeight: '640px',
            }}>
                <Card sx={{
                    p: 2,
                    flex: 1,
                    borderRadius: 1,
                    boxShadow: 2,
                    height: '100%',
                }}>
                    <Stack direction="column" spacing={1} sx={{ height: '100%' }}>
                        <Tabs value={currentTab} onChange={handleChangeTab}>
                            <Tab value='candle' label="Candle" />
                            <Tab value='line' label="Line" />
                            <Tab value='news' label="News" />
                        </Tabs>
                        <Box sx={{
                            height: 0,
                            flex: 1,
                        }}>
                            {
                                currentTab === 'candle' && <DashBoardTradingChart />
                            }
                            {
                                currentTab === 'line' && <DashboardLineChart />
                            }
                            {
                                currentTab === 'news' && <DashboardNews />
                            }
                        </Box>
                    </Stack>
                </Card>

                {
                    currentTab !== 'news' &&
                    <Card sx={{
                        p: 1,
                        minWidth: '300px',
                    }}>
                        <Box>
                            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                <Iconify icon="fluent:layout-column-two-split-left-focus-top-left-24-filled" sx={{
                                    cursor: 'pointer',
                                }} />
                                <Iconify icon="fluent:layout-column-two-focus-left-24-filled" sx={{
                                    cursor: 'pointer',
                                }} />
                                <Iconify icon="fluent:layout-column-two-16-regular" sx={{
                                    cursor: 'pointer',
                                }} />
                            </Stack>
                            <Table sx={{
                                "& td,th": {
                                    fontSize: '10px',
                                    padding: '0px',
                                },
                                "& th": {
                                    backgroundColor: 'transparent',
                                },
                                "& tbody tr": {
                                    transition: 'background-color 0.3s',
                                    "&:hover": {
                                        backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1)
                                    },
                                },
                            }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body2">Price(USDT)</Typography>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Typography variant="body2">Amount(BTC)</Typography>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Typography variant="body2">Total</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        [...Array(10)].map((i) => (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <Typography variant="body2" color="error">0.00000000</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">0.00000000</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">0.00000000</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Card>
                }
            </Stack>

            <Box sx={{
                maxWidth: '100%',
                overflowX: 'auto',
                overflowY: 'hidden',
                minHeight: '320px',
                position: 'relative',
            }}>
                <Stack direction="row" flexWrap="nowrap" spacing={2} sx={{
                    flex: 1,
                    position: 'absolute',
                    height: '100%',
                    left: 0,
                }}>
                    <Card sx={{
                        p: 2,
                        height: '100%',
                        aspectRatio: '2/1',
                    }}>
                        <Stack direction="column" spacing={1} sx={{
                            height: '100%',
                        }}>
                            <Typography variant="h6">AI Assistant</Typography>
                            <Box sx={{
                                flex: 1,
                            }}>
                                <Typography variant="body2">AI Assistant is a tool that helps you to make better trading decisions by providing you with real-time market analysis and insights.</Typography>
                            </Box>
                            <TextField fullWidth size="small" label="Message" variant="outlined" />
                        </Stack>
                    </Card>

                    <Card sx={{
                        p: 2,
                        height: '100%',
                    }}>
                        <Stack direction="column" spacing={1} sx={{
                            height: '100%',
                            justifyContent: 'flex-end',
                        }}>
                            <Stack direction="row" spacing={1}>
                                <Typography sx={{
                                    color: 'text.secondary',
                                    fontSize: '14px',
                                }}>Avbl</Typography>
                                <Typography sx={{
                                    fontSize: '14px',
                                    ml: 1,
                                }}>USDT</Typography>
                            </Stack>
                            <FormControl sx={{ width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="buy-price">Price</InputLabel>
                                <OutlinedInput
                                    id="buy-price"
                                    type='text'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Typography>USDT</Typography>
                                        </InputAdornment>
                                    }
                                    label="Price"
                                />
                            </FormControl>
                            <FormControl sx={{ width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="buy-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="buy-amount"
                                    type='text'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Typography>BTC</Typography>
                                        </InputAdornment>
                                    }
                                    label="Price"
                                />
                            </FormControl>
                            <Button variant='contained' color="success" fullWidth>BUY</Button>
                        </Stack>
                    </Card>
                    <Card sx={{
                        p: 2,
                        height: '100%',
                    }}>
                        <Stack direction="column" spacing={1} sx={{
                            height: '100%',
                            justifyContent: 'flex-end',
                        }}>
                            <Stack direction="row" spacing={1}>
                                <Typography sx={{
                                    color: 'text.secondary',
                                    fontSize: '14px',
                                }}>Avbl</Typography>
                                <Typography sx={{
                                    fontSize: '14px',
                                    ml: 1,
                                }}>BTC</Typography>
                            </Stack>
                            <FormControl sx={{ width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="buy-price">Price</InputLabel>
                                <OutlinedInput
                                    id="buy-price"
                                    type='text'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Typography>USDT</Typography>
                                        </InputAdornment>
                                    }
                                    label="Price"
                                />
                            </FormControl>
                            <FormControl sx={{ width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="buy-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="buy-amount"
                                    type='text'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Typography>BTC</Typography>
                                        </InputAdornment>
                                    }
                                    label="Price"
                                />
                            </FormControl>
                            <Button variant='contained' color="error" fullWidth>SELL</Button>
                        </Stack>
                    </Card>

                    <Card sx={{
                        p: 2,
                        height: '100%',
                        aspectRatio: '2/1',
                    }} />

                    <Card sx={{
                        p: 2,
                        height: '100%',
                        aspectRatio: '1/1',
                    }} />
                </Stack>
            </Box>
        </Box>
    );
}
