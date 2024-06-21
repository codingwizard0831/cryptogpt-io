
import { useState } from 'react';
import GaugeComponent from 'react-gauge-component'

import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box, Stack, alpha, Switch, Button, BoxProps, MenuItem, useTheme, TextField, Typography, InputLabel, FormControl, InputAdornment, FormControlLabel } from '@mui/material';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

interface DashboardLineChartProps extends BoxProps {
}

export default function DashboardNews({ sx, ...other }: DashboardLineChartProps) {
    const theme = useTheme();
    const [filterOption, setFilterOption] = useState('all');

    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilterOption(event.target.value as string);
    };

    return (
        <Box sx={{
            height: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
            pt: 2,
            ...sx,
        }} {...other}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Stack direction="column" spacing={2}>
                    <Stack direction='row' spacing={2} justifyContent="space-between" sx={{
                        position: "sticky",
                        top: 0,
                    }}>
                        <Typography variant="h4" sx={{ flex: 1 }}>June 17 Tue</Typography>
                        <FormControlLabel control={<Switch />} label="Only display important news" />
                        <FormControl>
                            <InputLabel id="news-filter-option-label">Filter</InputLabel>
                            <Select
                                labelId="news-filter-option-label"
                                id="news-filter-option"
                                value={filterOption}
                                size="small"
                                label="Filter"
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="binance">Binance News</MenuItem>
                                <MenuItem value="market">Market News</MenuItem>
                                <MenuItem value="bitcoin">Bitcoin News</MenuItem>
                                <MenuItem value="bnb">BNB News</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    <Stack direction="column" spacing={2}>
                        <Timeline
                            sx={{
                                [`& .${timelineItemClasses.root}:before`]: {
                                    flex: 0,
                                    padding: 0,
                                },
                            }}
                        >
                            {
                                [...dummyData, ...dummyData, ...dummyData, ...dummyData, ...dummyData, ...dummyData, ...dummyData].map((item, index) => (
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
                                                }} >{item.date}</Typography>
                                                <Typography variant="h6">{item.title}</Typography>
                                                <Box sx={{
                                                    color: "text.secondary",
                                                    fontSize: '14px',
                                                    overflow: "hidden",
                                                    display: "-webkit-box",
                                                    WebkitBoxOrient: "vertical",
                                                    WebkitLineClamp: 3,
                                                }}>{item.content}</Box>
                                            </Stack>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))
                            }
                        </Timeline>
                    </Stack>
                </Stack>

                <Stack direction="column" spacing={2} sx={{
                    minWidth: "356px",
                }}>
                    <TextField label="Search" variant="outlined" size="small" fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Iconify icon="material-symbols:search" /></InputAdornment>,
                        }} />

                    <Stack direction="column" spacing={2}>
                        <Stack direction="column" spacing={1} sx={{
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            padding: 2.5,
                        }}>
                            <Typography variant="h5">Explore the lastest crypto news</Typography>
                            <Typography sx={{
                                color: "text.secondary",
                            }}>⚡️ Be a part of the latests discussions in crypto</Typography>
                            <Typography sx={{
                                color: "text.secondary",
                            }}>💬 Interact with your favorite creators</Typography>
                            <Typography sx={{
                                color: "text.secondary",
                            }}>👍 Enjoy content that interests you</Typography>
                        </Stack>

                        <Stack direction="column" spacing={2} alignItems='flex-start' sx={{
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            paddingY: 2.5,
                        }}>
                            <Typography variant="h5" sx={{ px: 2.5 }}>Trading Topics</Typography>

                            <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                                <Stack direction="row" justifyContent='space-between' alignItems='flex-start' spacing={1} sx={{
                                    px: 2.5,
                                    py: 0.5,
                                    cursor: 'pointer',
                                    width: "100%",
                                    backgroundColor: "transparent",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                        backdropFilter: "blur(10px)",
                                        backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                                    },
                                }}>
                                    <Iconify icon="mingcute:binance-coin-bnb-fill" />
                                    <Stack direction="column" alignItems='stretch' spacing={0.5} sx={{
                                        width: "calc(100% - 28px)",
                                    }}>
                                        <Typography variant="body1">BinanceTaurnament</Typography>
                                        <Stack direction="row" spacing={2}>
                                            <Typography variant="body1" sx={{
                                                color: "text.secondary",
                                                fontSize: "12px",
                                            }}>93.5M views</Typography>
                                            <Typography variant="body1" sx={{
                                                color: "text.secondary",
                                                fontSize: "12px",
                                            }}>30,223 Posts</Typography>
                                        </Stack>
                                        <Box sx={{
                                            p: 1,
                                            borderRadius: 1,
                                            border: `1px solid ${theme.palette.divider}`,
                                            width: "100%",
                                        }}>
                                            <Typography variant="body1" sx={{
                                                fontSize: "12px",
                                            }}>Post your #BinanceTournament Journey on Binance Square and Compete for 5,000 USDT!</Typography>
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <Typography variant="body1" sx={{
                                                    color: "text.secondary",
                                                    fontSize: "12px",
                                                    flex: 1,
                                                    textAlign: "right",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}>Binance Square Official</Typography>
                                                <Box component='span' sx={{
                                                    borderLeft: 1,
                                                    borderColor: "divider",
                                                    mx: 0.5,
                                                }} />
                                                <Typography variant="body1" sx={{
                                                    color: "text.secondary",
                                                    fontSize: "12px",
                                                    whiteSpace: "nowrap",
                                                }}>311 Likes</Typography>
                                                <Box component='span' sx={{
                                                    borderLeft: 1,
                                                    borderColor: "divider",
                                                    mx: 0.5,
                                                }} />
                                                <Typography variant="body1" sx={{
                                                    color: "text.secondary",
                                                    fontSize: "12px",
                                                    whiteSpace: "nowrap",
                                                }}>255k views</Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Stack>

                                <Stack direction="row" justifyContent='space-between' spacing={1} sx={{
                                    px: 2.5,
                                    py: 0.5,
                                    backgroundColor: "transparent",
                                    transition: "all 0.3s",
                                    cursor: 'pointer',
                                    width: "100%",
                                    "&:hover": {
                                        backdropFilter: "blur(10px)",
                                        backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                                    },
                                }}>
                                    <Iconify icon="mingcute:binance-coin-bnb-fill" />
                                    <Stack direction="column" spacing={0.5} sx={{
                                        width: "calc(100% - 28px)",
                                    }}>
                                        <Typography variant="body1">BinanceTaurnament</Typography>
                                        <Stack direction="row" spacing={2}>
                                            <Typography variant="body1" sx={{
                                                color: "text.secondary",
                                                fontSize: "12px",
                                            }}>93.5M views</Typography>
                                            <Typography variant="body1" sx={{
                                                color: "text.secondary",
                                                fontSize: "12px",
                                            }}>30,223 Posts</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>

                            <Button color='primary' sx={{ mx: 2.5 }}>View More</Button>
                        </Stack>

                        <Stack direction="column" spacing={2} sx={{
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            paddingY: 2.5,
                        }}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{
                                px: 2.5
                            }}>
                                <Typography variant="h5">Fear & Greed Index</Typography>
                                <Button color='primary'>Trade Now</Button>
                            </Stack>

                            <GaugeComponent
                                type="semicircle"
                                arc={{
                                    colorArray: [theme.palette.success.main, theme.palette.error.main],
                                    padding: 0.02,
                                    subArcs:
                                        [
                                            { limit: 40 },
                                            { limit: 60 },
                                            { limit: 70 },
                                            {},
                                            {},
                                            {},
                                            {}
                                        ]
                                }}
                                pointer={{ type: "blob", animationDelay: 0 }}
                                value={50}
                            />
                            <Typography variant="body1" sx={{
                                mx: 2.5,
                                fontSize: "12px",
                            }}>How do you feel about the market today?</Typography>
                            <Stack direction="row" justifyContent='space-between' spacing={3} sx={{
                                px: 2.5
                            }}>
                                <Button variant="contained" color='error' fullWidth sx={{
                                    position: "relative",
                                    backgroundColor: theme.palette.error.main,
                                    borderRadius: 0,
                                    "::before": {
                                        zIndex: -1,
                                        content: "''",
                                        position: "absolute",
                                        top: 0,
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: theme.palette.error.main,
                                        transform: "skew(-15deg)",
                                        left: '5px',
                                    }
                                }}>Bearish</Button>
                                <Button variant="contained" color='success' fullWidth sx={{
                                    position: "relative",
                                    backgroundColor: theme.palette.success.main,
                                    borderRadius: 0,
                                    "::before": {
                                        zIndex: -1,
                                        content: "''",
                                        position: "absolute",
                                        top: 0,
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: theme.palette.success.main,
                                        transform: "skew(-15deg)",
                                        left: '-5px',
                                    }
                                }}>Bullish</Button>
                            </Stack>
                        </Stack>

                        <Stack direction="column" spacing={2} sx={{
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            paddingY: 2.5,
                        }}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{
                                px: 2.5
                            }}>
                                <Typography variant="h5">Most Searched (6H)</Typography>
                                <Typography sx={{
                                    color: "text.secondary",
                                    fontSize: "12px",
                                }}>USDT</Typography>
                            </Stack>

                            <Stack direction="column" spacing={1}>
                                {
                                    [1, 2, 3, 4].map((item, index) => (
                                        <Stack direction='row' justifyContent="space-between" alignItems='center' spacing={1} sx={{
                                            px: 2.5,
                                            py: 0.5,
                                            cursor: 'pointer',
                                            backgroundColor: "transparent",
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                backdropFilter: "blur(10px)",
                                                backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                                            },
                                        }} key={index}>
                                            <Image src="/assets/images/bitcoin.png" sx={{ width: 24, height: 24 }} />
                                            <Typography variant="body1" sx={{ flex: 1 }}>USDT</Typography>
                                            <Stack direction='column' alignItems='flex-end'>
                                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>1.2</Typography>
                                                <Typography variant="body1" sx={{ fontSize: '12px', color: "error.main" }}>-0.82%</Typography>
                                            </Stack>
                                        </Stack>
                                    ))
                                }
                            </Stack>
                        </Stack>


                        <Stack direction="column" spacing={2} sx={{
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            paddingY: 2.5,
                        }}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{
                                px: 2.5
                            }}>
                                <Typography variant="h5">Latest News</Typography>
                            </Stack>

                            <Stack direction="column" spacing={1}>
                                {
                                    [1, 2, 3, 4].map((item, index) => (
                                        <Stack direction='column' justifyContent="space-between" spacing={0.5} sx={{
                                            px: 2.5,
                                            py: 0.5,
                                            cursor: 'pointer',
                                            backgroundColor: "transparent",
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                backdropFilter: "blur(10px)",
                                                backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                                            },
                                        }} key={index}>
                                            <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>Polkadot Co-Founder Proposes New System Chain Plaza To Enhance Network Scalability</Typography>
                                            <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '600', color: 'text.secondary' }}>5m</Typography>
                                        </Stack>
                                    ))
                                }
                            </Stack>

                            <Stack direction="row" justifyContent='flex-start' spacing={2}>
                                <Button color='primary' sx={{ mx: 2.5 }}>View More</Button>
                            </Stack>
                        </Stack>

                        <Stack direction="column" spacing={2} sx={{
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            paddingY: 2.5,
                        }}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{
                                px: 2.5
                            }}>
                                <Typography variant="h5">Suggested Creators</Typography>
                            </Stack>

                            <Stack direction="column" spacing={1}>
                                {
                                    [1, 2, 3, 4].map((item, index) => (
                                        <Stack direction='row' justifyContent="space-between" alignItems='center' spacing={1.5} sx={{
                                            px: 2.5,
                                            py: 0.5,
                                            cursor: 'pointer',
                                            backgroundColor: "transparent",
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                backdropFilter: "blur(10px)",
                                                backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                                            },
                                        }} key={index}>
                                            <Box sx={{
                                                position: 'relative',
                                            }}>
                                                <Image src="/assets/images/creator1.png" sx={{
                                                    width: 38,
                                                    height: 38,
                                                    minWidth: 38,
                                                    minHeight: 38,
                                                    borderRadius: '50%',
                                                    zIndex: 1,
                                                }} />
                                                <Iconify icon="mdi:check-circle" sx={{
                                                    fontSize: '10px',
                                                    position: 'absolute',
                                                    right: -1,
                                                    bottom: 0,
                                                    zIndex: 2,
                                                    color: 'primary.main',
                                                }} />
                                            </Box>
                                            <Stack direction='column' sx={{ width: 0, flex: 1 }}>
                                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>Richard Teng</Typography>
                                                <Typography variant="body1" sx={{
                                                    fontSize: '14px',
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    color: "text.secondary",
                                                }}>Binance CEO | Formerly Binance Head of Regional Markets | Former CEO of Financial Services Regulatory Authority ADGM</Typography>
                                            </Stack>
                                            <Button variant="contained" color='primary' size="small">Follow</Button>
                                        </Stack>
                                    ))
                                }
                            </Stack>
                            <Stack direction="row" justifyContent='flex-start' spacing={2}>
                                <Button color='primary' sx={{ mx: 2.5 }}>View More</Button>
                            </Stack>
                        </Stack>

                        <Stack direction="column" spacing={2} sx={{
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            paddingY: 2.5,
                        }}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{
                                px: 2.5
                            }}>
                                <Typography variant="h5">Trending Articles</Typography>
                            </Stack>

                            <Stack direction="column" spacing={1}>
                                {
                                    [1, 2, 3, 4].map((item, index) => (
                                        <Stack direction='column' justifyContent="space-between" spacing={0.5} sx={{
                                            px: 2.5,
                                            py: 0.5,
                                            cursor: 'pointer',
                                            backgroundColor: "transparent",
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                backdropFilter: "blur(10px)",
                                                backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                                            },
                                        }} key={index}>
                                            <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>Tether Launches Alloy, US Dollar-Pegged Stablecoin Backed By Gold</Typography>
                                            <Stack direction='row' alignItems='center' spacing={1.5}>
                                                <Image src="/assets/images/bitcoin.png" sx={{ width: 24, height: 24 }} />
                                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>CoinMarketCap</Typography>
                                            </Stack>
                                        </Stack>
                                    ))
                                }
                            </Stack>

                            <Stack direction="row" justifyContent='flex-start' spacing={2}>
                                <Button color='primary' sx={{ mx: 2.5 }}>View More</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

const dummyData = [
    {
        date: "2021-06-17 00:00:00",
        title: "BakerySwap Indicates High Growth Potential For BAKE",
        content: "According to BlockBeats, BakerySwap, a decentralized finance (DeFi) protocol, has indicated that BAKE, its native token, possesses high growth potential. The announcement was made on June 17th. The protocol's officials have pointed out several factors that contribute to this potential. Firstly, BAKE has a low market capitalization, which suggests room for significant growth. Secondly, the user base of BAKE is expanding rapidly, indicating a growing demand for the token. Thirdly, the innovative features of BAKE are attracting more users and investors, further driving its growth. Lastly, compared to CAKE, another popular DeFi token, BAKE has a lower market value, suggesting it has more room to grow. These factors collectively suggest that BAKE has a high potential for growth in the future. However, it's important to note that the cryptocurrency market is highly volatile and unpredictable, and investors should always do their own research before making any investment decisions.",
        upvote: 100,
        comments: []
    },
    {
        date: "2021-06-17 00:00:00",
        title: "BakerySwap Indicates High Growth Potential For BAKE",
        content: "According to BlockBeats, BakerySwap, a decentralized finance (DeFi) protocol, has indicated that BAKE, its native token, possesses high growth potential. The announcement was made on June 17th. The protocol's officials have pointed out several factors that contribute to this potential. Firstly, BAKE has a low market capitalization, which suggests room for significant growth. Secondly, the user base of BAKE is expanding rapidly, indicating a growing demand for the token. Thirdly, the innovative features of BAKE are attracting more users and investors, further driving its growth. Lastly, compared to CAKE, another popular DeFi token, BAKE has a lower market value, suggesting it has more room to grow. These factors collectively suggest that BAKE has a high potential for growth in the future. However, it's important to note that the cryptocurrency market is highly volatile and unpredictable, and investors should always do their own research before making any investment decisions.",
        upvote: 100,
        comments: []
    },
]