



import axios from 'axios';
import { useState, useEffect } from 'react';

import { Box, alpha, Stack, Button, Dialog, Typography, ButtonBase } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function AccountSubaccounts() {
    const { enqueueSnackbar } = useSnackbar();
    const [currentAccount, setCurrentAccount] = useState('binance');
    const autoOptionAddDialog = useBoolean(false);
    const [accountTypeTab, setAccountTypeTab] = useState('exchange');
    const [authAccounts, setAuthAccounts] = useState([
        "binance",
        "mexc",
        "slack",
        "github",
    ]);
    const [exchangeSelectedAccount, setExchangeSelectedAccount] = useState('');
    const [platformSelectedAccount, setPlatformSelectedAccount] = useState('');

    useEffect(() => {
        // axios.get("https://api.binance.com/api/v3/uiKlines?symbol=BNBUSDT&interval=3m", {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // }).then((response) => {
        //     console.log(response.data);
        // }).catch((error) => {
        //     console.log(error);
        // });

        const timestamp = Date.now();
        const signature = "1e4b14ed1cfff5b9630793865e786b8e00f3084f46e2afaa484f7e5faa1c0f9c";
        axios.get(`https://api.binance.com/api/v3/allOrders?symbol=BNBUSDT&timestamp=${timestamp}&signature=${signature}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': '9HtTAEM6TFHUCkgbkviT5WZwCxlJtgs94NZyYH1lRdABmSN1I0SogiQz06MeQ0RF',
            },
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    })

    return (
        <Box>
            <Box sx={{
                position: 'relative',
                width: '100%',
                overflowY: 'hidden',
                overflowX: 'auto',
                height: '130px',
                mb: 2,
            }}>
                <Box sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                }}>
                    {
                        subaccountsData.map((_subaccount) => {
                            if (authAccounts.indexOf(_subaccount.key) === -1) return null;
                            return <Box key={`jouryney-${_subaccount.key}`} sx={{
                                borderRadius: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                gap: 1,
                                border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                                width: '164px',
                                p: 1.5,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                backdropFilter: 'blur(10px)',
                                position: 'relative',
                                ":hover": {
                                    backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.05),
                                    border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                    color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                    '& span': {
                                        backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.4),
                                    },
                                    '& svg': {
                                        color: (theme: any) => alpha(theme.palette.primary.main, 0.4),
                                    },
                                    '& h6': {
                                        color: (theme: any) => alpha(theme.palette.primary.main, 0.8),
                                    },
                                    '& p': {
                                        color: (theme: any) => alpha(theme.palette.primary.main, 0.8),
                                    },
                                    "& .remove-btn": {
                                        opacity: 1,
                                        color: 'primary.main',
                                    },
                                },
                                ...(_subaccount.key === currentAccount && {
                                    backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.08),
                                    border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                    color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.8)}`,
                                    "& .remove-btn": {
                                        opacity: 1,
                                    },
                                }),
                            }}
                                onClick={() => {
                                    setCurrentAccount(_subaccount.key);
                                }}
                            >
                                <Box component="span" sx={{
                                    position: 'absolute',
                                    left: '6px',
                                    top: '6px',
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '50%',
                                    transition: 'all 0.3s',
                                    backgroundColor: 'transparent',
                                    ...(_subaccount.key === currentAccount && {
                                        backgroundColor: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                    }),
                                }} />
                                <Iconify icon={_subaccount.icon} sx={{
                                    width: '36px',
                                    height: '36px',
                                    transition: 'all 0.3s',
                                    color: (theme: any) => alpha(theme.palette.text.primary, 0.5),
                                    ...(_subaccount.key === currentAccount && {
                                        color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                    }),
                                }} />
                                <Typography variant='subtitle2' sx={{
                                    transition: 'all 0.3s',
                                    fontWeight: 'bold',
                                    ...(_subaccount.key === currentAccount && {
                                        color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                    }),
                                }}>{_subaccount.label}</Typography>
                                <Typography variant='body2' sx={{
                                    transition: 'all 0.3s',
                                    fontSize: '12px',
                                    ...(_subaccount.key === currentAccount && {
                                        color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                    }),
                                }}>{_subaccount.link}</Typography>

                                <Iconify icon="ep:select" className="remove-btn" sx={{
                                    position: 'absolute',
                                    right: '6px',
                                    top: '6px',
                                    transition: 'all 0.3s',
                                    color: 'primary.main',
                                    opacity: 0,
                                }} />
                            </Box>
                        }
                        )
                    }
                    <Box sx={{
                        borderRadius: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        gap: 1,
                        backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.08),
                        border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                        color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.8)}`,
                        width: '164px',
                        p: 1.5,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                    }} onClick={() => autoOptionAddDialog.onTrue()}>
                        <Iconify icon="carbon:add" sx={{
                            width: '36px',
                            height: '36px',
                            color: "primary.main",
                        }} />
                        <Typography variant='subtitle2' sx={{
                            transition: 'all 0.3s',
                            fontWeight: 'bold',
                            color: "primary.main",

                        }}>Add</Typography>
                        <Typography variant='body2' sx={{
                            transition: 'all 0.3s',
                            fontSize: '12px',
                            color: "primary.main",
                        }}>New Subaccount</Typography>
                    </Box>
                </Box>
            </Box>

            {
                currentAccount === 'binance' &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    flexWrap: 'wrap',
                    mb: 2,
                }}>
                    {
                        Array.from({ length: 5 }).map((_, index) => <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 1,
                            border: (theme: any) => `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
                            width: '100%',
                            maxWidth: '320px',
                            px: 2,
                            py: 1,
                            transition: 'border-color 0.25s',
                            cursor: 'pointer',
                            "&:hover": {
                                border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                            },
                        }}>
                            <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>Binance BTC 1</Typography>

                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                                <Typography variant='body2' sx={{ flex: 1 }}>SECREAT KEY:</Typography>
                                <Typography variant='body2'>**********</Typography>
                                <Button color="primary" size="small">Edit</Button>
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                                <Typography variant='body2' sx={{ flex: 1 }}>SECREAT KEY:</Typography>
                                <Typography variant='body2'>**********</Typography>
                                <Button color="primary" size="small">Edit</Button>
                            </Stack>
                        </Box>
                        )
                    }
                </Box>
            }

            {
                currentAccount !== 'binance' &&
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                    <Stack direction='column' sx={{ width: '100%' }}>
                        <Typography variant='subtitle2' sx={{ mb: 1 }}>Configuration</Typography>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                            <Typography variant='body2' sx={{ flex: 1 }}>API KEY:</Typography>
                            <Typography variant='body2'>**********</Typography>
                            <Button color="primary" size="small">Edit</Button>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                            <Typography variant='body2' sx={{ flex: 1 }}>SECREAT KEY:</Typography>
                            <Typography variant='body2'>**********</Typography>
                            <Button color="primary" size="small">Edit</Button>
                        </Stack>
                    </Stack>

                    <Stack direction='column' sx={{ width: '100%' }} spacing={0.5}>
                        <Typography variant='subtitle2' sx={{ mb: 1 }}>History</Typography>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{}}>
                            <Typography variant='body2'>12-12-12: </Typography>
                            <Typography variant='body2' color="success">Login successfully</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{}}>
                            <Typography variant='body2'>12-12-12: </Typography>
                            <Typography variant='body2' color="success">Login successfully</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            }

            <Dialog
                open={autoOptionAddDialog.value}
                onClose={() => autoOptionAddDialog.onFalse()}
                fullWidth
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        mt: 15,
                        overflow: 'unset',
                    },
                }}
            >
                <Box sx={{
                    p: 2,
                }}>
                    <Typography variant='h6'>Tell us more about you</Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>What tools do you currently use in your design business?</Typography>

                    <Box sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        borderBottom: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                        pl: 1,
                    }}>
                        <ButtonBase sx={{
                            px: 2,
                            py: 0.5,
                            gap: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '-1px',
                            borderRadius: '4px 4px 0px 0px',
                            borderStyle: 'solid',
                            borderWidth: '1px 1px 0px 1px',
                            borderColor: 'transparent',
                            transition: 'all 0.3s',

                            ...accountTypeTab === 'exchange' && {
                                backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.2),
                                color: 'text.primary',
                                borderColor: (theme: any) => alpha(theme.palette.primary.main, 0.2),
                            },
                        }} onClick={() => setAccountTypeTab('exchange')}>
                            <Iconify icon="ri:exchange-line" />
                            <Typography variant='subtitle2'>Exchange</Typography>
                        </ButtonBase>
                        <ButtonBase sx={{
                            px: 2,
                            py: 0.5,
                            gap: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '-1px',
                            borderRadius: '4px 4px 0px 0px',
                            borderStyle: 'solid',
                            borderWidth: '1px 1px 0px 1px',
                            borderColor: 'transparent',
                            transition: 'all 0.3s',

                            ...accountTypeTab === 'platform' && {
                                backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.2),
                                color: 'text.primary',
                                borderColor: (theme: any) => alpha(theme.palette.primary.main, 0.2),
                            },
                        }} onClick={() => setAccountTypeTab('platform')}>
                            <Iconify icon="carbon:platforms" />
                            <Typography variant='subtitle2'>Platform</Typography>
                        </ButtonBase>
                    </Box>

                    {
                        accountTypeTab === 'exchange' ?
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                gap: 2,
                                mt: 2,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                maxHeight: '300px',
                            }}>
                                {
                                    exchangesData.map((_subaccount) => <Box key={`jouryney-${_subaccount.key}`} sx={{
                                        borderRadius: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        gap: 1,
                                        border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                                        width: '190px',
                                        p: 1.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        backdropFilter: 'blur(10px)',
                                        position: 'relative',
                                        ":hover": {
                                            backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.05),
                                            border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                            color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                            '& span': {
                                                backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.4),
                                            },
                                            '& svg': {
                                                color: (theme: any) => alpha(theme.palette.primary.main, 0.4),
                                            },
                                            '& h6': {
                                                color: (theme: any) => alpha(theme.palette.primary.main, 0.8),
                                            },
                                            '& p': {
                                                color: (theme: any) => alpha(theme.palette.primary.main, 0.8),
                                            },
                                            "& .remove-btn": {
                                                opacity: 1,
                                                color: 'primary.main',
                                            },
                                        },
                                        ...((_subaccount.key === exchangeSelectedAccount || authAccounts.indexOf(_subaccount.key) !== -1) && {
                                            backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.08),
                                            border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                            color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.8)}`,
                                            "& .remove-btn": {
                                                opacity: 1,
                                            },
                                        }),
                                    }}
                                        onClick={() => {
                                            setExchangeSelectedAccount(_subaccount.key);
                                        }}
                                    >
                                        <Box component="span" sx={{
                                            position: 'absolute',
                                            left: '6px',
                                            top: '6px',
                                            width: '14px',
                                            height: '14px',
                                            borderRadius: '50%',
                                            transition: 'all 0.3s',
                                            backgroundColor: 'transparent',
                                            ...(_subaccount.key === exchangeSelectedAccount && {
                                                backgroundColor: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                            }),
                                        }} />
                                        <Iconify icon={_subaccount.icon} sx={{
                                            width: '36px',
                                            height: '36px',
                                            transition: 'all 0.3s',
                                            color: (theme: any) => alpha(theme.palette.text.primary, 0.5),
                                            ...(_subaccount.key === exchangeSelectedAccount && {
                                                color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                            }),
                                        }} />
                                        <Typography variant='subtitle2' sx={{
                                            transition: 'all 0.3s',
                                            fontWeight: 'bold',
                                            ...(_subaccount.key === exchangeSelectedAccount && {
                                                color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                            }),
                                        }}>{_subaccount.label}</Typography>
                                        <Typography variant='body2' sx={{
                                            transition: 'all 0.3s',
                                            fontSize: '12px',
                                            ...(_subaccount.key === exchangeSelectedAccount && {
                                                color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                            }),
                                        }}>{_subaccount.link}</Typography>

                                        <Iconify icon="ep:select" className="remove-btn" sx={{
                                            position: 'absolute',
                                            right: '6px',
                                            top: '6px',
                                            transition: 'all 0.3s',
                                            color: 'primary.main',
                                            opacity: 0,
                                        }} />
                                    </Box>
                                    )
                                }
                            </Box>
                            :
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                gap: 2,
                                mt: 2,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                maxHeight: '300px',
                            }}>
                                {
                                    platformsData.map((_subaccount) => <Box key={`jouryney-${_subaccount.key}`} sx={{
                                        borderRadius: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        gap: 1,
                                        border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                                        width: '190px',
                                        p: 1.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        backdropFilter: 'blur(10px)',
                                        position: 'relative',
                                        ":hover": {
                                            backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.05),
                                            border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                            color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                            '& span': {
                                                backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.4),
                                            },
                                            '& svg': {
                                                color: (theme: any) => alpha(theme.palette.primary.main, 0.4),
                                            },
                                            '& h6': {
                                                color: (theme: any) => alpha(theme.palette.primary.main, 0.8),
                                            },
                                            '& p': {
                                                color: (theme: any) => alpha(theme.palette.primary.main, 0.8),
                                            },
                                            "& .remove-btn": {
                                                opacity: 1,
                                                color: 'primary.main',
                                            },
                                        },
                                        ...((_subaccount.key === platformSelectedAccount || authAccounts.indexOf(_subaccount.key) !== -1) && {
                                            backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.08),
                                            border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                                            color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.8)}`,
                                            "& .remove-btn": {
                                                opacity: 1,
                                            },
                                        }),
                                    }}
                                        onClick={() => {
                                            setPlatformSelectedAccount(_subaccount.key);
                                        }}
                                    >
                                        <Box component="span" sx={{
                                            position: 'absolute',
                                            left: '6px',
                                            top: '6px',
                                            width: '14px',
                                            height: '14px',
                                            borderRadius: '50%',
                                            transition: 'all 0.3s',
                                            backgroundColor: 'transparent',
                                            ...(_subaccount.key === platformSelectedAccount && {
                                                backgroundColor: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                            }),
                                        }} />
                                        <Iconify icon={_subaccount.icon} sx={{
                                            width: '36px',
                                            height: '36px',
                                            transition: 'all 0.3s',
                                            color: (theme: any) => alpha(theme.palette.text.primary, 0.5),
                                            ...(_subaccount.key === platformSelectedAccount && {
                                                color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                            }),
                                        }} />
                                        <Typography variant='subtitle2' sx={{
                                            transition: 'all 0.3s',
                                            fontWeight: 'bold',
                                            ...(_subaccount.key === platformSelectedAccount && {
                                                color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                            }),
                                        }}>{_subaccount.label}</Typography>
                                        <Typography variant='body2' sx={{
                                            transition: 'all 0.3s',
                                            fontSize: '12px',
                                            ...(_subaccount.key === platformSelectedAccount && {
                                                color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                                            }),
                                        }}>{_subaccount.link}</Typography>

                                        <Iconify icon="ep:select" className="remove-btn" sx={{
                                            position: 'absolute',
                                            right: '6px',
                                            top: '6px',
                                            transition: 'all 0.3s',
                                            color: 'primary.main',
                                            opacity: 0,
                                        }} />
                                    </Box>
                                    )
                                }
                            </Box>
                    }

                    <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => autoOptionAddDialog.onFalse()}>Add</Button>
                        <Button variant="outlined" color="primary" onClick={() => autoOptionAddDialog.onFalse()}>Cancel</Button>
                    </Stack>
                </Box>
            </Dialog>
        </Box>
    );
}

const subaccountsData = [
    {
        key: 'apple',
        icon: 'material-symbols:public',
        label: 'Apple',
        link: 'apple.com',
    },
    {
        key: 'binance',
        icon: 'fluent:inprivate-account-28-regular',
        label: 'Binance',
        link: 'binance.com',
    },
    {
        key: 'mexc',
        icon: 'carbon:friendship',
        label: 'Mexc',
        link: 'mexc.com',
    },
    {
        key: 'slack',
        icon: 'carbon:friendship',
        label: 'Slack',
        link: 'slack.com',
    },
    {
        key: 'github',
        icon: 'carbon:friendship',
        label: 'Github',
        link: 'github.com',
    },
    {
        key: 'okx',
        icon: 'carbon:friendship',
        label: 'Okx',
        link: 'okx.com',
    },
    {
        key: 'gitlab',
        icon: 'carbon:friendship',
        label: 'Gitlab',
        link: 'gitlab.com',
    },
    {
        key: 'telegram',
        icon: 'carbon:friendship',
        label: 'Telegram',
        link: 'telegram.com',
    },
];

const exchangesData = [
    {
        key: 'binance',
        icon: 'fluent:inprivate-account-28-regular',
        label: 'Binance',
        link: 'binance.com',
    },
    {
        key: 'mexc',
        icon: 'carbon:friendship',
        label: 'Mexc',
        link: 'mexc.com',
    },
    {
        key: 'okx',
        icon: 'carbon:friendship',
        label: 'Okx',
        link: 'okx.com',
    },
];

const platformsData = [
    {
        key: 'slack',
        icon: 'carbon:friendship',
        label: 'Slack',
        link: 'slack.com',
    },
    {
        key: 'github',
        icon: 'carbon:friendship',
        label: 'Github',
        link: 'github.com',
    },
    {
        key: 'gitlab',
        icon: 'carbon:friendship',
        label: 'Gitlab',
        link: 'gitlab.com',
    },
    {
        key: 'telegram',
        icon: 'carbon:friendship',
        label: 'Telegram',
        link: 'telegram.com',
    },
];