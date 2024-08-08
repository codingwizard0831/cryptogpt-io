// Desc: This file contains the content of the strategy dashboard.






import { Box, alpha, Stack, Select, BoxProps, MenuItem, TextField, Typography, InputLabel, IconButton, FormControl } from '@mui/material';

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
            }}>3. Configure Indicators for {coin1.name}/{coin2.name}</Typography>
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
                {
                    [1, 2, 3, 4].map((item, index) => <Stack key={`key-indicator-${index}`} direction="row" alignItems='center' spacing={2} sx={{ width: '100%' }}>
                        <FormControl sx={{
                            '.MuiInputBase-root': {
                                border: 'none',
                                width: '100px',
                            },
                        }}>
                            <InputLabel htmlFor="indicator-label">indicators</InputLabel>
                            <Select labelId="indicator-label" id="indicator" label="Time frame" size="small" value="SMA" sx={{
                                border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                            }}>
                                <MenuItem value="SMA">SMA</MenuItem>
                                <MenuItem value="EMA">EMA</MenuItem>
                                <MenuItem value="RSI">RSI</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{
                            '.MuiInputBase-root': {
                                border: 'none',
                                width: '100px',
                            },
                        }}>
                            <InputLabel htmlFor="add-indicator-label">Operator</InputLabel>
                            <Select labelId="add-indicator-label" id="add-indicator" label="Operator" size="small" value="plus" sx={{
                                border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                            }}>
                                <MenuItem value="plus">plus</MenuItem>
                                <MenuItem value="minus">minus</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField size="small" sx={{ flex: 1 }} />
                        <IconButton sx={{
                            border: (theme: any) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}>
                            <Iconify icon="fa:trash" sx={{
                                color: 'primary.main',
                                width: '24px',
                                hegiht: '24px',
                            }} />
                        </IconButton>
                    </Stack>
                    )
                }

                <Stack direction="row" alignItems='center' spacing={2} sx={{ width: '100%' }}>
                    <FormControl sx={{
                        '.MuiInputBase-root': {
                            border: 'none',
                            width: '100px',
                        },
                    }}>
                        <InputLabel htmlFor="indicator-label">indicators</InputLabel>
                        <Select labelId="indicator-label" id="indicator" label="Time frame" size="small" value="SMA" sx={{
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                        }}>
                            <MenuItem value="SMA">SMA</MenuItem>
                            <MenuItem value="EMA">EMA</MenuItem>
                            <MenuItem value="RSI">RSI</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{
                        '.MuiInputBase-root': {
                            border: 'none',
                            width: '100px',
                        },
                    }}>
                        <InputLabel htmlFor="add-indicator-label">Operator</InputLabel>
                        <Select labelId="add-indicator-label" id="add-indicator" label="Operator" size="small" value="plus" sx={{
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                        }}>
                            <MenuItem value="plus">plus</MenuItem>
                            <MenuItem value="minus">minus</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField size="small" sx={{ flex: 1 }} />
                    <IconButton sx={{
                        border: (theme: any) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}>
                        <Iconify icon="mingcute:add-fill" sx={{
                            color: 'primary.main',
                            width: '24px',
                            hegiht: '24px',
                        }} />
                    </IconButton>
                </Stack>
            </Box>

            <DashboardStrategyImaganize />
        </Box>
    </Box>
}