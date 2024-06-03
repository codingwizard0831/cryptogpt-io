'use client';

import React from 'react';
import { DuffelAncillaries } from "@duffel/components";

import { Box, Link, alpha, Button, Divider, useTheme, TextField, Typography, Breadcrumbs, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import Label from "src/components/label";
import Iconify from "src/components/iconify";
import { StyledDialog } from "src/components/styled-component";

import TravelWeatherForWeek from '../travel-weather-for-week';
import TravelPersonDetailItem from './travel-person-detail-item';
import FlightDetailItem from "../travel-search-airline/flight-detail-item";


export default function TravelNewOrderCheckout() {
    const theme = useTheme();
    const [payType, setPayType] = React.useState('pay-now');
    const mdUp = useResponsive('up', 'md');
    const [metadata, setMetadata] = React.useState<{ key: string, value: string }[]>([]);
    const [newKey, setNewKey] = React.useState('');
    const [newValue, setNewValue] = React.useState('');
    const payNowDialog = useBoolean();
    const payLaterDialog = useBoolean();

    const handleUpdateMetadata = (index: number, key: string, value: string) => {
        const _metadata = [...metadata];
        _metadata[index] = { key, value };
        setMetadata(_metadata);
    }

    const handleRemoveMetadata = (index: number) => {
        const _metadata = [...metadata];
        _metadata.splice(index, 1);
        setMetadata(_metadata);
    }

    const handleAddMetadata = () => {
        setMetadata([...metadata, {
            key: newKey,
            value: newValue,
        }]);
        setNewKey('');
        setNewValue('');
    }

    return <Box sx={{
        width: 1,
        height: 1,
        p: 2,
        pt: 0,
        display: 'flex',
        flexDirection: 'column',
    }}>
        <Breadcrumbs sx={{ mt: 2, mb: 4 }}>
            <Link color="inherit" href="#">
                Travel
            </Link>
            <Link color="inherit" href="#">
                Order
            </Link>
            <Link color="inherit" href="#">
                New Order
            </Link>
            <Link color="inherit" href="#">
                Fare options
            </Link>
            <Typography
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary',
                }}
            >
                Checkout
            </Typography>
        </Breadcrumbs>


        <TravelWeatherForWeek sx={{
            position: mdUp ? 'absolute' : 'static',
            right: '16px',
            top: '16px',
            mb: 2,
        }} />

        <Box sx={{
            width: 1,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
            }}>
                <Label sx={{ borderRadius: '10px' }}>Multi city</Label>
                <Label sx={{ borderRadius: '10px' }}>Sat, 30 Mar 2024 - Thu, 4 Apr 2024</Label>
                <Label sx={{ borderRadius: '10px' }}>1 Passenger</Label>
                <Label sx={{ borderRadius: '10px' }}>Economy</Label>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>LON</Typography>
                <Iconify icon="gravity-ui:arrow-right" />
                <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>PAR, PAR</Typography>
                <Iconify icon="gravity-ui:arrow-right" />
                <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>BER, BER</Typography>
                <Iconify icon="gravity-ui:arrow-right" />
                <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>KYX, KYX</Typography>
                <Iconify icon="gravity-ui:arrow-right" />
                <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>KYX</Typography>
            </Box >
            <Typography variant="caption">This offer will expire on 30/03/2024, 02:12</Typography>

            <Box sx={{
                width: 1,
                maxWidth: '968px',
                mx: 'auto',
            }}>
                <Divider sx={{ my: 4 }} />
                <Typography variant="h6">Selected flights</Typography>

                <FlightDetailItem isShowPolicy sx={{ px: 0 }} />
                <FlightDetailItem isShowPolicy sx={{ px: 0 }} />
                <FlightDetailItem isShowPolicy sx={{ px: 0 }} />
                <FlightDetailItem isShowPolicy sx={{ px: 0 }} />

                <Box sx={{
                    display: 'flex',
                    flexDirection: mdUp ? 'row' : 'column',
                    gap: 2,
                    my: 2,
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

                <Divider sx={{ my: 4 }} />
                <Typography variant="h6">Paying now, or later?</Typography>
                <Typography variant="body1" sx={{
                    color: 'text.secondary',
                    fontSize: '10px',
                    mt: 1,
                    mb: 2,
                }}>Decide whether you want to pay for your trip now in its entirety, or whether you would like to put a hold on the order, and pay at a later date, Be aware that you connot currently select seats or baggage when holding an order.</Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                }}>
                    {
                        payTypes.map((_type) => <Box key={`jouryney-${_type.key}`} sx={{
                            borderRadius: '4px',
                            display: 'flex',
                            border: `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            flex: 1,
                            backdropFilter: 'blur(10px)',
                            position: 'relative',
                            p: 2,
                            ":hover": {
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                border: `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                color: `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                '& span': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.4),
                                },
                                '& svg': {
                                    color: alpha(theme.palette.primary.main, 0.4),
                                },
                                '& p': {
                                    color: alpha(theme.palette.primary.main, 0.8),
                                },
                            },
                            ...(_type.key === payType && {
                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                border: `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                color: `solid 1px ${alpha(theme.palette.primary.main, 0.8)}`,
                            }),
                        }}
                            onClick={() => setPayType(_type.key)}
                        >
                            <Iconify icon="icon-park-solid:check-one" sx={{
                                fontSize: '36px',
                                mr: 1,
                                color: alpha(theme.palette.text.primary, 0.5),
                                ...(_type.key === payType && {
                                    color: `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                }),
                            }} />
                            <Box>
                                <Typography variant="h6">{_type.label}</Typography>
                                <Typography variant="body2" sx={{
                                    color: _type.key === payType ? alpha(theme.palette.primary.main, 0.8) : 'text.secondary',
                                    transition: 'all 0.3s',
                                }}>{_type.description}</Typography>
                            </Box>
                        </Box>)
                    }
                </Box>

                <Divider sx={{ my: 4 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>Contact details</Typography>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'space-between',
                    flexDirection: mdUp ? 'row' : 'column',
                }}>
                    <TextField
                        fullWidth
                        label="Email *"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Phone number *"
                        variant="outlined"
                    />
                </Box>

                <Divider sx={{ my: 4 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>Passanges</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <TravelPersonDetailItem />
                    <TravelPersonDetailItem />
                </Box>

                <Divider sx={{ my: 4 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>Add extras</Typography>
                <Box sx={{
                    '& .icon-button--outlined': {
                        color: theme.palette.text.primary,
                    },
                    '& .icon-button--primary': {
                        border: `1px solid ${theme.palette.primary.main}`,
                        color: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        },
                    },
                    '& svg': {
                        fill: theme.palette.text.primary,
                    },
                    '& .modal--open': {
                        backdropFilter: 'blur(10px)',
                    },
                    '& .counter': {
                        '& button': {
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.primary.contrastText,
                            '&:hover': {
                                backgroundColor: theme.palette.background.neutral,
                            },
                        },
                        '& svg': {
                            fill: theme.palette.text.primary,
                        },
                        '& .counter__count-label': {
                            color: theme.palette.text.primary,
                        },
                    },
                    '& .modal--content': {
                        boxShadow: `0px 0px 20px -6px ${alpha(theme.palette.text.primary, 0.2)}`,
                        backgroundColor: theme.palette.background.default,
                        backdropFilter: 'blur(10px)',
                        '& .modal--close-button': {
                            color: theme.palette.text.primary,
                            "&:hover": {
                                color: theme.palette.primary.main,
                            },
                        },

                        '& .seat-map': {
                            backgroundColor: alpha(theme.palette.background.default, 0.6),
                            backdropFilter: 'blur(10px)',
                            color: theme.palette.text.primary,

                            '& .seat-map__legend-item': {
                                color: theme.palette.text.primary,
                                '& .seat-map__legend-seat': {
                                    backgroundColor: alpha(theme.palette.divider, 0.2),
                                    border: `2px solid ${theme.palette.divider}`,
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.divider, 0.4),
                                    },
                                },
                                '.seat-map__legend-seat--fee-payable': {
                                    backgroundColor: alpha(theme.palette.divider, 0.4),
                                    border: `2px solid ${alpha(theme.palette.text.primary, 0.5)}`,
                                },
                                '.seat-map__legend-seat--included': {
                                    backgroundColor: alpha(theme.palette.divider, 0.4),
                                    border: `2px solid ${alpha(theme.palette.text.primary, 0.5)}`,
                                },
                                '.seat-map__legend-seat--selected': {
                                    backgroundColor: 'black',
                                    border: `2px solid black`,
                                },
                            },

                            '& .map-element__seat': {
                                backgroundColor: alpha(theme.palette.divider, 0.2),
                                border: `2px solid ${theme.palette.divider}`,
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.divider, 0.4),
                                },
                            },
                            '& .map-element--available': {
                                backgroundColor: alpha(theme.palette.divider, 0.4),
                                border: `2px solid ${alpha(theme.palette.text.primary, 0.5)}`,
                            },
                            '& .map-element--selected': {
                                color: 'white',
                                backgroundColor: 'black',
                                border: `2px solid black`,
                            },
                            '& .map-element--wrapped': {
                                backgroundColor: alpha(theme.palette.divider, 0.2),
                                border: `2px solid ${theme.palette.divider}`,
                            },

                            '.seat-info': {
                                backgroundColor: alpha(theme.palette.background.default, 0.8),
                                border: `2px solid ${alpha(theme.palette.divider, 0.2)}`,
                                backdropFilter: 'blur(10px)',
                                '.seat-info__details': {
                                    color: theme.palette.text.primary,
                                }
                            }
                        }
                    },
                    '& .ancillary-card': {
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                        backdropFilter: 'blur(10px)',
                        color: theme.palette.text.primary,
                        "& svg": {
                            fill: alpha(theme.palette.primary.main, 0.5),
                        },
                        "& p": {
                            color: theme.palette.text.secondary,
                        },
                        "&:hover": {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            color: theme.palette.primary.main,
                        },
                    },
                    '& .button--primary': {
                        color: theme.palette.primary.main,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                        "&:hover": {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            boxShadow: 'none!important',
                        },
                    },
                    '& .button--outlined': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        border: `none!important`,
                        boxShadow: 'none!important',
                        "&:hover": {
                            backgroundColor: `${theme.palette.primary.dark}!important`,
                        },
                    },
                }}>
                    <DuffelAncillaries
                        offer_id="fixture_off_1"
                        services={["bags", "seats", "cancel_for_any_reason"]}
                        passengers={[
                            {
                                id: '1',
                                given_name: "Mae",
                                family_name: "Jemison",
                                gender: "f",
                                title: "dr",
                                born_on: "1956-10-17",
                                email: "m.jemison@nasa.gov",
                                phone_number: "+16177562626"
                            },
                            {
                                id: '2',
                                given_name: "Dorothy",
                                family_name: "Green",
                                gender: "f",
                                title: "dr",
                                born_on: "1942-10-17",
                                email: "m.jemison@nasa.gov",
                                phone_number: "+16177562626"
                            }
                        ]}
                        onPayloadReady={console.log}
                        styles={{
                            accentColor: theme.palette.primary.main,
                            fontFamily: theme.typography.fontFamily,
                        }}
                    />
                </Box>


                <Divider sx={{ my: 4 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>Add metadata</Typography>
                {
                    metadata.map((_, index) => <Box key={`metadata-${index}`} sx={{
                        display: 'flex',
                        flexDirection: mdUp ? 'row' : 'column',
                        alignItems: 'flex-end',
                        gap: 2,
                        mb: 2,
                    }}>
                        <TextField
                            fullWidth
                            label="Key *"
                            variant="outlined"
                            value={_.key}
                            onChange={(e) => handleUpdateMetadata(index, e.target.value, _.value)}
                        />
                        <TextField
                            fullWidth
                            label="Value *"
                            variant="outlined"
                            value={_.value}
                            onChange={(e) => handleUpdateMetadata(index, _.key, e.target.value)}
                        />

                        <Button variant="outlined" sx={{
                            width: '53px',
                            minWidth: '53px',
                            height: '53px',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onClick={() => handleRemoveMetadata(index)}
                        >
                            <Iconify icon="material-symbols:delete-outline" sx={{}} />
                        </Button>
                    </Box>)
                }
                <Box sx={{
                    display: 'flex',
                    flexDirection: mdUp ? 'row' : 'column',
                    alignItems: 'flex-end',
                    gap: 2,
                    mb: 2,
                }}>
                    <TextField
                        fullWidth
                        label="Given name *"
                        variant="outlined"
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Family name *"
                        variant="outlined"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                    <Button variant="outlined" sx={{
                        width: '53px',
                        minWidth: '53px',
                        height: '53px',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} onClick={handleAddMetadata}>
                        <Iconify icon="ic:baseline-add" sx={{}} />
                    </Button>
                </Box>

                <Divider sx={{ my: 4 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>Payment</Typography>
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
                        <Typography variant="caption">Fare taxes</Typography>
                        <Typography variant="caption">100.00</Typography>
                    </Box>
                    <Button fullWidth color='primary' variant="contained" onClick={payNowDialog.onTrue}>Pay with Balance</Button>

                    <StyledDialog open={payNowDialog.value} onClose={payNowDialog.onFalse}>
                        <DialogTitle>Pay with Duffel Balance</DialogTitle>

                        <DialogContent sx={{ color: 'text.secondary' }}>
                            By selecting this option, we will automatically debit <b>€86.22</b> from your account balance.
                        </DialogContent>

                        <DialogActions>
                            <Button variant="outlined" onClick={payNowDialog.onFalse}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={payNowDialog.onFalse} autoFocus>
                                Confirm Booking
                            </Button>
                        </DialogActions>
                    </StyledDialog>
                </Box>

                <Divider sx={{ my: 4 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>Payment</Typography>
                <Box sx={{
                    p: 2,
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    display: 'flex',
                    backdropFilter: 'blur(10px)',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: mdUp ? 'row' : 'column',
                        gap: 3,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: alpha(theme.palette.warning.light, 0.3),
                                p: 3,
                                gap: 2,
                            }}>
                                <Typography variant="subtitle1">Hold price for</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'end',
                                    gap: 1,
                                }}>
                                    <Typography variant="caption" sx={{ fontSize: '48px', lineHeight: '100%' }}>2</Typography>
                                    <Typography variant="caption" sx={{ lineBreak: '100%' }}>days</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <Typography variant="caption" sx={{}}>Pay by</Typography>
                                    <Typography variant="caption">03/04/2024</Typography>
                                </Box>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: alpha(theme.palette.error.light, 0.3),
                                p: 3,
                                gap: 2,
                            }}>
                                <Typography variant="subtitle1">Hold space for</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'end',
                                    gap: 1,
                                }}>
                                    <Typography variant="caption" sx={{ fontSize: '48px', lineHeight: '100%' }}>3</Typography>
                                    <Typography variant="caption" sx={{ lineBreak: '100%' }}>days</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <Typography variant="caption" sx={{}}>Pay by</Typography>
                                    <Typography variant="caption">03/04/2024</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'end',
                            }}>
                                <Iconify icon="tabler:check" sx={{
                                    fontSize: '32px',
                                    mr: 1,
                                }} />
                                <Typography variant="body1" sx={{
                                    color: 'text.secondary',
                                }}>Space on this trip will be guaranteed 3 days. After this, the guarantee will expire and the space will be released.</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'end',
                            }}>
                                <Iconify icon="tabler:check" sx={{
                                    fontSize: '32px',
                                    mr: 1,
                                }} />
                                <Typography variant="body1" sx={{
                                    color: 'text.secondary',
                                }}>This price will be guaranteed 2 days. After this, the guarantee will expire and the price may change.</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Button fullWidth color='primary' variant="contained" onClick={payLaterDialog.onTrue}>Confirm and hold</Button>

                    <StyledDialog open={payLaterDialog.value} onClose={payLaterDialog.onFalse}>
                        <DialogTitle>Pay later</DialogTitle>

                        <DialogContent sx={{ color: 'text.secondary' }}>
                            By selecting this option, this order will be put on hold.
                            That means this transaction is not complete and will require payment at a later time.
                        </DialogContent>

                        <DialogActions>
                            <Button variant="outlined" onClick={payLaterDialog.onFalse}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={payLaterDialog.onFalse} autoFocus>
                                Confirm Pay Later
                            </Button>
                        </DialogActions>
                    </StyledDialog>
                </Box>
            </Box>
        </Box >
    </Box >;
}

const payTypes = [
    {
        key: 'pay-now',
        icon: 'carbon:cash-stack',
        label: 'Pay now',
        description: 'Pay now and confirm seat and baggage selection',
    },
    {
        key: 'pay-later',
        icon: 'carbon:cash-stack',
        label: 'Hold order',
        description: 'Hold price and space and pay at a later date',
    },
];