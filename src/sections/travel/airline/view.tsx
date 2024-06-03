'use client';

import React from 'react';

import { Box, Tab, Link, Tabs, alpha, Typography, Breadcrumbs } from '@mui/material';

import Label from 'src/components/label';

import AirlineFilter from './airline-filter';
import AirlineItem, { AirlineItemData } from './airline-item';

export function TravelAirlineView() {
    const [currentTab, setCurrentTab] = React.useState('all');
    const [searchText, setSearchText] = React.useState('');

    return (
        <Box sx={{
            width: 1,
            height: 1,
            p: 2,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Breadcrumbs sx={{ mb: 2 }}>
                    <Link color="inherit" href="#">
                        Travel
                    </Link>
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.primary',
                        }}
                    >
                        Airlines
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Tabs
                value={currentTab}
                onChange={(e, newValue) => setCurrentTab(newValue)}
                sx={{
                    px: 2.5,
                    boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.divider, 0.2)}`,
                    mb: 2,
                }}
            >
                <Tab
                    iconPosition="end"
                    value="all"
                    label="All"
                    icon={
                        <Label
                            variant="filled"
                        >10
                        </Label>
                    }
                />
                <Tab
                    iconPosition="end"
                    value="active"
                    label="Active"
                    icon={
                        <Label
                            variant="filled"
                        >10
                        </Label>
                    }
                />
                <Tab
                    iconPosition="end"
                    value="inactive"
                    label="Inactive"
                    icon={
                        <Label
                            variant="filled"
                        >10
                        </Label>
                    }
                />
            </Tabs>

            <AirlineFilter searchText={searchText} handleChangeSearchText={setSearchText} />

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(256px, 1fr))',
                rowGap: 2,
                columnGap: 2,
            }}>
                {
                    dummyAirlineData.map((airline, index) => (
                        <AirlineItem data={airline} key={`airplane-${index}`} />
                    ))
                }
            </Box>
        </Box>
    );
}

const dummyAirline = {
    key: "aerolíneas-argentinas",
    status: "in production",
    showAirlineInDashboard: true,
    name: "Aerolíneas Argentinas",
    iataCode: "AR",
    sourceId: "travelport",
    direct: false,
    market: "South America",
    continent: "South America",
    parentCarrier: "",
    alliance: "SkyTeam",
    flagCarrier: "Argentina",
    type: "full service",
    destinationCount: "128",
    countriesCount: "22",
    hub: "Buenos Aires",
    exampleOrigin: "Buenos Aires",
    exampleDestination: "New York",
    featureSeatSelection: "in development",
    featureBaggage: "in development",
    featureBaggageAllowance: "in production",
    featurePrivateFares: "in development",
    featureVoid: "in development",
    featureCancellation: "in development",
    featureLoyaltyProgramme: "not applicable",
    featureHoldOrderPayLater: "not applicable",
    featureChanges: "in development",
    featureOfferAndOrderConditions: "in production",
    copy: "Aerolíneas Argentinas is the flag carrier of Argentina and a member of SkyTeam. It currently flies to 128 destinations in 22 countries around the world, and its main hub is located in Buenos Aires. The Duffel Flights API is built from the ground up and allows you to search, book and sell flights from Aerolíneas Argentinas along with 300+ other airlines through a single integration.",
    logosMarqueeRank: "",
    offersPublicApi: false,
    pax2019: "13,305,000"
};

const dummyAirlineData: AirlineItemData[] = [
    dummyAirline,
    dummyAirline,
    dummyAirline,
    dummyAirline,
    dummyAirline,
    dummyAirline,
];
