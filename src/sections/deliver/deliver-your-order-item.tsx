import { useState } from 'react';

import { Box, alpha, BoxProps, Typography, IconButton } from '@mui/material';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

export type DeliverYourOrderItemType = {
    type: string;
    title: string;
    description: string;
    image: string;
    link: string;
};

export interface DeliverYourOrderItemProps extends BoxProps {
    data?: DeliverYourOrderItemType[],
    type?: string,
}

export default function DeliverYourOrderItem({ data, type = "shopping", sx, ...other }: DeliverYourOrderItemProps) {
    const [number, setNumber] = useState(1);
    return <Box sx={{
        borderRadius: 1,
        border: theme => `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'transparent',
        ...sx,
    }} {...other} >
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            p: 2,
            gap: 2,
            position: 'relative',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                gap: 2,
                flex: 1,
                pr: '40px',
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
                    }}>Acon Flowflex Combo Covid & Flu A/B 25 Τεμάχια</Typography>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        mb: 1,
                    }}>1 pc</Typography>
                    <Typography variant="body2" sx={{
                        color: 'primary.main',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>€150.00</Typography>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                right: '12px',
                top: '12px',
                gap: 0.5,
                borderRadius: 1,
                p: 0.5,
                ':hover': {
                    backdropFilter: 'blur(8px)',
                    boxShadow: 2,
                    '& .counter-left': {
                        left: 0,
                        opacity: 1,
                    },
                    '& .counter-label': {
                        left: 0,
                        opacity: 1,
                        borderColor: 'transparent',
                    },
                    '& .counter-right': {
                        left: 0,
                        opacity: 1,
                    },
                    '& .counter-delete': {
                        opacity: 1,
                    },
                    '& .counter-bg': {
                        width: '164px',
                        backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
                    }
                },
            }}>
                <Box className="counter-bg" sx={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    borderRadius: 1,
                    transition: 'all 0.3s',
                }} />
                <IconButton className="counter-left" color='primary' sx={{
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                    position: 'relative',
                    transition: 'all 0.3s',
                    left: '120px', // 36px * 3 + '12px'
                    opacity: 0,
                }}>
                    <Iconify icon="ion:remove-outline" />
                </IconButton>
                <Typography className="counter-label" variant="body2" sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    width: '36px',
                    height: '36px',
                    lineHeight: '34px',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    position: 'relative',
                    transition: 'all 0.3s',
                    left: '80px', // '72px' + '8px'
                    borderRadius: 1,
                    border: theme => `1px solid`,
                    borderColor: theme => alpha(theme.palette.primary.main, 0.6),
                }}>{number}</Typography>
                <IconButton className="counter-right" color='primary' sx={{
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                    transition: 'all 0.3s',
                    position: 'relative',
                    left: '40px', // '36px' + '4px'
                    opacity: 0,
                }}>
                    <Iconify icon="ion:add-outline" />
                </IconButton>
                <IconButton className="counter-delete" color="error" sx={{
                    backgroundColor: theme => alpha(theme.palette.error.main, 0.2),
                    transition: 'all 0.3s',
                    opacity: 0,
                }}>
                    <Iconify icon="ion:trash-outline" />
                </IconButton>
            </Box>
        </Box>
    </Box>
}