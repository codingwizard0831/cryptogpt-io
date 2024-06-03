import React, { useState } from "react";

import { Box, Radio, Button, useTheme, Typography, ButtonBase } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import Iconify from "src/components/iconify";

import DeliverOrderDetailWhenField1 from "./deliver-order-detail-when-field1";

export default function DeliverChangeOrderDetail1Section() {
    const theme = useTheme();
    const [howType, setHowType] = useState('delivery');
    const isSettingHowType = useBoolean(false);
    const isSettingWhere = useBoolean(false);
    const isSettingWhen = useBoolean(false);

    const handleChangeHowType = (type: 'delivery' | 'pickup') => {
        setHowType(type);
        isSettingHowType.onFalse();
    }

    const handleChangeWhere = () => {
        isSettingWhere.onFalse();
    }

    return <Box sx={{
    }}>
        <Box sx={{
        }}>
            <Typography variant="h6" sx={{
                pt: 2,
                pb: 1,
            }}>How?</Typography>

            {
                isSettingHowType.value ? <Box sx={{
                }}>
                    <ButtonBase sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        gap: 2,
                    }} onClick={() => handleChangeHowType('delivery')}>
                        <Radio checked={howType === "delivery"} />
                        <Box sx={{
                            flex: 1,
                            py: 1.5,
                        }}>
                            <Typography variant="subtitle2" sx={{
                                textAlign: 'left',
                            }}>Delivery address</Typography>
                            <Typography variant="body2" sx={{
                                textAlign: 'left',
                                color: 'text.secondary',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                flex: 1,
                            }}>Greece, Athena, test, 24 test, test , test, test, test stress</Typography>
                        </Box>
                    </ButtonBase>

                    <ButtonBase sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        gap: 2,
                    }} onClick={() => handleChangeHowType('pickup')}>
                        <Radio checked={howType === "pickup"} />
                        <Box sx={{
                            flex: 1,
                            py: 1.5,
                        }}>
                            <Typography variant="subtitle2" sx={{
                                textAlign: 'left',
                            }}>Pickup</Typography>
                            <Typography variant="body2" sx={{
                                textAlign: 'left',
                                color: 'text.secondary',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                flex: 1,
                            }}>I will pick it up myself</Typography>
                        </Box>
                    </ButtonBase>
                </Box> : <>
                    {
                        howType === 'delivery' ?
                            <ButtonBase sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                gap: 2,
                            }} onClick={isSettingHowType.onTrue}>
                                <Box sx={{
                                    px: 0.5,
                                }}>
                                    <Iconify icon="ic:outline-delivery-dining" sx={{
                                        color: 'text.primary',
                                        width: '32px',
                                        height: '32px',
                                    }} />
                                </Box>

                                <Box sx={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    py: 1.5,
                                }}>
                                    <Box sx={{
                                        flex: 1,
                                    }}>
                                        <Typography variant="subtitle2" sx={{
                                            textAlign: 'left',
                                        }}>Delivery address</Typography>
                                        <Typography variant="body2" sx={{
                                            textAlign: 'left',
                                            color: 'text.secondary',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            flex: 1,
                                        }}>Greece, Athena, test, 24 test, test , test, test, test stress</Typography>
                                    </Box>
                                    <Button color="primary">Change</Button>
                                </Box>
                            </ButtonBase>
                            :
                            <ButtonBase sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                gap: 2,
                            }} onClick={isSettingHowType.onTrue}>
                                <Box sx={{
                                    px: 0.5,
                                }}>
                                    <Iconify icon="solar:walking-bold" sx={{
                                        color: 'text.primary',
                                        width: '32px',
                                        height: '32px',
                                    }} />
                                </Box>

                                <Box sx={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    py: 1.5,
                                }}>
                                    <Box sx={{
                                        flex: 1,
                                    }}>
                                        <Typography variant="subtitle2" sx={{
                                            textAlign: 'left',
                                        }}>Pickup</Typography>
                                        <Typography variant="body2" sx={{
                                            textAlign: 'left',
                                            color: 'text.secondary',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            flex: 1,
                                        }}>I wiill pick it up myself</Typography>
                                    </Box>
                                    <Button color="primary">Change</Button>
                                </Box>
                            </ButtonBase>
                    }
                </>
            }

        </Box>

        <Box sx={{
            display: howType === 'delivery' ? 'block' : 'none',
            borderTop: `1px solid ${theme.palette.divider}`,
        }}>
            <Typography variant="h6" sx={{
                pt: 2,
                pb: 1,
            }}>Where to?</Typography>

            {
                isSettingWhere.value ? <Box sx={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    maxHeight: '300px',
                }}>
                    {
                        [1, 2, 3, 4].map((item, index) => <ButtonBase key={index} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            gap: 2,
                        }} onClick={handleChangeWhere}>
                            <Radio checked={index === 1} />
                            <Box sx={{
                                flex: 1,
                                py: 1.5,
                            }}>
                                <Typography variant="subtitle2" sx={{
                                    textAlign: 'left',
                                }}>Katya (Georgiou Griva Digeni 132)</Typography>
                                <Typography variant="body2" sx={{
                                    textAlign: 'left',
                                    color: 'text.secondary',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    flex: 1,
                                }}>Call when arrive to come to come pick up </Typography>
                            </Box>
                        </ButtonBase>)
                    }
                    <Button fullWidth variant='outlined' color="primary" startIcon={<Iconify icon="material-symbols:add" />}>Add new address</Button>
                </Box> :
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }} onClick={isSettingWhere.onTrue}>
                        <Box sx={{
                            px: 0.4,
                        }}>
                            <Iconify icon="akar-icons:location" sx={{
                                color: 'text.primary',
                                width: '32px',
                                height: '32px',
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
            }
        </Box>

        <DeliverOrderDetailWhenField1 />
    </Box>
}