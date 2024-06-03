import { Box, Link, alpha, Button, BoxProps, Typography } from "@mui/material";

import { RouterLink } from "src/routes/components";

import Image from "src/components/image";
import Iconify from "src/components/iconify";

export type DeliverRestaurantItemType = {
    type: string;
    title: string;
    description: string;
    image: string;
    link: string;
};

export interface DeliverRestaurantItemProps extends BoxProps {
    data: DeliverRestaurantItemType,
    isShortly?: boolean;
}

export default function DeliverRestaurantItem({ data, isShortly = false, sx, ...other }: DeliverRestaurantItemProps) {
    return (
        <Link href={data.link} component={RouterLink} sx={{
            width: '100%',
            display: 'flex'
        }}>
            <Box sx={{
                width: '100%',
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                color: 'text.primary',
                '&:hover': {
                    '.wallpaper': {
                        transform: 'scale(1.2)',
                    }
                },
                ...sx,
            }} {...other}>
                <Box sx={{
                    width: '100%',
                    aspectRatio: '2 / 1',
                    position: 'relative',
                }}>
                    <Image src={data.image} className="wallpaper" sx={{
                        width: '100%',
                        height: '100%',
                        transition: 'all 0.5s ease',
                    }} />

                    {
                        !isShortly && <Box sx={{
                            position: 'absolute',
                            left: '0px',
                            top: '0px',
                            display: 'flex',
                            p: 0.5
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: theme => alpha(theme.palette.primary.main, 0.7),
                                color: 'white',
                                borderRadius: '10px',
                                gap: 0.5,
                                px: 1,
                                py: 0.5,
                            }}>
                                <Iconify icon="streamline:discount-percent-coupon-solid" sx={{
                                    height: '14px',
                                }} />
                                <Typography variant="body2" sx={{
                                    fontSize: '12px',
                                }}>-5€ on your first order!</Typography>
                            </Box>
                        </Box>
                    }

                    <Box sx={{
                        backdropFilter: 'blur(10px)',
                        backgroundColor: theme => alpha(theme.palette.background.default, 0.4),
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        px: 2,
                        py: 1,
                        borderBottom: theme => `1px solid ${theme.palette.divider}`,
                        gap: 0.5,
                        position: 'absolute',
                        bottom: 0,
                    }}>
                        <Iconify icon="tabler:clock-filled" sx={{ width: '14px' }} />
                        <Typography variant="body2" sx={{
                            fontWeight: 700,
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                        }}>Schedule order</Typography>
                        <Typography variant="body2" sx={{
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                        }}> • Opens tomorrow 7:00 AM</Typography>
                    </Box>
                </Box>

                <Box sx={{
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                    backdropFilter: 'blur(4px)',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                        borderBottom: theme => `1px solid ${theme.palette.divider}`,
                        px: 2,
                        py: 1,
                    }}>
                        <Box sx={{
                            flex: 1,
                            width: 0,
                        }}>
                            <Typography variant="subtitle1" sx={{
                                color: 'text.primary',
                                width: '100%',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}>{data.title}</Typography>
                            <Typography variant="body2" sx={{
                                color: theme => alpha(theme.palette.text.primary, 0.5),
                                width: '100%',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}>{data.type}</Typography>
                        </Box>
                        {
                            !isShortly && <Button variant="contained" size="small">Closed</Button>
                        }
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 1,
                    }}>
                        {
                            !isShortly && <Iconify icon="ic:outline-delivery-dining" color="warning" />
                        }
                        <Typography variant="body2" sx={{
                            color: theme => theme.palette.text.primary,
                        }}>0.00</Typography>
                        <Box sx={{
                            display: 'flex',
                            color: theme => theme.palette.text.primary,
                        }}>
                            <Typography variant="body2" sx={{
                                opacity: 1,
                            }}>€</Typography>
                            <Typography variant="body2" sx={{
                                opacity: 0.8,
                            }}>€</Typography>
                            <Typography variant="body2" sx={{
                                opacity: 0.6,
                            }}>€</Typography>
                            <Typography variant="body2" sx={{
                                opacity: 0.4,
                            }}>€</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}>
                            <Iconify icon="mingcute:emoji-fill" />
                            <Typography variant="body2" sx={{
                                color: theme => alpha(theme.palette.text.primary, 0.5),
                            }}>7.6</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Link>
    );
}