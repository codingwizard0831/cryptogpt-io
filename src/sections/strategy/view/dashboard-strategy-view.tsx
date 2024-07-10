'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';

import { Box, Card } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { NAV, SPACING } from 'src/layouts/config-layout';

import { useCarousel } from 'src/components/carousel';

export default function DashboardTrackingView() {
    const [currentTab, setCurrentTab] = useState('overview');
    const smUp = useResponsive('up', 'sm');
    const [currentWidth, setCurrentWidth] = useState(0);
    const isTradeWindowFull = useBoolean(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const trackerDetailDrawer = useBoolean(false);
    const isAIChatWindowFull = useBoolean(false);

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

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const handleChangleSelectedDate = (newDate: Date) => {
        console.log('newDate', newDate);
        setSelectedDate(newDate);

        if (
            (newDate.getFullYear() === new Date().getFullYear() &&
                newDate.getMonth() === new Date().getMonth() &&
                newDate.getDate() === new Date().getDate()) ||
            newDate.getTime() > new Date().getTime()
        ) {
            trackerDetailDrawer.onTrue();
        }
    }

    const chatAreaFullWidth = useMemo(() => {
        if (smUp) return currentWidth - NAV.W_SIDE_BAR_MENU - SPACING.md;
        return currentWidth - SPACING.sm;
    }, [currentWidth, smUp]);

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
            <Card sx={{
                p: smUp ? 2 : 1,
                flex: 1,
                borderRadius: 1,
                boxShadow: 2,
                height: '100%',
            }}>
                Dashboard Strategy View
            </Card>
        </Box>
    );
}
