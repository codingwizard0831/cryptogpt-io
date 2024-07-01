import { useState } from 'react';

import { Box, Tab, Tabs, Stack, alpha, Slider, Button, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { TradeInput } from 'src/components/trade-input';


export function DashboardTradeGrid() {
    const [currentGridTab, setCurrentGridTab] = useState('ai');
    const [currentAiPeriod, setCurrentAiPeriod] = useState('3d');


    const handleChangeGridTab = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentGridTab(newValue);
    };

    const handleChangeAiPeriod = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentAiPeriod(newValue);
    }

    return <Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            mb: 2,
        }}>
            <Tabs value={currentGridTab} onChange={handleChangeGridTab} sx={{
                backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
                border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                p: 0.5,
                borderRadius: '0px',
                '.MuiTabs-indicator': {
                    backgroundColor: 'transparent',
                    top: 0,
                },
                '.MuiTab-root': {
                    px: 1,
                    color: 'text.secondary',
                    fontSize: '12px',
                    lineHeight: '12px',
                    minHeight: '28px',
                    height: '28px',
                    '&.Mui-selected': {
                        color: 'text.primary',
                    },
                },
                ".Mui-selected": {
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                },
            }}>
                <Tab label="AI" value="ai" icon={<Iconify icon="hugeicons:bot" sx={{ width: '14px', height: '14px', color: 'primary.main' }} />} iconPosition='start' />
                <Tab label="Popular" value="popular" icon={<Iconify icon="game-icons:coins" sx={{ width: '14px', height: '14px', color: 'primary.main' }} />} iconPosition='start' />
                <Tab label="Manual" value="manual" icon={<Iconify icon="material-symbols:person-apron-outline" sx={{ width: '14px', height: '14px', color: 'primary.main' }} />} iconPosition='start' />
            </Tabs>
        </Box>
        {
            currentGridTab === 'ai' && <Stack direction="row" spacing={4}>
                <Stack direction="column" spacing={1} sx={{
                    maxWidth: '300px',
                    width: '100%',
                }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>1. Parameters</Typography>

                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Time Period</Typography>

                        <Tabs value={currentAiPeriod} onChange={handleChangeAiPeriod} sx={{
                            padding: 0,
                            minHeight: 0,
                            ".MuiTab-root": {
                                padding: 0,
                                margin: 0,
                                fontSize: '12px',
                                lineHeight: '12px',
                                minHeight: '20px',
                                height: '20px',
                                '&.Mui-selected': {
                                    color: 'text.primary',
                                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                                },
                            },
                            ".MuiTabs-indicator": {
                                display: 'none',
                            },
                        }}>
                            <Tab label="3D" value="3d" />
                            <Tab label="7D" value="7d" />
                            <Tab label="30D" value="30d" />
                            <Tab label="180D" value="180d" />
                        </Tabs>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Price Range</Typography>
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>33323 - 20393 USDT</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Grid Number</Typography>
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>117</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Profile/grid(fee deducted)</Typography>
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>0.37% = 1.55%</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems='center' sx={{ cursor: 'pointer' }} onClick={() => setCurrentGridTab('manual')}>
                        <Typography variant="caption" sx={{
                            color: 'text.secondary',
                            textDecoration: 'underline',
                        }}>
                            Copy parameters to Manual settings
                        </Typography>
                        <Iconify icon="mingcute:right-line" sx={{ color: 'text.secondary', }} />
                    </Stack>
                </Stack>

                <Stack direction="column" spacing={1} sx={{
                    maxWidth: '300px',
                    width: '100%',
                }}>
                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems='center' sx={{ mb: 1 }}>
                        <Typography variant="subtitle1">2. Investment</Typography>
                        <Stack direction="row" spacing={1} alignItems='center'>
                            <Iconify icon="cryptocurrency-color:usdt" sx={{ width: '20px', height: '20px' }} />
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>USDT</Typography>
                        </Stack>
                    </Stack>

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
                    <TradeInput label='Total' currentType='USDT' readOnly inputValue='' />
                    <Slider
                        size="medium"
                        marks
                        min={10}
                        step={10}
                        max={110}
                        defaultValue={30}
                        valueLabelDisplay="auto"
                    />
                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 1 }}>Create</Button>
                </Stack>
            </Stack>
        }
        {
            currentGridTab === 'manual' && <Stack direction="row" spacing={4}>
                <Stack direction="column" spacing={1} sx={{
                    maxWidth: '300px',
                    width: '100%',
                }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>1. Price Range</Typography>

                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Time Period</Typography>

                        <Tabs value={currentAiPeriod} onChange={handleChangeAiPeriod} sx={{
                            padding: 0,
                            minHeight: 0,
                            ".MuiTab-root": {
                                padding: 0,
                                margin: 0,
                                fontSize: '12px',
                                lineHeight: '12px',
                                minHeight: '20px',
                                height: '20px',
                                '&.Mui-selected': {
                                    color: 'text.primary',
                                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                                },
                            },
                            ".MuiTabs-indicator": {
                                display: 'none',
                            },
                        }}>
                            <Tab label="3D" value="3d" />
                            <Tab label="7D" value="7d" />
                            <Tab label="30D" value="30d" />
                            <Tab label="180D" value="180d" />
                        </Tabs>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Price Range</Typography>
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>33323 - 20393 USDT</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Grid Number</Typography>
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>117</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Profile/grid(fee deducted)</Typography>
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>0.37% = 1.55%</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems='center' sx={{ cursor: 'pointer' }} onClick={() => setCurrentGridTab('manual')}>
                        <Typography variant="caption" sx={{
                            color: 'text.secondary',
                            textDecoration: 'underline',
                        }}>
                            Copy parameters to Manual settings
                        </Typography>
                        <Iconify icon="mingcute:right-line" sx={{ color: 'text.secondary', }} />
                    </Stack>
                </Stack>
            </Stack>
        }
    </Box>
}