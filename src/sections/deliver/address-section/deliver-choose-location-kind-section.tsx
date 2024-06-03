import React, { useState } from "react";

import { Box, alpha, Button, useTheme, IconButton, Typography } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { ScrollCustomStyle } from 'src/theme/css';

import Iconify from "src/components/iconify";
import { StyledDialog } from "src/components/styled-component";

import DeliverDetailAddressSection from "./deliver-detail-address-section";

export default function DeliverChooseLocationKindSection() {
    const theme = useTheme();
    const locationKindDialog = useBoolean(false);
    const [currentKind, setCurrentKind] = useState<any | undefined>(null);


    const handleChooseKind = (_city: any) => {
        // chhoseCityDialog.onFalse();
        setCurrentKind(_city);
    }
    return <>
        <StyledDialog open={locationKindDialog.value}>
            <Box sx={{
                width: '90vw',
                maxWidth: '500px',
                py: 1,
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Iconify icon="solar:buildings-2-outline" sx={{
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
                    }} onClick={locationKindDialog.onFalse}>
                        <Iconify icon="material-symbols:close" />
                    </IconButton>
                </Box>
                <Typography variant="h4" sx={{
                    px: 2,
                }}>What kind of location is this?</Typography>
                <Typography variant="body1" sx={{
                    color: 'text.secondary',
                    mb: 2,
                    px: 2,
                }}>Help us find you faster by indentifying the type of clocation this is.</Typography>

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
                            kindDummyData.map((kind, index) => <Box key={kind.id} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}>
                                <Box sx={{
                                    display: 'inline-block',
                                    borderRadius: '50%',
                                    backgroundColor: currentKind?.id === kind.id ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.divider, 0.2),
                                    p: 1,
                                }}>
                                    <Iconify icon={kind.icon} sx={{
                                        width: '24px',
                                        height: '24px',
                                        color: currentKind?.id === kind.id ? theme.palette.primary.main : theme.palette.text.primary,
                                    }} />
                                </Box>
                                <Box sx={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    py: 2,
                                    ...(index === kindDummyData.length - 1 ? {} : {
                                        borderBottom: `solid 1px ${theme.palette.divider}`,
                                    }),
                                }}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: currentKind?.id === kind.id ? 'primary.main' : 'text.primary',
                                        }}>{kind.title}</Typography>
                                    </Box>
                                    {
                                        currentKind?.id !== kind.id && <Button color='primary' sx={{
                                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                        }}
                                            onClick={() => handleChooseKind(kind)}
                                        >Choose</Button>
                                    }
                                </Box>
                            </Box>)
                        }
                    </Box>
                </Box>
            </Box>
        </StyledDialog>

        <DeliverDetailAddressSection />
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