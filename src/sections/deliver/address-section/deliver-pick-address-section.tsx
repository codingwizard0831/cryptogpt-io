import { getDistance } from 'geolib';
import React, { useState } from "react";
import Map, { Marker, ViewState, ViewStateChangeEvent } from 'react-map-gl';

import { Box, alpha, styled, Button, useTheme, IconButton, Typography } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { MAPBOX_API } from 'src/config-global';

import Iconify from "src/components/iconify";
import { StyledDialog } from "src/components/styled-component";

import DeliverChooseCitySection from "./deliver-choose-city-section";

const StyledMapContainer = styled('div')(({ theme }) => ({
    zIndex: 0,
    height: 400,
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
export default function DeliverPickAddressSection() {
    const theme = useTheme();
    const pickAddressDialog = useBoolean(false);
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

    const [distance, setDistance] = useState(0); // Distance in meters

    const handleMove = (event: ViewStateChangeEvent) => {
        // Update the viewport state with the proposed view state
        console.log(event.viewState);
        const newViewport = event.viewState;
        setViewport(newViewport);
        setMarkerViewport({ latitude: newViewport.latitude, longitude: newViewport.longitude });


        // Calculate and update the distance
        const currentDistance = getDistance(
            { latitude: userLocation.latitude, longitude: userLocation.longitude },
            { latitude: newViewport.latitude, longitude: newViewport.longitude }
        );
        setDistance(currentDistance);
    };

    const handleDragStart = (event: ViewStateChangeEvent) => {
        console.log('Drag started', event.viewState);
        isDraggable.onTrue();
    }

    const handleDragEnd = (event: ViewStateChangeEvent) => {
        console.log('Drag ended', event.viewState);
        isDraggable.onFalse();
    }

    return <>
        <StyledDialog open={pickAddressDialog.value}>
            <Box sx={{
                width: '90vw',
                maxWidth: '500px',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    p: 2,
                }}>
                    <IconButton sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        color: 'white',
                    }} onClick={pickAddressDialog.onFalse}>
                        <Iconify icon="material-symbols:close" />
                    </IconButton>
                </Box>

                <Typography variant="h4" sx={{
                    px: 2,
                }}>Pick Address</Typography>
                <Typography variant="body1" sx={{
                    color: 'text.secondary',
                    mb: 2,
                    px: 2,
                }}>Athen, 33 street</Typography>

                <Box sx={{
                    width: '100%',
                    position: 'relative',
                    backgroundColor: 'wheat',
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
                            onMove={handleMove}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
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
                                    ...(isDraggable.value && {
                                        width: '52px',
                                        height: '52px',
                                    })
                                }}>
                                    <Iconify icon="icomoon-free:location2" sx={{
                                        color: 'error.main',
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        width: '100%',
                                        height: '100%',
                                        zIndex: 2,
                                    }} />
                                </Box>
                            </Marker>
                        </Map>
                    </StyledMapContainer>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 'calc(100% - 32px)',
                        position: 'absolute',
                        left: '16px',
                        bottom: '16px',
                    }}>
                        <Box sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            backgroundColor: alpha(theme.palette.background.default, 0.2),
                            backdropFilter: 'blur(10px)',
                            borderRadius: '10px',
                        }}>
                            <Iconify icon="noto:bell" sx={{
                                width: '48px',
                                height: '48px',
                            }} />
                            <Box>
                                <Typography variant="h5">Where is the entrance?</Typography>
                                <Typography variant="body2" sx={{
                                    color: alpha(theme.palette.text.primary, 0.6)
                                }}>distance: {distance}m</Typography>
                            </Box>
                        </Box>
                        <Button fullWidth color="primary" variant="contained" size="large" onClick={pickAddressDialog.onFalse}>Continue</Button>
                    </Box>
                </Box>
            </Box>
        </StyledDialog>

        <DeliverChooseCitySection />
    </>
}