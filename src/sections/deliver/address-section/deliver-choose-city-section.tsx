import React, { useState } from "react";

import { Box, alpha, Button, useTheme, IconButton, Typography, ButtonBase } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { ScrollCustomStyle } from 'src/theme/css';

import Iconify from "src/components/iconify";
import { StyledDialog } from "src/components/styled-component";

import DeliverChooseCountrySection from "./deliver-choose-country-section";

export default function DeliverChooseCitySection() {
    const theme = useTheme();
    const chhoseCityDialog = useBoolean(false);
    const [currentCity, setCurrentCity] = useState({
        id: '1',
        title: 'Home',
        deseciption: 'Germanias 4',
    });

    const handleChooseCity = (_city: any) => {
        // chhoseCityDialog.onFalse();
        setCurrentCity(_city);
    }

    return <>
        <StyledDialog open={chhoseCityDialog.value}>
            <Box sx={{
                width: '90vw',
                maxWidth: '500px',
                py: 1,
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Iconify icon="game-icons:spooky-house" sx={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    fontSize: '40px',
                    color: alpha(theme.palette.primary.main, 0.2),
                    width: '200px',
                    height: '200px',
                }} />

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    p: 2,
                }}>

                    <IconButton sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        color: 'white',
                    }} onClick={chhoseCityDialog.onFalse}>
                        <Iconify icon="material-symbols:close" />
                    </IconButton>
                </Box>
                <Typography variant="h4" sx={{
                    mb: 2,
                    px: 2,
                }}>Updated in Greece</Typography>

                <Box sx={{
                    maxHeight: '400px',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    ...ScrollCustomStyle(theme, {}),
                }}>
                    <Box sx={{
                        px: 2,
                    }}>
                        {
                            cityDummyData.map((city, index) => <Box key={city.id} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}>
                                <Box sx={{
                                    display: 'inline-block',
                                    borderRadius: '50%',
                                    backgroundColor: currentCity.id === city.id ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.divider, 0.2),
                                    p: 1,
                                }}>
                                    <Iconify icon="solar:city-broken" sx={{
                                        width: '24px',
                                        height: '24px',
                                        color: currentCity.id === city.id ? theme.palette.primary.main : theme.palette.text.primary,
                                    }} />
                                </Box>
                                <Box sx={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    py: 2,
                                    ...(index === cityDummyData.length - 1 ? {} : {
                                        borderBottom: `solid 1px ${theme.palette.divider}`,
                                    }),
                                }}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: currentCity.id === city.id ? 'primary.main' : 'text.primary',
                                        }}>{city.title}</Typography>
                                    </Box>
                                    {
                                        currentCity.id !== city.id && <Button color='primary' sx={{
                                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                        }}
                                            onClick={() => handleChooseCity(city)}
                                        >Choose</Button>
                                    }
                                </Box>
                            </Box>)
                        }
                    </Box>

                    <ButtonBase sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        p: 2,
                        gap: 2,
                        width: '100%',
                        borderTop: `solid 1px ${theme.palette.divider}`,
                    }}>
                        <Box sx={{
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Iconify icon="eva:list-fill" sx={{
                                width: '24px',
                                height: '24px',
                                color: 'primary.main',
                            }} />
                        </Box>
                        <Typography variant="subtitle1" sx={{
                            color: 'primary.main',
                        }}>Brawse all Updated countries</Typography>
                    </ButtonBase>
                </Box>
            </Box>
        </StyledDialog>

        <DeliverChooseCountrySection />
    </>
}

const cityDummyData = [
    {
        id: '1',
        title: 'Serres',
    },
    {
        id: '2',
        title: 'Syros',
    },
    {
        id: '3',
        title: 'Thessaloniki',
    },
    {
        id: '4',
        title: 'Gatya2',
    },
    {
        id: '5',
        title: 'Gatya2',
    },
    {
        id: '6',
        title: 'Gatya2',
    },
    {
        id: '7',
        title: 'Gatya2',
    },
    {
        id: '8',
        title: 'Gatya2',
    },
    {
        id: '9',
        title: 'Gatya2',
    },
    {
        id: '10',
        title: 'Gatya2',
    },
]