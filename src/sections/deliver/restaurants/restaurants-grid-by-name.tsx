'use client';

import { useState } from 'react';

import { Box, Grid, alpha, Button, BoxProps, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

import DeliverFilterBar from '../deliver-filter-bar';
import DeliverRestaurantItem from '../deliver-restaurant-item';
import { DeliverDiscoveryItemType } from '../deliver-discovery-item';


interface DeliverRestaurantsGridByNameProps extends BoxProps {
    title: string;
};

export default function DeliverRestaurantsGridByName({ title, sx, ...other }: DeliverRestaurantsGridByNameProps) {
    const downMd = useResponsive('down', 'md');
    const [sortedByValue, setSortedByValue] = useState("Recommended");
    const [selectedFilterOptions, setSelectedFilterOptions] = useState(['Recommended', 'Distance']);
    const [selectedPriceOptions, setSelectedPriceOptions] = useState(['€']);

    const handleCloseFilterItem = (_event: React.MouseEvent<HTMLDivElement>, _type: 'filter' | 'price', _value: string) => {
        _event.stopPropagation();
        if (_type === 'filter') {
            setSelectedFilterOptions(selectedFilterOptions.filter(_filter => _filter !== _value));
        } else if (_type === 'price') {
            setSelectedPriceOptions(selectedPriceOptions.filter(_price => _price !== _value));
        }
    };

    return (
        <Box sx={{
            width: '100%',
            ...sx,
        }} {...other}>
            <Box sx={{
                mt: 4,
                mb: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'end',
                    flexDirection: downMd ? 'column' : 'row',
                    justifyContent: 'space-between',
                    mb: 2,
                    gap: 1,
                }}>
                    <Typography variant='h3' sx={{
                        width: '100%',
                        textAlign: 'left',
                    }}>{title}</Typography>
                    <DeliverFilterBar
                        sortedByValue={sortedByValue}
                        selectedFilterOptions={selectedFilterOptions}
                        selectedPriceOptions={selectedPriceOptions}
                        handleChangeSortedByValue={(value) => setSortedByValue(value)}
                        handleChangeFilterOptions={(value) => setSelectedFilterOptions(value)}
                        handleChangePriceOptions={(value) => setSelectedPriceOptions(value)}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexWrap: 'wrap',
                }}>
                    {
                        selectedFilterOptions.map((option, index) => (
                            <Button key={index} variant='outlined' endIcon={
                                <Iconify icon="ic:round-close"
                                    sx={{
                                        p: '2px',
                                        background: theme => alpha(theme.palette.divider, 0.2),
                                        borderRadius: 2,
                                    }}
                                    onClick={(event) => handleCloseFilterItem(event, 'filter', option)}
                                />
                            }>Filter: {option}</Button>
                        ))
                    }
                    {
                        selectedPriceOptions.map((option, index) => (
                            <Button key={index} variant='outlined' endIcon={
                                <Iconify icon="ic:round-close"
                                    sx={{
                                        p: '2px',
                                        background: theme => alpha(theme.palette.divider, 0.2),
                                        borderRadius: 2,
                                    }}
                                    onClick={(event) => handleCloseFilterItem(event, 'price', option)}
                                />
                            }>Price: {option}</Button>
                        ))
                    }
                </Box>
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
    );
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
    {
        type: 'article',
        title: 'Bring your friends to test test Wolt!',
        description: 'They get 6€, you get 6€ 💰',
        image: '/assets/images/deliver/3.avif',
        link: 'https://wolt.com/en/grc/athens/restaurant/coffee-island-spata',
    },
    {
        type: 'article',
        title: 'Bring your friends to test test Wolt!',
        description: 'They get 6€, you get 6€ 💰',
        image: '/assets/images/deliver/3.avif',
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