import { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

import { Box, alpha, Button, useTheme, BoxProps, Typography, IconButton } from "@mui/material";

import { useBoolean } from 'src/hooks/use-boolean'

import Iconify from 'src/components/iconify'
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
    const calendarRef = useRef<FullCalendar>(null);

    const handleDateClick = (arg: any) => {
        // console.log('handleDateClick', arg);
        // setSelectedDate(arg.date);
    };

    const handleSelect = (arg: any) => {
        console.log('handleSelect', arg);
        detailDialigVisible.onTrue();
        setSelectedDate(arg.start);
    };

    const handleAddEvent = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.addEvent({
                title: 'New Event',
                start: new Date(),
                end: new Date(),
                allDay: true,
            });
        }
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

            <Button variant="contained" color="primary" onClick={handleAddEvent}>
                Add Event
            </Button>

            <FullCalendar
                ref={calendarRef}
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
                    width: '400px',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    position: 'relative',
                }}>
                    <IconButton sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                    }}>
                        <Iconify icon="material-symbols:close" sx={{ color: 'primary.main' }} onClick={detailDialigVisible.onFalse} />
                    </IconButton>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 2,
                    }}>
                        <Typography variant='h6' sx={{}}>Event and News</Typography>
                        <Typography variant="body2" sx={{ pb: 0.25 }}>{selectedDate?.toDateString()}</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        maxHeight: '600px',
                    }}>
                        {
                            dummyData.map((item) => (
                                <Box key={item.id} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    p: 1,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                }}>
                                    <Typography variant="h6" sx={{ color: 'primary.main' }}>{item.title}</Typography>
                                    <Typography variant="caption">Start: 09:00 AM</Typography>
                                    <Typography variant="caption">End: 09:00 AM</Typography>
                                    <Typography variant="caption">{item.description}</Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <Typography variant="caption">Status: {item.status}</Typography>
                                        {
                                            item.status === 'To Do' && <Iconify icon="wpf:future" sx={{ color: 'primary.main' }} />
                                        }
                                        {
                                            item.status === 'Done' && <Iconify icon="wpf:past" sx={{ color: 'primary.main' }} />
                                        }
                                        {
                                            item.status === 'Pending' && <Iconify icon="material-symbols:pending-outline" sx={{ color: 'primary.main' }} />
                                        }
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        width: '100%',
                                        gap: 1,
                                    }}>
                                        <IconButton size="small">
                                            <Iconify icon="akar-icons:edit" sx={{ color: 'primary.main' }} />
                                        </IconButton>
                                        <IconButton size="small">
                                            <Iconify icon="ep:delete" sx={{ color: 'primary.main' }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>

                </Box>
            </StyledDialog>
        </Box>
    )
}

const dummyData = [
    {
        id: 1,
        title: 'Bitcoin Trade',
        start: new Date(),
        end: new Date(),
        description: 'Execute a market buy order for Bitcoin (BTC) at the $30,000 level. Monitor the price movement closely after the purchase for potential immediate sell if price reaches the $30,500 resistance.',
        status: 'To Do',
    },
    {
        id: 2,
        title: 'Ethereum Strategy Review',
        start: new Date(),
        end: new Date(),
        description: 'Review the automated Ethereum (ETH) strategy performance. Analyze the MACD and RSI indicators to evaluate whether to adjust the parameters or leave the strategy as is.',
        status: 'Done',
    },
    {
        id: 3,
        title: 'Market News Review',
        start: new Date(),
        end: new Date(),
        description: 'Check news updates related to cryptocurrency regulations and trends affecting BTC, ETH, and SOL. Consider this information before making trading decisions in the afternoon session.',
        status: 'Pending',
    },
    {
        id: 4,
        title: 'Arbitrage Opportunity Check',
        start: new Date(),
        end: new Date(),
        description: 'Search for any arbitrage opportunities between Binance and OKX on BTC/USDT and ETH/USDT pairs. Make trades if price discrepancies meet the minimum profit threshold of 0.5%.',
        status: 'Pending',
    }
]