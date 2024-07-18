



import { useState } from 'react';

import { Box, alpha, Stack, Button, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function AccountSubaccounts() {
    const { enqueueSnackbar } = useSnackbar();
    const [currentAccount, setCurrentAccount] = useState('binance');

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
                        subaccountsData.map((_subaccount) => <Box key={`jouryney-${_subaccount.key}`} sx={{
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

                            <Iconify icon="dashicons:remove" className="remove-btn" sx={{
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
                    }}>
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