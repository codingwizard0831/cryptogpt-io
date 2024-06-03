'use client';


import { Box, Link, alpha, BoxProps, useTheme, Typography, IconButton, ButtonBase } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';


interface ProfileOrderHistorySectionProps extends BoxProps {
}

export default function ProfileOrderHistorySection({ sx, ...other }: ProfileOrderHistorySectionProps) {
    const theme = useTheme();
    const upXl = useResponsive('up', 'xl');

    return <Box sx={{
        ...sx,
    }} {...other}>
        <Typography variant='h5'>Order History</Typography>

        <Box sx={{
            mt: 2,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {
                    Array.from({ length: 3 }).map((_, index) => <OrderItem key={index} />)
                }
            </Box>
        </Box>
    </Box>
}

interface OrderItemProps extends BoxProps {
}

const OrderItem = ({ sx, ...other }: OrderItemProps) => {
    const theme = useTheme();

    return <Link href={paths.dashboard.deliver.order} component={RouterLink} sx={{
        width: '600px',
    }}>
        <ButtonBase sx={{
            flex: 1,
            width: '100%',
            maxWidth: 600,
            display: 'flex',
            alignItems: 'center',
            backdropFilter: 'blur(10px)',
            borderRadius: 1,
            backgroundColor: alpha(theme.palette.divider, 0.05),
            p: 1.5,
            mb: 1,
            gap: 1.5,
            transition: 'background-color 0.3s',
            hover: {
                backgroundColor: alpha(theme.palette.divider, 0.1),
            },
        }}>
            <Typography variant="subtitle1" sx={{
                textAlign: 'left',
                color: 'text.primary',
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1,
            }}>Psistaria Kapatsos</Typography>
            <Typography variant="body2" sx={{
            }}>2024-05-11 18:26</Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
            }}>
                <Typography variant="body2" sx={{
                    color: 'text.secondary',
                }}>€25.07</Typography>
                <IconButton color="primary" sx={{
                    backgroundColor: alpha(theme.palette.divider, 0.05),
                }}>
                    <Iconify icon="mingcute:right-fill" />
                </IconButton>
            </Box>
        </ButtonBase>
    </Link>
}