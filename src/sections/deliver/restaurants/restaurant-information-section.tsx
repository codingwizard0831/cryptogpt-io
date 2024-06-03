import React, { useState } from "react";
import Map, { Layer, Marker, Source, ViewState, LayerProps } from 'react-map-gl';

import { Box, alpha, styled, Button, useTheme, IconButton, Typography } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { MAPBOX_API } from 'src/config-global';

import Iconify from "src/components/iconify";
import { StyledDialog } from "src/components/styled-component";


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


interface LocationMarker {
    latitude: number;
    longitude: number;
}
export default function DeliverRestaurantInformationSection() {
    const theme = useTheme();
    const restaurantInformationDialog = useBoolean(false);
    const isDraggable = useBoolean(false);

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

    const [viewport, setViewport] = useState<ViewState>({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zoom: 10,
        bearing: 0,
        pitch: 50,
        padding: { top: 10, bottom: 10, left: 10, right: 10 },
    });

    const [markerViewport, setMarkerViewport] = useState<LocationMarker>({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
    });
    const [restaurantLocation] = useState<LocationMarker>({
        latitude: 37.9055648,
        longitude: 23.7948324,
    });

    const polygonData = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [ // Replace these coordinates with those that define your area
                            [23.716, 37.979],
                            [23.756, 37.979],
                            [23.756, 38.019],
                            [23.716, 38.019],
                            [23.716, 37.979] // Closing the loop
                        ]
                    ]
                }
            }
        ]
    };

    const layerStyle: LayerProps = {
        id: 'polygon',
        type: 'fill',
        paint: {
            'fill-color': '#888',   // Set the fill color
            'fill-opacity': 0.4     // Set the fill opacity
        }
    };

    return <StyledDialog open={restaurantInformationDialog.value}>
        <Box sx={{
            width: '90vw',
            maxWidth: '500px',
        }}>
            <Box sx={{
                width: '100%',
                position: 'relative',
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
                    <IconButton sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        color: 'white',
                        position: 'absolute',
                        right: '16px',
                        top: '16px',
                        zIndex: 10,
                    }} onClick={restaurantInformationDialog.onFalse}>
                        <Iconify icon="material-symbols:close" />
                    </IconButton>

                    <Map
                        {...mapConfigSetting}
                        initialViewState={{ ...viewport }}
                        mapStyle="mapbox://styles/mapbox/light-v10"
                        mapboxAccessToken={MAPBOX_API}
                    >
                        <Marker
                            latitude={restaurantLocation.latitude}
                            longitude={restaurantLocation.longitude}
                            anchor="bottom"
                        >
                            <Box sx={{
                                position: 'relative',
                                width: '48px',
                                height: '48px',
                                transition: 'all 0.3s',
                            }}>
                                <Iconify icon="fa6-solid:location-pin" sx={{
                                    color: 'secondary.main',
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 2,
                                }} />
                                <Iconify icon="material-symbols-light:restaurant" sx={{
                                    color: 'grey.main',
                                    position: 'absolute',
                                    left: '20%',
                                    top: '10%',
                                    width: '60%',
                                    height: '60%',
                                    zIndex: 2,
                                }} />
                            </Box>
                        </Marker>

                        <Marker
                            latitude={markerViewport.latitude}
                            longitude={markerViewport.longitude}
                            anchor="bottom"
                        >
                            <Box sx={{
                                position: 'relative',
                                width: '48px',
                                height: '48px',
                                transition: 'all 0.3s',
                            }}>
                                <Iconify icon="icomoon-free:location2" sx={{
                                    color: 'primary.main',
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 2,
                                }} />
                            </Box>
                        </Marker>

                        <Source type="geojson" data={polygonData}>
                            <Layer {...layerStyle} />
                        </Source>
                    </Map>
                </StyledMapContainer>
            </Box>

            <Box sx={{
                px: 2,
                mb: 4,
            }}>
                <Typography variant="h4" sx={{
                    mb: 1,
                }}>Restaurant Name</Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                }}>
                    <Box sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'success.main',
                    }} />
                    <Typography variant="body1" sx={{
                        color: 'text.secondary',
                    }}>Friday 10:30 ~ 15:30</Typography>
                </Box>
                <Typography variant="body1" sx={{
                    color: 'text.secondary',
                    mb: 2,
                }}>Athen, 33 street</Typography>
            </Box>


            <Box sx={{
                px: 2,
                mb: 4,
            }}>
                <Typography variant="h4" sx={{
                    mb: 1,
                }}>Address</Typography>
                <Typography variant="body1" sx={{
                    color: 'text.secondary',
                }}>Agias filaxeos 112</Typography>
                <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    fontWeight: 300,
                    mb: 1,
                }}>3110 Limassol</Typography>
                <Button>See map</Button>
            </Box>

            <Box sx={{
                px: 2,
                mb: 4,
            }}>
                <Typography variant="h4" sx={{
                    mb: 2,
                }}>Opening times</Typography>
                <Box sx={{
                }}>
                    {
                        openingTimeDummyData.map((time, index) => <Box key={index} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 1,
                        }}>
                            <Typography variant="body1" sx={{
                                color: 'text.secondary',
                            }}>{time.day}</Typography>
                            <Typography variant="body1" sx={{
                                color: 'text.secondary',
                            }}>{time.isOpen ? `${time.start} ~ ${time.end}` : 'Closed'}</Typography>
                        </Box>)
                    }
                </Box>
            </Box>

            <Box sx={{
                px: 2,
                mb: 4,
            }}>
                <Typography variant="h4" sx={{
                    mb: 2,
                }}>Delivery information</Typography>
                <Box sx={{
                    mb: 2,
                }}>
                    {
                        openingTimeDummyData.map((time, index) => <Box key={index} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 1,
                        }}>
                            <Typography variant="body1" sx={{
                                color: 'text.secondary',
                            }}>{time.day}</Typography>
                            <Typography variant="body1" sx={{
                                color: 'text.secondary',
                            }}>{time.isOpen ? `${time.start} ~ ${time.end}` : 'Closed'}</Typography>
                        </Box>)
                    }
                </Box>
                <Box sx={{
                    mb: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                    }}>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>Base delivery fee</Typography>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>€1.45</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                    }}>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>Small order surcharge limit</Typography>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>€6.00</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                    }}>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>long delivery surcharge limit</Typography>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>1 km</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                    }}>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>Estimated time until delivery</Typography>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>40 min</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                px: 2,
                mb: 4,
            }}>
                <Typography variant="h4" sx={{
                    mb: 2,
                }}>Contact</Typography>
                <Typography variant="body1" sx={{
                    color: 'text.secondary',
                    mb: 1,
                    fontSize: '12px',
                }}>If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.</Typography>
                <Box sx={{
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                    }}>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>Legal name</Typography>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>Trekomnia ltd</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                    }}>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>Registered address</Typography>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>Kiklaminon 16 , 3110, Limassol, Cyprus</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                    }}>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                            mb: 1,
                        }}>Registration number</Typography>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                            mb: 1,
                        }}>HE 437179</Typography>
                    </Box>
                    <Typography variant="body1" sx={{
                        color: 'text.secondary',
                        mb: 2,
                    }}>The Partner is committed to only offering products and/or services that comply with the applicable laws.</Typography>
                </Box>

                <Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        py: 1,
                    }}>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>Phone number</Typography>
                        <Typography variant="body1" sx={{
                            color: 'primary.main',
                        }}>+35725382153</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        py: 1,
                    }}>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>Website</Typography>
                        <Typography variant="body1" sx={{
                            color: 'primary.main',
                        }}>https://www.facebook.com/souzitrospsistaria/</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        py: 1,
                    }}>
                        <Typography variant="body1" sx={{
                            color: 'text.secondary',
                        }}>Wolt support
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: 'primary.main',
                        }}>Open support chat</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </StyledDialog>
}

const openingTimeDummyData = [
    {
        day: 'Monday',
        isOpen: true,
        start: '10:30',
        end: '15:30',
    },
    {
        day: 'Tuesday',
        isOpen: true,
        start: '10:30',
        end: '15:30',
    },
    {
        day: 'Wednesday',
        isOpen: true,
        start: '10:30',
        end: '15:30',
    },
    {
        day: 'Thursday',
        isOpen: true,
        start: '10:30',
        end: '15:30',
    },
    {
        day: 'Friday',
        isOpen: true,
        start: '10:30',
        end: '15:30',
    },
    {
        day: 'Saturday',
        isOpen: false,
        start: '00:00',
        end: '05:00',
    },
    {
        day: 'Sunday',
        isOpen: true,
        start: '10:30',
        end: '15:30',
    },
];