'use client';

import React from 'react';

import { Box, Link, alpha, Typography, Breadcrumbs } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label/label';


type Props = {
    id: string;
};

export function TravelAirlineDetailView({ id }: Props) {
    return (
        <Box sx={{
            width: 1,
            height: 1,
            p: 2,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Breadcrumbs sx={{ mb: 2 }}>
                    <Link color="inherit" href="#">
                        Travel
                    </Link>
                    <Link color="inherit" href={paths.dashboard.travel.airline} component={RouterLink}>
                        Airlines
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
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                mb: 3,
            }}>
                <Image src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BP.svg" alt="solar-slider-1" width={32} />
                <Typography variant="h3" sx={{ fontWeight: 600 }}>Alaska Airlines</Typography>
            </Box>

            <Box sx={{
                borderRadius: '5px',
                border: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                backdropFilter: 'blur(20px)',
                boxShadow: 1,
                px: 2,
                mb: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                }}>
                    <Typography variant="body1"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >Status</Typography>
                    <Label color="success">Active</Label>
                </Box>


                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                }}>
                    <Typography variant="body1"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >Alliance</Typography>
                    <Typography variant="body1">Star Alliance</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                }}>
                    <Typography variant="body1"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >Region</Typography>
                    <Typography variant="body1">Europe</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                }}>
                    <Typography variant="body1"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >Content</Typography>
                    <Typography variant="body1">Duffel Content</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 2,
                }}>
                    <Typography variant="body1"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >Source</Typography>
                    <Typography variant="body1">Aegean Airlines</Typography>
                </Box>
            </Box>

            <Box sx={{
                borderRadius: '5px',
                border: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                backdropFilter: 'blur(20px)',
                boxShadow: 1,
                px: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.secondary',
                    }}>
                        <Iconify icon="solar:star-fall-bold-duotone" />
                        <Typography variant="body1">Fare brands</Typography>
                    </Box>
                    <Typography variant="body1">Full support</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.secondary',
                    }}>
                        <Iconify icon="mdi:search" />
                        <Typography variant="body1">Searching & Booking</Typography>
                    </Box>
                    <Typography variant="body1">Full support</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.secondary',
                    }}>
                        <Iconify icon="gridicons:refund" />
                        <Typography variant="body1">Cancellations & Refunds</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>No supported</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.secondary',
                    }}>
                        <Iconify icon="mdi:bag-suitcase-outline" />
                        <Typography variant="body1">Add additional bags when booking</Typography>
                    </Box>
                    <Typography variant="body1" >Full support</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.secondary',
                    }}>
                        <Iconify icon="mdi:seat-passenger" />
                        <Typography variant="body1">Selecting a seat when booking</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>No supported</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.secondary',
                    }}>
                        <Iconify icon="material-symbols:airplane-ticket-outline" />
                        <Typography variant="body1">Loyalty programmes</Typography>
                    </Box>
                    <Typography variant="body1">Full support</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    py: 2,
                    gap: 1,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 1,
                        color: 'text.secondary',
                    }}>
                        <Iconify icon="fluent:payment-20-regular" />
                        <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>Accepted payments</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flex: 1,
                    }}>
                        <Typography variant="body1" sx={{
                            textAlign: 'right',
                            whiteSpace: 'nowrap'
                        }}>Duffel Balance and ARC/BSP Cash</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}