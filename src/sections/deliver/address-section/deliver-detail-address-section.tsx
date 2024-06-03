import React, { useState } from "react";
import Map, { Marker, ViewState } from 'react-map-gl';

import { Box, alpha, Radio, styled, Button, Select, useTheme, MenuItem, TextField, IconButton, Typography, InputLabel, RadioGroup, FormControl, FormControlLabel } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { MAPBOX_API } from 'src/config-global';

import Iconify from "src/components/iconify";
import { StyledDialog } from "src/components/styled-component";

import DeliverPickAddressSection from "./deliver-pick-address-section";

const StyledMapContainer = styled('div')(({ theme }) => ({
    zIndex: 0,
    height: 200,
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

export default function DeliverDetailAddressSection() {
    const theme = useTheme();
    const detailAddressDialog = useBoolean(false);
    const [currentLocationType, setCurrentLocationType] = useState(1);
    const [currentAddressLabel, setCurrentAddressLabel] = useState('home');

    const [userLocation] = useState<LocationMarker>({
        latitude: 37.9755648,
        longitude: 23.7348324,
    });
    const [mapConfigSetting] = useState({
        minZoom: 0,
        maxZoom: 20,
        minPitch: 0,
        maxPitch: 85,
        dragPan: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false,
        dragRotate: false,
        scrollZoom: false,
        touchPitch: false,
        touchRotate: false,
        doubleClickZoom: false,
        touchZoomRotate: false,
    });

    const [viewport, setViewport] = useState<ViewState>({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zoom: 10,
        bearing: 0,
        pitch: 50,
        padding: { top: 10, bottom: 10, left: 10, right: 10 },
    });

    return <>
        <StyledDialog open={detailAddressDialog.value}>
            <Box sx={{
                width: '90vw',
                maxWidth: '500px',
                py: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    p: 2,
                }}>

                    <IconButton sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        color: 'white',
                    }} onClick={detailAddressDialog.onFalse}>
                        <Iconify icon="material-symbols:close" />
                    </IconButton>
                </Box>

                <Typography variant="h4" sx={{
                    px: 2,
                }}>Address details</Typography>
                <Typography variant="body1" sx={{
                    color: 'text.secondary',
                    mb: 4,
                    px: 2,
                }}>Giving exact address details helps us deliver your order faster.</Typography>

                <Box sx={{
                    px: 2,
                    mb: 4,
                }}>
                    <Typography variant="h6" sx={{
                        mb: 1,
                    }}>Address</Typography>
                    <Typography variant="body2" sx={{
                    }}>testing agrotouristiko</Typography>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                    }}>2107 Nicosia - Cryprus</Typography>
                </Box>

                <Box sx={{
                    px: 2,
                }}>
                    <FormControl fullWidth sx={{
                        mb: 2,
                    }}>
                        <InputLabel sx={{
                            color: 'text.secondary',
                        }}>Location type*</InputLabel>
                        <Select
                            labelId="address-country-label"
                            id="address-country"
                            label="Country*"
                            value={currentLocationType}
                            onChange={(e) => setCurrentLocationType(e.target.value as number)}
                        >
                            {
                                kindDummyData.map((kind, index) => <MenuItem key={index} value={kind.id}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}>
                                        <Iconify icon={kind.icon} />
                                        <Typography variant="body1">{kind.title}</Typography>
                                    </Box>
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    {
                        currentLocationType === 1 && <>
                            <TextField fullWidth label="Entrance / Staircase*" variant="outlined" sx={{ mb: 2 }} />
                            <TextField fullWidth label="Name / Number on door*" variant="outlined" sx={{ mb: 2 }} />
                            <TextField fullWidth label="Other instructions for the courier (optional)" variant="outlined" sx={{ mb: 4 }} />
                        </>
                    }
                    {
                        currentLocationType === 2 && <>
                            <TextField fullWidth label="Entrance / Staircase*" variant="outlined" sx={{ mb: 2 }} />
                            <Box sx={{
                                display: 'flex',
                                gap: 2,
                            }}>
                                <TextField fullWidth label="Floor*" variant="outlined" sx={{ mb: 2 }} />
                                <TextField fullWidth label="Apartment*" variant="outlined" sx={{ mb: 2 }} />
                            </Box>

                            <Box sx={{
                                mt: 4,
                                mb: 4,
                            }}>
                                <Typography variant="h6" sx={{
                                    mb: 1,
                                }}>How do we get in?</Typography>
                                <RadioGroup>
                                    <FormControlLabel
                                        value="doorbell-intercom"
                                        control={<Radio size="medium" />}
                                        label="Doorbell / Intercom"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                    <FormControlLabel
                                        value="door-code"
                                        control={<Radio size="medium" />}
                                        label="Door code"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                    <FormControlLabel
                                        value="door-is-optn"
                                        control={<Radio size="medium" />}
                                        label="Door is open"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                    <FormControlLabel
                                        value="other"
                                        control={<Radio size="medium" />}
                                        label="Other (tell us how)"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </RadioGroup>
                            </Box>

                            <TextField fullWidth label="Other instructions for the courier" variant="outlined" sx={{ mb: 4 }} />
                        </>
                    }
                    {
                        currentLocationType === 3 && <>
                            <TextField fullWidth label="Buding name*" variant="outlined" sx={{ mb: 2 }} />
                            <TextField fullWidth label="Other instructions for the courier" variant="outlined" sx={{ mb: 2 }} />
                            <TextField fullWidth label="Entrance / Staircase*" variant="outlined" sx={{ mb: 4 }} />

                            <Box sx={{
                                mb: 4,
                            }}>
                                <Typography variant="h6" sx={{
                                    mb: 1,
                                }}>Where should we bring the delivery?</Typography>
                                <RadioGroup>
                                    <FormControlLabel
                                        value="to-office"
                                        control={<Radio size="medium" />}
                                        label="To the office"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                    <FormControlLabel
                                        value="to-reception"
                                        control={<Radio size="medium" />}
                                        label="To reception"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </RadioGroup>
                            </Box>

                            <TextField fullWidth label="Other instructions for the courier" variant="outlined" sx={{ mb: 4 }} />
                        </>
                    }

                    {
                        currentLocationType === 4 && <>
                            <TextField fullWidth label="Address details" variant="outlined" sx={{ mb: 2 }} />
                            <TextField fullWidth label="Other instructions for the courier" variant="outlined" sx={{ mb: 4 }} />
                        </>
                    }
                </Box>

                <Box sx={{
                    px: 2,
                    mb: 4,
                }}>
                    <Typography variant="h6" sx={{
                        mb: 1,
                    }}>Where exactly should we meet you?</Typography>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        mb: 2,
                    }}>Pinpointing your exact location on the map helps us find you fast</Typography>
                    <StyledMapContainer sx={{
                        position: 'relative',
                        mb: 2,
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
                            <Marker
                                latitude={userLocation.latitude}
                                longitude={userLocation.longitude}
                                anchor="bottom"
                            >
                                <Box sx={{
                                    position: 'relative',
                                    width: '48px',
                                    height: '48px',
                                    transition: 'all 0.3s',
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
                    <Button fullWidth color="primary" variant="outlined"
                        startIcon={<Iconify icon="akar-icons:location" />}
                    >
                        Edit entrance location on a map
                    </Button>
                </Box>

                <Box sx={{
                    px: 2,
                    mb: 2,
                }}>
                    <Typography variant="h6" sx={{
                        mb: 2,
                    }}>Address label</Typography>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        mb: 1,
                    }}>Labelling addressses helps you to choose between them. Choose Other to create your own custom label.</Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                    }}>
                        <Button fullWidth color={currentAddressLabel === "home" ? "primary" : undefined} variant="outlined" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            gap: 1,
                        }} onClick={() => setCurrentAddressLabel('home')}
                        >
                            <Iconify icon="mdi:home-outline" />
                            <Typography variant="body2">Home</Typography>
                        </Button>
                        <Button fullWidth color={currentAddressLabel === "work" ? "primary" : undefined} variant="outlined" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            gap: 1,
                        }} onClick={() => setCurrentAddressLabel('work')}
                        >
                            <Iconify icon="bytesize:work" />
                            <Typography variant="body2">Work</Typography>
                        </Button>
                        <Button fullWidth color={currentAddressLabel === "other" ? "primary" : undefined} variant="outlined" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            gap: 1,
                        }} onClick={() => setCurrentAddressLabel('other')}
                        >
                            <Iconify icon="gis:position" />
                            <Typography variant="body2">Other</Typography>
                        </Button>
                    </Box>
                    {
                        currentAddressLabel === 'other' && <TextField fullWidth label="Name" variant="outlined" sx={{ my: 2 }} />
                    }
                </Box>

                <Box sx={{
                    px: 2,
                    mb: 2,
                }}>
                    <Button fullWidth color="primary" variant="contained" onClick={detailAddressDialog.onFalse}>Save</Button>
                </Box>
            </Box>
        </StyledDialog>

        <DeliverPickAddressSection />
    </>
}

const kindDummyData = [
    {
        id: 1,
        title: 'House',
        icon: 'material-symbols:house-outline',
    },
    {
        id: 2,
        title: "Apartment",
        icon: 'heroicons:building-office-2',
    },
    {
        id: 3,
        title: "Office",
        icon: 'solar:city-broken',
    },
    {
        id: 4,
        title: "Other",
        icon: 'icon-park-outline:future-build-one',
    },
]