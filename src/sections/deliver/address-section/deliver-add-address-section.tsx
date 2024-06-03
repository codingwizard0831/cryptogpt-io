import React, { useState } from "react";

import { Box, alpha, Select, useTheme, MenuItem, TextField, IconButton, Typography, InputLabel, FormControl, Autocomplete } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import Iconify from "src/components/iconify";
import { StyledDialog } from "src/components/styled-component";

import DeliverChooseLocationKindSection from "./deliver-choose-location-kind-section";

export default function DeliverAddddressSection() {
    const theme = useTheme();
    const addAddressDialog = useBoolean(false);
    const [streetNamdNumber, setStreetNamdNumber] = useState();

    const handleChangeStreetNamdNumber = (newValue: any) => {
        setStreetNamdNumber(newValue as any);
        console.log("handleChangeStreetNamdNumber", newValue);
    };

    return <>
        <StyledDialog open={addAddressDialog.value}>
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
                    }} onClick={addAddressDialog.onFalse}>
                        <Iconify icon="material-symbols:close" />
                    </IconButton>
                </Box>
                <Typography variant="h4" sx={{
                    mb: 2,
                    px: 2,
                }}>Add new address</Typography>

                <Box sx={{
                    px: 2,
                    mb: 2,
                }}>
                    <FormControl fullWidth sx={{
                        mb: 2,
                    }}>
                        <InputLabel sx={{
                            color: 'text.secondary',
                        }}>Country*</InputLabel>
                        <Select
                            labelId="address-country-label"
                            id="address-country"
                            label="Country*"
                        >
                            {
                                countryDummyData.map((country, index) => <MenuItem key={index} value={country}>{country}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <Autocomplete
                        fullWidth
                        options={streetNameNumberDummyData}
                        getOptionLabel={(option: any) => option.title}
                        renderInput={(params) => (
                            <TextField {...params} label="Source" placeholder="Source" />
                        )}
                        renderOption={(props, option: any, { selected }) => (
                            <MenuItem {...props} key={option.id} selected={selected}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    width: '100%',
                                }}>
                                    <Box sx={{
                                        display: 'inline-block',
                                        borderRadius: '50%',
                                        backgroundColor: selected ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.divider, 0.2),
                                        p: 1,
                                    }}>
                                        <Iconify icon="akar-icons:location" sx={{
                                            width: '24px',
                                            height: '24px',
                                            color: selected ? theme.palette.primary.main : theme.palette.text.primary,
                                        }} />
                                    </Box>
                                    <Box sx={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        py: 2,
                                    }}>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                color: selected ? 'primary.main' : 'text.primary',
                                            }}>{option.title}</Typography>
                                            <Typography variant="body2" sx={{
                                                color: 'text.secondary',
                                            }}>{option.description}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </MenuItem>
                        )}
                        onChange={(event, newValue) => handleChangeStreetNamdNumber(newValue)}
                        sx={{
                            mb: 2,
                            '& .MuiAutocomplete-paper': {
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                                border: `1px solid ${theme.palette.divider}`,
                            },
                        }}
                    />

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Iconify icon="mdi:shop-location-outline" sx={{
                            color: theme.palette.primary.main,
                            width: '100px',
                            height: '100px',
                            cursor: 'pointer',
                        }} />
                    </Box>
                </Box>
            </Box>
        </StyledDialog>

        <DeliverChooseLocationKindSection />
    </>
}

const countryDummyData = [
    "Greece",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Portugal",
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
]

const streetNameNumberDummyData = [
    {
        id: '1',
        title: 'Germanias 4',
        description: 'Germanias 4, Athens, Greece',
    },
    {
        id: '2',
        title: 'Germanias 5',
        description: 'Germanias 5, Athens, Greece',
    },
    {
        id: '3',
        title: 'Germanias 6',
        description: 'Germanias 6, Athens, Greece',
    },
    {
        id: '4',
        title: 'Germanias 7',
        description: 'Germanias 7, Athens, Greece',
    },
];