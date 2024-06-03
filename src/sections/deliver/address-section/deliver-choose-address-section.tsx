import React, { useState } from "react";

import { Box, alpha, Button, useTheme, IconButton, Typography, ButtonBase } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { ScrollCustomStyle } from 'src/theme/css';

import Iconify from "src/components/iconify";
import { StyledDialog } from "src/components/styled-component";

import DeliverChooseCitySection from "./deliver-choose-city-section";

export default function DeliverChooseAddressSection() {
    const theme = useTheme();
    const chhoseAddressDialog = useBoolean(false);
    const [currentAddress, setCurrentAddress] = useState({
        id: '1',
        title: 'Home',
        deseciption: 'Germanias 4',
    });

    const handleChooseAddress = (_address: any) => {
        // chhoseAddressDialog.onFalse();
        setCurrentAddress(_address);
    }

    return <>
        <StyledDialog open={chhoseAddressDialog.value}>
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
                    }} onClick={chhoseAddressDialog.onFalse}>
                        <Iconify icon="material-symbols:close" />
                    </IconButton>
                </Box>
                <Typography variant="h4" sx={{
                    mb: 2,
                    px: 2,
                }}>Where to?</Typography>

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
                            addressDummyData.map((address, index) => <Box key={address.id} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}>
                                <Box sx={{
                                    display: 'inline-block',
                                    borderRadius: '50%',
                                    backgroundColor: currentAddress.id === address.id ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.divider, 0.2),
                                    p: 1,
                                }}>
                                    <Iconify icon="akar-icons:location" sx={{
                                        width: '24px',
                                        height: '24px',
                                        color: currentAddress.id === address.id ? theme.palette.primary.main : theme.palette.text.primary,
                                    }} />
                                </Box>
                                <Box sx={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    py: 2,
                                    ...(index === addressDummyData.length - 1 ? {} : {
                                        borderBottom: `solid 1px ${theme.palette.divider}`,
                                    }),
                                }}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: currentAddress.id === address.id ? 'primary.main' : 'text.primary',
                                        }}>{address.title}</Typography>
                                        <Typography variant="body2" sx={{
                                            color: 'text.secondary',
                                        }}>{address.deseciption}</Typography>
                                    </Box>
                                    {
                                        currentAddress.id !== address.id && <Button color='primary' sx={{
                                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                        }}
                                            onClick={() => handleChooseAddress(address)}
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
                            <Iconify icon="akar-icons:plus" sx={{
                                width: '24px',
                                height: '24px',
                                color: 'primary.main',
                            }} />
                        </Box>
                        <Typography variant="subtitle1" sx={{
                            color: 'primary.main',
                        }}>Add new address</Typography>
                    </ButtonBase>

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
                        }}>Brawse all Updated cities</Typography>
                    </ButtonBase>
                </Box>
            </Box>
        </StyledDialog>

        <DeliverChooseCitySection />
    </>
}

const addressDummyData = [
    {
        id: '1',
        title: 'Home',
        deseciption: 'Germanias 4',
    },
    {
        id: '2',
        title: 'Gatya',
        deseciption: 'Georgiou Griva Digeni 132',
    },
    {
        id: '3',
        title: 'Gatya1',
        deseciption: 'Georgiou Griva Digeni 1321',
    },
    {
        id: '4',
        title: 'Gatya2',
        deseciption: 'Georgiou Griva Digeni 1322',
    },
    {
        id: '5',
        title: 'Gatya2',
        deseciption: 'Georgiou Griva Digeni 1322',
    },
    {
        id: '6',
        title: 'Gatya2',
        deseciption: 'Georgiou Griva Digeni 1322',
    },
    {
        id: '7',
        title: 'Gatya2',
        deseciption: 'Georgiou Griva Digeni 1322',
    },
    {
        id: '8',
        title: 'Gatya2',
        deseciption: 'Georgiou Griva Digeni 1322',
    },
    {
        id: '9',
        title: 'Gatya2',
        deseciption: 'Georgiou Griva Digeni 1322',
    },
    {
        id: '10',
        title: 'Gatya2',
        deseciption: 'Georgiou Griva Digeni 1322',
    },
]