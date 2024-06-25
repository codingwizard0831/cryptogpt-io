"use client";

import { useState } from 'react';

import { Box, Stack, Table, alpha, TableRow, TableHead, TableCell, TableBody, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function DashboardOrderBook() {
    const [currentSelectedSellOrder, setCurrentSelectedSellOrder] = useState(dummySellOrders.length - 1);
    const [currentSelectedBuyOrder, setCurrentSelectedBuyOrder] = useState(0);

    return (
        <Box>
            <Typography variant="h6">Order Book</Typography>
            <Stack direction="row" spacing={1} sx={{ my: 1 }}>
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
                            <Typography variant="caption" width="40%">Price(USDT)</Typography>
                        </TableCell>
                        <TableCell align='right'>
                            <Typography variant="caption" width="30%">Amount(BTC)</Typography>
                        </TableCell>
                        <TableCell align='right'>
                            <Typography variant="caption" width="30%">Total</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        dummySellOrders.map((_sellOrder, _index) => (
                            <TableRow key={`row-key-${_index}`}
                                onMouseEnter={() => setCurrentSelectedSellOrder(_index)}
                                onMouseLeave={() => setCurrentSelectedSellOrder(dummySellOrders.length - 1)}
                                sx={{
                                    backgroundColor: currentSelectedSellOrder <= _index ? theme => alpha(theme.palette.error.main, 0.1) : 'transparent',
                                }}>
                                <TableCell align='left' width="40%">
                                    <Typography variant="caption" align='left' sx={{
                                        color: theme => theme.palette.error.main,
                                    }}>{_sellOrder.price.toFixed(2)}</Typography>
                                </TableCell>
                                <TableCell align='right' width="30%">
                                    <Typography variant="caption" align="right">{_sellOrder.amount.toFixed(5)}</Typography>
                                </TableCell>
                                <TableCell align='right' width="30%">
                                    <Typography variant="caption" align="right">{(_sellOrder.price * _sellOrder.amount).toFixed(5)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

            <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
                <Typography variant="h6" color="error">61,076.93</Typography>
                <Iconify icon="mingcute:arrow-down-fill" sx={{
                    color: theme => theme.palette.error.main,
                }} />

                <Typography variant="caption" sx={{ ml: 2 }}>$61,076.93</Typography>
            </Stack>

            <Table sx={{
                "& td,th": {
                    fontSize: '10px',
                    padding: '0px',
                },
                "& tbody tr": {
                    transition: 'background-color 0.3s',
                    "&:hover": {
                        backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1)
                    },
                },
            }}>
                <TableBody>
                    {
                        dummyBuyOrders.map((_buyOrder, _index) => (
                            <TableRow key={`row-key-${_index}`}
                                onMouseEnter={() => setCurrentSelectedBuyOrder(_index)}
                                onMouseLeave={() => setCurrentSelectedBuyOrder(0)}
                                sx={{
                                    backgroundColor: currentSelectedBuyOrder >= _index ? theme => alpha(theme.palette.success.main, 0.1) : 'transparent',
                                }}>
                                <TableCell align='left' width="40%">
                                    <Typography variant="caption" align='left' sx={{
                                        color: theme => theme.palette.success.main,
                                    }}>{_buyOrder.price.toFixed(2)}</Typography>
                                </TableCell>
                                <TableCell align='right' width="30%">
                                    <Typography variant="caption" align="right">{_buyOrder.amount.toFixed(5)}</Typography>
                                </TableCell>
                                <TableCell align='right' width="30%">
                                    <Typography variant="caption" align="right">{(_buyOrder.price * _buyOrder.amount).toFixed(5)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Box>
    );
}

const dummySellOrders = [
    {
        price: 61096.88,
        amount: 0.07743,
    },
    {
        price: 61086.88,
        amount: 0.07743,
    },
    {
        price: 61076.88,
        amount: 0.07743,
    },
    {
        price: 61066.88,
        amount: 0.07743,
    },
    {
        price: 61056.88,
        amount: 0.07743,
    },
    {
        price: 61046.88,
        amount: 0.07743,
    },
    {
        price: 61036.88,
        amount: 0.07743,
    },
    {
        price: 61026.88,
        amount: 0.07743,
    },
    {
        price: 61016.88,
        amount: 0.07743,
    },
    {
        price: 61006.88,
        amount: 0.07743,
    },
    {
        price: 61006.88,
        amount: 0.07743,
    },
    {
        price: 61006.88,
        amount: 0.07743,
    },
    {
        price: 61006.88,
        amount: 0.07743,
    },
];

const dummyBuyOrders = [
    {
        price: 60096.88,
        amount: 0.07743,
    },
    {
        price: 60086.88,
        amount: 0.07743,
    },
    {
        price: 60076.88,
        amount: 0.07743,
    },
    {
        price: 60066.88,
        amount: 0.07743,
    },
    {
        price: 60056.88,
        amount: 0.07743,
    },
    {
        price: 60046.88,
        amount: 0.07743,
    },
    {
        price: 60036.88,
        amount: 0.07743,
    },
    {
        price: 60026.88,
        amount: 0.07743,
    },
    {
        price: 60016.88,
        amount: 0.07743,
    },
    {
        price: 60006.88,
        amount: 0.07743,
    },
    {
        price: 60006.88,
        amount: 0.07743,
    },
    {
        price: 60006.88,
        amount: 0.07743,
    },
    {
        price: 60006.88,
        amount: 0.07743,
    },
];