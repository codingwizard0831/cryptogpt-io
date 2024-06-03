import React from 'react';

import { Box, alpha, Button, useTheme, BoxProps, Typography } from '@mui/material';

import Label from 'src/components/label';

interface DeliverOrderSummarySectionProps extends BoxProps {
    id: string;
}

export default function DeliverOrderSummarySection({ id, sx, ...other }: DeliverOrderSummarySectionProps) {
    const theme = useTheme();

    return (<Box sx={{
        mb: 2,
        ...sx,
    }} {...other}>
        <Typography variant="h3" sx={{
            fontWeight: 'bold',
            mb: 2,
        }}>Wolt Market Limassol Central</Typography>

        <Typography variant="body2" sx={{
            color: 'text.secondary',
            mb: 2,
        }}>Archiepiskopou Leontiou I, 169, 3022, Limassol</Typography>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 1,
        }}>
            <Typography variant="body2" sx={{
                color: 'text.secondary',
            }}>Order placed: April 20, 2024 9:16 AM</Typography>
            <Label>Delivery</Label>
            <Label color='primary'>Delivered</Label>
        </Box>
        <Typography variant="body2" sx={{
            color: 'text.secondary',
            mb: 1,
        }}>Order ID: 66235dc02227e69294fa719c</Typography>
        <Typography variant="body2" sx={{
            color: 'text.secondary',
            mb: 1,
        }}>Delivered to: Home</Typography>
        <Typography variant="body2" sx={{
            color: 'text.secondary',
            mb: 2,
        }}>Order delivered: April 20, 2024 10:50 AM</Typography>
        <Button fullWidth variant='contained' color='primary' sx={{
            mb: 4,
        }}>View venue info</Button>

        <Box sx={{
            mb: 4,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                pb: 2,
                borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.5)}`,
            }}>
                <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                }}>Items</Typography>
            </Box>

            <Box sx={{
            }}>
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <Box key={index} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                            py: 2,
                        }}>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                                flex: 1,
                            }}>Agros Mineral Water 6x1.5lt</Typography>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                            }}>3.25</Typography>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                            }}>×2</Typography>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                            }}>6.50</Typography>
                        </Box>
                    ))
                }
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    py: 2,
                }}>
                    <Typography variant="body2" sx={{
                        fontWeight: 'bold',
                        flex: 1,
                    }}>Total sum</Typography>
                    <Typography variant="body2" sx={{
                        fontWeight: 'bold',
                    }}>€58.40</Typography>
                </Box>
            </Box>
        </Box>

        <Box sx={{
            mb: 4,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                pb: 2,
                borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.5)}`,
            }}>
                <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                }}>Payment details</Typography>
                <Button variant='outlined' color='primary'>Send the receipt to my email</Button>
            </Box>
            <Box sx={{
                mb: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    py: 2,
                }}>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        flex: 1,
                    }}>Payment method</Typography>
                    <Typography variant="body2" sx={{
                        fontWeight: 'bold',
                    }}>Apple Pay</Typography>
                </Box>
            </Box>
        </Box>

        <Box sx={{
            mb: 4,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                pb: 2,
                borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.5)}`,
            }}>
                <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                }}>Updated support</Typography>
                <Button variant='outlined' color='primary'>Open support chat</Button>
            </Box>
            <Box sx={{
                mb: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 2,
                }}>
                    <Typography variant="body2" sx={{
                        flex: 1,
                    }}>If you need help with yoru order, please contract Updated support on our website.</Typography>
                </Box>
            </Box>
        </Box>
    </Box>
    );
}