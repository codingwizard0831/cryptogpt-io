'use client';

import React, { useCallback } from 'react';

import { Box, Tab, Link, Grid, Tabs, alpha, styled, Button, useTheme, TextField, Typography, IconButton, Breadcrumbs, InputAdornment } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { ScrollCustomStyle } from 'src/theme/css';
import { HEADER } from 'src/layouts/config-layout';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import NavSectionVertical from 'src/components/nav-section/vertical/nav-section-vertical';

import DeliverStoreProductItem from '../deliver-store-product-item';

type Props = {
    id: string;
    country: string;
    address: string;
};

const StyledTabs = styled(Tabs)(({ theme }) => ({
    '& .MuiTabs-indicator': {
        backgroundColor: theme.palette.primary.main,
    },
    '& .MuiTab-root:not(.Mui-selected)': {
        color: theme.palette.text.primary,
    },
}));

export default function DeliverStoreDetailView({ id, country, address }: Props) {
    const upMd = useResponsive('up', 'md');
    const settings = useSettingsContext();
    const isNavHorizontal = settings.themeLayout === 'horizontal';
    const lgUp = useResponsive('up', 'lg');
    const downSm = useResponsive('down', 'sm');
    const [currentTab, setCurrentTab] = React.useState("all");
    const theme = useTheme();

    const handleChangeCurrentTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const calcHeight = React.useMemo(() => {
        const PaddingAndInputSize = 58 + 36 + 10;
        if (isNavHorizontal) {
            if (lgUp) {
                return `calc(100vh - ${HEADER.H_DESKTOP * 2 + 40 + PaddingAndInputSize}px)`;
            }
            return `calc(100vh - ${HEADER.H_MOBILE + 8 + PaddingAndInputSize}px)`;
        }
        if (lgUp) {
            return `calc(100vh - ${HEADER.H_DESKTOP + 8 + PaddingAndInputSize}px)`;
        }
        return `calc(100vh - ${HEADER.H_MOBILE + 8 + PaddingAndInputSize}px)`;

    }, [isNavHorizontal, lgUp]);

    return (
        <Box sx={{
            width: 1,
            height: 1,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
            }}>
                <Breadcrumbs>
                    <Link color="inherit" href="#">
                        Deliver
                    </Link>
                    <Link color="inherit" href='#'>
                        {country}
                    </Link>
                    <Link color="inherit" href='#'>
                        {address}
                    </Link>
                    <Link color="inherit" href='#'>
                        store
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
                position: 'relative',
                zIndex: 1,
            }}>
                <Image src="/assets/images/deliver/restaurant/1.avif" alt="Alaska Airlines"
                    sx={{
                        position: 'absolute',
                        width: 1,
                        height: 1,
                        objectFit: 'cover',
                        zIndex: 1,
                    }}
                />
                <Box sx={{
                    width: 1,
                    height: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1,
                }} />
                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    pt: 6,
                    pb: 1,
                    px: 2,
                    zIndex: 2,
                }}>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>Alaska Airlines</Typography>
                    <Typography variant="subtitle1" sx={{}}>A trip to authentic Indian cuisine!</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'space-between',
                        gap: 1,
                    }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                lineHeight: '100%',
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                                backgroundColor: theme.palette.text.primary,
                                color: theme.palette.background.paper,
                                whiteSpace: 'nowrap',
                            }}>Delivery: €0.00</Typography>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                lineHeight: '100%',
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                                backgroundColor: theme.palette.text.primary,
                                color: theme.palette.background.paper,
                                whiteSpace: 'nowrap',
                            }}>Min. order: €25.00</Typography>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                lineHeight: '100%',
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                                backgroundColor: theme.palette.text.primary,
                                color: theme.palette.background.paper,
                                whiteSpace: 'nowrap',
                            }}>Delivery in 35-45 min</Typography>
                        </Box>
                        <IconButton sx={{
                            backdropFilter: 'blur(10px)',
                        }}>
                            <Iconify icon="material-symbols:favorite-outline" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: upMd ? 'center' : 'start',
                flexDirection: upMd ? 'row' : 'column',
                flexWrap: upMd ? 'nowrap' : 'wrap',
                justifyContent: 'space-between',
                borderBottom: `1px solid ${theme.palette.divider}`,
                gap: 2,
                p: 2,
                mb: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: upMd ? 'nowrap' : 'wrap',
                    gap: 2,
                }}>
                    <Typography variant="body1" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}>
                        <Iconify icon="mingcute:time-line" /> Open until 11:00 PM
                    </Typography>
                    <Typography variant="body1" sx={{
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}>Not rated yet</Typography>
                    <Typography variant="body1" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}>
                        <Iconify icon="tabler:truck-delivery" /> Limited delivery tracking
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}>
                        <Iconify icon="material-symbols:info" /> See more information
                    </Typography>
                </Box>

                <Link>
                    <Typography variant="body1" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                    }}>
                        <Iconify icon="mdi:user-multiple-add-outline" /> Order together
                    </Typography>
                </Link>
            </Box>

            <Box sx={{
                mb: 4,
                mx: 2
            }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Discounts</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                        <Button sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 1,
                            overflow: 'hidden',
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            transition: 'all 0.3s',
                            boxShadow: 3,
                            py: 1,
                            pl: 2,
                            pr: 1,
                            gap: 1,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                transform: 'scale(1.02)',
                            }
                        }}>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                width: '100%',
                                lineHeight: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'left',
                                color: theme.palette.text.primary,
                            }}>-5€ on your 1st order. Minimum order value 10€.</Typography>
                            <Iconify icon="iconamoon:discount" sx={{
                                color: theme.palette.primary.main,
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                width: '36px',
                                height: '36px',
                                p: 0.5,
                                borderRadius: '50%',
                                transform: 'scale(2)',
                                position: 'relative',
                            }} />
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{
                mb: 4,
                mx: 2,
                display: 'flex',
                flexDirection: downSm ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'start',
                gap: 2,
            }}>
                <Box sx={{
                    width: '100%',
                    position: 'sticky',
                    height: downSm ? 'auto' : calcHeight,
                    top: '16px',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 2,
                }}>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Search..."
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Iconify icon="ic:outline-search" sx={{
                                        color: 'text.primary',
                                    }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            boxShadow: 1,
                            backdropFilter: 'blur(10px)',
                        }}
                    />

                    {
                        downSm ? <Box
                            sx={{
                                flexGrow: 1,
                                width: '100%',
                                backdropFilter: 'blur(10px)',
                                backgroundColor: alpha(theme.palette.background.default, 0.2),
                                border: `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                                borderRadius: 1,
                                overflow: 'hidden',
                                boxShadow: 1,
                            }}
                        >
                            <StyledTabs
                                value={currentTab}
                                onChange={handleChangeCurrentTab}
                                indicatorColor="primary"
                                textColor="primary"
                                sx={{
                                }}
                            >
                                {
                                    tabsDummyData.map((item, index) => (
                                        <Tab
                                            key={`deliver-store-detail-tab-${index}`}
                                            label={item}
                                            value={item}
                                            sx={{
                                                color: 'red',
                                            }}
                                        />
                                    ))
                                }
                            </StyledTabs>
                        </Box>
                            :
                            <Box sx={{
                                overflowX: 'hidden',
                                overflowY: 'auto',
                                flex: 1,
                                borderRadius: 2,
                                backgroundColor: 'transparent',
                                backdropFilter: 'blur(10px)',
                                boxShadow: 3,
                                ...ScrollCustomStyle(theme, {}),
                            }}>
                                <NavSectionVertical
                                    data={NAV_ITEMS}
                                    slotProps={{
                                        gap: config.gap,
                                        currentRole: config.currentRole,
                                        rootItem: {
                                            padding: config.padding,
                                            minHeight: config.rootItemHeight,
                                            borderRadius: `${config.radius}px`,
                                            '& .icon, .sub-icon': {
                                                width: config.icon,
                                                height: config.icon,
                                                ...(!config.icon && { display: 'none' }),
                                            },
                                            ...(config.hiddenLabel && {
                                                '& .label, .caption': {
                                                    display: 'none',
                                                },
                                            }),
                                        },
                                        subItem: {
                                            padding: config.padding,
                                            minHeight: config.subItemHeight,
                                            borderRadius: `${config.radius}px`,
                                            '& .icon, .sub-icon': {
                                                width: config.icon,
                                                height: config.icon,
                                                ...(!config.icon && { display: 'none' }),
                                            },
                                            ...(config.hiddenLabel && {
                                                '& .label, .caption': {
                                                    display: 'none',
                                                },
                                            }),
                                        },
                                        subheader: {
                                            ...(config.hiddenSubheader && {
                                                display: 'none',
                                            }),
                                        },
                                    }}
                                />
                            </Box>
                    }

                </Box>
                <Box>
                    <Typography variant="h4" sx={{ ml: 2 }}>All items</Typography>
                    <Grid container spacing={2}>
                        {
                            Array.from({ length: 20 }).map((_, index) => (
                                <Grid key={`deliver-store-product-item-${index}`} item xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <DeliverStoreProductItem />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

const NAV_ITEMS = [
    {
        subheader: 'Travel',
        items: [
            {
                title: 'About',
                path: '#',
                icon: <Iconify icon="carbon:airport-01" width={1} />,
            },
            {
                title: 'Contact',
                path: '#',
                icon: <Iconify icon="carbon:battery-full" width={1} />,
            },
            {
                title: 'Contact',
                path: '#',
                icon: <Iconify icon="carbon:battery-full" width={1} />,
            },
            {
                title: 'Contact',
                path: '#',
                icon: <Iconify icon="carbon:battery-full" width={1} />,
            },
            {
                title: 'Contact',
                path: '#',
                icon: <Iconify icon="carbon:battery-full" width={1} />,
            },
            {
                title: 'Contact',
                path: '#',
                icon: <Iconify icon="carbon:battery-full" width={1} />,
            },
            {
                title: 'Contact',
                path: '#',
                icon: <Iconify icon="carbon:battery-full" width={1} />,
            },
            {
                title: 'Contact',
                path: '#',
                icon: <Iconify icon="carbon:battery-full" width={1} />,
            },
            {
                title: 'Contact',
                path: '#',
                icon: <Iconify icon="carbon:battery-full" width={1} />,
            },
            {
                title: 'Contact',
                path: '#',
                icon: <Iconify icon="carbon:battery-full" width={1} />,
            },
        ],
    },
    {
        subheader: 'Marketing',
        items: [
            {
                title: 'Landing',
                path: '#',
                icon: <Iconify icon="carbon:bat" width={1} />,
                roles: ['admin'],
                caption: 'Display only admin role',
            },
            {
                title: 'Services',
                path: '#',
                icon: <Iconify icon="carbon:cyclist" width={1} />,
                roles: ['admin', 'user'],
            },
            {
                title: 'Case Studies',
                path: '#',
                icon: <Iconify icon="carbon:3d-cursor-alt" width={1} />,
                children: [
                    { title: 'Case Studies', path: '#' },
                    { title: 'Case Study', path: '#' },
                ],
            },
            {
                title: 'Blog',
                path: '#',
                icon: <Iconify icon="carbon:3d-mpr-toggle" width={1} />,
                children: [
                    { title: 'Blog Posts', path: '#' },
                    { title: 'Blog Post', path: '#' },
                ],
            },
        ],
    },
];

const config = {
    gap: 4,
    icon: 24,
    currentRole: 'admin',
    rootItemHeight: 44,
    subItemHeight: 36,
    padding: '4px 8px 4px 12px',
    radius: 8,
    hiddenLabel: false,
    hiddenSubheader: false,
};

const tabsDummyData = [
    "all",
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test19",
    "test29",
    "test39",
    "test49",
    "test59",
    "test69",
    "test79",
    "test89",
    "test99",
];