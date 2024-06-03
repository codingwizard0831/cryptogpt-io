'use client';

import React from 'react';

import { Box, Link, alpha, Radio, Button, Select, useTheme, MenuItem, TextField, Typography, RadioGroup, IconButton, Breadcrumbs, FormControl, FormControlLabel } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { ScrollCustomStyle } from 'src/theme/css';
import { HEADER } from 'src/layouts/config-layout';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import AirlineDetailItem from './airline-detail-item';
import TravelTakeOffLandingTimePicker from '../travel-take-off-landing-time-picker';

export default function TravelSearchAirline() {
    const theme = useTheme();

    const [sortExpensive, setSortExpensive] = React.useState('least');
    const [stopType, setStopType] = React.useState('direct');
    const isShowMenu = useBoolean(true);

    const settings = useSettingsContext();
    const lgUp = useResponsive('up', 'lg');
    const mdUp = useResponsive('up', 'md');
    const isNavHorizontal = settings.themeLayout === 'horizontal';

    const [departureTakeOffTime, setDepartureTakeOffTime] = React.useState<number[]>([0, 24]);
    const [departureLandingTime, setDepartureLandingTime] = React.useState<number[]>([0, 24]);

    const handleChangeSortExpensive = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortExpensive(event.target.value);
    }
    const handleChangeStopType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStopType(event.target.value);
    }

    const handleChangeDepartureTakeOffTime = (newValue: number | number[]) => {
        setDepartureTakeOffTime(newValue as number[]);
    };

    const handleChangeDepartureLandingTIme = (newValue: number | number[]) => {
        setDepartureLandingTime(newValue as number[]);
    };

    const calcHeight = React.useMemo(() => {
        const PaddingAndInputSize = 58 + 50;
        if (isNavHorizontal) {
            if (lgUp) {
                return `calc(100vh - ${HEADER.H_DESKTOP * 2 + 40 + PaddingAndInputSize}px)`;
            }
            return `calc(100vh - ${HEADER.H_MOBILE + 8 + PaddingAndInputSize}px)`;
        }
        if (lgUp) {
            return `calc(100vh - ${HEADER.H_DESKTOP + 8 + PaddingAndInputSize}px)`;
        }
        return `calc(100vh - ${HEADER.H_MOBILE + 8 + PaddingAndInputSize}px)`;

    }, [isNavHorizontal, lgUp]);

    return (
        <Box sx={{
            width: 1,
            height: 1,
            p: 2,
            pt: 0,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Breadcrumbs sx={{ my: 2 }}>
                <Link color="inherit" href="#">
                    Travel
                </Link>
                <Link color="inherit" href="#">
                    Order
                </Link>
                <Link color="inherit" href="#">
                    New Order
                </Link>
                <Typography
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.primary',
                    }}
                >
                    LON to NYC
                </Typography>
            </Breadcrumbs>

            <Box sx={{
                flex: 1,
                weight: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                gap: 2,
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: '24px',
                    left: '-10px',
                    zIndex: 19,
                    opacity: (isShowMenu.value || mdUp) ? 0 : 1,
                    transition: 'all 0.3s ease',
                }}>
                    <IconButton color='primary' onClick={isShowMenu.onTrue}>
                        <Iconify icon="ri:menu-unfold-3-line" />
                    </IconButton>
                </Box>

                <Box sx={{
                    width: '25%',
                    minWidth: '256px',
                    maxWidth: '400px',
                    height: calcHeight,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    ...ScrollCustomStyle(theme, {}),
                    position: mdUp ? 'sticky' : 'absolute',
                    top: '16px',
                    left: (isShowMenu.value || mdUp) ? '0px' : '-110%',
                    zIndex: 19,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: mdUp ? alpha(theme.palette.background.default, 0.2) : 'transparent',
                    transition: 'all 0.3s ease',
                    p: 2,
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 19,
                        opacity: mdUp ? 0 : 0.8,
                    }}>
                        <IconButton color='primary' onClick={isShowMenu.onFalse}>
                            <Iconify icon="ri:menu-unfold-4-line" />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        p: 2,
                        backdropFilter: 'blur(20px)',
                        backgroundColor: alpha(theme.palette.background.default, 0.4),
                        borderRadius: 1,
                        mb: 2,
                    }}>
                        <Typography variant="h6" gutterBottom>One-way trip to PAR</Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: 'text.secondary'
                        }}>
                            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>LON</Typography>
                            <Iconify icon="codicon:arrow-right" />
                            <Iconify icon="codicon:arrow-swap" />
                            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>PAR</Typography>
                            <Typography variant="subtitle2" >•</Typography>
                            <Typography variant="subtitle2" >One way</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: 'text.secondary',
                            mb: 1,
                        }}>
                            <Typography variant="subtitle2">30 Mar</Typography>
                            <Typography variant="subtitle2">•</Typography>
                            <Typography variant="subtitle2">1 Passenger</Typography>
                        </Box>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1, }}>Economy</Typography>
                        <Button fullWidth variant="outlined">Edit search</Button>
                    </Box>

                    <Box sx={{
                        p: 0.5,
                        mb: 2,
                    }}>
                        <Typography variant="subtitle2" gutterBottom>Sort by</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup value={sortExpensive} onChange={handleChangeSortExpensive}>
                                <FormControlLabel
                                    value="least"
                                    control={<Radio size="small" />}
                                    label="Least expensive"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                                <FormControlLabel
                                    value="most"
                                    control={<Radio size="small" />}
                                    label="Most expensive"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                                <FormControlLabel
                                    value="shortest"
                                    control={<Radio size="small" />}
                                    label="Shortest expensive"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                                <FormControlLabel
                                    value="longest"
                                    control={<Radio size="small" />}
                                    label="Longest expensive"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box sx={{
                        p: 0.5,
                        mb: 2,
                    }}>
                        <Typography variant="subtitle2" gutterBottom>Stops</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup value={stopType} onChange={handleChangeStopType}>
                                <FormControlLabel
                                    value="direct"
                                    control={<Radio size="small" />}
                                    label="Direct only"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                                <FormControlLabel
                                    value="1stop"
                                    control={<Radio size="small" />}
                                    label="1 stop at most"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                                <FormControlLabel
                                    value="2stop"
                                    control={<Radio size="small" />}
                                    label="2 stops at most"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                                <FormControlLabel
                                    value="any"
                                    control={<Radio size="small" />}
                                    label="Any number of stops"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box sx={{
                        p: 0.5,
                        mb: 2,
                    }}>
                        <Typography variant="subtitle2" gutterBottom>Airlines</Typography>
                        <Select fullWidth size='small'>
                            <MenuItem value="1">All airlines</MenuItem>
                            <MenuItem value="2">Aer Lingus</MenuItem>
                            <MenuItem value="2">Air Europa</MenuItem>
                            <MenuItem value="2">Air France</MenuItem>
                            <MenuItem value="2">Air Serbia</MenuItem>
                            <MenuItem value="2">American Airlines</MenuItem>
                            <MenuItem value="3">British Airways</MenuItem>
                            <MenuItem value="4">Duffel Airways</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{
                        p: 0.5,
                        mb: 2,
                    }}>
                        <Typography variant="subtitle2" gutterBottom>Flight number</Typography>
                        <TextField fullWidth size='small' />
                    </Box>

                    <Box sx={{
                        p: 0.5,
                    }}>
                        <Typography variant="subtitle2" gutterBottom>Flight time</Typography>

                        <TravelTakeOffLandingTimePicker
                            takeOffTime={departureTakeOffTime}
                            landingTime={departureLandingTime}
                            onChangeTakeOffTime={handleChangeDepartureTakeOffTime}
                            onChangeLandingTime={handleChangeDepartureLandingTIme}
                            sx={{
                                width: '100%',
                                background: 'transparent!important',
                                backdropFilter: 'none!important',
                                boxShadow: 'none!important',
                                p: 0,
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    flex: 1,
                    minHeight: calcHeight,
                    p: 2,
                }}>
                    <AirlineDetailItem />
                </Box>
            </Box>
        </Box>
    );
}