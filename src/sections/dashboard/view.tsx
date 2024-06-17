'use client';



import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Tab, Card, Tabs, Stack, useTheme } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';

import DashboardLineChart from './dashboard-line-chart';
import DashBoardTradingChart from './dashboard-trading-chart';



export default function DashboardView() {
    const theme = useTheme();
    const settings = useSettingsContext();
    const [currentTab, setCurrentTab] = useState('candle');

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    return (
        <Box sx={{
            height: '100%',
            pb: 2,
        }}>
            <Card sx={{
                p: 2,
                borderRadius: 1,
                boxShadow: 2,
            }}>
                <Stack direction="column" spacing={2}>
                    <Tabs value={currentTab} onChange={handleChangeTab}>
                        <Tab value='candle' label="Candle" />
                        <Tab value='line' label="Line" />
                        <Tab value='news' label="News" />
                    </Tabs>
                    {
                        currentTab === 'candle' && <DashBoardTradingChart />
                    }
                    {
                        currentTab === 'line' && <DashboardLineChart />
                    }
                </Stack>
            </Card>
        </Box>
    );
}
