'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';

import { Box, Tab, Card, Tabs, Stack } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { NAV, SPACING, MAIN_TRACKING_PANEL } from 'src/layouts/config-layout';

import { useCarousel } from 'src/components/carousel';

import DashboardTrackingOverviewCalendar from '../dashboard-tracking-overview-calendar';


export default function DashboardTrackingView() {
    const [currentTab, setCurrentTab] = useState('overview');
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
            justifyContent: 'space-between',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{
                flexGrow: 0,
                flexShrink: 0,
                minHeight: `${MAIN_TRACKING_PANEL.W_DESKTOP}px`,
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
                            <Tab value='overview' label="Overview" />
                            <Tab value='summary' label="Summary" />
                        </Tabs>
                        <Box sx={{
                            height: 0,
                            flex: 1,
                        }}>
                            {
                                currentTab === 'overview' && <DashboardTrackingOverviewCalendar />
                            }
                            {
                                currentTab === 'summary' && <Box>
                                    Content
                                </Box>
                            }
                        </Box>
                    </Stack>
                </Card>
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
                            height: '100%',
                            aspectRatio: '1.2/1',
                        }} />

                        <Card sx={{
                            p: 2,
                            height: '100%',
                            aspectRatio: '1.2/1',
                        }} />

                        <Card sx={{
                            p: 2,
                            height: '100%',
                            aspectRatio: '1.2/1',
                        }} />

                        <Card sx={{
                            p: 2,
                            height: '100%',
                            aspectRatio: '2/1',
                        }} />
                    </Stack>
                }
            </Box>
        </Box>
    );
}
