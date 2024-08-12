// Desc: This file contains the content of the strategy dashboard.






import { Box, Stack, Button, Select, BoxProps, MenuItem, Typography, InputLabel, FormControl } from '@mui/material';

import { useStrategy } from "src/store/strategy/useStrategy";

import Iconify from 'src/components/iconify';

import DashboardStrategyImaganize from '../dashboard-strategy-imagazine';

interface DashboardStrategyStep1Props extends BoxProps {

};

export default function DashboardStrategyStep3({ sx, ...other }: DashboardStrategyStep1Props) {
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);

    return <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Typography variant="h4" color="primary" sx={{ textAlign: "center", my: 2 }}>Review and Adjust Strategy</Typography>
        <Stack direction='row' alignItems="center" spacing={2} sx={{ width: '90%', mb: 2 }}>
            <Typography variant="h4" sx={{
                whitespace: 'nowrap',
            }}>3. Backtesting for {coin1.name}/{coin2.name}</Typography>
        </Stack>


        <Box sx={{
            flex: 1,
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
        }}>
            <Box sx={{
                width: '100%',
                height: '100%',
                maxHeight: '460px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: 4,
                p: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                <Stack direction="row" alignItems='center' spacing={2} sx={{ width: '100%' }}>

                    <FormControl sx={{
                        width: '100%',
                        '.MuiInputBase-root': {
                            border: 'none',
                        },
                    }}>
                        <InputLabel htmlFor="period-label">Period</InputLabel>
                        <Select labelId="period-label" id="period" label="Period" size="small" value="5m" sx={{
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                        }}>
                            <MenuItem value="5m">5m</MenuItem>
                            <MenuItem value="10m">10m</MenuItem>
                            <MenuItem value="15m">15m</MenuItem>
                            <MenuItem value="30m">30m</MenuItem>
                            <MenuItem value="1h">1h</MenuItem>
                            <MenuItem value="4h">4h</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" color="primary" startIcon={<Iconify icon="carbon:chart-multitype" sx={{
                        width: '24px',
                        hegiht: '24px',
                    }} />}>Run</Button>
                </Stack>

                <Box />
            </Box>

            <DashboardStrategyImaganize />
        </Box>
    </Box>
}