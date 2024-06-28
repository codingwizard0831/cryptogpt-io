import React, { useState } from 'react';

import { Box, Tab, Tabs, alpha, BoxProps } from '@mui/material';

import { DashboardTradeSpot } from './dashboard-trade-spot';
import { DashboardTradeGrid } from './dashboard-trade-grid';

interface DashboardTradeProps extends BoxProps {
    handleWindowResize?: () => void;
    isMinimized?: boolean;
}

export default function DashboardTrade({
    isMinimized = false,
    handleWindowResize,
    sx,
    ...other
}: DashboardTradeProps) {
    const [currentTypeTab, setCurrentTypeTab] = useState('spot');

    const handleChangeTypeTab = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTypeTab(newValue);
    }

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }}>
        <Tabs value={currentTypeTab} onChange={handleChangeTypeTab} sx={{
            borderRadius: '0px',
            '.MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                top: 0,
            },
            '.MuiTab-root': {
                py: 1,
                px: 2,
                color: 'text.secondary',
                fontSize: '14px',
                '&.Mui-selected': {
                    color: 'text.primary',
                },
            },
            ".Mui-selected": {
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
            },
        }}>
            <Tab label="Spot" value="spot" />
            <Tab label="Grid" value="grid" />
        </Tabs>

        <Box sx={{
            p: 1,
            flex: 1,
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
        }}>
            {
                currentTypeTab === 'spot' && <DashboardTradeSpot />
            }
            {
                currentTypeTab === 'grid' && <DashboardTradeGrid />
            }
        </Box>
    </Box>;
}