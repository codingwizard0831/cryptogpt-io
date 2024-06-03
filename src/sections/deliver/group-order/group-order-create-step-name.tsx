import { Box, alpha, Button, TextField, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import StyledPopover from 'src/components/styled-component/styled-popover';

export default function GroupOrderCreateStepName() {
    const iconSelectorPopover = usePopover();
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
            <Typography variant="h3" sx={{ mb: 4 }}>Order together</Typography>
            <Typography sx={{ mb: 4 }}>Name this order and invite people to order together</Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: 1,
                gap: 2,
                mb: 2,
            }}>
                <Button variant="outlined" size="large" endIcon={
                    <Iconify icon="ep:arrow-down" sx={{
                    }} />
                } sx={{
                    height: '53px',
                }} onClick={iconSelectorPopover.onOpen}>
                    <Image src="https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png" sx={{
                        width: '24px',
                        height: '24px',
                    }} />
                </Button>

                <StyledPopover
                    open={!!iconSelectorPopover.open}
                    onClose={iconSelectorPopover.onClose}
                    anchorEl={iconSelectorPopover.open}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{
                        zIndex: 2000,
                    }}
                >
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: 1,
                        p: 1,
                        // width: '320px',
                    }}>
                        {
                            iconsDummyData.map((icon, index) => (
                                <Button key={index} size="large" sx={{
                                    minWidth: '48px',
                                    width: '48px',
                                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
                                }}>
                                    <Image src={icon.image} sx={{
                                        width: '24px',
                                        height: '24px',
                                    }} />
                                </Button>
                            ))
                        }
                    </Box>
                </StyledPopover>

                <Box sx={{
                    flex: 1,
                }}>
                    <TextField fullWidth variant="outlined" label="Group name" />
                </Box>
            </Box>
            <Button variant="contained" fullWidth color="primary" size="large">Continue</Button>
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


const iconsDummyData = [
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
    {
        image: 'https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png',
    },
]