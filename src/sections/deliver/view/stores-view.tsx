'use client';

import { useState } from 'react';

import { Box, Link, alpha, Button, Container, Typography, Breadcrumbs } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import StoresNearMe from '../stores/stores-near-me';
import DeliverFilterBar from '../deliver-filter-bar';

// ----------------------------------------------------------------------

export default function StoresView() {
    const settings = useSettingsContext();
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
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <Box sx={{
                width: 1,
                height: 1,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Breadcrumbs>
                        <Link color="inherit" href="#">
                            Deliver
                        </Link>
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'text.primary',
                            }}
                        >
                            Stores
                        </Typography>
                    </Breadcrumbs>
                </Box>

                <Box sx={{
                    mt: 4,
                    mb: 4,
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
                        }}>Stores and supermarkets near me</Typography>
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

                <StoresNearMe />
            </Box>
        </Container>
    );
}