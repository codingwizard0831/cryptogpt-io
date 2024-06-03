import React from 'react';

import { Box, alpha, Typography, IconButton } from '@mui/material';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

export default function DeliverStoreProductItem() {
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        p: 2,
        backdropFilter: 'blur(10px)',
        backgroundColor: theme => alpha(theme.palette.background.default, 0.4),
        boxShadow: 3,
        borderRadius: 2,
        gap: 2,
        cursor: 'pointer',
    }}>
        <Box sx={{
            aspectRatio: '3 / 2',
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

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
        }}>
            <Typography variant="body2" sx={{
                fontSize: '12px',
                fontWeight: 400,
                color: theme => theme.palette.primary.main,
            }}>€22.20</Typography>
            <Typography variant="h6" sx={{
                fontWeight: 600,
                mb: 4,
            }}>Mix veg pakora</Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'end',
                flex: 1,
            }}>
                <Typography variant='body2'>1 pc</Typography>
                <Typography variant='body2'>€22.20/pc</Typography>
            </Box>
        </Box>
    </Box>
}