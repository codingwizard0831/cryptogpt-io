'use client';


import Box from '@mui/material/Box';
import { alpha, Stack, Button, useTheme, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';


export default function TravelView() {
    const theme = useTheme();
    const mdUp = useResponsive('up', 'md');

    const chartOptions = useChart({
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
        tooltip: {
            x: {
                show: false,
            },
            marker: { show: false },
        },
    });


    return (
        <Box
            sx={{
                width: 1,
                height: 1,
            }}
        >
            <Box sx={{
                px: 2,
                mb: 2,
            }}>
                <Typography variant="subtitle2" component="p" sx={{ fontSize: 16, my: 1 }}>
                    Quick actions
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: mdUp ? 'row' : 'column',
                    gap: 2,
                }}>
                    <Button
                        variant="outlined"
                        endIcon={<Iconify icon="grommet-icons:form-next-link" />}
                        startIcon={<Box component='span' sx={{
                            background: alpha(theme.palette.primary.main, 0.1),
                            fontSize: '14px!important',
                            fontWeight: 400,
                            padding: '8px 10px',
                            borderRadius: '5px',
                            lineHeight: '100%',
                        }}>0</Box>}
                        sx={{
                            padding: '16px',
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        Create a new order
                        <Box sx={{ flex: 1 }} />
                    </Button>

                    <Button
                        variant="outlined"
                        endIcon={<Iconify icon="grommet-icons:form-next-link" />}
                        startIcon={<Box component='span' sx={{
                            background: alpha(theme.palette.primary.main, 0.1),
                            fontSize: '14px!important',
                            fontWeight: 400,
                            padding: '8px 10px',
                            borderRadius: '5px',
                            lineHeight: '100%',
                        }}>0</Box>}
                        sx={{
                            padding: '16px',
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        Airline-initiated changes
                        <Box sx={{ flex: 1 }} />
                    </Button>

                    <Button
                        variant="outlined"
                        endIcon={<Iconify icon="grommet-icons:form-next-link" />}
                        startIcon={<Box component='span' sx={{
                            background: alpha(theme.palette.primary.main, 0.1),
                            fontSize: '14px!important',
                            fontWeight: 400,
                            padding: '8px 10px',
                            borderRadius: '5px',
                            lineHeight: '100%',
                        }}>0</Box>}
                        sx={{
                            padding: '16px',
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        Hold orders
                        <Box sx={{ flex: 1 }} />
                    </Button>
                </Box>
            </Box>

            <Box sx={{
                px: 2,
                mb: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    mb: 1,
                }}>
                    <Typography variant="subtitle1" component="p" sx={{ fontSize: 16, my: 1 }}>Insights</Typography>
                    <Typography variant="body2" component="p" sx={{ fontSize: 12, color: theme.palette.text.secondary, m: 1 }}>Last 30 days</Typography>
                </Box>
                <Stack direction={mdUp ? "row" : 'column'} gap={2}>
                    <Box sx={{
                        flex: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.background.default, 0.2),
                        backdropFilter: 'blur(10px)',
                        border: `dashed 1px ${theme.palette.divider}`,
                    }}>
                        <Typography variant="subtitle2" component="p" sx={{ fontSize: 14, m: 2, mb: 1 }}>Orders created</Typography>
                        <Typography variant="subtitle2" component="p" sx={{ fontSize: 16, m: 2, mb: 1 }}>0</Typography>
                        <Chart dir="ltr" type="line" series={[
                            {
                                name: 'Desktops',
                                data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                            },
                        ]} options={chartOptions} width="100%" height={240} />
                    </Box>
                    <Box sx={{
                        flex: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.background.default, 0.2),
                        backdropFilter: 'blur(10px)',
                        border: `dashed 1px ${theme.palette.divider}`,
                    }}>
                        <Typography variant="subtitle2" component="p" sx={{ fontSize: 14, m: 2, mb: 1 }}>Orders created</Typography>
                        <Typography variant="subtitle2" component="p" sx={{ fontSize: 16, m: 2, mb: 1 }}>0</Typography>
                        <Chart dir="ltr" type="line" series={[
                            {
                                name: 'Desktops',
                                data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                            },
                        ]} options={chartOptions} width="100%" height={240} />
                    </Box>
                </Stack>
            </Box>

            <Box sx={{
                px: 2,
                mb: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    mb: 1,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Iconify icon="iconamoon:trend-up-bold" sx={{ fontSize: 24, color: theme.palette.primary.main }} />
                        <Typography variant="subtitle1" component="p" sx={{ fontSize: 16, m: 1 }}>Grow your revenue with our ancillaries component</Typography>
                    </Box>
                    {/* <Button variant="outlined">Learn more</Button> */}
                </Box>
                <Stack direction={mdUp ? "row" : 'column'} gap={2}>
                    <Box sx={{
                        flex: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.background.default, 0.2),
                        backdropFilter: 'blur(10px)',
                        border: `dashed 1px ${theme.palette.divider}`,
                    }}>
                        <Typography variant="subtitle2" component="p" sx={{ fontSize: 14, m: 2, mb: 1 }}>Ancillaries sold</Typography>
                        <Typography variant="subtitle2" component="p" sx={{ fontSize: 16, m: 2, mb: 1 }}>0</Typography>
                        <Chart dir="ltr" type="line" series={[
                            {
                                name: 'Desktops',
                                data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                            },
                        ]} options={chartOptions} width="100%" height={240} />
                    </Box>
                    <Box sx={{
                        flex: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.background.default, 0.2),
                        backdropFilter: 'blur(10px)',
                        border: `dashed 1px ${theme.palette.divider}`,
                    }}>
                        <Typography variant="subtitle2" component="p" sx={{ fontSize: 14, m: 2, mb: 1 }}>Gross ancillary volume</Typography>
                        <Typography variant="subtitle2" component="p" sx={{ fontSize: 16, m: 2, mb: 1 }}>0</Typography>
                        <Chart dir="ltr" type="line" series={[
                            {
                                name: 'Desktops',
                                data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                            },
                        ]} options={chartOptions} width="100%" height={240} />
                    </Box>
                </Stack>
            </Box>

            <Stack direction={mdUp ? "row" : 'column'} gap={2} sx={{
                px: 2,
                mb: 2,
            }}>
                <Box sx={{
                    flex: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.default, 0.2),
                    backdropFilter: 'blur(10px)',
                    border: `dashed 1px ${theme.palette.divider}`,
                }}>
                    <Typography variant="subtitle2" component="p" sx={{ fontSize: 14, m: 2, mb: 1 }}>Ancillary attachment rate</Typography>
                    <Typography variant="subtitle2" component="p" sx={{ fontSize: 16, m: 2, mb: 1 }}>0</Typography>
                </Box>
                <Box sx={{
                    flex: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.default, 0.2),
                    backdropFilter: 'blur(10px)',
                    border: `dashed 1px ${theme.palette.divider}`,
                }}>
                    <Typography variant="subtitle2" component="p" sx={{ fontSize: 14, m: 2, mb: 1 }}>Orders canceled via API</Typography>
                    <Typography variant="subtitle2" component="p" sx={{ fontSize: 16, m: 2, mb: 1 }}>0</Typography>
                </Box>
                <Box sx={{
                    flex: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.default, 0.2),
                    backdropFilter: 'blur(10px)',
                    border: `dashed 1px ${theme.palette.divider}`,
                }}>
                    <Typography variant="subtitle2" component="p" sx={{ fontSize: 14, m: 2, mb: 1 }}>Orders changed via API</Typography>
                    <Typography variant="subtitle2" component="p" sx={{ fontSize: 16, m: 2, mb: 1 }}>0</Typography>
                </Box>
            </Stack>
        </Box>
    );
}