import React from "react";
import { format } from 'date-fns';

import { Box, Button, Select, useTheme, MenuItem, Typography, InputLabel, FormControl } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import Iconify from "src/components/iconify";

export default function DeliverOrderDetailWhenField1() {
    const theme = useTheme();
    const isNew = useBoolean(true);

    const generateTimeSlots = () => {
        const slots = [];
        let startTime = new Date().setHours(6, 45, 0); // Setting start time to 6:45 AM
        const endTime = new Date().setHours(21, 30, 0); // Setting end time to 9:30 PM

        while (startTime <= endTime) {
            slots.push(new Date(startTime));
            startTime += 900000; // Increment by 15 minutes
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    return (
        <Box sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            mb: 4,
        }}>
            <Typography variant="h6" sx={{
                pt: 2,
                pb: 1,
            }}>When?</Typography>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}>
                <Box sx={{
                    px: 0.5,
                }}>
                    <Iconify icon="ri:calendar-schedule-line" sx={{
                        color: 'text.primary',
                        width: '32px',
                        height: '32px',
                    }} />
                </Box>
                <Box sx={{
                    flex: 1,
                    py: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch',
                        }}>
                            <Typography variant="subtitle2" sx={{
                                color: 'text.primary',
                            }}>Schedule for later</Typography>
                        </Box>
                        {
                            isNew.value ? <Button color="primary" onClick={isNew.onFalse}>Change</Button>
                                : <Button color="primary" onClick={isNew.onTrue}>Done</Button>
                        }
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: isNew.value ? 'none' : 'flex',
                alignItems: 'center',
                gap: 2,
            }}>
                <Box sx={{
                    width: '40px'
                }} />

                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    <FormControl fullWidth
                    >
                        <InputLabel id="select-schedule-day-label" size="small">Day</InputLabel>
                        <Select
                            id="schedule-day"
                            labelId="select-schedule-day-label"
                            label="Day"
                            size="small"
                        >
                            <MenuItem value="monday">Tomorrow</MenuItem>
                            <MenuItem value="tuesday">Tuesday</MenuItem>
                            <MenuItem value="wednesday">Wednesday</MenuItem>
                            <MenuItem value="thursday">Thursday</MenuItem>
                            <MenuItem value="friday">Friday</MenuItem>
                            <MenuItem value="saturday">Saturday</MenuItem>
                            <MenuItem value="sunday">Sunday</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="select-schedule-time-label" size="small">Time</InputLabel>
                        <Select
                            id="select-schedule-time"
                            labelId="select-schedule-time-label"
                            label="Time"
                            size="small"
                        >
                            {timeSlots.map((time, index) => (
                                <MenuItem key={index} value={format(time, 'hh:mm a')}>
                                    {format(time, 'hh:mm a')}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
}