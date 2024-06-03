'use client';

import React from 'react';

import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box, alpha, BoxProps, useTheme, Typography } from '@mui/material';
import { Timeline, TimelineDot, TimelineContent, TimelineConnector, TimelineSeparator } from '@mui/lab';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

export interface FlightDetailItemProps extends BoxProps {
    isShowTimeline?: boolean;
    isShowPolicy?: boolean;
}

export default function FlightDetailItem({ isShowTimeline = true, isShowPolicy = false, sx, ...other }: FlightDetailItemProps) {
    const theme = useTheme();
    const mdUp = useResponsive('up', 'md');

    return <Box sx={{
        borderBottom: `1px dashed ${alpha(theme.palette.divider, 0.2)}`,
        p: 3,
        ...sx,
    }}>
        <Box sx={{
            display: 'flex',
        }}>
            <Image src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BP.svg" sx={{ width: '40px', height: '40px', objectFit: 'cover', mr: 3 }} />
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: mdUp ? 'row' : 'column',
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: mdUp ? 'column' : 'row',
                    justifyContent: mdUp ? 'flex-start' : 'space-between',
                    gap: 1,
                    mb: mdUp ? 0 : 1,
                }}>
                    <Typography variant='subtitle1' sx={{}}>20:15 - 22:35</Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>Vueling • VY6947</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                }}>
                    <Box sx={{
                        width: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}>
                        <Typography variant='subtitle1' sx={{}}>01h 20m</Typography>
                        <Typography variant='body2' sx={{ color: 'text.secondary' }}>LGW - ORY</Typography>
                    </Box>
                    <Box sx={{
                        width: '100px',
                        flex: 1,
                        display: 'flex',
                        alignItems: mdUp ? 'flex-start' : 'flex-end',
                        justifyContent: 'flex-end',
                    }}>
                        <Typography variant='subtitle1' sx={{ textAlign: 'right' }}>Non-stop</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>

        <Box sx={{
            transition: 'all 0.3s',
            maxHeight: isShowTimeline ? '420px' : 0,
            overflow: 'hidden',
        }}>
            <Box sx={{ mt: 2, }} />
            <Timeline
                sx={{
                    overflow: 'hidden',
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                }}>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot variant='outlined' />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: mdUp ? 'row' : 'column',
                            gap: 1,
                            mb: 1,
                        }}>
                            <Typography variant='subtitle1' sx={{
                                whiteSpace: 'nowrap',
                                fontWeight: 700,
                            }}>Fri, 29 Mar 2024, 12:30</Typography>
                            <Typography variant='subtitle1' sx={{
                                fontWeight: 400,
                                whiteSpace: 'nowrap',
                            }}>Depart from Paris-Orly Airport (ORY)</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            color: 'text.secondary',
                        }}>
                            <Typography variant='body2'>Flight duration: 01h 10m</Typography>
                        </Box>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem sx={{
                }}>
                    <TimelineSeparator>
                        <TimelineDot variant='outlined' />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: mdUp ? 'row' : 'column',
                            gap: 1,
                            mb: 1,
                        }}>
                            <Typography variant='subtitle1' sx={{
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                            }}>Fri, 29 Mar 2024, 12:30</Typography>
                            <Typography variant='subtitle1' sx={{
                                fontWeight: 400,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>Depart from Paris-Orly Airport (ORY)</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 2,
                            color: 'text.secondary',
                        }}>
                            <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>Economy</Typography>
                            <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>Vueling</Typography>
                            <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>Boeing 777-300</Typography>
                            <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>VY6946</Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                            }}>
                                <Iconify icon="mdi:bag-suitcase" sx={{ color: 'text.secondary' }} />
                                <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>1 carry-on bag</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                            }}>
                                <Iconify icon="mdi:bag-suitcase-outline" sx={{ color: 'text.secondary' }} />
                                <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>1 checked bag</Typography>
                            </Box>
                        </Box>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>

            <Box sx={{
                ml: 5,
                display: isShowPolicy ? 'flex' : 'none',
            }}>
                <Box sx={{
                    maxWidth: '400px',
                    display: 'flex',
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    backdropFilter: 'blur(10px)',
                    borderRadius: '4px',
                    flexShrink: mdUp ? 0 : 1,
                    flexGrow: mdUp ? 0 : 1,
                    p: 2,
                }}>
                    <Iconify icon="material-symbols:airplane-ticket-outline" sx={{
                        color: alpha(theme.palette.primary.main, 0.8),
                        mr: 1
                    }} />
                    <Box sx={{
                    }}>
                        <Typography variant='subtitle1'>Flight change policy </Typography>
                        <Typography variant='body1' sx={{
                            color: 'text.secondary',
                            fontSize: '12px',
                            mt: 1,
                        }}>Make changes to this flight up until the departure date ( a change penalty of £140.00 will apply)</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
}