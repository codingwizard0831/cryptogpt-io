import { Box, alpha, Button, BoxProps, Typography } from '@mui/material';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

export type DeliverGroupOrderItemType = {
    type: string;
    title: string;
    description: string;
    image: string;
    link: string;
};

export interface DeliverGroupOrderItemProps extends BoxProps {
    data?: DeliverGroupOrderItemType[],
}

export default function DeliverGroupOrderItem({ data, sx, ...other }: DeliverGroupOrderItemProps) {
    return <Box sx={{
        borderRadius: 1,
        border: theme => `1px solid ${theme.palette.divider}`,
        cursor: 'pointer',
        ...sx,
    }} {...other} >
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            p: 2,
            gap: 2,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                flex: 1,
            }}>
                <Box sx={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    position: 'relative',
                }}>
                    <Image src="https://consumer-static-assets.wolt.com/group-order-icons-3d/burger.png"
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 1,
                        }} />
                    <Box sx={{
                        position: 'absolute',
                        p: 0.5,
                        backgroundColor: theme => alpha(theme.palette.grey[900], 0.8),
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50%',
                        right: 0,
                        bottom: 0,
                    }}>
                        <Iconify icon="radix-icons:lock-closed" sx={{
                            width: '12px',
                            height: '12px',
                        }} />
                    </Box>
                </Box>
                <Box sx={{
                    flex: 1,
                    width: 0,
                }}>
                    <Typography variant="subtitle1" sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>coding and friends</Typography>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>Order together from Lush Oberhausen</Typography>
                </Box>
            </Box>
        </Box>

        <Box sx={{
            p: 2,
        }}>
            <Typography variant="body2" sx={{
                color: 'text.secondary',
                mb: 2,
            }}>Participants: 5</Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'end',
                gap: 2,
            }}>
                <Button startIcon={<Iconify icon="radix-icons:lock-closed" />} >Lock</Button>
                <Button startIcon={<Iconify icon="ion:trash-outline" />} color="error">Cancel</Button>
            </Box>
        </Box>
    </Box>
}