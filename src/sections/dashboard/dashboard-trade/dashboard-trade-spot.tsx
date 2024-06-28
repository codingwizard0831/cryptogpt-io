import { useState } from 'react';

import { Box, Tab, Tabs, Stack, Button, Slider, Typography } from '@mui/material';

import { TradeInput } from 'src/components/trade-input';


export function DashboardTradeSpot() {
    const [currentSpotTab, setCurrentSpotTab] = useState('limit');
    const handleChangeSpotTab = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentSpotTab(newValue);
    };

    return <Box>
        <Tabs value={currentSpotTab} onChange={handleChangeSpotTab} sx={{
            mb: 2,
        }}>
            <Tab label="Limit" value="limit" />
            <Tab label="Market" value="market" />
            <Tab label="Stop limit" value="stop-limit" />
            <Tab label="Trailing limit" value="trailing-limit" />
            <Tab label="OCO" value="oco" />
        </Tabs>

        <Stack direction="column" spacing={1} sx={{
            maxWidth: '300px',
        }}>
            <Stack direction="row" spacing={1}>
                <Typography variant="caption" sx={{
                    color: 'text.secondary',
                }}>Avbl</Typography>
                <Typography variant="caption" sx={{
                    color: 'text.secondary',
                }}>-</Typography>
                <Typography variant="caption" sx={{
                }}>USDT</Typography>
            </Stack>

            <TradeInput label='Price' currentType='USDT' />
            <TradeInput label='Amount' currentType='BTC' />

            <Slider
                size="medium"
                marks
                min={10}
                step={10}
                max={110}
                defaultValue={30}
                valueLabelDisplay="auto"
            // getAriaValueText={valuetext}
            // sx={{ [`& .${sliderClasses.mark}[data-index="10"]`]: { display: 'none' } }}
            />

            <Button variant='contained' color="success" fullWidth>BUY</Button>
        </Stack>
    </Box>
}