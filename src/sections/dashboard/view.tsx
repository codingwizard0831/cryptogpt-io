'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';

import { Box, Tab, Card, Tabs, Stack, Button, InputLabel, Typography, FormControl, OutlinedInput, InputAdornment } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { NAV, SPACING, MAIN_CHART_PANEL } from 'src/layouts/config-layout';

import Carousel, { useCarousel } from 'src/components/carousel';

import { DashboardNews } from './dashboard-news';
import { DashboardAIChat } from './dashboard-ai-chat';
import DashboardLineChart from './dashboard-line-chart';
import DashboardOrderBook from './dashboard-order-book';
import { DashboardTopMover } from './dashboard-top-mover';
import DashBoardTradingChart from './dashboard-trading-chart';
import DashboardLatestTransaction from './dashboard-latest-transactiont';

export default function DashboardView() {
    const [currentTab, setCurrentTab] = useState('candle');
    const smUp = useResponsive('up', 'sm');
    const [currentWidth, setCurrentWidth] = useState(0);
    const isFullWidth = useBoolean(false);

    useEffect(() => {
        const handleResize = () => {
            setCurrentWidth(window.innerWidth);
        };

        // Set initial width
        handleResize();

        // Correctly listen for resize events
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const chatAreaFullWidth = useMemo(() => {
        if (smUp) return currentWidth - NAV.W_SIDE_BAR_MENU - SPACING.md * 2 - 11;
        return currentWidth - SPACING.sm;
    }, [currentWidth, smUp]);

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const carousel = useCarousel({});

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
                minHeight: `${MAIN_CHART_PANEL.W_DESKTOP}px`,
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
                            {
                                !smUp && <Tab value='order-book' label="Order Book" />
                            }
                            <Tab value='transactions' label="My Transactions" />
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
                            {
                                currentTab === 'order-book' && <DashboardOrderBook />
                            }
                            {
                                currentTab === 'transactions' && <DashboardLatestTransaction />
                            }
                        </Box>
                    </Stack>
                </Card>

                {
                    currentTab !== 'news' && smUp &&
                    <Card sx={{
                        p: 1,
                        minWidth: '300px',
                        borderRadius: 1,
                        overflow: 'visible',
                    }}>
                        <DashboardOrderBook />
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
                {
                    smUp &&
                    <Stack direction="row" flexWrap="nowrap" spacing={2} sx={{
                        flex: 1,
                        position: 'absolute',
                        height: '100%',
                        left: 0,
                    }}>
                        <Card sx={{
                            p: 2,
                            height: '100%',
                            transition: 'aspect-ratio 0.5s',
                            aspectRatio: isFullWidth.value ? `${chatAreaFullWidth}/309` : '2/1',
                        }}>
                            <DashboardAIChat isMinimized={isFullWidth.value} onBlockResize={() => isFullWidth.onToggle()} />
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
                        }}>
                            <DashboardTopMover />
                        </Card>

                        <Card sx={{
                            p: 2,
                            height: '100%',
                            aspectRatio: '1/1',
                        }} />
                    </Stack>
                }
                {
                    !smUp &&
                    <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                        <Card sx={{
                            p: 2,
                            height: '100%',
                            transition: 'aspect-ratio 0.5s',
                            aspectRatio: isFullWidth.value ? `${chatAreaFullWidth}/309` : '2/1',
                        }}>
                            <DashboardAIChat isMinimized={isFullWidth.value} onBlockResize={() => isFullWidth.onToggle()} />
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
                        }}>
                            <DashboardTopMover />
                        </Card>

                        <Card sx={{
                            p: 2,
                            height: '100%',
                            aspectRatio: '1/1',
                        }} />
                    </Carousel>
                }
            </Box >
        </Box >
    );
}
