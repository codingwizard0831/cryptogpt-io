import { useState, useEffect } from "react";
import { getDay, startOfMonth, getDaysInMonth } from "date-fns";

import { Box, BoxProps, Typography } from "@mui/material";

import { CalendarDateItem } from "./calendar-date-item";

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface CalendarProps extends BoxProps {
    date?: Date;
    handleDateChange?: (date: Date) => void;
    isShowWeekDay?: boolean;
    isSelectable?: boolean;
}

export default function Calendar({
    date: currentDate = new Date(),
    handleDateChange,
    isShowWeekDay = false,
    isSelectable = true,
    sx,
    ...other
}: CalendarProps) {
    const [selectedDate, setSelectedDateChange] = useState(currentDate);

    // for UI
    const [startRestPeriod, setStartRestPeriod] = useState(0);
    const [endRestPeriod, setEndRestPeriod] = useState(0);
    const [numberOfDaysForMonth, setNumberOfDaysForMonth] = useState(30);

    useEffect(() => {
        const firstDateOfMonth = startOfMonth(selectedDate);

        const _numberOfDaysForMonth = getDaysInMonth(selectedDate);
        setNumberOfDaysForMonth(_numberOfDaysForMonth);

        const dayOfFirstDateOfMonth = getDay(firstDateOfMonth);
        setStartRestPeriod(dayOfFirstDateOfMonth);

        const _endRestPeriod = 7 - (_numberOfDaysForMonth + dayOfFirstDateOfMonth) % 7;
        setEndRestPeriod(_endRestPeriod === 7 ? 0 : _endRestPeriod);

        console.log('selectedDate', selectedDate);
        console.log('dayOfFirstDateOfMonth', dayOfFirstDateOfMonth);
        console.log('_numberOfDaysForMonth', _numberOfDaysForMonth);
        console.log('startRestPeriod', startRestPeriod);
        console.log('endRestPeriod', endRestPeriod);
    }, [selectedDate, endRestPeriod, startRestPeriod]);

    return (
        <Box sx={{
            ...sx,
        }} {...other}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 1,
            }}>
                {
                    Array.from({ length: startRestPeriod }, (_, i) => (
                        <CalendarDateItem key={i} disabled />
                    ))
                }
                {
                    Array.from({ length: numberOfDaysForMonth }, (_, i) => {
                        const date = new Date(startOfMonth(currentDate));
                        date.setDate(i + 1);

                        return (
                            <CalendarDateItem
                                key={i}
                                date={date}
                                selected={date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear()}
                                isActive={date.getDay() === 0 || date.getDay() === 6}
                                isToday={date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()}
                                onClick={() => {
                                    if (!isSelectable) return;
                                    setSelectedDateChange(date);
                                    handleDateChange?.(date);
                                }}
                            />
                        );
                    })
                }
                {
                    Array.from({ length: endRestPeriod }, (_, i) => (
                        <CalendarDateItem key={i} disabled />
                    ))
                }
                {isShowWeekDay && weekDays.map((day) => (
                    <Typography key={day} variant="caption" align="center">{day}</Typography>
                ))}
            </Box>
        </Box>
    );
}
