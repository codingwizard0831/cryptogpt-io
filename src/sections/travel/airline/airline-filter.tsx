
import React from 'react';

import Select from '@mui/material/Select';
import { Box, alpha, Button, BoxProps, MenuItem, Checkbox, TextField, IconButton, Typography, ListItemText, InputAdornment, SelectChangeEvent } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import StyledPopover from 'src/components/styled-component/styled-popover';

interface AirlineFilterProps extends BoxProps {
    searchText: string;
    handleChangeSearchText: (searchText: string) => void;
}

export default function AirlineFilter({ searchText: defaultSearchText, handleChangeSearchText, sx, ...other }: AirlineFilterProps) {
    const [searchText, setSearchText] = React.useState('');
    const filterPopover = usePopover();
    const isAdd = useBoolean(false);
    const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);
    const [tempRegions, setTempRegions] = React.useState<string[]>([]);
    const [selectedAlliances, setSelectedAlliances] = React.useState<string[]>([]);
    const [tempAlliances, setTempAlliances] = React.useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([]);
    const [tempFeatures, setTempFeatures] = React.useState<string[]>([]);

    const handleSearchTextChange = (_text: string) => {
        setSearchText(_text);
        handleChangeSearchText(_text);
    }

    const handleAddFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
        filterPopover.onOpen(event);
        isAdd.onTrue();
        setTempRegions([...selectedRegions]);
        setTempAlliances([...selectedAlliances]);
        setTempFeatures([...selectedFeatures]);
    }

    const handleCloseFilterPopover = () => {
        filterPopover.onClose();
        isAdd.onFalse();
        setTempRegions([...selectedRegions]);
        setTempAlliances([...selectedAlliances]);
        setTempFeatures([...selectedFeatures]);
    }

    const handleSubFilterApply = () => {
        setSelectedRegions([...tempRegions]);
        setSelectedAlliances([...tempAlliances]);
        setSelectedFeatures([...tempFeatures]);
        filterPopover.onClose();
        isAdd.onFalse();
    }

    const handleCloseFilterItem = (_event: React.MouseEvent<HTMLDivElement>, _type: 'feature' | 'alliance' | 'region', _value: string) => {
        _event.stopPropagation();
        if (_type === 'region') {
            setSelectedRegions(selectedRegions.filter(region => region !== _value));
        } else if (_type === 'alliance') {
            setSelectedAlliances(selectedAlliances.filter(alliance => alliance !== _value));
        } else if (_type === 'feature') {
            setSelectedFeatures(selectedFeatures.filter(feature => feature !== _value));
        }
    };

    const handleChangeSubFilter = (_event: SelectChangeEvent<string[]>, _type: 'feature' | 'alliance' | 'region') => {
        if (_type === 'region') {
            setTempRegions(_event.target.value as string[]);
        } else if (_type === 'alliance') {
            setTempAlliances(_event.target.value as string[]);
        } else if (_type === 'feature') {
            setTempFeatures(_event.target.value as string[]);
        }
    };

    return <Box sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        mb: 2,
        gap: 2,
        ...sx,
    }} {...other}>
        <TextField
            size='small'
            value={searchText}
            onChange={(e) => handleSearchTextChange(e.target.value)}
            label="Search"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Iconify icon="mdi:search" width={18} />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        {searchText &&
                            <IconButton
                                onClick={() => setSearchText('')}
                                onMouseDown={() => setSearchText('')}
                                edge="end"
                            >
                                <Iconify icon="ic:baseline-close" width={18} />
                            </IconButton>
                        }
                    </InputAdornment>
                ),
            }}
            sx={{
                width: '200px',
            }}
        />

        {
            selectedRegions.map((region, index) => <Button key={index} variant='outlined' endIcon={
                <Iconify icon="ic:round-close"
                    sx={{
                        p: '2px',
                        background: theme => alpha(theme.palette.divider, 0.2),
                        borderRadius: 2,
                    }}
                    onClick={(e) => handleCloseFilterItem(e, 'region', region)}
                />
            } onClick={() => console.log('region')}>Region <Typography variant='caption'>&nbsp;is&nbsp;</Typography> {region}</Button>)
        }

        {
            selectedAlliances.map((alliance, index) => <Button key={index} variant='outlined' endIcon={
                <Iconify icon="ic:round-close"
                    sx={{
                        p: '2px',
                        background: theme => alpha(theme.palette.divider, 0.2),
                        borderRadius: 2,
                    }}
                    onClick={(e) => handleCloseFilterItem(e, 'alliance', alliance)}
                />
            } onClick={() => console.log('alliance')}>Alliance <Typography variant='caption'>&nbsp;is&nbsp;</Typography> {alliance}</Button>)
        }

        {
            selectedFeatures.map((feature, index) => <Button key={index} variant='outlined' endIcon={
                <Iconify icon="ic:round-close"
                    sx={{
                        p: '2px',
                        background: theme => alpha(theme.palette.divider, 0.2),
                        borderRadius: 2,
                    }}
                    onClick={(e) => handleCloseFilterItem(e, 'feature', feature)}
                />
            } onClick={() => console.log('feature')}>Feature <Typography variant='caption'>&nbsp;is&nbsp;</Typography> {feature}</Button>)
        }

        <Button variant='outlined'
            onClick={handleAddFilter}
            sx={{
                maxWidth: '36px',
                minWidth: '36px',
                height: '36px',
                padding: '5px',
            }}
        >
            {
                selectedRegions.length === 0 && selectedAlliances.length === 0 && selectedFeatures.length === 0 ?
                    <Iconify icon="material-symbols:add" />
                    :
                    <Iconify icon="mdi:filter-outline" />
            }
        </Button>

        <StyledPopover
            open={!!filterPopover.open}
            anchorEl={filterPopover.open}
            onClose={handleCloseFilterPopover}
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
                width: '200px',
            }}>
                <Typography variant='body2' sx={{
                    p: 1,
                    background: theme => alpha(theme.palette.divider, 0.1),
                }}>Apply a filter</Typography><Box sx={{ p: 1 }}>
                    <Select fullWidth size='small'
                        multiple
                        value={tempRegions}
                        onChange={(e) => handleChangeSubFilter(e, 'region')}
                        renderValue={(selected) => selected.join(', ')}
                        sx={{
                            mb: 1,
                        }}>
                        {
                            dummyRegions.map((region, index) => <MenuItem key={index} value={region}>
                                <ListItemText>{region}</ListItemText>
                                <Checkbox checked={tempRegions.indexOf(region) > -1} />
                            </MenuItem>)
                        }
                    </Select>
                    <Select fullWidth size='small'
                        multiple
                        value={tempAlliances}
                        onChange={(e) => handleChangeSubFilter(e, 'alliance')}
                        renderValue={(selected) => selected.join(', ')}
                        sx={{
                            mb: 1,
                        }}>
                        {
                            dummyAlliances.map((alliance, index) => <MenuItem key={index} value={alliance}>
                                <ListItemText>{alliance}</ListItemText>
                                <Checkbox checked={tempAlliances.indexOf(alliance) > -1} />
                            </MenuItem>)
                        }
                    </Select>
                    <Select fullWidth size='small'
                        multiple
                        value={tempFeatures}
                        onChange={(e) => handleChangeSubFilter(e, 'feature')}
                        renderValue={(selected) => selected.join(', ')}
                        sx={{
                            mb: 1,
                        }}>
                        {
                            dummyFeatures.map((feature, index) => <MenuItem key={index} value={feature}>
                                <ListItemText>{feature}</ListItemText>
                                <Checkbox checked={tempFeatures.indexOf(feature) > -1} />
                            </MenuItem>)
                        }
                    </Select>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Button variant='outlined' color='primary' onClick={handleCloseFilterPopover}>Close</Button>
                        <Button variant='contained' color='primary' onClick={handleSubFilterApply}>Apply</Button>
                    </Box>
                </Box>
            </Box>
        </StyledPopover>
    </Box>
}

const dummyRegions = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'Oceania',
    'South America',
];

const dummyAlliances = [
    'OneWorld',
    'SkyTeam',
    'Star Alliance',
    'Other',
];

const dummyFeatures = [
    'Cancellations & Refunds',
    'Add additional bags when booking',
    'Selecting a seat when booking',
    'Loyalty programmes',
];