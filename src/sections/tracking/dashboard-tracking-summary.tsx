import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

import { Box, useTheme, BoxProps, Typography } from "@mui/material";

import { useBoolean } from 'src/hooks/use-boolean'

import { StyledDialog } from 'src/components/styled-component'

interface DashboardTrackingSummaryProps extends BoxProps {

}

export default function DashboardTrackingSummary({
    sx,
    ...other
}: DashboardTrackingSummaryProps) {
    const theme = useTheme();
    const detailDialigVisible = useBoolean(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateClick = (arg: any) => {
        // console.log('handleDateClick', arg);
        // setSelectedDate(arg.date);
    };

    const handleSelect = (arg: any) => {
        console.log('handleSelect', arg);
        detailDialigVisible.onTrue();
        setSelectedDate(arg.start);
    };

    return (
        <Box
            sx={{
                '.fc-toolbar': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                },
                '.fc-toolbar-title': {
                    color: theme.palette.primary.contrastText,
                },
                '.fc-button': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    border: 'none',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                },
                ...sx,
            }}
            {...other}
        >
            <Typography variant='h6' sx={{ mb: 2 }}>Tracking Summary</Typography>

            <FullCalendar
                plugins={[
                    resourceTimelinePlugin,
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin
                ]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'resourceTimelineWeek,dayGridMonth,timeGridWeek'
                }}
                initialView='resourceTimelineWeek'
                nowIndicator
                editable
                selectable
                selectMirror
                resources={[
                    { id: 'a', title: 'Auditorium A' },
                    { id: 'b', title: 'Auditorium B', eventColor: 'green' },
                    { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
                ]}
                initialEvents={[
                    { title: 'nice event', start: new Date(), resourceId: 'a' }
                ]}
                dateClick={handleDateClick}
                select={handleSelect}
            />

            <StyledDialog open={detailDialigVisible.value} onClose={detailDialigVisible.onFalse}>
                <Box sx={{
                    width: 400,
                }}>
                    <Typography variant='h6'>Detail</Typography>
                    <Typography>{selectedDate?.toDateString()}</Typography>
                </Box>
            </StyledDialog>
        </Box>
    )
} 