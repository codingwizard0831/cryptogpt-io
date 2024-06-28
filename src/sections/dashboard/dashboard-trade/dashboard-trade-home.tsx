import React from 'react';

import { Box, Stack, alpha, BoxProps, IconButton, Typography, ButtonBase } from '@mui/material';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';


interface DashboardTradeProps extends BoxProps {
    handleWindowResize?: () => void;
    isMinimized?: boolean;
}

export default function DashboardTradeHome({
    isMinimized = false,
    handleWindowResize,
    sx,
    ...other
}: DashboardTradeProps) {
    return <Box sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 1,
        position: 'relative',
        overflow: 'hidden',
    }}>
        <Stack direction="row" alignItems='center' justifyContent='space-between' sx={{
            width: '100%',
        }}>
            <Typography variant="h6">Trade</Typography>

            <IconButton>
                {isMinimized ? <Iconify icon="fluent-mdl2:minimum-value" sx={{
                    color: theme => theme.palette.text.primary,
                }} /> : <Iconify icon="lucide:maximize" sx={{
                    color: theme => theme.palette.text.primary,
                }} />}
            </IconButton>
        </Stack>

        <Stack direction="row" alignItems="center" gap={1}>
            <Image src="/logo/crgpt-icon-full.png" alt="Trade" sx={{
                width: '52px',
                height: '52px',
                borderRadius: 1,
            }} />
            <Stack direction="column" gap={0.5}>
                <Typography variant="body1" sx={{ color: 'primary.main' }}>CRGPT/USDT</Typography>
                <Stack direction="row" gap={1}>
                    <ButtonBase sx={{
                        backgroundColor: theme => theme.palette.primary.main,
                        fontSize: '12px',
                        borderRadius: 0.5,
                        p: '2px 8px',
                    }}>Buy</ButtonBase>
                    <ButtonBase sx={{
                        border: theme => `1px solid ${theme.palette.primary.main}`,
                        fontSize: '12px',
                        borderRadius: 0.5,
                        p: '2px 8px',
                    }}>Sell</ButtonBase>
                </Stack>
            </Stack>
        </Stack>

        <Box sx={{
            flex: 1,
        }}>
            <Typography variant="body1" sx={{ color: 'text.primary', my: 1 }}>Fast, friendly and reliable!</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>You can earn the money by trading with our AI model</Typography>
        </Box>


        <Stack direction='row' alignItems="center" gap={1}>
            {
                [1, 2, 3, 4, 5].map((v, i) => <ButtonBase key={`trade-star-key-${i}`} sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: theme => alpha(theme.palette.background.opposite, 0.05)
                }}>
                    <Iconify icon="ph:star-fill" sx={{
                        color: "primary.main",
                        fontSize: '20px',
                    }} />
                </ButtonBase>)
            }

            <Typography variant="caption" sx={{
                color: 'text.secondary',
                ml: 1,
            }}>Aug 15, 2021</Typography>
        </Stack>


        <Image src="/logo/crgpt-icon-full.png" alt="Trade" sx={{
            width: '182px',
            height: '182px',
            borderRadius: 1,
            position: 'absolute',
            right: '-24px',
            bottom: '-24px',
            opacity: 0.3,
            zIndex: -1,
        }} />
    </Box>;
}