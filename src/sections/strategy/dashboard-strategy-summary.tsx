

import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box, alpha, Stack, IconButton, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Iconify from 'src/components/iconify/iconify';


export default function DashboardStrategySummary() {
    const smUp = useResponsive("up", 'sm');
    const isShowSummary = useStrategy((state) => state.isShowSummary);
    const setIsShowSummary = useStrategy((state) => state.setIsShowSummary);

    return <Box
        sx={{
            width: isShowSummary ? 1 : 0,
            height: '100%',
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
            transition: 'all 0.3s',
            overflowX: 'hidden',
            overflowY: 'auto',
            ...(
                (!isShowSummary && !smUp) && {
                    display: 'none',
                }
            ),
        }}
    >
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
        }}>
            <IconButton sx={{
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
            }}>
                <Iconify icon="material-symbols:close" sx={{
                    color: 'primary.main',
                }} onClick={() => setIsShowSummary(false)} />
            </IconButton>
        </Box>
        <Timeline
            sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                },
            }}
        >
            {
                [1, 2, 3].map((item, index) => (
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{
                            width: "100%",
                        }}>
                            <Stack direction="column" spacing={1}>
                                <Typography variant="body2" sx={{
                                    color: "text.secondary",
                                }} >Step {item}</Typography>
                                <Typography variant={smUp ? "h6" : 'subtitle1'} sx={{
                                    zIndex: 1,
                                }}>item.title</Typography>
                                <Box sx={{
                                    color: "text.secondary",
                                    fontSize: '14px',
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 3,
                                }}>item.content</Box>
                            </Stack>
                        </TimelineContent>
                    </TimelineItem>
                ))
            }
        </Timeline>
    </Box>
}