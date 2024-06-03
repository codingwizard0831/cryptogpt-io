'use client';


import { Box, Button, Container, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

type DeliverGroupOrderJoinViewProps = {
    id: string
};

export default function DeliverGroupOrderJoinView({ id }: DeliverGroupOrderJoinViewProps) {
    const settings = useSettingsContext();
    const downMd = useResponsive('down', 'md');

    return <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
        height: '100%',
        pb: 2,
    }}>
        <Box sx={{
            width: 1,
            height: 1,
            display: 'flex',
            flexDirection: downMd ? 'column' : 'row',
            gap: 6,
            my: 6
        }}>
            <Box sx={{
                width: '100%',
                order: downMd ? 2 : 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 4,
                }}>
                    <Image src="https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png" sx={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                    }} />
                    <Image src="/assets/images/deliver/restaurant/1.avif" sx={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        position: 'relative',
                        left: '-24px',
                    }} />
                </Box>
                <Typography variant="h3" sx={{ mb: 4 }}>Welcome to coding and friends!</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mb: 4,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        <Iconify icon="ic:outline-email" />
                        <Typography variant="body2">Order from Lush Oberhausen</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        <Iconify icon="ic:twotone-delivery-dining" />
                        <Typography variant="body2">The average delivery time is 45~55 min</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        <Iconify icon="mdi:users" />
                        <Typography variant="body2">1 participant</Typography>
                    </Box>
                </Box>
                <Button variant="contained" fullWidth color="primary" size="large" sx={{ mb: 6 }}>Join to order together</Button>
            </Box>
            <Box sx={{
                width: '100%',
                order: downMd ? 1 : 2,
            }}>
                <Image src="/assets/images/deliver/1.avif" sx={{
                    width: 1,
                }} />
            </Box>
        </Box>
    </Container>
}