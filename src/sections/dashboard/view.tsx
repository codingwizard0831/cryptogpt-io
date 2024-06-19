'use client';



import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Tab, Card, Tabs, Stack } from '@mui/material';

import { DashboardNews } from './dashboard-news';
import DashboardLineChart from './dashboard-line-chart';
import DashBoardTradingChart from './dashboard-trading-chart';



export default function DashboardView() {
    const [currentTab, setCurrentTab] = useState('candle');

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    return (
        <Box sx={{
            minHeight: '100%',
            pb: 2,
        }}>
            <Card sx={{
                p: 2,
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
                    <Box sx={{ height: 0, flex: 1 }}>
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
        </Box>
    );
}
