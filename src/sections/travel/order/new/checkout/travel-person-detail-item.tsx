import React from 'react';

import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Box, Select, MenuItem, TextField, Typography, InputLabel, FormControl } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Label from "src/components/label";

export default function TravelPersonDetailItem() {
    const [title, setTitle] = React.useState<string>('mr');
    const [gender, setGender] = React.useState<string>('male');
    const [birthdayDate, setBirthdayDate] = React.useState<Date | null>(null);
    const [expiryDate, setExpiryDate] = React.useState<Date | null>(null);
    const upMd = useResponsive('up', 'md');

    const handleBirthdayDateChange = (date: Date | null) => {
        setBirthdayDate(date);
    }
    const handleExpiryDateChange = (date: Date | null) => {
        setExpiryDate(date);
    }

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        <Box sx={{ mb: 1 }}>
            <Label sx={{ borderRadius: '10px' }}>Adult 1</Label>
        </Box>

        <Typography variant="body2" sx={{
            color: 'text.secondary',
            mb: 2,
        }}>Personal details</Typography>
        <Box sx={{
            display: 'flex',
            flexDirection: upMd ? 'row' : 'column',
            gap: 2,
            mb: 2,
        }}>
            <FormControl sx={{
                width: upMd ? '300px' : '100%',
            }}>
                <InputLabel id="passenger">Passenger</InputLabel>
                <Select value={title} label="Title">
                    <MenuItem value="mr">Mr</MenuItem>
                    <MenuItem value="ms">Ms</MenuItem>
                    <MenuItem value="mrs">Mrs</MenuItem>
                    <MenuItem value="miss">Miss</MenuItem>
                    <MenuItem value="dr">Dr</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Given name *"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Family name *"
                variant="outlined"
            />
        </Box>

        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: upMd ? 'row' : 'column',
            gap: 2,
            mb: 2,
        }}>
            <DesktopDatePicker
                label="Date of birth *"
                value={birthdayDate}
                minDate={new Date('1940-01-01')}
                onChange={handleBirthdayDateChange}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        margin: 'normal',
                    },
                }}
                sx={{
                    mt: 0,
                    width: '100%',
                }}
            />

            <FormControl fullWidth>
                <InputLabel id="gender">Gender</InputLabel>
                <Select value={gender} label="gender">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="femail">Female</MenuItem>
                </Select>
            </FormControl>
        </Box>

        <Typography variant="body2" sx={{
            color: 'text.secondary',
            mb: 2,
        }}>Passport details</Typography>
        <Box sx={{
            display: 'flex',
            flexDirection: upMd ? 'row' : 'column',
            gap: upMd ? 2 : 0,
            mb: 2,
        }}>
            <FormControl fullWidth>
                <InputLabel id="country">Country of issue</InputLabel>
                <Select value={gender} label="country">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="femail">Female</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ width: '100%' }} />
        </Box>
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: upMd ? 'row' : 'column',
            gap: 2,
            mb: 2,
        }}>
            <TextField
                fullWidth
                label="Passport number"
                variant="outlined"
            />

            <DesktopDatePicker
                label="Expiry date"
                value={expiryDate}
                minDate={new Date('1940-01-01')}
                onChange={handleExpiryDateChange}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        margin: 'normal',
                    },
                }}
                sx={{
                    mt: 0,
                    width: '100%',
                }}
            />
        </Box>
    </Box>
}