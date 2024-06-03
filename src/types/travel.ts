// ----------------------------------------------------------------------

import { BoxProps } from "@mui/material";

export interface ITravelCity {
    id: string,
    name: string,
    iataCityCode: string,
    iataCountryCode: string,
}

export interface ITravleAirline {
    id: string,
    name: string,
    logo_symbol_url: string,
    logo_lockup_url: string,
    iata_code: string,
    conditions_of_carriage_url: string,
}

export interface ITravelFlight extends BoxProps {
    type?: 'one-way' | 'round-trip';
    origin?: ITravelCity | null,
    destination?: ITravelCity | null,
    departureDate?: Date | null,
    returnDate?: Date | null,
    departureTakeOffTime?: number[],
    departureLandingTime?: number[],
    returnTakeOffTime?: number[],
    returnLandingTime?: number[],
    handleOrginChange?: (newValue: ITravelCity | null) => void,
    handleDestinationChange?: (event: ITravelCity | null) => void,
    handleChangeDepartureTakeOffTime?: (newValue: number | number[]) => void,
    handleChangeDepartureLandingTIme?: (newValue: number | number[]) => void,
    handleChangeReturnTakeOffTime?: (newValue: number | number[]) => void,
    handleChangeReturnLandingTIme?: (newValue: number | number[]) => void,
    handleDepartureDateChange?: (date: Date | null) => void,
    handleReturnDateChange?: (date: Date | null) => void,
};