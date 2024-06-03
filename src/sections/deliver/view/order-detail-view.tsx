'use client';

import React from 'react';

import { Box, Link, alpha, useTheme, Container, Typography, IconButton, Breadcrumbs } from '@mui/material';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import DeliverYourOrderSection from '../order-section/deliver-your-order-section';


type Props = {
    id: string;
};

export default function DeliverOrderDetailView({ id }: Props) {
    const settings = useSettingsContext();
    const theme = useTheme();

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
                        Order
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
                mb: 4,
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
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
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
                    <Typography variant="h3" sx={{
                        fontWeight: 700,
                        color: theme.palette.grey[100],
                    }}>Alaska Airlines</Typography>
                    <Typography variant="subtitle1" sx={{
                        color: theme.palette.grey[300],
                    }}>A trip to authentic Indian cuisine!</Typography>
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
                                backgroundColor: theme.palette.text.primary,
                                color: theme.palette.background.paper,
                                whiteSpace: 'nowrap',
                            }}>Delivery: €0.00</Typography>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                lineHeight: '100%',
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                                backgroundColor: theme.palette.text.primary,
                                color: theme.palette.background.paper,
                                whiteSpace: 'nowrap',
                            }}>Min. order: €25.00</Typography>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                lineHeight: '100%',
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                                backgroundColor: theme.palette.text.primary,
                                color: theme.palette.background.paper,
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

            <Container maxWidth={settings.themeStretch ? false : 'xl'}>
                <DeliverYourOrderSection id={id} />
            </Container>
        </Box>
    );
}