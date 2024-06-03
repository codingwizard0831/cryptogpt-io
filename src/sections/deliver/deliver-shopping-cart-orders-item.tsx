import { Box, alpha, Button, BoxProps, Typography, IconButton } from '@mui/material';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

export type DeliverShoppingCartOrdersItemType = {
    type: string;
    title: string;
    description: string;
    image: string;
    link: string;
};

export interface DeliverShoppingCartOrdersItemProps extends BoxProps {
    data?: DeliverShoppingCartOrdersItemType[],
    type?: string,
}

export default function DeliverShoppingCartOrdersItem({ data, type = "shopping", sx, ...other }: DeliverShoppingCartOrdersItemProps) {
    return <Box sx={{
        borderRadius: 1,
        border: theme => `1px solid ${theme.palette.divider}`,
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
                <Image src="/assets/images/deliver/restaurant/1.avif"
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1,
                    }} />
                <Box sx={{
                    flex: 1,
                    width: 0,
                }}>
                    <Typography variant="subtitle1" sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>Farmakopoioules.gr</Typography>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>Delivery in 35~45 min</Typography>
                </Box>
            </Box>
            <IconButton sx={{
                backgroundColor: theme => alpha(theme.palette.error.main, 0.2),
            }}>
                <Iconify icon="ion:trash-outline" sx={{
                    color: 'error.main',
                }} />
            </IconButton>
        </Box>

        <Box sx={{
            p: 2,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
            }}>
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <Box key={`order-item-${index}`} sx={{
                            backgroundColor: theme => alpha(theme.palette.divider, 0.2),
                            width: '55px',
                            aspectRatio: '55/36',
                            borderRadius: 1,
                            overflow: 'hidden',
                            position: 'relative',
                        }}>
                            <Box sx={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: "100%",
                                height: '100%',
                                zIndex: 2,
                                backgroundColor: theme => alpha(theme.palette.divider, 0.1),
                            }} />
                            <Image src="/assets/images/deliver/product/1.avif"
                                sx={{
                                    width: "100%",
                                    height: '100%',
                                }} />
                        </Box>
                    ))
                }

                <Box sx={{
                    backgroundColor: theme => alpha(theme.palette.divider, 0.2),
                    width: '55px',
                    aspectRatio: '55/36',
                    borderRadius: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>+4</Box>
            </Box>
            <Typography variant="body2" sx={{
                color: 'text.secondary',
                mb: 2,
            }}>Item subtotal: 267.14 €</Typography>
            <Box sx={{
                display: 'flex',
                gap: 2,
            }}>
                {
                    type === "shopping" ? <>
                        <Button fullWidth variant="outlined" color="primary">Add more items</Button>
                        <Button fullWidth variant="contained" color="primary">Go to checkout</Button>
                    </> : <>
                        <Button fullWidth variant="outlined" color="primary">View details</Button>
                        <Button fullWidth variant="contained" color="primary">Order again</Button>
                    </>
                }
            </Box>
        </Box>
    </Box>
}