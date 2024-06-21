'use client';



import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Tab, Card, Tabs, Stack, Button, InputLabel, Typography, FormControl, OutlinedInput, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody, alpha } from '@mui/material';

import { DashboardNews } from './dashboard-news';
import DashboardLineChart from './dashboard-line-chart';
import DashBoardTradingChart from './dashboard-trading-chart';
import Iconify from 'src/components/iconify';



export default function DashboardView() {
    const [currentTab, setCurrentTab] = useState('candle');

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
            pb: 2,
        }}>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ flex: 1 }}>
                <Card sx={{
                    p: 2,
                    flex: 1,
                    borderRadius: 1,
                    boxShadow: 2,
                    height: '100%',
                    maxHeight: '600px',
                    minHeight: '300px',
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
            </Stack>
            <Stack direction="row">
                <Card sx={{
                    p: 2,
                }}>
                    <Stack direction="row" spacing={4}>
                        <Stack direction="column" spacing={1} sx={{
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

                        <Stack direction="column" spacing={1} sx={{
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
                    </Stack>
                </Card>
            </Stack>
        </Box>
    );
}
