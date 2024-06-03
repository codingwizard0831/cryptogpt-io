'use client';

import { Box, Link, alpha, Button, Divider, useTheme, Typography, Breadcrumbs } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import { ScrollCustomStyle } from "src/theme/css";

import Iconify from "src/components/iconify";
import Image from "src/components/image/image";

import FareRouteItem from "./fare-route-item";
import FareOptionItem from "./fare-option-item";

export default function TravelNewOrderFareOptionView() {
    const theme = useTheme();
    const mdUp = useResponsive('up', 'md');

    return <Box sx={{
        width: 1,
        height: 1,
        p: 2,
        pt: 0,
        display: 'flex',
        flexDirection: 'column',
    }}>
        <Breadcrumbs sx={{ my: 2 }}>
            <Link color="inherit" href="#">
                Travel
            </Link>
            <Link color="inherit" href="#">
                Order
            </Link>
            <Link color="inherit" href="#">
                New Order
            </Link>
            <Link color="inherit" href="#">
                LON to NYC
            </Link>
            <Typography
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary',
                }}
            >
                Fare options
            </Typography>
        </Breadcrumbs>

        <Box sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: mdUp ? 'row' : 'column',
            alignItems: 'start',
            gap: 2,
        }}>
            <Box sx={{
                maxWidth: mdUp ? `calc(100% - 320px)` : '100%',
                flex: 1,
                gap: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>Flight to DFW</Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>30 Mar 2024</Typography>
                </Box>

                <FareRouteItem />

                <Box sx={{
                    width: 1,
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    ...ScrollCustomStyle(theme, {}),
                }}>
                    <Box sx={{
                        display: 'flex',
                        whiteSpace: 'nowrap',
                        alignItems: 'stretch',
                        py: 2,
                        gap: 2,
                    }}>
                        {
                            [1, 2, 3, 4, 5].map((_, i) => <FareOptionItem key={i} isSelected={_ === 2} />)
                        }
                    </Box>
                </Box>

                <FareRouteItem />
                <FareRouteItem />
                <FareRouteItem />
            </Box>

            <Box sx={{
                backgroundColor: alpha(theme.palette.background.default, 0.2),
                backdropFilter: 'blur(10px)',
                width: mdUp ? '320px' : '100%',
                position: mdUp ? 'sticky' : 'static',
                top: '16px',
                p: 2,
            }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Summary</Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Sold by</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Image src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BP.svg" sx={{
                            width: '22px',
                            height: '22px',
                            objectFit: 'cover'
                        }} />
                        <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>Iberia</Typography>
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Iconify icon="heroicons:cloud" sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>From 219kg CO2</Typography>
                    </Box>
                    <Divider sx={{ mt: 2, mb: 12 }} />

                    <Button variant="contained" disabled sx={{ width: 1, mb: 2 }} endIcon={
                        <Iconify icon="teenyicons:arrow-right-solid" />
                    }>Go to checkout</Button>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>Your are in test mode.</Typography>
                </Box> */}

                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Iconify icon="material-symbols:airplane-ticket-outline" sx={{ color: 'text.secondary' }} />
                        <Typography sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Changeable (£50.00 fee)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Iconify icon="gridicons:refund" sx={{ color: 'text.secondary' }} />
                        <Typography sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Refundable (£50.00 fee)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Iconify icon="mingcute:time-line" sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Hold space for 3 days</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Iconify icon="mingcute:time-line" sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Hold price for 2 days</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Iconify icon="mdi:bag-suitcase" sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Includes carry-on bags</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Iconify icon="mdi:bag-suitcase-outline" sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>Includes checked bags</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Iconify icon="heroicons:cloud" sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ fontSize: '12px', fontStyle: 'normal', color: 'text.secondary' }}>864kg CO2</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: mdUp ? 'column' : 'row',
                        justifyContent: mdUp ? 'flex-start' : 'space-between',
                        mt: 4,
                    }}>
                        <Typography variant="body2" sx={{}}>Total amount</Typography>
                        <Typography variant="subtitle2">€356.63</Typography>
                    </Box>

                    <Button variant="contained" sx={{ width: 1, mt: 2 }} endIcon={
                        <Iconify icon="teenyicons:arrow-right-solid" />
                    }>Go to checkout</Button>
                </Box>
            </Box>
        </Box>
    </Box >;
}