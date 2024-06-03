'use client';


import { Box, Tab, Link, Tabs, alpha, Button, Typography, Breadcrumbs } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _mock } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

import TravelOrderDataGrid from './travel-order-data-grid';
import { AirlineItemData } from '../../airline/airline-item';


const dummyAirline: AirlineItemData = {
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

const _dataGrid = [...Array(20)].map((_, index) => {
    const status =
        (index % 2 && 'On hold') || (index % 3 && 'Past') || (index % 4 && 'busy') || 'offline';

    return {
        id: _mock.id(index),
        airline: dummyAirline,
        name: _mock.fullName(index),
        booking: _mock.fullName(index)[0] + _mock.id(index).substring(0, 5).toUpperCase(),
        status,
        departureDate: _mock.time(index),
        amount: 100,
        createdAt: _mock.time(index),
    };
});


export function TravelOrdersView() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
                    <Link color="inherit" href="#" onClick={() => {
                        console.log('Order');
                        enqueueSnackbar('This is an default', {
                            variant: 'default',
                        })
                    }}>
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

                <Link href={paths.dashboard.travel.newOrder} component={RouterLink}>
                    <Button variant='contained' color='primary' startIcon={<Iconify icon="ic:outline-airplane-ticket" />}>Buy ticket</Button>
                </Link>
            </Box>

            <Box>
                <Tabs value='review'
                    sx={{
                        px: 2.5,
                        boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.divider, 0.2)}`,
                    }}
                >
                    <Tab value='all' label="All" />
                    <Tab value='review' label="Needs review" />
                    <Tab value='hold' label="On hold" />
                    <Tab value='pending' label="Pending" />
                </Tabs>
                <TravelOrderDataGrid data={_dataGrid} />
            </Box>
        </Box>
    );
}