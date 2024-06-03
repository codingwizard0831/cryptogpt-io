import React, { useState, useCallback } from 'react';

import { alpha } from '@mui/system';
import SellIcon from '@mui/icons-material/Sell';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Tab, Tabs, Button, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import { Nuance } from 'src/components/nuance';
import CardFlip from 'src/components/card-flip';
import Chart, { useChart } from 'src/components/chart';

const MessageCardCrypto: React.FC = () => {

    const chartOptions = useChart({
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
        tooltip: {
            x: {
                show: false,
            },
            marker: { show: false },
        },
    });

    const [currentPeriodTab, setCurrentPeriodTab] = useState('1D');
    const handleCurrentPeriodChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentPeriodTab(newValue);
    }, []);

    return <CardFlip
        isDoubleClickHandleFlip
        sx={{
            width: "100%",
            height: "400px",
        }}
        frontContent={
            <Box sx={{
                width: "100%",
                height: "100%",
                mb: 2,
                p: 1,
                backdropFilter: "blur(10px)",
                backgroundColor: theme => `${alpha(theme.palette.background.default, 0.4)}`,
                borderRadius: 1,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}>
                <Image
                    src='/assets/icons/project/crypto/bitcoin_btc_logo.svg'
                    width='100px'
                    height='100px'
                    sx={{
                        position: "absolute",
                        right: "calc(50% - 50px)",
                        top: "calc(50% - 50px)",
                        opacity: 0.3
                    }}
                />

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    m: 1
                }}>
                    <Typography variant="subtitle1" sx={{
                        color: theme => theme.palette.text.primary,
                        mr: 1
                    }}>Bitcoin</Typography>
                    <Typography variant="subtitle2" sx={{
                        color: theme => theme.palette.success.main
                    }}>$45.000,00</Typography>
                </Box>

                <Tabs value={currentPeriodTab} onChange={handleCurrentPeriodChange} sx={{
                    "& .MuiTab-root": {
                        fontSize: "12px",
                        lineHeight: "120%",
                        marginRight: 0,
                    }
                }}>
                    <Tab label="1D" value="1D" />
                    <Tab label="5D" value="5D" />
                    <Tab label="1M" value="1M" />
                    <Tab label="6M" value="6M" />
                </Tabs>

                <Chart dir="ltr" type="line"
                    series={[
                        {
                            name: 'Desktops',
                            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                        },
                    ]}
                    options={chartOptions}
                    width="100%" height="260px"
                />

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Typography variant="subtitle2" sx={{
                            color: theme => theme.palette.text.primary
                        }}>${0.5505}</Typography>
                        <Nuance value={1.52} sx={{
                            fontSize: "10px",
                        }} />
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Button variant="outlined" size="small" color="primary" sx={{
                            mr: 1
                        }} startIcon={<SellIcon fontSize="small" />}>Sell</Button>
                        <Button variant="contained" size="small" color="primary" sx={{
                        }} startIcon={<ShoppingCartIcon fontSize="small" />}>Buy</Button>
                    </Box>
                </Box>
            </Box>
        }
        backContent={
            <Box sx={{
                width: "100%",
                height: "100%",
                perspective: '1000px',
                '&:hover': {
                    '.card': {
                        transform: 'rotate3d(1, 1, 0, 30deg)',
                        boxShadow: 'rgba(5, 71, 17, 0.3) 30px 50px 25px -40px, rgba(5, 71, 17, 0.1) 0px 25px 30px 0px',
                        '.bottom .action-buttons-container .action-button': {
                            transform: 'translate3d(0, 0, 50px)',
                            boxShadow: 'rgba(5, 71, 17, 0.2) -5px 20px 10px 0px',
                        },
                        '.ai-keep-updated-btn': {
                            transform: 'translate3d(0, 0, 60px)',
                        },
                        '.crypto-logo': {
                            transform: 'translate3d(0, 0, 50px)',
                        },
                        '.logo .circle2': {
                            transform: 'translate3d(0, 0, 60px)',
                        },
                        '.logo .circle3': {
                            transform: 'translate3d(0, 0, 80px)',
                        },
                        '.logo .circle4': {
                            transform: 'translate3d(0, 0, 100px)',
                        },
                        '.logo .circle5': {
                            transform: 'translate3d(0, 0, 120px)',
                        },
                    },
                },
            }}>
                <Box className="card" sx={{
                    height: '100%',
                    borderRadius: '50px',
                    background: theme => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
                    transition: 'all 0.5s ease-in-out',
                    transformStyle: 'preserve-3d',
                    boxShadow: theme => `${alpha(theme.palette.primary.lighter, 0)} 40px 50px 25px -40px, ${alpha(theme.palette.primary.lighter, 0.1)} 0px 25px 25px -5px`,
                    position: 'relative',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}>
                    {/* Logo and circles */}
                    <Box className="logo" sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        transformStyle: 'preserve-3d',
                        '.circle': {
                            display: 'block',
                            aspectRatio: '1 / 1',
                            position: 'absolute',
                            borderRadius: '50%',
                            boxShadow: 'rgba(100, 100, 111, 0.2) -10px 10px 20px 0px',
                            backdropFilter: 'blur(5px)',
                            background: theme => alpha(theme.palette.primary.main, 0.1),
                            transition: 'all 0.5s ease-in-out',
                        },
                        '.circle1': { width: 170, top: 8, right: 8, transform: 'translate3d(0, 0, 20px)' },
                        '.circle2': { width: 140, top: 10, right: 10, transform: 'translate3d(0, 0, 30px)', transitionDelay: '0.4s' },
                        '.circle3': { width: 110, top: 17, right: 17, transform: 'translate3d(0, 0, 40px)', transitionDelay: '0.8s' },
                        '.circle4': { width: 80, top: 23, right: 23, transform: 'translate3d(0, 0, 50px)', transitionDelay: '1.2s' },
                        '.circle5': { width: 50, top: 30, right: 30, transform: 'translate3d(0, 0, 60px)', transitionDelay: '1.6s', display: 'grid', placeContent: 'center' },
                    }}>
                        <Box className="circle circle1" />
                        <Box className="circle circle2" />
                        <Box className="circle circle3" />
                        <Box className="circle circle4" />
                        <Box className="circle circle5">
                            <Iconify icon="line-md:bell-alert-loop" />
                        </Box>
                    </Box>

                    {/* Glass Effect */}
                    <Box className="glass" sx={{
                        transformStyle: 'preserve-3d',
                        position: 'absolute',
                        inset: 8,
                        borderRadius: '55px',
                        borderTopRightRadius: '100%',
                        background: theme => `linear-gradient(0deg, ${alpha(theme.palette.background.default, 0.5)} 0%, ${theme.palette.primary.light} 100%)`,
                        transform: 'translate3d(0px, 0px, 25px)',
                        borderLeft: theme => `1px solid ${theme.palette.primary.light}`,
                        borderBottom: theme => `1px solid ${theme.palette.primary.light}`,
                        transition: 'all 0.5s ease-in-out',
                    }} />

                    <Box sx={{
                        position: "absolute",
                        left: "20px",
                        top: "20px",
                        transform: 'translate3d(0, 0, 26px)',
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <Image
                                className="crypto-logo"
                                src='/assets/icons/project/crypto/bitcoin_btc_logo.svg'
                                width='40px'
                                height='40px'
                            />
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                ml: 1,
                            }}>
                                <Typography variant="subtitle2" sx={{
                                    color: theme => theme.palette.text.primary,
                                    lineHeight: "120%",
                                    mt: 0.5,
                                }}>${0.5505}</Typography>
                                <Nuance value={1.52} sx={{
                                    fontSize: "10px",
                                }} />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                        }}>
                            <AccessTimeIcon sx={{
                                fontSize: "12px",
                            }} />
                            <Typography variant='caption' sx={{
                                ml: 0.5,
                                fontSize: "12px",
                            }}>2022-10-10</Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        padding: '120px 60px 0px 30px',
                        transformStyle: 'preserve-3d',
                        transform: 'translate3d(0, 0, 26px)',
                    }}>
                        <Typography variant='subtitle2' sx={{
                            color: theme => theme.palette.primary.darker,
                            fontWeight: '900',
                            fontSize: '14px',
                        }}>
                            BTC: Neutral
                        </Typography>
                        <Typography variant='subtitle2' sx={{
                            color: theme => theme.palette.primary.darker,
                            fontWeight: '900',
                            fontSize: '14px',
                        }}>
                            Sentiment Score: 50/100
                        </Typography>
                        <Typography variant='subtitle2' sx={{
                            color: theme => theme.palette.primary.darker,
                            fontWeight: '900',
                            fontSize: '14px',
                            mb: 2,
                        }}>
                            Rist Level: Medium
                        </Typography>

                        <Typography sx={{
                            fontWeight: '500',
                            fontSize: '12px',
                        }}>
                            Buy Alert: Set for price dip
                        </Typography>
                        <Typography sx={{
                            fontWeight: '500',
                            fontSize: '12px',
                        }}>
                            Sell Alert: Set for target hit
                        </Typography>

                        <Button className="ai-keep-updated-btn" variant="contained" color="primary" sx={{
                            transition: 'transform 0.2s ease-in-out, box-shadow 0s ease-in-out',
                            transform: 'translate3d(0, 0, 26px)',
                            my: 1
                        }}>Ai Keep ME UPDATED! </Button>

                        <Typography sx={{
                            fontWeight: '500',
                            fontSize: '12px',
                        }}>
                            Trends: Tap for insights
                        </Typography>
                        <Typography sx={{
                            fontWeight: '500',
                            fontSize: '12px',
                        }}>
                            News Impact: Key updates
                        </Typography>
                    </Box>

                    <Box className="bottom" sx={{
                        transformStyle: 'preserve-3d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        transform: 'translate3d(0, 0, 26px)',
                        m: 3,
                        marginRight: 4,
                    }}>
                        {/* Action Buttons Container */}
                        <Box className="action-buttons-container" sx={{
                            display: 'flex',
                            gap: 1, // Adjusted for MUI spacing system
                            transformStyle: 'preserve-3d',
                        }}>
                            <Button className="action-button" variant="outlined" color="primary" size="small" sx={{
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            }} startIcon={<SellIcon fontSize="small" />}>Sell</Button>
                            <Button className="action-button" variant="contained" color="primary" size="small" sx={{
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.4s ease-in-out',
                            }} startIcon={<ShoppingCartIcon fontSize="small" />}>Buy</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        }
    />
}

export default MessageCardCrypto;