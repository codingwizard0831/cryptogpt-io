'use client';

import React, { useState } from 'react';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, alpha, Button, BoxProps, MenuItem, Checkbox, IconButton, Typography, InputLabel, FormControl, ListItemText } from '@mui/material';

import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import StyledPopover from 'src/components/styled-component/styled-popover';

export interface DeliverFilterBarProps extends BoxProps {
    sortedByValueS?: string[];
    sortedByValue?: string;
    filterOptions?: string[];
    selectedFilterOptions?: string[];
    priceOptions?: string[];
    selectedPriceOptions?: string[];
    handleChangeSortedByValue?: (value: string) => void;
    handleChangeFilterOptions?: (value: string[]) => void;
    handleChangePriceOptions?: (value: string[]) => void;
}

export default function DeliverFilterBar({
    sortedByValueS = dummySortedBy,
    sortedByValue: defaultSortedByValue = 'Recommended',
    filterOptions: filterOptionsData = dummyFilterOptions,
    selectedFilterOptions: defaultFilterOptions = [],
    priceOptions: priceOptionsData = dummyPriceOptions,
    selectedPriceOptions: defaultPriceOptions = [],
    handleChangeSortedByValue: handleChangeSortedByValueProp,
    handleChangeFilterOptions: handleChangeFilterOptionsProp,
    handleChangePriceOptions: handleChangePriceOptionsProp,
    sx,
    ...other
}: DeliverFilterBarProps) {
    const filterPopover = usePopover();
    const [sortedByValue, setSortedByValue] = useState(defaultSortedByValue);
    const [filterOptions, setFilterOptions] = useState<string[]>([...defaultFilterOptions]);
    const [priceOptions, setPriceOptions] = useState<string[]>([...defaultPriceOptions]);

    const handleCloseFilterPopover = () => {
        filterPopover.onClose();
    }

    const handleChangeSortedByValue = (_event: SelectChangeEvent<string>) => {
        setSortedByValue(_event.target.value as string);
    };

    const handleChangeFilterOptions = (_event: SelectChangeEvent<string[]>) => {
        setFilterOptions(_event.target.value as string[]);
    };
    const handleChangePriceOptions = (_event: SelectChangeEvent<string[]>) => {
        setPriceOptions(_event.target.value as string[]);
    };

    const handleClear = () => {
        setSortedByValue(sortedByValueS[0]);
        setFilterOptions([]);
        setPriceOptions([]);
        if (handleChangeSortedByValueProp) handleChangeSortedByValueProp(sortedByValueS[0]);;
        if (handleChangeFilterOptionsProp) handleChangeFilterOptionsProp([]);
        if (handleChangePriceOptionsProp) handleChangePriceOptionsProp([]);
    }

    const handleApply = () => {
        if (handleChangeSortedByValueProp) handleChangeSortedByValueProp(sortedByValue);
        if (handleChangeFilterOptionsProp) handleChangeFilterOptionsProp(filterOptions);
        if (handleChangePriceOptionsProp) handleChangePriceOptionsProp(priceOptions);
        filterPopover.onClose();
    }

    return <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        ...sx,
    }} {...other}>
        <Typography variant='body2' sx={{
            color: 'primary.main',
            whiteSpace: 'nowrap',
        }}>
            Sorted by <b>{defaultSortedByValue}</b>
        </Typography>
        <IconButton color="primary" sx={{
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
            position: 'relative',
        }} onClick={filterPopover.onOpen}>
            <Iconify icon="mage:filter-fill" />
            {
                defaultFilterOptions.length + defaultPriceOptions.length > 0 && <Box sx={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    fontSize: '11px',
                    backgroundColor: theme => alpha(theme.palette.primary.dark, 0.8),
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    lineHeight: '16px',
                }}>{defaultFilterOptions.length + defaultPriceOptions.length}</Box>
            }
        </IconButton>

        <StyledPopover
            open={!!filterPopover.open}
            anchorEl={filterPopover.open}
            onClose={handleCloseFilterPopover}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box sx={{
                width: '200px',
            }}>
                <Box sx={{ p: 1 }}>
                    <FormControl fullWidth size='small' sx={{ mb: 1 }}>
                        <InputLabel id="sorted-by-label">Sorted by</InputLabel>
                        <Select fullWidth size='small'
                            id='sorted-by'
                            labelId="sorted-by-label"
                            value={sortedByValue}
                            onChange={(e) => handleChangeSortedByValue(e)}
                        >
                            {
                                sortedByValueS.map((_sortedBy, index) => <MenuItem key={index} value={_sortedBy}>
                                    <ListItemText>{_sortedBy}</ListItemText>
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <FormControl fullWidth size='small' sx={{ mb: 1 }}>
                        <InputLabel id="filter-options-label">Filter</InputLabel>
                        <Select fullWidth size='small'
                            multiple
                            id='filter-options'
                            labelId="filter-options-label"
                            value={filterOptions}
                            onChange={(e) => handleChangeFilterOptions(e)}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {
                                filterOptionsData.map((_filterOption, index) => <MenuItem key={index} value={_filterOption}>
                                    <ListItemText>{_filterOption}</ListItemText>
                                    <Checkbox checked={filterOptions.indexOf(_filterOption) > -1} />
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <FormControl fullWidth size='small' sx={{ mb: 1 }}>
                        <InputLabel id="price-options-label">Price</InputLabel>
                        <Select fullWidth size='small'
                            multiple
                            id='price-options'
                            labelId="price-options-label"
                            value={priceOptions}
                            onChange={(e) => handleChangePriceOptions(e)}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {
                                priceOptionsData.map((_priceOption, index) => <MenuItem key={index} value={_priceOption}>
                                    <ListItemText>{_priceOption}</ListItemText>
                                    <Checkbox checked={priceOptions.indexOf(_priceOption) > -1} />
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Button variant='outlined' color='primary' size="small" onClick={handleClear}>Clear</Button>
                        <Button variant='contained' color='primary' size="small" onClick={handleApply}>Apply</Button>
                    </Box>
                </Box>
            </Box>
        </StyledPopover>
    </Box>
}

const dummySortedBy = [
    'Recommended',
    'Distance',
    'Rating',
    'Delivery time',
    'Price',
];

const dummyFilterOptions = [
    "Recommended",
    "Distance",
    "Rating",
];

const dummyPriceOptions = ['€', '€€', '€€€', '€€€€'];