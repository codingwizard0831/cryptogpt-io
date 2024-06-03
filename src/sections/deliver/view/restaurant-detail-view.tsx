'use client';

import React from 'react';

import { Box, Link, Grid, alpha, Button, BoxProps, TextField, Typography, IconButton, Breadcrumbs, InputAdornment } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import DeliverRestaurantProductItem from '../deliver-restaurant-product-item';
import DeliverRestaurantInformationSection from '../restaurants/restaurant-information-section';


type Props = {
    id: string;
    country: string;
    address: string;
};

export default function DeliverRestaurantDetailView({ id, country, address }: Props) {
    const upMd = useResponsive('up', 'md');
    return (
        <Box sx={{
            width: 1,
            height: 1,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
            }}>
                <Breadcrumbs>
                    <Link color="inherit" href="#">
                        Deliver
                    </Link>
                    <Link color="inherit" href='#'>
                        {country}
                    </Link>
                    <Link color="inherit" href='#'>
                        {address}
                    </Link>
                    <Link color="inherit" href='#'>
                        restaurant
                    </Link>
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.primary',
                        }}
                    >
                        {id}
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Box sx={{
                position: 'relative',
                zIndex: 1,
            }}>
                <Image src="/assets/images/deliver/restaurant/1.avif" alt="Alaska Airlines"
                    sx={{
                        position: 'absolute',
                        width: 1,
                        height: 1,
                        objectFit: 'cover',
                        zIndex: 1,
                    }}
                />
                <Box sx={{
                    width: 1,
                    height: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1,
                }} />
                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    pt: 6,
                    pb: 1,
                    px: 2,
                    zIndex: 2,
                }}>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>Alaska Airlines</Typography>
                    <Typography variant="subtitle1" sx={{}}>A trip to authentic Indian cuisine!</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'space-between',
                        gap: 1,
                    }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                lineHeight: '100%',
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                                backgroundColor: theme => theme.palette.text.primary,
                                color: theme => theme.palette.background.paper,
                                whiteSpace: 'nowrap',
                            }}>Delivery: €0.00</Typography>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                lineHeight: '100%',
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                                backgroundColor: theme => theme.palette.text.primary,
                                color: theme => theme.palette.background.paper,
                                whiteSpace: 'nowrap',
                            }}>Min. order: €25.00</Typography>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                lineHeight: '100%',
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                                backgroundColor: theme => theme.palette.text.primary,
                                color: theme => theme.palette.background.paper,
                                whiteSpace: 'nowrap',
                            }}>Delivery in 35-45 min</Typography>
                        </Box>
                        <IconButton sx={{
                            backdropFilter: 'blur(10px)',
                        }}>
                            <Iconify icon="material-symbols:favorite-outline" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: upMd ? 'center' : 'start',
                flexDirection: upMd ? 'row' : 'column',
                flexWrap: upMd ? 'nowrap' : 'wrap',
                justifyContent: 'space-between',
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                gap: 2,
                p: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: upMd ? 'nowrap' : 'wrap',
                    gap: 2,
                }}>
                    <Typography variant="body1" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}>
                        <Iconify icon="mingcute:time-line" /> Open until 11:00 PM
                    </Typography>
                    <Typography variant="body1" sx={{
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}>Not rated yet</Typography>
                    <Typography variant="body1" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}>
                        <Iconify icon="tabler:truck-delivery" /> Limited delivery tracking
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}>
                        <Iconify icon="material-symbols:info" /> See more information
                    </Typography>
                </Box>

                <Link>
                    <Typography variant="body1" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}>
                        <Iconify icon="mdi:user-multiple-add-outline" /> Order together
                    </Typography>
                </Link>

                <DeliverRestaurantInformationSection />
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
            }}>
                <Box sx={{
                    display: upMd ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                }}>

                    <ProductionType isActive>OPEKTIKA</ProductionType>
                    <ProductionType>ZAAATDEE</ProductionType>
                    <ProductionType>SEZZFEER</ProductionType>
                    <ProductionType>EFGGGESS</ProductionType>
                    <ProductionType>More (4)</ProductionType>

                </Box>

                <Box sx={{
                    width: upMd ? 'auto' : '100%',
                }}>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Search..."
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Iconify icon="ic:outline-search" sx={{
                                    }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{
                mb: 4,
                mx: 2
            }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Discounts</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                        <Button sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 1,
                            overflow: 'hidden',
                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                            transition: 'all 0.3s',
                            boxShadow: 3,
                            py: 1,
                            pl: 2,
                            pr: 1,
                            gap: 1,
                            '&:hover': {
                                backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                                transform: 'scale(1.02)',
                            }
                        }}>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                width: '100%',
                                lineHeight: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'left',
                                color: theme => theme.palette.text.primary,
                            }}>-5€ on your 1st order. Minimum order value 10€.</Typography>
                            <Iconify icon="iconamoon:discount" sx={{
                                color: theme => theme.palette.primary.main,
                                backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                                width: '36px',
                                height: '36px',
                                p: 0.5,
                                borderRadius: '50%',
                                transform: 'scale(2)',
                                position: 'relative',
                            }} />
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{
                mb: 4,
                mx: 2,
            }}>
                <Typography variant="h4" sx={{ mb: 2 }}>APPETIZERS</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                        <DeliverRestaurantProductItem />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                        <DeliverRestaurantProductItem />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                        <DeliverRestaurantProductItem />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

interface ProductionTypeProps extends BoxProps {
    children?: React.ReactNode;
    isActive?: boolean;
}
function ProductionType({ children, isActive = false, sx, ...other }: ProductionTypeProps) {
    return (
        <Box sx={{
            fontSize: '12px',
            lineHeight: '100%',
            p: 1,
            borderRadius: 1,
            transition: 'all 0.3s',
            backgroundColor: isActive ? theme => alpha(theme.palette.primary.main, 0.2) : 'transparent',
            color: isActive ? theme => theme.palette.primary.main : theme => theme.palette.text.primary,
            cursor: 'pointer',
            ...sx,
        }} {...other}>{children}</Box>
    );
}