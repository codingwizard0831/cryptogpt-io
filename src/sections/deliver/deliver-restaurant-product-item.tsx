import React from 'react';

import { Box, alpha, Typography, IconButton } from '@mui/material';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import DeliverProductDetailItem from './deliver-product-detail-item';

export default function DeliverRestaurantProductItem() {
    return <>
        <Box sx={{
            display: 'flex',
            alignItems: 'stretch',
            p: 2,
            backdropFilter: 'blur(10px)',
            backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
            boxShadow: 3,
            borderRadius: 2,
            gap: 2,
            cursor: 'pointer',
        }}>
            <Box sx={{
                flex: 1,
                width: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Mix veg pakora</Typography>
                <Typography variant="body2" sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: theme => theme.palette.text.secondary,
                }}>500g, Mixed fired vegetables (spinach, onion, potato) dipped in chickpea batter</Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'end',
                    flex: 1,
                }}>
                    <Typography variant='body2' color="primary">€5.00</Typography>
                </Box>
            </Box>
            <Box sx={{
                width: "32%",
                minWidth: '120px',
                maxWidth: '164px',
            }}>
                <Box sx={{
                    aspectRatio: '5 / 4',
                    position: 'relative',
                    width: '100%',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}>
                    <Image src="/assets/images/deliver/restaurant/1.avif" alt="Alaska Airlines"
                        sx={{
                            width: '100%',
                            height: '100%',
                        }} />
                    <IconButton sx={{
                        borderRadius: '0px 4px 0px 50%',
                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.4),
                        backdropFilter: 'blur(10px)',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        p: 1,
                    }}>
                        <Iconify icon="material-symbols:add" sx={{
                            color: theme => theme.palette.text.primary,
                        }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
        <DeliverProductDetailItem />
    </>
}