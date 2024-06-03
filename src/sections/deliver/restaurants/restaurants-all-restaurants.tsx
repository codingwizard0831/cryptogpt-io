'use client';


import { Box, Grid, Typography } from '@mui/material';

import DeliverRestaurantItem from '../deliver-restaurant-item';
import { DeliverDiscoveryItemType } from '../deliver-discovery-item';

export default function RestaurantsAllRestaurants() {

    return (
        <Box sx={{
            mb: 6,
        }}>
            <Box sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography variant='h5'>All restaurants</Typography>
            </Box>


            <Grid container spacing={2}>
                {dummyDataRestaurants.map((_, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={`restaurent${index}`}>
                        <Box>
                            <DeliverRestaurantItem data={_} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

const dummyDataRestaurants: DeliverDiscoveryItemType[] = [
    {
        type: 'aBring your friends to test test Wolt!Bring your friends to test test Wolt!e',
        title: 'A few words about us! 🥳',
        description: '',
        image: '/assets/images/deliver/4.avif',
        link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    },
    {
        type: 'restaurant',
        title: 'Coffee Island Spata',
        description: 'Unique coffee for unique people!',
        image: '/assets/images/deliver/1.avif',
        link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    },
    {
        type: 'restaurant',
        title: 'Hliana Bakery',
        description: 'Puff pastry and sweets at their best!',
        image: '/assets/images/deliver/2.avif',
        link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    },
    {
        type: 'article',
        title: 'Bring your friends to test test Wolt!',
        description: 'They get 6€, you get 6€ 💰',
        image: '/assets/images/deliver/3.avif',
        link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    },
];