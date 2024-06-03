'use client';

import React, { useState } from 'react';

import { Box, Link, Chip, Stack, alpha, Select, Button, Avatar, Divider, MenuItem, useTheme, Checkbox, TextField, Typography, InputLabel, IconButton, Breadcrumbs, FormControl, Autocomplete, SelectChangeEvent } from "@mui/material";

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { ScrollCustomStyle } from 'src/theme/css';

import Iconify from "src/components/iconify";
import CountInput from 'src/components/count-input';
import { usePopover } from 'src/components/custom-popover';
import StyledPopover from 'src/components/styled-component/styled-popover';

import { ITravelCity, ITravelFlight, ITravleAirline } from 'src/types/travel';

import TravelJourney from './travel-journey';
import TravelWeatherForWeek from './travel-weather-for-week';

export default function TravelNewOrderView() {
    const theme = useTheme();
    const upMd = useResponsive('up', 'md');
    const [journeyType, setJourneyType] = React.useState('one');
    const [origin, setOrigin] = useState<ITravelCity | null>();
    const [destination, setDestination] = useState<ITravelCity | null>();
    const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
    const [returnDate, setReturnDate] = useState<Date | null>(new Date());
    const [departureTakeOffTime, setDepartureTakeOffTime] = useState<number[]>([0, 24]);
    const [departureLandingTime, setDepartureLandingTime] = useState<number[]>([0, 24]);
    const [returnTakeOffTime, setReturnTakeOffTime] = useState<number[]>([0, 24]);
    const [returnLandingTime, setReturnLandingTime] = useState<number[]>([0, 24]);
    const passengerPopover = usePopover();
    const [numberOfAdults, setNumberOfAdults] = useState(1);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [agesOfChildren, setAgesOfChildren] = useState<number[]>([]);
    const [classType, setClassType] = useState('economy');
    const [flightData, setFlightData] = useState<ITravelFlight[]>([{}]);
    const [source, setSource] = useState<ITravleAirline[]>([]);
    const [supplierTimeout, setSupplierTimeout] = useState<number>(0);
    const isAdvancedOption = useBoolean(false);

    const handleChangeDepartureTakeOffTime = (newValue: number | number[]) => {
        setDepartureTakeOffTime(newValue as number[]);
    };

    const handleChangeDepartureLandingTIme = (newValue: number | number[]) => {
        setDepartureLandingTime(newValue as number[]);
    };

    const handleChangeReturnTakeOffTime = (newValue: number | number[]) => {
        setReturnTakeOffTime(newValue as number[]);
    };

    const handleChangeReturnLandingTIme = (newValue: number | number[]) => {
        setReturnLandingTime(newValue as number[]);
    };

    const handleChangeClass = (event: SelectChangeEvent) => {
        setClassType(event.target.value);
    }

    const handleChangeNumberOfChildren = (newValue: number) => {
        setNumberOfChildren(newValue);
        if (agesOfChildren.length < newValue) {
            setAgesOfChildren([...agesOfChildren, ...Array(newValue - agesOfChildren.length).fill(1)]);
        } else {
            setAgesOfChildren(agesOfChildren.slice(0, newValue));
        }
    }

    const setFlightDataAtIndex = (index: number, data: ITravelFlight) => {
        const newFlightData = [...flightData];
        newFlightData[index] = data;
        setFlightData(newFlightData);
    }

    const handleChangeSource = (newValue: ITravleAirline[]) => {
        setSource(newValue as ITravleAirline[]);
    };

    const changeHandleSupplierTimeout = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSupplierTimeout(+event.target.value);
    }

    return <Box
        sx={{
            width: 1,
            height: 1,
            p: 2,
            pt: 0,
        }}
    >
        <Breadcrumbs sx={{ mt: 2 }}>
            <Link color="inherit" href="#">
                Travel
            </Link>
            <Link color="inherit" href="#">
                Order
            </Link>
            <Typography
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary',
                }}
            >
                New Order
            </Typography>
        </Breadcrumbs>
        <Box>
            <Typography
                variant="h4"
                sx={{
                    mt: 2,
                    mb: 1,
                }}
            >
                Create a new order
            </Typography>

            <TravelWeatherForWeek sx={{
                position: upMd ? 'absolute' : 'static',
                right: '16px',
                top: '16px',
                mb: 2,
            }} />

            <Box sx={{
                mb: 2,
            }}>
                <Typography sx={{
                    fontSize: 14,
                    mb: 1,
                }}>Journey type</Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                }}>
                    {
                        journeyTypes.map((jtype) => <Box key={`jouryney-${jtype.key}`} sx={{
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            border: `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                            width: '100px',
                            height: '100px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            backdropFilter: 'blur(10px)',
                            position: 'relative',
                            ":hover": {
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                border: `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                color: `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                '& span': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.4),
                                },
                                '& svg': {
                                    color: alpha(theme.palette.primary.main, 0.4),
                                },
                                '& p': {
                                    color: alpha(theme.palette.primary.main, 0.8),
                                },
                            },
                            ...(jtype.key === journeyType && {
                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                border: `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                color: `solid 1px ${alpha(theme.palette.primary.main, 0.8)}`,
                            }),
                        }}
                            onClick={() => setJourneyType(jtype.key)}
                        >
                            <Box component="span" sx={{
                                position: 'absolute',
                                left: '8px',
                                top: '8px',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                transition: 'all 0.3s',
                                backgroundColor: 'transparent',
                                ...(jtype.key === journeyType && {
                                    backgroundColor: `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                }),
                            }} />
                            <Iconify icon={jtype.icon} sx={{
                                width: '42px',
                                height: '42px',
                                transition: 'all 0.3s',
                                color: alpha(theme.palette.text.primary, 0.5),
                                ...(jtype.key === journeyType && {
                                    color: `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                }),
                            }} />
                            <Typography sx={{
                                transition: 'all 0.3s',
                                ...(jtype.key === journeyType && {
                                    color: `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                }),
                            }}>{jtype.label}</Typography>
                        </Box>)
                    }
                </Box>
            </Box>

            {
                journeyType === 'one' ? <TravelJourney
                    type='one-way'
                    origin={origin}
                    destination={destination}
                    departureDate={departureDate}
                    returnDate={returnDate}
                    departureTakeOffTime={departureTakeOffTime}
                    departureLandingTime={departureLandingTime}
                    returnLandingTime={returnLandingTime}
                    returnTakeOffTime={returnTakeOffTime}
                    handleOrginChange={(newValue) => setOrigin(newValue)}
                    handleDestinationChange={(newValue) => setDestination(newValue)}
                    handleDepartureDateChange={setDepartureDate}
                    handleReturnDateChange={setReturnDate}
                    handleChangeReturnLandingTIme={handleChangeReturnLandingTIme}
                    handleChangeReturnTakeOffTime={handleChangeReturnTakeOffTime}
                    handleChangeDepartureTakeOffTime={handleChangeDepartureTakeOffTime}
                    handleChangeDepartureLandingTIme={handleChangeDepartureLandingTIme}
                    sx={{
                        mb: 2,
                    }}
                />
                    : <>
                        {
                            journeyType === 'round' ? <TravelJourney
                                type='round-trip'
                                origin={origin}
                                destination={destination}
                                departureDate={departureDate}
                                returnDate={returnDate}
                                departureTakeOffTime={departureTakeOffTime}
                                departureLandingTime={departureLandingTime}
                                returnLandingTime={returnLandingTime}
                                returnTakeOffTime={returnTakeOffTime}
                                handleOrginChange={(newValue) => setOrigin(newValue)}
                                handleDestinationChange={(newValue) => setDestination(newValue)}
                                handleDepartureDateChange={setDepartureDate}
                                handleReturnDateChange={setReturnDate}
                                handleChangeReturnLandingTIme={handleChangeReturnLandingTIme}
                                handleChangeReturnTakeOffTime={handleChangeReturnTakeOffTime}
                                handleChangeDepartureTakeOffTime={handleChangeDepartureTakeOffTime}
                                handleChangeDepartureLandingTIme={handleChangeDepartureLandingTIme}
                                sx={{
                                    mb: 2,
                                }}
                            />
                                : <Box sx={{
                                    mb: 2,
                                }}>
                                    {
                                        flightData.map((flight, index) => <Box key={`flight-key-${index}`} sx={{
                                            padding: 2,
                                            border: `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                                            borderRadius: 1,
                                            boxShadow: 2,
                                            position: 'relative',
                                            mb: 2,
                                        }}>
                                            <Typography sx={{
                                                fontSize: 14,
                                                mb: 2,
                                            }}>Flight {index + 1}</Typography>

                                            <IconButton
                                                size='small'
                                                sx={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                }}
                                                onClick={() => setFlightData(flightData.filter((_, _index) => _index !== index))}
                                            >
                                                <Iconify icon="mdi:close" />
                                            </IconButton>
                                            <TravelJourney
                                                origin={flight.origin}
                                                destination={destination}
                                                departureDate={departureDate}
                                                returnDate={returnDate}
                                                departureTakeOffTime={departureTakeOffTime}
                                                departureLandingTime={departureLandingTime}
                                                returnLandingTime={returnLandingTime}
                                                returnTakeOffTime={returnTakeOffTime}
                                                handleOrginChange={(newValue) => setFlightDataAtIndex(index, { ...flight, origin: newValue })}
                                                handleDestinationChange={(newValue) => setFlightDataAtIndex(index, { ...flight, destination: newValue })}
                                                handleDepartureDateChange={(date) => setFlightDataAtIndex(index, { ...flight, departureDate: date })}
                                                handleReturnDateChange={(date) => setFlightDataAtIndex(index, { ...flight, returnDate: date })}
                                                handleChangeReturnLandingTIme={(newValue) => setFlightDataAtIndex(index, { ...flight, returnLandingTime: [...newValue as number[]] })}
                                                handleChangeReturnTakeOffTime={(newValue) => setFlightDataAtIndex(index, { ...flight, returnTakeOffTime: [...newValue as number[]] })}
                                                handleChangeDepartureTakeOffTime={(newValue) => setFlightDataAtIndex(index, { ...flight, departureTakeOffTime: [...newValue as number[]] })}
                                                handleChangeDepartureLandingTIme={(newValue) => setFlightDataAtIndex(index, { ...flight, departureLandingTime: [...newValue as number[]] })}
                                            />
                                        </Box>)
                                    }
                                    <Button
                                        variant="outlined"
                                        sx={{
                                        }}
                                        onClick={() => setFlightData([...flightData, {}])}
                                        startIcon={<Iconify icon="mdi:plus" />}
                                    >
                                        Add another flight
                                    </Button>
                                </Box>
                        }
                    </>
            }

            <Stack spacing={2} direction={upMd ? 'row' : 'column'} sx={{ mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="passenger">Passenger</InputLabel>
                    <Select
                        labelId="passenger"
                        label="Passenger"
                        value="passenger"
                        placeholder="Passenger"
                        readOnly
                        onClick={passengerPopover.onOpen}
                    >
                        <MenuItem value="passenger">{passengerFilterToLabel(numberOfAdults, numberOfChildren)}</MenuItem>
                    </Select>
                </FormControl>
                <StyledPopover
                    open={!!passengerPopover.open}
                    anchorEl={passengerPopover.open}
                    onClose={passengerPopover.onClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Box sx={{
                        width: '300px',
                        backgroundColor: alpha(theme.palette.background.paper, 0.2),
                        backdropFilter: 'blur(10px)',
                        borderRadius: 1,
                        boxShadow: 2,
                        p: 2,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 2,
                        }}>
                            <Box>
                                <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 1 }}>Adults</Typography>
                                <Typography sx={{ fontSize: '12px' }}>18+</Typography>
                            </Box>

                            <CountInput value={numberOfAdults} onValueChange={(newValue) => setNumberOfAdults(newValue)} min={1} max={9 - numberOfChildren} />
                        </Box>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            my: 2,
                        }}>
                            <Box>
                                <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 1 }}>Children</Typography>
                                <Typography sx={{ fontSize: '12px' }}>0 - 17</Typography>
                            </Box>

                            <CountInput value={numberOfChildren} onValueChange={(newValue) => handleChangeNumberOfChildren(newValue)} max={9 - numberOfAdults} />
                        </Box>

                        {
                            numberOfChildren > 0 && <Box sx={{
                                overflowX: 'hidden',
                                overflowY: 'auto',
                                maxHeight: '360px',
                                pt: 1,
                                ...ScrollCustomStyle(theme, {}),
                                my: 2,
                            }}>
                                {
                                    Array(numberOfChildren).fill(1).map((_, _index) => <FormControl key={`age-select-${_index}`} fullWidth sx={{ mb: 2, }}>
                                        <InputLabel id={`age-select-label-${_index}`}>Age of child {_index + 1} *</InputLabel>
                                        <Select
                                            labelId={`age-select-label-${_index}`}
                                            label="Select age"
                                            value={`${agesOfChildren[_index]}`}
                                            placeholder="1"
                                            onChange={(event) => setAgesOfChildren(agesOfChildren.map((age, __index) => __index === _index ? +event.target.value : age))}
                                        >
                                            {
                                                Array(18).fill(1).map((__, __index) => <MenuItem key={`class-${__index}`} value={__index}>{__index}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>)
                                }
                                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>A child&apos;s age must be valid for the full duration of journey. For example, if a child has a birthday during a trip please use their age on the date of the returning flight.
                                </Typography>
                            </Box>
                        }
                    </Box>
                </StyledPopover>

                <FormControl fullWidth>
                    <InputLabel id="economy">Class</InputLabel>
                    <Select
                        labelId="economy"
                        label="Class"
                        value={classType}
                        placeholder="Economy"
                        onChange={handleChangeClass}
                    >
                        {
                            classesData.map((cls) => <MenuItem key={`class-${cls.key}`} value={cls.key}>{cls.label}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Stack>

            <Box sx={{
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mb: 2,
                }}>
                    <Button
                        variant="outlined"
                        onClick={isAdvancedOption.onToggle}
                        sx={{
                            ml: 2,
                        }}
                    >{isAdvancedOption.value ? 'Hide advanced options' : 'Advanced options'}</Button>
                </Box>
                <Box sx={{
                    display: isAdvancedOption.value ? 'block' : 'none',
                    mb: 2,
                }}>
                    <Autocomplete
                        fullWidth
                        defaultValue={source}
                        multiple
                        limitTags={3}
                        options={dummyAirlines}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField {...params} label="Source" placeholder="Source" />
                        )}
                        renderOption={(props, option, { selected }) => (
                            <MenuItem {...props} key={option.iata_code}>
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        ml: 1,
                                    }}
                                    src={option.logo_symbol_url}
                                />
                                <Typography sx={{
                                    flex: 1,
                                    ml: 1,
                                }}>{option.name}</Typography>
                                <Checkbox key={option.iata_code} size="small" disableRipple checked={selected} />
                            </MenuItem>
                        )}
                        renderTags={(selected, getTagProps) =>
                            selected.map((option, index) => (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={option.iata_code}
                                    label={option.name}
                                    size="small"
                                    variant='soft'
                                />
                            ))
                        }
                        onChange={(event, newValue) => handleChangeSource(newValue)}
                        sx={{
                            mb: 2,
                        }}
                    />
                    <TextField fullWidth label="Supplier timeout" type='number' value={supplierTimeout} onChange={changeHandleSupplierTimeout} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            ml: 2,
                        }}
                    >Find available flights</Button>
                </Box>
            </Box>
        </Box>
    </Box >
}

const journeyTypes = [
    {
        key: 'one',
        icon: 'emojione-monotone:airplane',
        label: 'One way',
    },
    {
        key: 'round',
        icon: 'game-icons:return-arrow',
        label: 'Return',
    },
    {
        key: 'multi',
        icon: 'icon-park-twotone:in-flight',
        label: 'Multi-city',
    },
];

const classesData = [
    {
        key: 'economy',
        label: 'Economy',
    },
    {
        key: 'premium-economy',
        label: 'Premium Economy',
    },
    {
        key: 'business',
        label: 'Business',
    },
    {
        key: 'first',
        label: 'First',
    },
    {
        key: 'any',
        label: 'Any',
    },
];

function passengerFilterToLabel(adoults: number, children: number) {
    let label = `${adoults} ${adoults > 1 ? 'adults' : 'adult'}`;
    if (children > 0) {
        label += `, ${children} ${children > 1 ? 'children' : 'child'}`;
    }
    return label;
}

const dummyAirlines: ITravleAirline[] = [{
    id: 'arl_00001876aqC8c5umZmrRds',
    name: 'British Airways',
    logo_symbol_url: 'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg',
    logo_lockup_url: 'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg',
    iata_code: 'BA',
    conditions_of_carriage_url: 'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg',
}, {
    id: '2',
    name: 'Airline 2',
    logo_symbol_url: '',
    logo_lockup_url: '',
    iata_code: 'A2',
    conditions_of_carriage_url: '',
}];