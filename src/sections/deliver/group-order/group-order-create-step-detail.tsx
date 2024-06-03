import { Box, Button, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';

import DeliverChangeOrderDetail1Section from '../order-section/deliver-change-order-details-1-section';

export default function GroupOrderCreateStepDetail() {
    const downMd = useResponsive('down', 'md');

    return <Box sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexDirection: downMd ? 'column' : 'row',
        gap: 6,
    }}>
        <Box sx={{
            width: '100%',
            order: downMd ? 2 : 1,
        }}>
            <Typography variant="h3" sx={{ mb: 4 }}>How do you want your order?</Typography>
            <DeliverChangeOrderDetail1Section />
            <Button variant="contained" fullWidth color="primary" size="large">Order together</Button>
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
}