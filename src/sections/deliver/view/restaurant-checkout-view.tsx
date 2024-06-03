'use client';

import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';

import { Box, Link, alpha, styled, Button, Divider, Container, TextField, IconButton, Typography, ButtonBase } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { MAPBOX_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { StyledDialog } from 'src/components/styled-component';

import DeliverYourOrderItem from '../deliver-your-order-item';
import DeliverRestaurantsTipCourier from '../restaurants/restaurants-tip-courier';
import DeliverChangeOrderDetail1Section from '../order-section/deliver-change-order-details-1-section';


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
    country: string;
    address: string;
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

export default function DeliverRestaurantCheckoutView({ id, country, address }: Props) {
    const settings = useSettingsContext();
    const upMd = useResponsive('up', 'md');

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
    const [distance, setDistance] = useState<string | null>(null);

    // Function to calculate distance between two coordinates in kilometers
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        // Radius of the Earth in km
        const R = 6371;
        // Conversions
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const _distance = R * c;
        setDistance(`${_distance.toFixed(2)} km`);
    };

    // Calculate distance once when component mounts or when the locations update
    React.useEffect(() => {
        calculateDistance(userLocation.latitude, userLocation.longitude, destination.latitude, destination.longitude);
    }, [userLocation, destination]);

    const [viewport] = React.useState<ViewportState>({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zoom: 10,
        bearing: 0,
        pitch: 50,
    });

    const deliveryMethodTimeDialog = useBoolean(true);


    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
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
                                border: theme => `1px solid ${theme.palette.grey[50]}`,
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
                                color: theme => alpha(theme.palette.grey[500], 0.4),
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
                                border: theme => `2px solid ${theme.palette.grey[50]}`,
                                backgroundColor: theme => theme.palette.error.main,
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
                    justifyContent: upMd ? 'flex-start' : 'space-between',
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
                                backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
                            }}>
                                <Iconify icon="bx:arrow-back" sx={{
                                    color: theme => theme.palette.grey[900],
                                }} />
                            </IconButton>
                            <Typography variant="subtitle2" sx={{
                                color: theme => theme.palette.grey[800],
                            }}>Back</Typography>
                        </Box>
                    </Link>
                    <Box className='cover-text' sx={{
                        pointerEvents: 'none',
                        transition: 'all 0.3s',
                    }}>
                        <Typography variant="h1" sx={{
                            color: theme => theme.palette.grey[900],
                            fontWeight: '900',
                        }}>Checkout</Typography>
                        <Typography variant="h4" sx={{
                            color: theme => theme.palette.grey[800],
                            fontWeight: '800',
                        }}>{address}</Typography>
                    </Box>
                </Box>
            </StyledMapContainer>


            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: upMd ? 'row' : 'column',
                gap: 4,
            }}>
                <Box sx={{
                    width: upMd ? '50%' : '100%',
                }}>
                    <Box sx={{
                        mb: 4,
                    }}>
                        <Typography variant="h4" sx={{
                            mb: 2
                        }}>Delivery method and time</Typography>

                        <ButtonBase sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            borderRadius: 1,
                            border: theme => `1px solid ${theme.palette.divider}`,
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'transparent',
                            boxShadow: 2,
                        }} onClick={deliveryMethodTimeDialog.onTrue}>
                            <Iconify icon="ic:sharp-delivery-dining" sx={{
                                width: '32px',
                                height: '32px',
                            }} />
                            <Box component='span' sx={{
                                flex: 1,
                                display: 'flex',
                                flexWrap: 'wrap',
                                textAlign: 'left',
                                gap: 1,
                            }}>
                                <Typography variant="subtitle1" component='span' sx={{
                                }}>Delivery</Typography>
                                <Typography variant="body2" sx={{
                                    color: 'text.secondary',
                                }}>in 35-45 mins to</Typography>
                                <Typography variant="subtitle1" component='span' sx={{
                                }}>Athens International Airport Eleftherios Venizelos (ATH)</Typography>
                            </Box>
                            <Iconify icon="ri:arrow-right-s-line" sx={{
                                width: '32px',
                                height: '32px',
                            }} />
                        </ButtonBase>

                        <StyledDialog
                            open={deliveryMethodTimeDialog.value}
                            onClose={deliveryMethodTimeDialog.onFalse}
                        >
                            <Box sx={{
                                p: 3,
                            }}>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}>

                                    <IconButton sx={{
                                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                                        color: 'white',
                                    }} onClick={deliveryMethodTimeDialog.onFalse}>
                                        <Iconify icon="material-symbols:close" />
                                    </IconButton>
                                </Box>
                                <Typography variant="h4" sx={{
                                    mb: 2,
                                }}>Select order details</Typography>

                                <DeliverChangeOrderDetail1Section />
                                <Button fullWidth variant="contained" color="primary" onClick={deliveryMethodTimeDialog.onFalse}>Done</Button>
                            </Box>
                        </StyledDialog>
                    </Box>

                    <Box sx={{
                        mb: 4,
                    }}>
                        <Typography variant="h4" sx={{
                            mb: 2
                        }}>Selected items</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            gap: 2,
                        }}>
                            {
                                Array.from({ length: 2 }).map((_, index) => (
                                    <DeliverYourOrderItem key={index} sx={{
                                        width: 1,
                                    }} />
                                ))
                            }
                            <Button variant="outlined" startIcon={<Iconify icon="material-symbols:add" />}>Add more items</Button>
                        </Box>
                    </Box>

                    <Box sx={{
                        mb: 4,
                    }}>
                        <Typography variant="h4" sx={{
                            mb: 2,
                        }}>Payment details</Typography>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            borderRadius: 1,
                            border: theme => `1px solid ${theme.palette.divider}`,
                            boxShadow: 2,
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'transparent',
                            mb: 2,
                        }}>
                            <Iconify icon="ion:card-outline" sx={{
                                width: '32px',
                                height: '32px',
                                color: theme => theme.palette.primary.main,
                            }} />
                            <Box component='span' sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}>
                                <Typography variant="subtitle1" component='span' sx={{
                                    color: theme => theme.palette.primary.main,
                                }}>Nicolas papadopoulos</Typography>
                                <Typography variant="body2" sx={{
                                    color: 'text.secondary',
                                }}>The chosen payment method will be charged</Typography>
                            </Box>
                            <Iconify icon="ri:arrow-right-s-line" sx={{
                                width: '32px',
                                height: '32px',
                            }} />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            borderRadius: 1,
                            border: theme => `1px solid ${theme.palette.divider}`,
                            boxShadow: 2,
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'transparent',
                            mb: 2,
                        }}>
                            <Iconify icon="game-icons:cash" sx={{
                                width: '32px',
                                height: '32px',
                                color: theme => theme.palette.primary.main,
                            }} />
                            <Box component='span' sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}>
                                <Typography variant="subtitle1" component='span' sx={{
                                    color: theme => theme.palette.primary.main,
                                }}>Cash</Typography>
                                <Typography variant="body2" sx={{
                                    color: 'text.secondary',
                                }}>Please check that you have exactly €40.94</Typography>
                            </Box>
                            <Iconify icon="ri:arrow-right-s-line" sx={{
                                width: '32px',
                                height: '32px',
                            }} />
                        </Box>
                    </Box>

                    <Box sx={{
                        mb: 4,
                    }}>
                        <DeliverRestaurantsTipCourier />
                    </Box>

                    <Box sx={{
                        mb: 4,
                    }}>
                        <Typography variant="h4" sx={{
                            mb: 2,
                        }}>Promo code</Typography>
                        <Typography variant="body2" sx={{
                            mb: 2,
                        }}>If you have a Wolt promo code, enter it below to claim your benefits.</Typography>
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                        }}>
                            <TextField placeholder="Enter promo code" sx={{
                                flex: 1,
                            }} />
                            <Button size='large' variant="contained" color="primary">Submit</Button>
                        </Box>
                    </Box>
                </Box>


                <Box sx={{
                    width: upMd ? '40%' : '100%',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        py: 2,
                        position: 'sticky',
                        top: '32px',
                        ...(upMd && {
                            marginTop: '-64px',
                            p: 4,
                            borderRadius: 2,
                            boxShadow: 3,
                            backgroundColor: theme => alpha(theme.palette.background.default, 0.4),
                            backdropFilter: 'blur(10px)',
                        })
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 4,
                        }}>
                            <Box>
                                <Typography variant="h4">Prices in EUR</Typography>
                                <Typography sx={{
                                    color: 'text.secondary',
                                }}>incl. taxes (if applicable)</Typography>
                            </Box>
                            <Iconify icon="material-symbols:info-outline" sx={{
                                color: theme => theme.palette.info.main,
                            }} />
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 4,
                        }}>
                            <Typography variant="subtitle2">Item subtotal (4 items)</Typography>
                            <Typography>36.64</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Typography variant="subtitle2">Delivery (4.30 km)</Typography>
                            <Typography>4.00</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 4,
                        }}>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                            }}>The climate is changing, and so are we.</Typography>
                            <Typography color="primary">More</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Typography variant="subtitle2">Service fee</Typography>
                            <Typography>0.30</Typography>
                        </Box>

                        <Divider sx={{ my: 4, }} />

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Typography variant="subtitle2">Total sum</Typography>
                            <Typography>€40.94</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 4,
                        }}>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                            }}>You’ll pay this amount in cash when the order is delivered.</Typography>
                        </Box>

                        <Button fullWidth variant="contained" color="primary" >Click to order</Button>
                    </Box>

                </Box>
            </Box>
        </Container >
    );
}
