
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, alpha, Stack, Button, Select, BoxProps, MenuItem, TextField, Typography, InputLabel, FormControl } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { useStrategy } from "src/store/strategy/useStrategy";

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';

import DashboardStrategyImaganize from '../dashboard-strategy-imagazine';

interface DashboardStrategyStep1Props extends BoxProps {

};

export default function DashboardStrategyStep3({ sx, ...other }: DashboardStrategyStep1Props) {
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);
    const isCustom = useBoolean()

    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

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
                p: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                <Stack direction="row" alignItems='center' spacing={2} sx={{ width: '100%', mb: 1 }}>
                    <Box sx={{
                        position: 'relative',
                        pr: 3,
                    }}>
                        <Image src="/images/bnb-bnb-logo.png" alt="" sx={{
                            width: '32px',
                            hegiht: '32px',
                            borderRadius: '50%',
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                            backdropFilter: 'blur(10px)',
                            p: 0.25,
                        }} />
                        <Image src="/images/tether-usdt-logo.png" alt="" sx={{
                            width: '32px',
                            hegiht: '32px',
                            borderRadius: '50%',
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                            backdropFilter: 'blur(10px)',
                            p: 0.25,
                            position: 'absolute',
                            left: '20px',
                        }} />
                    </Box>

                    <FormControl sx={{
                        minWidth: '120px',
                        '.MuiInputBase-root': {
                            border: 'none',
                        },
                    }}>
                        <InputLabel htmlFor="source-label">Source</InputLabel>
                        <Select labelId="source-label" id="source" label="Source" size="small" value="5m" sx={{
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                        }}>
                            <MenuItem value="Pyth">Pyth Netowork</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{
                        minWidth: '120px',
                        '.MuiInputBase-root': {
                            border: 'none',
                        },
                    }}>
                        <InputLabel htmlFor="period-label">Period</InputLabel>
                        <Select labelId="period-label" id="period" label="Period" size="small" value="5m" sx={{
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                        }}>
                            <MenuItem value="10m">10m</MenuItem>
                            <MenuItem value="30m">30m</MenuItem>
                            <MenuItem value="1h">1h</MenuItem>
                            <MenuItem value="1day">1day</MenuItem>
                            <MenuItem value="1week">1week</MenuItem>
                            <MenuItem value="Custom">Custom</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack direction="row" alignItems='center' spacing={2} sx={{ width: '100%', mb: 2 }}>
                    <TextField size="small" sx={{ minWidth: '120px' }} />
                    <Button fullWidth variant="contained" color="primary" startIcon={<Iconify icon="carbon:chart-multitype" sx={{
                    }} />}>Run</Button>
                </Stack>

                <Box sx={{
                    width: '100%',
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                }}>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                                color: '#ffb300',
                            },
                        ]}
                        height={300}
                        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                        grid={{ vertical: true, horizontal: true }}
                        sx={{
                            backdropFilter: 'blur(10px)',
                            backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.1),
                        }}
                    />
                </Box>
            </Box>

            <DashboardStrategyImaganize />
        </Box>
    </Box>
}