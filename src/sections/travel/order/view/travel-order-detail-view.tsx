'use client';

import React from 'react';

import { Box, Link, alpha, Button, Avatar, Divider, Tooltip, useTheme, MenuItem, TextField, Typography, Breadcrumbs } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { ScrollCustomStyle } from 'src/theme/css';
import { HEADER } from 'src/layouts/config-layout';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Timeline from 'src/components/timeline/timeline';
import { usePopover } from 'src/components/custom-popover';
import { useSettingsContext } from 'src/components/settings';
import { TimelineDataType } from 'src/components/timeline/type';
import StyledPopover from 'src/components/styled-component/styled-popover';

import TravelWeatherForWeek from '../new/travel-weather-for-week';
import FlightDetailItem from '../new/travel-search-airline/flight-detail-item';

type Props = {
    id: string;
};

export default function TravelOrderDetailView({ id }: Props) {
    const theme = useTheme();
    const mdUp = useResponsive('up', 'md');
    const lgUp = useResponsive('up', 'lg');
    const settings = useSettingsContext();
    const isNavHorizontal = settings.themeLayout === 'horizontal';
    const manageOrderPopover = usePopover();

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

    const timelineData: TimelineDataType[] = [
        {
            upElement: <>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, whiteSpace: 'nowrap' }}>4 Apr 2024</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 300, whiteSpace: 'nowrap' }}>1:46 am GMT+9</Typography>
            </>,
            downElement: <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>Booked</Typography>,
            color: alpha(theme.palette.success.main, 0.5),
            amount: 22,
        },
        {
            upElement: <>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, whiteSpace: 'nowrap' }}>7 Apr 2024</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 300, whiteSpace: 'nowrap' }}>1:35 am GMT+9</Typography>
            </>,
            downElement: <>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, textAlign: 'center', whiteSpace: 'nowrap' }}>Price & space hold expires</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, whiteSpace: 'nowrap' }}>€2,357.82</Typography>
            </>,
            color: alpha(theme.palette.error.main, 0.5),
            amount: 45,
        },
        {
            upElement: <>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, whiteSpace: 'nowrap' }}>7 Apr 2024</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 300, whiteSpace: 'nowrap' }}>3:05 am GMT+2</Typography>
            </>,
            downElement: <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, whiteSpace: 'nowrap' }}>Flight to WAR</Typography>,
            color: '',
        },
    ]

    return (
        <Box sx={{
            width: 1,
            height: 1,
            p: 2,
        }}>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link color="inherit" href="#">
                    Travel
                </Link>
                <Link color="inherit" href="#">
                    Orders
                </Link>
                <Typography
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.primary',
                    }}
                >
                    {id}
                </Typography>
            </Breadcrumbs>

            <Box sx={{
                display: 'flex',
                alignItems: mdUp ? 'start' : 'stretch',
                flexDirection: mdUp ? 'row' : 'column',
                gap: 2,
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}>
                        <Typography variant="h4">{id}</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button variant="outlined" color="primary" size={mdUp ? 'medium' : 'small'}>Export itinerary</Button>
                            <Button variant="contained" color="primary"
                                size={mdUp ? 'medium' : 'small'}
                                endIcon={<Iconify icon="material-symbols-light:arrow-drop-down" />}
                                onClick={manageOrderPopover.onOpen}
                            >Manage this order</Button>

                            <StyledPopover
                                open={!!manageOrderPopover.open}
                                anchorEl={manageOrderPopover.open}
                                onClose={manageOrderPopover.onClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <Box sx={{
                                    width: '240px',
                                    p: 1,
                                }}>
                                    <MenuItem>Change flight(s)</MenuItem>
                                    <MenuItem>Cancellation quote</MenuItem>
                                    <MenuItem disabled>
                                        <Box>
                                            Add seats
                                        </Box>
                                        <Tooltip title="This feature is not available yet">
                                            <Iconify icon="material-symbols:info" sx={{
                                                width: '16px',
                                                height: '16px',
                                                cursor: 'pointer',
                                                ml: 1,
                                            }} />
                                        </Tooltip>
                                    </MenuItem>
                                    <MenuItem disabled>
                                        <Box sx={{
                                            cursor: 'pointer',
                                            mr: 1,
                                        }}>
                                            Add bags
                                        </Box>
                                        <Tooltip title="This feature is not available yet">
                                            <Iconify icon="material-symbols:info" sx={{
                                                width: '16px',
                                                height: '16px',
                                            }} />
                                        </Tooltip>
                                    </MenuItem>
                                    <MenuItem disabled>
                                        <Box sx={{
                                            cursor: 'pointer',
                                            mr: 1,
                                        }}>
                                            Name correction
                                        </Box>
                                        <Tooltip title="This feature is not available yet">
                                            <Iconify icon="material-symbols:info" sx={{
                                                width: '16px',
                                                height: '16px',
                                            }} />
                                        </Tooltip>
                                    </MenuItem>
                                    <MenuItem disabled>
                                        <Box sx={{
                                            cursor: 'pointer',
                                            mr: 1,
                                        }}>
                                            Other requires
                                        </Box>
                                        <Tooltip title="This feature is not available yet">
                                            <Iconify icon="material-symbols:info" sx={{
                                                width: '16px',
                                                height: '16px',
                                            }} />
                                        </Tooltip>
                                    </MenuItem>
                                </Box>
                            </StyledPopover>
                        </Box>
                    </Box>

                    <Box sx={{
                        mb: 4,
                        borderRadius: '4px',
                        boxShadow: theme.shadows[1],
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                        backdropFilter: 'blur(10px)',
                    }}>
                        <Box sx={{
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                            p: 2,
                        }}>
                            <Label color='warning' sx={{ mb: 2 }}>Order hold</Label>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <Iconify icon="material-symbols:check" sx={{ mr: 1 }} />
                                <Typography variant='body2' sx={{ color: 'text.secondary' }}> The price guarantee expires <b style={{ color: theme.palette.text.primary }}>in 3 days</b>. After this prices for your trip may change.</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <Iconify icon="material-symbols:check" sx={{ mr: 1 }} />
                                <Typography variant='body2' sx={{ color: 'text.secondary' }}> Space expires <b style={{ color: theme.palette.text.primary }}>in 3 days</b>. After this the space will be released and you will need to rebook.</Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Timeline data={timelineData} />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            p: 1,
                        }}>
                            <Button variant="contained" color="primary" size={mdUp ? 'medium' : 'small'}>Pay(€2,357.82)</Button>
                        </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>Weather Forecast</Typography>
                        <TravelWeatherForWeek short sx={{
                            width: '100%'
                        }} />
                    </Box>

                    <Box>
                        <Typography variant="h5">Journey details</Typography>
                        <FlightDetailItem isShowPolicy />
                        <FlightDetailItem isShowPolicy />

                        <Box sx={{
                            display: 'flex',
                            flexDirection: mdUp ? 'row' : 'column',
                            gap: 2,
                            mt: 4,
                        }}>
                            <Box sx={{
                                maxWidth: mdUp ? '400px' : '100%',
                                display: 'flex',
                                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                                borderRadius: '4px',
                                backdropFilter: 'blur(10px)',
                                flexShrink: 0,
                                flexGrow: 0,
                                p: 2,
                            }}>
                                <Iconify icon="material-symbols:airplane-ticket-outline" sx={{
                                    color: alpha(theme.palette.primary.main, 0.8),
                                    mr: 1
                                }} />
                                <Box sx={{
                                }}>
                                    <Typography variant='subtitle1'>Order change policy</Typography>
                                    <Typography variant='body1' sx={{
                                        color: 'text.secondary',
                                        fontSize: '10px',
                                        mt: 1,
                                    }}>Make changes to this order up until the departure date ( a change penalty of £140.00 will apply)</Typography>
                                </Box>
                            </Box>

                            <Box sx={{
                                maxWidth: mdUp ? '400px' : '100%',
                                display: 'flex',
                                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                                borderRadius: '4px',
                                backdropFilter: 'blur(10px)',
                                flexShrink: 0,
                                flexGrow: 0,
                                p: 2,
                            }}>
                                <Iconify icon="material-symbols:airplane-ticket-outline" sx={{
                                    color: alpha(theme.palette.primary.main, 0.8),
                                    mr: 1
                                }} />
                                <Box sx={{
                                }}>
                                    <Typography variant='subtitle1'>Order refund policy </Typography>
                                    <Typography variant='body1' sx={{
                                        color: 'text.secondary',
                                        fontSize: '10px',
                                        mt: 1,
                                    }}>This order is refundabl up until the departure date ( a change penalty of £140.00 will apply)</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>Passengers</Typography>
                    <Box>
                        <Label sx={{ mb: 2 }}>
                            {/* <Iconify icon="iconoir:user"  /> */}
                            <Iconify icon="la:child" />Adult
                        </Label>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 2,
                        }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>Name</Typography>
                                <Typography variant="subtitle2">Adult</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                gap: 2,
                                flex: 1,
                            }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>Date of birth</Typography>
                                    <Typography variant="subtitle2">08/08/1990</Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>Gender</Typography>
                                    <Typography variant="subtitle2">Female</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 2,
                        }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>E-mail</Typography>
                                <Typography variant="subtitle2">test@test.com</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flex: 1,
                            }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>Contact number</Typography>
                                    <Typography variant="subtitle2">+35795572777</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>Flight information</Typography>
                        <Box sx={{
                            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                            borderRadius: '4px',
                            backdropFilter: 'blur(10px)',
                            p: 2,
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2,
                                gap: 1,
                            }}>
                                <Image src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BP.svg" alt="Profile" sx={{
                                    width: 32,
                                    height: 32,
                                }} />
                                <Typography variant="body2" sx={{ ml: 1 }}><b>POX</b> to <b>WAR</b> on <b>Fri</b>, 5 Apr 2024 at 03:05</Typography>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                pl: '48px',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                    <Iconify icon="mdi:bag-suitcase" />
                                    <Typography variant="caption">1 checked bag</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                    <Iconify icon="mdi:bag-suitcase-outline" />
                                    <Typography variant="caption">1 carry on bag</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>Billing summary</Typography>
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1,
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                        }}>
                            <Typography variant="subtitle2">Description</Typography>
                            <Typography variant="subtitle2">Price (EUR)</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1,
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            backdropFilter: 'blur(10px)',
                        }}>
                            <Typography variant="caption">Fare</Typography>
                            <Typography variant="caption">100.00</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1,
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                        }}>
                            <Typography variant="caption">Fare taxes</Typography>
                            <Typography variant="caption">100.00</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                            gap: 2,
                            p: 1,
                            mb: 1,
                        }}>
                            <Typography variant="caption">Total (EUR)</Typography>
                            <Typography variant="caption">100.00</Typography>
                        </Box>
                        <Button fullWidth color='primary' variant="contained" size={mdUp ? 'medium' : 'small'}>Pay with Balance</Button>
                    </Box>
                </Box>

                <Box sx={{
                    width: mdUp ? '25%' : '100%',
                    minWidth: '256px',
                    maxWidth: mdUp ? '400px' : '100%',
                    height: mdUp ? calcHeight : 'auto',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    ...ScrollCustomStyle(theme, {}),
                    backgroundColor: alpha(theme.palette.background.default, 0.2),
                    backdropFilter: 'blur(10px)',
                    position: mdUp ? 'sticky' : 'static',
                    top: '16px',
                    py: 4,
                    px: 2,
                }}>
                    <Box sx={{
                        mb: 3,
                    }}>
                        <Typography variant="h6">Summary</Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>LAST SYNCED:</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>03/04/2024, 19:46</Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        mb: 2,
                    }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5 }}>Status</Typography>
                        <Label color="warning">On hold</Label>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        mb: 2,
                    }}>
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            mb: 2,
                        }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5 }}>Hold type</Typography>
                            <Typography variant="caption" sx={{}}>Space & price</Typography>
                        </Box>

                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            mb: 2,
                        }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5 }}>Price held</Typography>
                            <Typography variant="caption" sx={{}}>€85.77</Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        mb: 2,
                    }}>
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            mb: 2,
                        }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5 }}>Payment due (price hold)</Typography>
                            <Typography variant="caption" sx={{}}>06/04/2024</Typography>
                        </Box>

                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            mb: 2,
                        }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5 }}>Payment due (space hold)</Typography>
                            <Typography variant="caption" sx={{}}>06/04/2024</Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        mb: 2,
                    }}>
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            mb: 2,
                        }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5 }}>Airline</Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}>
                                <Image src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BP.svg" alt="Profile" sx={{
                                    width: 24,
                                    height: 24,
                                }} />
                                <Typography variant="caption" sx={{}}>06/04/2024</Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            mb: 2,
                        }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5 }}>Creation date</Typography>
                            <Typography variant="caption" sx={{}}>06/04/2024</Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        mb: 2,
                    }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Order ID</Typography>
                        <Typography variant="caption" sx={{}}>ord_0000AgVjgMAGferUvNwgFs</Typography>
                    </Box>

                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>Activity</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                        }}>
                            <Avatar alt="N" sx={{
                                width: '24px',
                                height: '24px',
                                fontSize: '12px',
                                borderRadius: '3px',
                            }}>
                                N
                            </Avatar>
                            <Box sx={{
                                position: 'relative',
                                flex: 1,
                            }}>
                                <TextField fullWidth size='small' rows={5} multiline placeholder='Add a comment...' sx={{
                                    minHeight: '50px',
                                }} />
                                <Button variant="outlined" size="small" sx={{
                                    position: 'absolute',
                                    right: '4px',
                                    bottom: '4px',
                                }}>Add comment</Button>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                        }}>
                            <Avatar alt="N" sx={{
                                width: '24px',
                                height: '24px',
                                fontSize: '12px',
                                borderRadius: '3px',
                            }}>
                                N
                            </Avatar>
                            <Box sx={{
                            }}>
                                <Typography variant="body2"><b>Nikolaos Papadopoulos</b> creatd this order.</Typography>
                                <Typography variant="caption">Wed, 3 Apr 2024, 15:18</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}