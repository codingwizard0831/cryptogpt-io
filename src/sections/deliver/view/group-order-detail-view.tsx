'use client';

import React, { useCallback } from 'react';

import { Box, Link, alpha, Avatar, Button, Tooltip, useTheme, Container, TextField, Typography, IconButton, Breadcrumbs, InputAdornment } from '@mui/material';

import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';



type Props = {
    id: string;
};

export default function DeliverGroupOrderDetailView({ id }: Props) {
    const settings = useSettingsContext();
    const theme = useTheme();
    const { copy } = useCopyToClipboard();

    const onCopy = useCallback(
        (text: string) => {
            if (text) {
                copy(text);
            }
        },
        [copy]
    );

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>

                <Box sx={{
                    mb: 4,
                }}>
                    <Breadcrumbs>
                        <Link color="inherit" href="#">
                            Deliver
                        </Link>
                        <Link color="inherit" href="#">
                            Order
                        </Link>
                        <Link color="inherit" href="#">
                            Group
                        </Link>
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'text.primary',
                            }}
                        >
                            {id}
                        </Typography>
                    </Breadcrumbs>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    gap: 2,
                    pb: 2,
                    mb: 2,
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
                                backgroundColor: alpha(theme.palette.grey[900], 0.8),
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
                            <Typography variant="h6" sx={{
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
                    mb: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2,
                    }}>
                        <Typography variant="h6">Participants</Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                        }}>
                            <Typography color="primary" sx={{
                                textDecoration: 'underline',
                            }}>Not ready: 2</Typography>
                            <Typography>Ready: 0</Typography>
                        </Box>
                    </Box>

                    {
                        dummyPaticipantsData.map((participant, index) => <Box key={`paticipant-${index}`} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2,
                            p: 2,
                            backgroundColor: alpha(theme.palette.divider, 0.05),
                            borderRadius: 1,
                            transition: 'background-color 0.2s',
                            backdropFilter: 'blur(10px)',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            },
                        }}>
                            <Box sx={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                position: 'relative',
                            }}>
                                <Avatar alt={getInitials(participant.name)} sx={{
                                    width: '48px',
                                    height: '48px',
                                    fontSize: '12px',
                                }}>
                                    {getInitials(participant.name)}
                                </Avatar>
                                {
                                    participant.isReady ? <Iconify icon="mdi:check-circle" sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: alpha(theme.palette.background.default, 0.8),
                                        // backgroundColor: alpha(theme.palette.success.main, 0.8),
                                        // color: theme.palette.success.contrastText,
                                        width: '20px',
                                        height: '20px',
                                        p: '3px',
                                        borderRadius: '50%',
                                    }} /> : <Iconify icon="mdi:clock" sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: alpha(theme.palette.background.default, 0.8),
                                        width: '20px',
                                        height: '20px',
                                        p: '3px',
                                        borderRadius: '50%',
                                    }} />
                                }
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                flex: 1,
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                    <Typography variant="subtitle1" sx={{
                                        fontWeight: 'bold',
                                    }}>{participant.name}</Typography>
                                    {
                                        participant.isHost && <Label color="primary">HOST</Label>
                                    }
                                    {
                                        participant.isYou && <Label>YOU</Label>
                                    }
                                </Box>
                                <Typography variant="body2" sx={{
                                    color: 'text.secondary',
                                }}>{participant.status} {participant.items} items</Typography>
                            </Box>

                            <IconButton sx={{
                                backgroundColor: alpha(theme.palette.error.main, 0.2),
                            }}>
                                <Iconify icon="ion:trash-outline" sx={{
                                    color: 'error.main',
                                }} />
                            </IconButton>
                        </Box>)
                    }
                </Box>

                <TextField
                    fullWidth
                    value="https://wolt.com/en/invite/123456"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip title="Copy">
                                    <IconButton onClick={() => onCopy('https://wolt.com/en/invite/123456')}>
                                        <Iconify icon="eva:copy-fill" width={24} />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        mb: 4,
                    }}
                />

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    gap: 2,
                }}>
                    <Button startIcon={<Iconify icon="radix-icons:lock-closed" />} >Lock order together</Button>
                    <Button startIcon={<Iconify icon="ion:trash-outline" />} color="error">Cancel this order</Button>
                </Box>
            </Box>
        </Container>
    );
}

const dummyPaticipantsData = [
    {
        name: 'coding wizard',
        status: 'Choosing items',
        items: 0,
        isHost: true,
        isYou: false,
        isReady: true,
        canDelete: false,
    }, {
        name: 'Nicolas Papadopoulos',
        status: 'Editing order',
        items: 1,
        isHost: false,
        isYou: true,
        isReady: false,
        canDelete: true,
    }, {
        name: 'coding wizard',
        status: 'Choosing items',
        items: 0,
        isHost: false,
        isYou: false,
        isReady: false,
        canDelete: false,
    },
]

function getInitials(fullName: string): string {
    const parts = fullName.split(' ');
    const initials = parts.reduce((acc, part) => acc + part[0], '');
    return initials.toUpperCase(); // Optionally, convert to uppercase
}