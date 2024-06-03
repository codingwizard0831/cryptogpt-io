import React, { useState } from "react";

import { Box, Tab, Tabs, alpha, Button, useTheme, IconButton, Typography, InputAdornment } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import Iconify from "src/components/iconify";
import { StyledDialog } from "src/components/styled-component";

import DeliverOrderDetailWhenField from "./deliver-order-detail-when-field";

export default function DeliverChangeOrderDetailSection() {
    const theme = useTheme();
    const changeOrderDetailsDialog = useBoolean(false);
    const [currentTab, setCurrentTab] = useState('delivery');

    return <StyledDialog open={changeOrderDetailsDialog.value}>
        <Box sx={{
            width: '90vw',
            maxWidth: '500px',
            py: 1,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'end',
                p: 2,
            }}>

                <IconButton sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    color: 'white',
                }} onClick={changeOrderDetailsDialog.onFalse}>
                    <Iconify icon="material-symbols:close" />
                </IconButton>
            </Box>
            <Typography variant="h4" sx={{
                mb: 2,
                px: 2,
            }}>Change order details</Typography>

            <Box sx={{
                px: 2,
                mb: 2,
            }}>
                <Tabs sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    mb: 2,
                }}
                    value={currentTab}
                    onChange={(_e, _value) => setCurrentTab(_value)}
                >
                    <Tab label="Delivery" value="delivery"
                        icon={
                            <InputAdornment position="start">
                                <Iconify icon="ic:outline-delivery-dining" sx={{
                                }} />
                            </InputAdornment>
                        }
                        iconPosition="start"
                        sx={{
                            p: 1,
                        }}
                    />
                    <Tab label="Pickup" value="pickup"
                        icon={
                            <InputAdornment position="start">
                                <Iconify icon="solar:walking-bold" sx={{
                                }} />
                            </InputAdornment>
                        }
                        iconPosition="start"
                        sx={{
                            p: 1,
                        }}
                    />
                </Tabs>

                <Box sx={{
                    display: currentTab === 'delivery' ? 'block' : 'none',
                    borderTop: `1px solid ${theme.palette.divider}`,
                }}>
                    <Typography variant="h6" sx={{
                        pt: 2,
                        pb: 1,
                    }}>Where to?</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        <Box sx={{
                            borderRadius: '50%',
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            p: 1,
                        }}>
                            <Iconify icon="akar-icons:location" sx={{
                                color: 'primary.main',
                            }} />
                        </Box>

                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            py: 1.5,
                        }}>
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
                            <Button color="primary">Change</Button>
                        </Box>
                    </Box>
                </Box>

                <DeliverOrderDetailWhenField />

                <Button fullWidth variant="contained" color='primary' sx={{
                    mt: 2,
                }}>
                    Done
                </Button>
            </Box>
        </Box>
    </StyledDialog>
}