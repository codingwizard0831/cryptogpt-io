'use client';

import React, { useMemo, useState } from 'react';

import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Box, Stack, Button, TextField, Autocomplete } from "@mui/material";

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from "src/components/iconify";
import { usePopover } from 'src/components/custom-popover';
import StyledPopover from 'src/components/styled-component/styled-popover';

import { ITravelCity, ITravelFlight } from 'src/types/travel';

import TravelTakeOffLandingTimePicker from './travel-take-off-landing-time-picker';

export default function TravelJourney({
    type = 'one-way',
    origin: defaultOrigin,
    destination: defaultDestination,
    departureDate: defaultDepartureDate = new Date(),
    returnDate: defaultReturnDate = new Date(),
    departureTakeOffTime: defaultDepartureTakeOffTime = [0, 24],
    departureLandingTime: defaultDepartureLandingTime = [0, 24],
    returnTakeOffTime: defaultReturnTakeOffTime = [0, 24],
    returnLandingTime: defaultReturnLandingTime = [0, 24],
    handleChangeDepartureTakeOffTime: propHandleChangeDepartureTakeOffTime,
    handleChangeDepartureLandingTIme: propHandleChangeDepartureLandingTIme,
    handleChangeReturnTakeOffTime: propHandleChangeReturnTakeOffTime,
    handleChangeReturnLandingTIme: propHandleChangeReturnLandingTIme,
    handleDepartureDateChange: propHandleDepartureDateChange,
    handleReturnDateChange: propHandleReturnDateChange,
    handleOrginChange: propHandleOrginChange,
    handleDestinationChange: propHandleDestinationChange,
    sx,
    ...other
}: ITravelFlight) {
    const upMd = useResponsive('up', 'md');
    const [origin, setOrigin] = useState<ITravelCity | null>(defaultOrigin as ITravelCity);
    const [destination, setDestination] = useState<ITravelCity | null>(defaultDestination as ITravelCity);
    const [departureDate, setDepartureDate] = useState<Date | null>(defaultDepartureDate);
    const [returnDate, setReturnDate] = useState<Date | null>(defaultReturnDate);
    const departureTimeRangePickerPopover = usePopover();
    const [departureTakeOffTime, setDepartureTakeOffTime] = useState<number[]>(defaultDepartureTakeOffTime);
    const [departureLandingTime, setDepartureLandingTime] = useState<number[]>(defaultDepartureLandingTime);
    const returnTimeRangePickerPopover = usePopover();
    const [returnTakeOffTime, setReturnTakeOffTime] = useState<number[]>(defaultReturnTakeOffTime);
    const [returnLandingTime, setReturnLandingTime] = useState<number[]>(defaultReturnLandingTime);
    const [cities, setCities] = useState<ITravelCity[]>(dummyCities);

    const handleChangeOrigin = (newValue: ITravelCity | string | null) => {
        if (typeof newValue === 'string' || newValue === null) {
            setOrigin(null);
            if (propHandleOrginChange) propHandleOrginChange(null);
            return;
        }

        setOrigin(newValue);
        if (propHandleOrginChange) {
            propHandleOrginChange(newValue);
        }
    };

    const handleDestinationChange = (newValue: ITravelCity | string | null) => {
        if (typeof newValue === 'string' || newValue === null) {
            setDestination(null);
            if (propHandleDestinationChange) propHandleDestinationChange(null);
            return;
        }

        setDestination(newValue);
        if (propHandleDestinationChange) {
            propHandleDestinationChange(newValue);
        }
    }

    const handleDepartureDateChange = (date: Date | null) => {
        setDepartureDate(date);
        if (propHandleDepartureDateChange) {
            propHandleDepartureDateChange(date);
        }
    }

    const handleReturnDateChange = (date: Date | null) => {
        setReturnDate(date);
        if (propHandleReturnDateChange) {
            propHandleReturnDateChange(date);
        }
    }

    const handleChangeDepartureTakeOffTime = (newValue: number | number[]) => {
        setDepartureTakeOffTime(newValue as number[]);
        if (propHandleChangeDepartureTakeOffTime) {
            propHandleChangeDepartureTakeOffTime(newValue as number[]);
        }
    };

    const handleChangeDepartureLandingTIme = (newValue: number | number[]) => {
        setDepartureLandingTime(newValue as number[]);
        if (propHandleChangeDepartureLandingTIme) {
            propHandleChangeDepartureLandingTIme(newValue as number[]);
        }
    };

    const handleChangeReturnTakeOffTime = (newValue: number | number[]) => {
        setReturnTakeOffTime(newValue as number[]);
        if (propHandleChangeReturnTakeOffTime) {
            propHandleChangeReturnTakeOffTime(newValue as number[]);
        }
    };

    const handleChangeReturnLandingTIme = (newValue: number | number[]) => {
        setReturnLandingTime(newValue as number[]);
        if (propHandleChangeReturnLandingTIme) {
            propHandleChangeReturnLandingTIme(newValue as number[]);
        }
    };

    const departureTimeRangeSelected = useMemo(() => {
        let time = '';
        time += departureTakeOffTime[0] === 0 && departureTakeOffTime[1] === 24 ? 'Any, ' : `${filterValueToTime(departureTakeOffTime[0])} - ${filterValueToTime(departureTakeOffTime[1])}, `;
        time += departureLandingTime[0] === 0 && departureLandingTime[1] === 24 ? 'Any' : `${filterValueToTime(departureLandingTime[0])} - ${filterValueToTime(departureLandingTime[1])}`;
        if (time === 'Any, Any') {
            time = 'Any time';
        }
        return time;
    }, [departureTakeOffTime, departureLandingTime]);

    const returnTimeRangeSelected = useMemo(() => {
        let time = '';
        time += returnTakeOffTime[0] === 0 && returnTakeOffTime[1] === 24 ? 'Any, ' : `${filterValueToTime(returnTakeOffTime[0])} - ${filterValueToTime(returnTakeOffTime[1])}, `;
        time += returnLandingTime[0] === 0 && returnLandingTime[1] === 24 ? 'Any' : `${filterValueToTime(returnLandingTime[0])} - ${filterValueToTime(returnLandingTime[1])}`;
        if (time === 'Any, Any') {
            time = 'Any time';
        }
        return time;
    }, [returnTakeOffTime, returnLandingTime]);

    return <Box
        sx={{
            ...sx,
        }}
        {...other}
    >
        <Stack spacing={2} direction={upMd ? 'row' : 'column'} sx={{ mb: 2 }}>
            <Autocomplete
                fullWidth
                freeSolo
                options={cities}
                onChange={(event, newValue) => {
                    handleChangeOrigin(newValue);
                }}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') return option;
                    return option.name;
                }}
                renderInput={(params) => <TextField {...params} label="Origin" />}
                renderOption={(props, option: ITravelCity) => (
                    <li {...props} key={option.iataCityCode}>
                        {option.name}({option.iataCityCode})
                    </li>
                )}
            />
            <Autocomplete
                fullWidth
                freeSolo
                options={cities}
                onChange={(event, newValue) => {
                    handleDestinationChange(newValue);
                }}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') return option;
                    return option.name;
                }}
                renderInput={(params) => <TextField {...params} label="Destination" />}
                renderOption={(props, option: ITravelCity) => (
                    <li {...props} key={option.iataCityCode}>
                        {option.name}({option.iataCityCode})
                    </li>
                )}
            />
        </Stack>
        <Stack spacing={2} direction={upMd ? 'row' : 'column'}>
            <Box sx={{ width: '100%' }}>
                <DesktopDatePicker
                    label="Departure date"
                    value={departureDate}
                    minDate={new Date('2017-01-01')}
                    onChange={handleDepartureDateChange}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            margin: 'normal',
                        },
                    }}
                    sx={{
                        mt: 0,
                    }}
                />
                <Button variant="outlined"
                    endIcon={<Iconify icon="mdi:airplane-clock" />}
                    sx={{}}
                    onClick={departureTimeRangePickerPopover.onOpen}
                >{departureTimeRangeSelected}</Button>
                <StyledPopover
                    open={!!departureTimeRangePickerPopover.open}
                    anchorEl={departureTimeRangePickerPopover.open}
                    onClose={departureTimeRangePickerPopover.onClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <TravelTakeOffLandingTimePicker
                        takeOffTime={departureTakeOffTime}
                        landingTime={departureLandingTime}
                        onChangeTakeOffTime={handleChangeDepartureTakeOffTime}
                        onChangeLandingTime={handleChangeDepartureLandingTIme}
                        onClose={departureTimeRangePickerPopover.onClose}
                    />
                </StyledPopover>
            </Box>
            {
                type === 'round-trip' &&
                <Box sx={{ width: '100%' }}>
                    <DesktopDatePicker
                        label="Return date"
                        value={returnDate}
                        minDate={new Date('2017-01-01')}
                        onChange={handleReturnDateChange}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: 'normal',
                            },
                        }}
                        sx={{
                            mt: 0,
                        }}
                    />
                    <Button variant="outlined"
                        endIcon={<Iconify icon="mdi:airplane-clock" />}
                        sx={{}}
                        onClick={returnTimeRangePickerPopover.onOpen}
                    >{returnTimeRangeSelected}</Button>
                    <StyledPopover
                        open={!!returnTimeRangePickerPopover.open}
                        anchorEl={returnTimeRangePickerPopover.open}
                        onClose={returnTimeRangePickerPopover.onClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <TravelTakeOffLandingTimePicker
                            takeOffTime={returnTakeOffTime}
                            landingTime={returnLandingTime}
                            onChangeTakeOffTime={handleChangeReturnTakeOffTime}
                            onChangeLandingTime={handleChangeReturnLandingTIme}
                            onClose={returnTimeRangePickerPopover.onClose}
                        />
                    </StyledPopover>
                </Box>
            }
        </Stack>
    </Box>
}

const dummyCities: ITravelCity[] = [
    {
        id: '1',
        name: 'London',
        iataCityCode: 'LON',
        iataCountryCode: 'GB',
    },
    {
        id: '2',
        name: 'Paris',
        iataCityCode: 'PAR',
        iataCountryCode: 'FR',
    },
    {
        id: '3',
        name: 'Berlin',
        iataCityCode: 'BER',
        iataCountryCode: 'DE',
    },
    {
        id: '4',
        name: 'New York',
        iataCityCode: 'NYC',
        iataCountryCode: 'US',
    },
    {
        id: '5',
        name: 'Tokyo',
        iataCityCode: 'TYO',
        iataCountryCode: 'JP',
    },
    {
        id: '6',
        name: 'Sydney',
        iataCityCode: 'SYD',
        iataCountryCode: 'AU',
    },
    {
        id: '7',
        name: 'Cape Town',
        iataCityCode: 'CPT',
        iataCountryCode: 'ZA',
    },
    {
        id: '8',
        name: 'Rio de Janeiro',
        iataCityCode: 'RIO',
        iataCountryCode: 'BR',
    },
];

function filterValueToTime(value: number) {
    return value > 9 ? `${value}:00` : `0${value}:00`;
}