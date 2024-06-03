'use client';

import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import GaugeComponent from 'react-gauge-component';

import { Box, Tab, Link, Tabs, alpha, styled, Button, useTheme, Container, IconButton, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { fNumber } from "src/utils/format-number";

import { MAPBOX_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
import { useSettingsContext } from 'src/components/settings';

import DeliverOrderSummarySection from '../order-section/deliver-order-summary-section';

const StyledMapContainer = styled('div')(({ theme }) => ({
    zIndex: 0,
    height: 300,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
        display: 'none',
    },
}));
type Props = {
    id: string;
};

interface ViewportState {
    latitude?: number;
    longitude?: number;
    zoom?: number;
    bearing?: number;
    pitch?: number;
}

interface LocationMarker {
    latitude: number;
    longitude: number;
}

export default function DeliverOrderTrackView({ id }: Props) {
    const settings = useSettingsContext();
    const theme = useTheme();
    const upMd = useResponsive('up', 'md');
    const [currentTab, setCurrentTab] = useState('status');
    const [orderStatus, setOrderStatus] = useState('preparing');

    const [mapConfigSetting] = useState({
        minZoom: 0,
        maxZoom: 20,
        minPitch: 0,
        maxPitch: 85,
        dragPan: true,
        boxZoom: true,
        keyboard: true,
        touchZoom: true,
        dragRotate: true,
        scrollZoom: true,
        touchPitch: true,
        touchRotate: true,
        doubleClickZoom: true,
        touchZoomRotate: true,
    });

    const [userLocation] = useState<LocationMarker>({
        latitude: 37.9755648,
        longitude: 23.7348324,
    });
    const [destination] = useState<LocationMarker>({
        latitude: 37.9855648,   // Replace with destination's latitude
        longitude: 23.8348324, // Replace with destination's longitude
    });

    const [viewport] = React.useState<ViewportState>({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zoom: 10,
        bearing: 0,
        pitch: 50,
    });

    const styleTypeFromStatus = (status: string, index: number) => {
        let statusIndex = statusSteps.findIndex(step => step.key === status);
        if (statusIndex === -1) statusIndex = 0;

        return index - statusIndex;
    }


    const radialBarChartOptions = useChart({
        colors: [
            alpha(theme.palette.primary.main, 0.5),
            alpha(theme.palette.grey[500], 0.5),
        ],
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        labels: ['Used', 'Free'],
        legend: {
            show: false,
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '68%',
                },
                dataLabels: {
                    value: {
                        offsetY: 16,
                    },
                    total: {
                        formatter: () => fNumber(2324),
                    },
                },
            },
        },
    });

    return (
        <Box>

            <StyledMapContainer sx={{
                position: 'relative',
                mb: 4,
                '&:hover': {
                    ' .cover-text': {
                        opacity: 0.4,
                    }
                },
            }}>
                <Map
                    {...mapConfigSetting}
                    initialViewState={{ ...viewport }}
                    mapStyle="mapbox://styles/mapbox/light-v10"
                    mapboxAccessToken={MAPBOX_API}
                >
                    {/* <MapControl /> */}

                    {/* User Location Marker */}
                    <Marker
                        latitude={userLocation.latitude}
                        longitude={userLocation.longitude}
                        anchor="bottom"
                    >
                        <Box sx={{
                            position: 'relative',
                            width: '72px',
                            height: '80px',
                        }}>
                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: 'translate(-50%, 0%)',
                                backgroundColor: 'info.main',
                                color: 'white',
                                borderRadius: 0.5,
                                border: `1px solid ${theme.palette.grey[50]}`,
                                boxShadow: 2,
                                padding: 0.5,
                                zIndex: 1,
                            }} />
                            <Iconify icon="zondicons:location" sx={{
                                color: 'error.main',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 2,
                            }} />
                            <Iconify icon="zondicons:location" sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: '-25%',
                                width: '100%',
                                height: '100%',
                                transform: 'scaleY(0.5)',
                                zIndex: 0,
                                color: alpha(theme.palette.grey[500], 0.4),
                                // color: 'black',
                            }} />
                            <Box sx={{
                                background: 'blue',
                                borderRadius: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                left: '50%',
                                top: '28px',
                                transform: 'translate(-50%, -50%)',
                                border: `2px solid ${theme.palette.grey[50]}`,
                                backgroundColor: theme.palette.error.main,
                                width: '42px',
                                height: '42px',
                                zIndex: 3,
                            }}>
                                <Typography sx={{
                                    fontWeight: 'bold',
                                }}>40</Typography>
                            </Box>
                        </Box>
                    </Marker>

                    <Marker
                        latitude={destination.latitude}
                        longitude={destination.longitude}
                        anchor="bottom"
                    >
                        <Iconify icon="iconamoon:location-pin-fill" sx={{
                            color: 'success.main',
                        }} onClick={() => alert(0)} />
                    </Marker>

                    {/* <Popup
                        latitude={userLocation.latitude}
                        longitude={userLocation.longitude}
                        closeButton
                        closeOnClick={false}
                        onClose={() => setDistance(null)}
                        anchor="top"
                    >
                        <Box p={1} sx={{
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(10px)',
                        }}>
                            Distance to destination: {distance}
                        </Box>
                    </Popup> */}
                </Map>

                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    pointerEvents: 'none',
                }}>
                    <Link href={paths.dashboard.deliver.restaurant} component={RouterLink}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            my: 2,
                            pointerEvents: 'all',
                        }}>
                            <IconButton sx={{
                                backdropFilter: 'blur(10px)',
                                backgroundColor: alpha(theme.palette.background.default, 0.2),
                            }}>
                                <Iconify icon="bx:arrow-back" sx={{
                                    color: theme.palette.grey[900],
                                }} />
                            </IconButton>
                            <Typography variant="subtitle2" sx={{
                                color: theme.palette.grey[800],
                            }}>Back</Typography>
                        </Box>
                    </Link>
                    <Box className='cover-text' sx={{
                        pointerEvents: 'none',
                        transition: 'all 0.3s',
                    }}>
                        <Typography variant="h1" sx={{
                            color: theme.palette.grey[900],
                            fontWeight: '900',
                        }}>Coffee Island Spata</Typography>
                    </Box>
                </Box>
            </StyledMapContainer>

            <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
                height: '100%',
                pb: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Order Track</Typography>

                    <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{
                        mb: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}>
                        <Tab label="Status" value="status" />
                        <Tab label="Details" value="detail" />
                    </Tabs>

                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Box sx={{
                            width: upMd ? '70%' : '100%',
                        }}>
                            {currentTab === 'status' && (<Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: 4,
                                }}>
                                    {
                                        statusSteps.map((step, index) => (
                                            <Box key={step.key} sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                mb: 2,
                                                p: 2,
                                                ...(styleTypeFromStatus(orderStatus, index) === 0 && {
                                                    boxShadow: `0px 0px 10px ${alpha(theme.palette.primary.main, 0.5)}`,
                                                    borderRadius: 2,
                                                }),
                                            }}>
                                                {
                                                    styleTypeFromStatus(orderStatus, index) < 0 && <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                        border: `2px solid ${theme.palette.divider}`,
                                                        color: 'white',
                                                    }}>
                                                        <Iconify icon="bx:check" sx={{
                                                        }} />
                                                    </Box>
                                                }
                                                {
                                                    styleTypeFromStatus(orderStatus, index) === 0 && <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                        border: `2px solid transparent`,
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: 'white',
                                                    }}>
                                                        <Typography variant="h6" sx={{
                                                            color: 'white',
                                                        }}>{index + 1}</Typography>
                                                    </Box>
                                                }
                                                {
                                                    styleTypeFromStatus(orderStatus, index) > 0 && <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                        border: `2px solid ${theme.palette.divider}`,
                                                        color: 'white',
                                                    }}>
                                                        <Typography variant="h6" sx={{
                                                            color: theme.palette.text.primary,
                                                        }}>{index + 1}</Typography>
                                                    </Box>
                                                }

                                                {
                                                    styleTypeFromStatus(orderStatus, index) < 0 && <Box sx={{
                                                    }}>
                                                        <Typography variant="subtitle1" sx={{
                                                            color: theme.palette.text.secondary,
                                                        }}>{step.label}</Typography>
                                                    </Box>
                                                }
                                                {
                                                    styleTypeFromStatus(orderStatus, index) === 0 && <Box sx={{
                                                    }}>
                                                        <Typography variant="h6" sx={{
                                                        }}>{step.label}</Typography>
                                                        <Typography variant="body2" sx={{
                                                            color: theme.palette.text.secondary,
                                                        }}>{step.label}</Typography>
                                                    </Box>
                                                }
                                                {
                                                    styleTypeFromStatus(orderStatus, index) > 0 && <Box sx={{
                                                    }}>
                                                        <Typography variant="subtitle1" sx={{
                                                            color: alpha(theme.palette.text.secondary, 0.8),
                                                        }}>{step.label}</Typography>
                                                    </Box>
                                                }
                                            </Box>
                                        ))
                                    }
                                </Box>

                                <Box>
                                    <Typography variant="h6" sx={{
                                        mb: 2,
                                    }}>Need help with your order?</Typography>
                                    <Button fullWidth variant='outlined' sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 1,
                                        backdropFilter: 'blur(10px)',
                                        backgroundColor: 'transparent',
                                        boxShadow: 2,
                                        mb: 2,
                                    }}>
                                        <Box sx={{
                                            borderRadius: '50%',
                                            backgroundColor: alpha(theme.palette.divider, 0.8),
                                            p: 1,
                                        }}>
                                            <Iconify icon="bx:phone" sx={{
                                                color: 'background.default',
                                            }} />
                                        </Box>
                                        <Box display={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'start',
                                        }}>
                                            <Typography variant="subtitle1" sx={{
                                            }}>Contract support</Typography>
                                            <Typography variant="body2" sx={{
                                                color: theme.palette.text.secondary,
                                            }}>If you need help with your order</Typography>
                                        </Box>
                                    </Button>
                                    <Button fullWidth variant='outlined' sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 1,
                                        backdropFilter: 'blur(10px)',
                                        backgroundColor: 'transparent',
                                        boxShadow: 2,
                                        mb: 2,
                                    }}>
                                        <Box sx={{
                                            borderRadius: '50%',
                                            backgroundColor: alpha(theme.palette.divider, 0.8),
                                            p: 1,
                                        }}>
                                            <Iconify icon="material-symbols:info" sx={{
                                                color: 'background.default',
                                            }} />
                                        </Box>
                                        <Box display={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'start',
                                        }}>
                                            <Typography variant="subtitle1" sx={{
                                            }}>View restaurant info</Typography>
                                            <Typography variant="body2" sx={{
                                                color: theme.palette.text.secondary,
                                            }}>Opening hours and contact details</Typography>
                                        </Box>
                                    </Button>
                                </Box>
                            </Box>)}

                            {currentTab === 'detail' && <DeliverOrderSummarySection id={id} />}
                        </Box>
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Box sx={{
                                position: 'relative',
                                top: '50px',
                            }}>
                                <Chart
                                    dir="ltr"
                                    type="radialBar"
                                    series={[44]}
                                    options={radialBarChartOptions}
                                    width="100%"
                                    height={256}
                                />

                                <GaugeComponent
                                    id="gauge-component-radial"
                                    value={60}
                                    type="radial"
                                    arc={{
                                        width: 0.2,
                                        nbSubArcs: 25,
                                        colorArray: [theme.palette.info.main, theme.palette.success.main],
                                    }}
                                    labels={{
                                        tickLabels: {
                                            type: "inner",
                                            ticks: [
                                                { value: 20 },
                                                { value: 40 },
                                                { value: 60 },
                                                { value: 80 },
                                                { value: 100 }
                                            ]
                                        }
                                    }}
                                    pointer={{ length: 0.5 }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

const statusSteps = [
    {
        key: 'order-received',
        label: 'That’s it, we have your order!',
    },
    {
        key: 'human-confirmed',
        label: 'Super! A human being has seen your order.',
    },
    {
        key: 'preparing',
        label: 'Almost there! Your order is being prepared now.',
    },
    {
        key: 'done',
        label: 'Done! Your order is ready and being delivered now.',
    },
    {
        key: 'delivered',
        label: 'Your order should\'ve been delivered by now, enjoy!',
    },
]