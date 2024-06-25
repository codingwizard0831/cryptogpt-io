"use client";

import { useRef, useState, useEffect } from 'react';

import { Box, Stack, Table, alpha, TableRow, TableHead, TableCell, TableBody, Typography } from '@mui/material';

import { fNumberPrice } from 'src/utils/format-number';

import { MAIN_CHART_PANEL } from 'src/layouts/config-layout';

import Iconify from 'src/components/iconify';

export default function DashboardOrderBook() {
    const [sellOrders, setSellOrders] = useState([...dummySellOrders, ...dummySellOrders, ...dummySellOrders]);
    const [buyOrders, setBuyOrders] = useState([...dummyBuyOrders, ...dummyBuyOrders, ...dummyBuyOrders]);
    const orderBookContainer = useRef<HTMLDivElement>(null);
    const [currentSelectedSellOrder, setCurrentSelectedSellOrder] = useState(sellOrders.length - 1);
    const [currentSelectedBuyOrder, setCurrentSelectedBuyOrder] = useState(0);
    const [averagePrice, setAveragePrice] = useState(0);
    const [sumBTC, setSumBTC] = useState(0);
    const [sumUSDT, setSumUSDT] = useState(0);
    const [topOfInfoModal, setTopOfInfoModal] = useState("calc(50% - 47px)");
    const [buySellLayout, setBuySellLayout] = useState<"SELL" | "BUY" | "BOTH">("BOTH");

    useEffect(() => {
        let _averagePrice = 0;
        let _sumBTC = 0;
        let _sumUSDT = 0;
        if (currentSelectedSellOrder < sellOrders.length - 1) {
            _averagePrice = sellOrders.filter((_order, _index) => _index >= currentSelectedSellOrder).reduce((_sum, _order) => _sum + _order.price, 0) / (sellOrders.length - currentSelectedSellOrder);
            _sumBTC = sellOrders.filter((_order, _index) => _index >= currentSelectedSellOrder).reduce((_sum, _order) => _sum + _order.amount, 0);
            _sumUSDT = sellOrders.filter((_order, _index) => _index >= currentSelectedSellOrder).reduce((_sum, _order) => _sum + _order.price * _order.amount, 0);
        }
        if (currentSelectedBuyOrder > 0) {
            _averagePrice = buyOrders.filter((_order, _index) => _index <= currentSelectedBuyOrder).reduce((_sum, _order) => _sum + _order.price, 0) / (currentSelectedBuyOrder + 1);
            _sumBTC = buyOrders.filter((_order, _index) => _index <= currentSelectedBuyOrder).reduce((_sum, _order) => _sum + _order.amount, 0);
            _sumUSDT = buyOrders.filter((_order, _index) => _index <= currentSelectedBuyOrder).reduce((_sum, _order) => _sum + _order.price * _order.amount, 0);
        }
        setAveragePrice(_averagePrice);
        setSumBTC(_sumBTC);
        setSumUSDT(_sumUSDT);
    }, [currentSelectedSellOrder, currentSelectedBuyOrder, sellOrders, buyOrders]);

    const handleMouseEnterSellOrder = (e: React.MouseEvent, orderIndex: number) => {
        setCurrentSelectedSellOrder(orderIndex);
        if (orderBookContainer.current) {
            const rect = orderBookContainer.current.getBoundingClientRect();
            setTopOfInfoModal(`${e.clientY - rect.top - 32}px`);
        }
    };

    const handleMouseEnterBuyOrder = (e: React.MouseEvent, orderIndex: number) => {
        setCurrentSelectedBuyOrder(orderIndex);
        if (orderBookContainer.current) {
            const rect = orderBookContainer.current.getBoundingClientRect();
            setTopOfInfoModal(`${e.clientY - rect.top - 32}px`);
        }
    };

    return (
        <Box ref={orderBookContainer}>
            <Typography variant="h6">Order Book</Typography>
            <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                <Iconify icon="fluent:layout-column-two-split-left-focus-top-left-24-filled" onClick={() => setBuySellLayout("BOTH")} sx={{
                    cursor: 'pointer',
                    color: buySellLayout === "BOTH" ? 'text.primary' : 'text.secondary',
                }} />
                <Iconify icon="fluent:layout-column-two-focus-left-24-filled" onClick={() => setBuySellLayout("BUY")} sx={{
                    cursor: 'pointer',
                    color: buySellLayout === "BUY" ? 'success.main' : 'text.secondary',
                }} />
                <Iconify icon="fluent:layout-column-two-16-regular" onClick={() => setBuySellLayout("SELL")} sx={{
                    cursor: 'pointer',
                    color: buySellLayout === "SELL" ? 'error.main' : 'text.secondary',
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
                        <TableCell width="30%">
                            <Typography variant="caption">Price(USDT)</Typography>
                        </TableCell>
                        <TableCell align='right' width="35%">
                            <Typography variant="caption">Amount(BTC)</Typography>
                        </TableCell>
                        <TableCell align='right' width="35%">
                            <Typography variant="caption">Total</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>

            <Box sx={{
                maxHeight: `${MAIN_CHART_PANEL.W_DESKTOP - 140}px`,
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
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
                    {
                        buySellLayout !== "BUY" &&
                        <TableBody>
                            {
                                (buySellLayout === "BOTH" ? sellOrders.filter((_, _i) => _i < 11) : sellOrders).map((_sellOrder, _index) => (
                                    <TableRow key={`row-key-${_index}`}
                                        onMouseEnter={(e) => handleMouseEnterSellOrder(e, _index)}
                                        onMouseLeave={() => setCurrentSelectedSellOrder(dummySellOrders.length - 1)}
                                        sx={{
                                            backgroundColor: currentSelectedSellOrder <= _index ? theme => alpha(theme.palette.error.main, 0.1) : 'transparent',
                                        }}>
                                        <TableCell align='left' width="30%">
                                            <Typography variant="caption" align='left' sx={{
                                                color: theme => theme.palette.error.main,
                                            }}>{fNumberPrice(_sellOrder.price, 2)}</Typography>
                                        </TableCell>
                                        <TableCell align='right' width="35%">
                                            <Typography variant="caption" align="right">{fNumberPrice(_sellOrder.amount)}</Typography>
                                        </TableCell>
                                        <TableCell align='right' width="35%">
                                            <Typography variant="caption" align="right">{fNumberPrice(_sellOrder.price * _sellOrder.amount)}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    }
                </Table>
            </Box>

            <Stack direction="row" alignItems="center" sx={{
                mt: buySellLayout !== "BUY" ? 1 : 0,
                mb: buySellLayout !== "SELL" ? 1 : 0,
            }}>
                <Typography variant="h6" color="error">61,076.93</Typography>
                <Iconify icon="mingcute:arrow-down-fill" sx={{
                    color: theme => theme.palette.error.main,
                }} />

                <Typography variant="caption" sx={{ ml: 2 }}>$61,076.93</Typography>
            </Stack>

            <Box sx={{
                maxHeight: `${MAIN_CHART_PANEL.W_DESKTOP - 140}px`,
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
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
                    {
                        buySellLayout !== "SELL" &&
                        <TableBody>
                            {
                                (buySellLayout === "BOTH" ? buyOrders.filter((_, _i) => _i > buyOrders.length - 11) : buyOrders).map((_buyOrder, _index) => (
                                    <TableRow key={`row-key-${_index}`}
                                        onMouseEnter={(e) => handleMouseEnterBuyOrder(e, _index)}
                                        onMouseLeave={() => setCurrentSelectedBuyOrder(0)}
                                        sx={{
                                            backgroundColor: currentSelectedBuyOrder >= _index ? theme => alpha(theme.palette.success.main, 0.1) : 'transparent',
                                        }}>
                                        <TableCell align='left' width="30%">
                                            <Typography variant="caption" align='left' sx={{
                                                color: theme => theme.palette.success.main,
                                            }}>{fNumberPrice(_buyOrder.price, 2)}</Typography>
                                        </TableCell>
                                        <TableCell align='right' width="35%">
                                            <Typography variant="caption" align="right">{fNumberPrice(_buyOrder.amount)}</Typography>
                                        </TableCell>
                                        <TableCell align='right' width="35%">
                                            <Typography variant="caption" align="right">{fNumberPrice(_buyOrder.price * _buyOrder.amount)}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    }
                </Table>
            </Box>

            {
                buySellLayout === "BOTH" &&
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                    <Typography variant="body2">B</Typography>
                    <Typography variant="caption" sx={{
                        color: theme => theme.palette.success.main,
                    }}>32.34%</Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{
                        borderRadius: '4px',
                        flex: 1,
                    }}>
                        <Box sx={{
                            width: '30%',
                            height: '4px',
                            backgroundColor: theme => theme.palette.success.main,
                        }} />
                        <Box sx={{
                            flexGrow: 1,
                            height: '4px',
                            backgroundColor: theme => theme.palette.error.main,
                        }} />
                    </Stack>
                    <Typography variant="caption" sx={{
                        color: theme => theme.palette.error.main,
                    }}>{(100 - 32.34).toFixed(2)}%</Typography>
                    <Typography variant="body2">S</Typography>
                </Stack>
            }

            <Box sx={{
                width: '240px',
                p: 1,
                borderRadius: 1,
                backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1),
                backdropFilter: 'blur(10px)',
                border: theme => `1px solid ${theme.palette.primary.main}`,
                transition: 'all 0.3s',
                position: 'absolute',
                left: '-244px',
                top: topOfInfoModal,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                opacity: currentSelectedSellOrder < sellOrders.length - 1 || currentSelectedBuyOrder > 0 ? 1 : 0,
                visibility: currentSelectedSellOrder < sellOrders.length - 1 || currentSelectedBuyOrder > 0 ? 'visible' : 'hidden',
            }}>
                <Stack direction="row" alignItems="center">
                    <Iconify icon="hugeicons:chart-average" sx={{
                        color: theme => theme.palette.primary.main,
                        mr: 1,
                    }} />
                    <Typography variant="caption" color="text.secondary">Avg.Price:</Typography>

                    <Typography variant="caption" sx={{
                        display: 'block',
                        flexGrow: 1,
                        textAlign: 'right',
                    }}>≈ ${fNumberPrice(averagePrice)}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Iconify icon="mdi:bitcoin" sx={{
                        color: theme => theme.palette.primary.main,
                        mr: 1,
                    }} />
                    <Typography variant="caption" color="text.secondary">Sum BTC:</Typography>

                    <Typography variant="caption" color="success" sx={{
                        display: 'block',
                        flexGrow: 1,
                        textAlign: 'right',
                    }}>{fNumberPrice(sumBTC)}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Iconify icon="token:usdt" sx={{
                        color: theme => theme.palette.primary.main,
                        mr: 1,
                    }} />
                    <Typography variant="caption" color="text.secondary">Sum USDT:</Typography>

                    <Typography variant="caption" color="success" sx={{
                        display: 'block',
                        flexGrow: 1,
                        textAlign: 'right',
                    }}>{fNumberPrice(sumUSDT)}</Typography>
                </Stack>
            </Box>
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
];