import { useState } from 'react';

import { Box, Tab, Tabs, Stack, Button, InputLabel, Typography, FormControl, OutlinedInput, InputAdornment } from '@mui/material';


export function DashboardTradeSpot() {
    const [currentSpotTab, setCurrentSpotTab] = useState('limit');
    const handleChangeSpotTab = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentSpotTab(newValue);
    };

    return <Box>
        <Tabs value={currentSpotTab} onChange={handleChangeSpotTab} sx={{
            mb: 1,
        }}>
            <Tab label="Limit" value="limit" />
            <Tab label="Market" value="market" />
            <Tab label="Stop limit" value="stop-limit" />
            <Tab label="Trailing limit" value="trailing-limit" />
            <Tab label="OCO" value="oco" />
        </Tabs>

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

        <Button variant='contained' color="success" fullWidth>BUY</Button>
    </Box>
}