'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';

import { Box, Tab, Card, Tabs, Stack } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { NAV, HEADER, SPACING, MAIN_CHART_PANEL } from 'src/layouts/config-layout';

import Carousel, { useCarousel } from 'src/components/carousel';

import { DashboardNews } from '../dashboard-news';
import { DashboardAIChat } from '../dashboard-ai-chat';
import { DashboardTracker } from '../dashboard-tracker';
import DashboardLineChart from '../dashboard-line-chart';
import DashboardOrderBook from '../dashboard-order-book';
import { DashboardTopMover } from '../dashboard-top-mover';
import DashBoardTradingChart from '../dashboard-trading-chart';
import { DashboardTrade, DashboardTradeHome } from '../dashboard-trade';
import DashboardLatestTransaction from '../dashboard-latest-transactiont';

export default function DashboardView() {
    const [currentTab, setCurrentTab] = useState('candle');
    const smUp = useResponsive('up', 'sm');
    const [currentWidth, setCurrentWidth] = useState(0);
    const isAIChatWindowFull = useBoolean(false);
    const isTradeWindowFull = useBoolean(false);

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
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{
                flexGrow: 1,
                flexShrink: 0,
                minHeight: `${MAIN_CHART_PANEL.W_DESKTOP}px`,
            }}>
                <Card sx={{
                    p: smUp ? 2 : 1,
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
                transition: 'all 0.3s',
                display: isTradeWindowFull.value ? 'none' : 'block',
                opacity: isTradeWindowFull.value ? 0 : 1,
                visibility: isTradeWindowFull.value ? 'hidden' : 'visible',
            }}>
                {/* desktop */}
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
                            flexShrink: 0,
                            aspectRatio: isAIChatWindowFull.value ? `${chatAreaFullWidth}/309` : '2/1',
                            backdropFilter: 'none',
                        }}>
                            <DashboardAIChat isMinimized={isAIChatWindowFull.value} onBlockResize={() => isAIChatWindowFull.onToggle()} />
                        </Card>

                        <Card sx={{
                            height: '100%',
                            flexShrink: 0,
                            aspectRatio: '1.2/1',
                        }}>
                            <DashboardTradeHome onBlockResize={() => isTradeWindowFull.onToggle()} />
                        </Card>

                        <Card sx={{
                            p: 2,
                            height: '100%',
                            flexShrink: 0,
                            aspectRatio: '1.2/1',
                        }}>
                            <DashboardTracker />
                        </Card>

                        <Card sx={{
                            p: 2,
                            height: '100%',
                            flexShrink: 0,
                            aspectRatio: '2/1',
                        }}>
                            <DashboardTopMover />
                        </Card>
                    </Stack>
                }

                {/* mobile, carousel */}
                {
                    !smUp &&
                    <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                        <Card sx={{
                            p: 1,
                            height: '100%',
                            transition: 'aspect-ratio 0.5s',
                            flexShrink: 0,
                            aspectRatio: isAIChatWindowFull.value ? `${chatAreaFullWidth}/309` : '2/1',
                            backdropFilter: 'none',
                        }}>
                            <DashboardAIChat isMinimized={isAIChatWindowFull.value} onBlockResize={() => isAIChatWindowFull.onToggle()} />
                        </Card>

                        <Card sx={{
                            height: '100%',
                            flexShrink: 0,
                            aspectRatio: '1.2/1',
                        }}>
                            <DashboardTradeHome onBlockResize={() => isTradeWindowFull.onToggle()} />
                        </Card>

                        <Card sx={{
                            p: 1,
                            height: '100%',
                            flexShrink: 0,
                            aspectRatio: '1.2/1',
                        }}>
                            <DashboardTracker />
                        </Card>

                        <Card sx={{
                            p: 1,
                            height: '100%',
                        }}>
                            <DashboardTopMover />
                        </Card>
                    </Carousel>
                }
            </Box>

            <Box sx={{
                display: 'none',
                ...(
                    (isAIChatWindowFull.value && !smUp) ? {
                        display: 'block',
                        height: `calc(100vh - ${HEADER.H_MOBILE + SPACING.sm * 2}px)`,
                        position: 'fixed',
                        bottom: 0,
                        left: `${SPACING.sm}px`,
                        right: `${SPACING.sm}px`,
                        zIndex: 1000,
                    } : {}),
            }}>
                <Card sx={{
                    p: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: 1,
                }}>
                    <DashboardAIChat isMinimized={isAIChatWindowFull.value} onBlockResize={() => isAIChatWindowFull.onToggle()} />
                </Card>
            </Box>

            <Box sx={{
                display: 'none',
                ...(
                    (isTradeWindowFull.value) ? {
                        display: 'block',
                        zIndex: 1000,
                    } : {}),
            }}>
                <Card sx={{
                    p: smUp ? 2 : 1,
                    width: '100%',
                    borderRadius: 1,
                }}>
                    <DashboardTrade onBlockResize={() => isTradeWindowFull.onToggle()} />
                </Card>
            </Box>
        </Box>
    );
}
