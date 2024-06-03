import React, { useState } from "react";

import { Box, alpha, Button, useTheme, IconButton, Typography } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { ScrollCustomStyle } from 'src/theme/css';

import Iconify from "src/components/iconify";
import Image from "src/components/image/image";
import { StyledDialog } from "src/components/styled-component";

export default function DeliverChooseCountrySection() {
    const theme = useTheme();
    const chhoseCountryDialog = useBoolean(false);
    const [currentCountry, setCurrentCountry] = useState({
        id: '1',
        title: 'Home',
        deseciption: 'Germanias 4',
    });

    const handleChooseCountry = (_country: any) => {
        // chhoseCountryDialog.onFalse();
        setCurrentCountry(_country);
    }

    return <StyledDialog open={chhoseCountryDialog.value}>
        <Box sx={{
            width: '90vw',
            maxWidth: '500px',
            py: 1,
            position: 'relative',
            overflow: 'hidden',
        }}>
            <Iconify icon="gis:poi-map-o" sx={{
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
                }} onClick={chhoseCountryDialog.onFalse}>
                    <Iconify icon="material-symbols:close" />
                </IconButton>
            </Box>
            <Typography variant="h4" sx={{
                mb: 2,
                px: 2,
            }}>Updated countries</Typography>

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
                        countryDummyData.map((country, index) => <Box key={country.id} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}>
                            <Box sx={{
                                transform: 'scale(0.9)',
                            }}>
                                <Image src={`/assets/icons/flag/${country.flag}.svg`} alt={country.title} sx={{
                                    width: '24px',
                                    height: '24px',
                                }} />
                            </Box>
                            <Box sx={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                py: 2,
                                ...(index === countryDummyData.length - 1 ? {} : {
                                    borderBottom: `solid 1px ${theme.palette.divider}`,
                                }),
                            }}>
                                <Box>
                                    <Typography variant="subtitle1" sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        color: currentCountry.id === country.id ? 'primary.main' : 'text.primary',
                                    }}>{country.title}</Typography>
                                </Box>
                                {
                                    currentCountry.id !== country.id && <Button color='primary' sx={{
                                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                    }}
                                        onClick={() => handleChooseCountry(country)}
                                    >Choose</Button>
                                }
                            </Box>
                        </Box>)
                    }
                </Box>
            </Box>
        </Box>
    </StyledDialog>
}

const countryDummyData = [
    {
        id: '1',
        title: 'Serres',
        flag: 'ai'
    },
    {
        id: '2',
        title: 'Syros',
        flag: 'al'
    },
    {
        id: '3',
        title: 'Thessaloniki',
        flag: 'ag',
    },
    {
        id: '4',
        title: 'Gatya2',
        flag: 'af',
    },
    {
        id: '5',
        title: 'Gatya2',
        flag: 'ae',
    },
    {
        id: '6',
        title: 'Gatya2',
        flag: 'ad',
    },
    {
        id: '7',
        title: 'Gatya2',
        flag: 'ad',
    },
    {
        id: '8',
        title: 'Gatya2',
        flag: 'ad',
    },
    {
        id: '9',
        title: 'Gatya2',
        flag: 'ad',
    },
    {
        id: '10',
        title: 'Gatya2',
        flag: 'ad',
    },
]