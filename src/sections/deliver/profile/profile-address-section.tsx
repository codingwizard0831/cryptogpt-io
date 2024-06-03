'use client';


import { Box, alpha, BoxProps, useTheme, MenuItem, Typography, IconButton } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { StyledPopover } from 'src/components/styled-component';


interface ProfileAddressSectionProps extends BoxProps {
}

export default function ProfileAddressSection({ sx, ...other }: ProfileAddressSectionProps) {
    const theme = useTheme();
    const upXl = useResponsive('up', 'xl');

    return <Box sx={{
        ...sx,
    }} {...other}>
        <Typography variant='h5'>Your address</Typography>

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
                    Array.from({ length: 3 }).map((_, index) => <AddressItem key={index} />)
                }
            </Box>
        </Box>
    </Box>
}

interface AddressItemProps extends BoxProps {
}

const AddressItem = ({ sx, ...other }: AddressItemProps) => {
    const theme = useTheme();
    const actionMenuPopover = usePopover();

    return <Box sx={{
        flex: 1,
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        p: 1.5,
        mb: 1,
        gap: 1.5,
    }}>
        <Box sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: alpha(theme.palette.divider, 0.08),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Iconify icon="mdi:home" color={theme.palette.text.primary} width={20} height={20} />
        </Box>
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        }}>
            <Typography variant="subtitle2" sx={{

            }}>Delivery address</Typography>
            <Typography variant="body2" sx={{
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1,
            }}>Greece, Athena, test, 24 test, test , test, test, test stress</Typography>
        </Box>
        <IconButton color="primary" sx={{
            backgroundColor: alpha(theme.palette.divider, 0.05),
        }} onClick={actionMenuPopover.onOpen}>
            <Iconify icon="basil:other-1-solid" />
        </IconButton>

        <StyledPopover
            open={Boolean(actionMenuPopover.open)}
            anchorEl={actionMenuPopover.open}
            onClose={actionMenuPopover.onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
            }}
        >
            <Box sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                backdropFilter: 'blur(10px)',
                width: 120,
            }}>
                <MenuItem onClick={actionMenuPopover.onClose}>Edit</MenuItem>
                <MenuItem onClick={actionMenuPopover.onClose}>Delete</MenuItem>
            </Box>
        </StyledPopover>
    </Box>
}