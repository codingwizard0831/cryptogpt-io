"use client";

import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { useRouter, useActiveLink } from 'src/routes/hooks';

import { ScrollCustomStyle } from 'src/theme/css';

import Image from 'src/components/image';
import ScrollDown from 'src/components/scroll-down';
// import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';

import TravelInput from 'src/sections/travel/travel-input';
import ChatbotSelector from 'src/sections/chat/message/chatbot-selector';

type Props = {
    children: React.ReactNode;
};

export default function DashboardTravelLayout({ children }: Props) {
    const theme = useTheme();
    const settings = useSettingsContext();
    const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
    const [currentTab, setCurrentTab] = React.useState('overview');
    const router = useRouter();
    const isOverview = useActiveLink(paths.dashboard.travel.root, false);
    const isOrder = useActiveLink(paths.dashboard.travel.order);
    const isBalance = useActiveLink(`${paths.dashboard.travel.root}/balance`);
    const isAirline = useActiveLink(`${paths.dashboard.travel.root}/airline`);
    useEffect(() => {
        if (isOverview) {
            setCurrentTab('overview');
        } else if (isOrder) {
            setCurrentTab('flight');
        } else if (isBalance) {
            setCurrentTab('balance');
        } else if (isAirline) {
            setCurrentTab('airlines');
        }
    }, [isOverview, isOrder, isBalance, isAirline])


    return <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
        height: '100%',
        pb: 2,
    }}>
        <Box
            sx={{
                width: 1,
                height: 1,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.background.default, 0.2),
                // backdropFilter: 'blur(10px)',
                border: `dashed 1px ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'flex-start',
                position: 'relative',
            }}
        >
            <Image src={settings.themeMode === "dark" ? "/assets/background/travel.png" : "/assets/background/travel-light.png"} sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }} />

            {/* <Tabs value={currentTab} sx={{
                width: 1,
                py: 1,
                px: 2,
            }}>
                <Tab value='overview' label="Overview"
                    icon={<Iconify icon="material-symbols:overview-outline" />}
                    onClick={() => router.push(paths.dashboard.travel.root)}
                />
                <Tab value='flight' label="Orders"
                    icon={<Iconify icon="carbon:flight-roster" />}
                    onClick={() => router.push(paths.dashboard.travel.newOrder)}
                />
                <Tab value='balance' label="Balance"
                    icon={<Iconify icon="ic:outline-account-balance-wallet" />}
                />
                <Tab value='airlines' label="Airlines"
                    icon={<Iconify icon="mdi:airplane-settings" />}
                />
            </Tabs> */}
            <Box ref={scrollContainerRef} sx={{
                height: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                ...ScrollCustomStyle(theme, {}),
            }}>
                <Box sx={{
                    position: 'relative',
                    pb: '50px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        pb: 0,
                    }}>
                        <ChatbotSelector />
                    </Box>

                    {children}
                </Box>
            </Box>


            <ScrollDown ref={scrollContainerRef} sx={{
                position: 'absolute',
                bottom: '60px',
                right: '17px',
                zIndex: 1000
            }} />

            <Box sx={{
                position: 'absolute',
                bottom: 0,
                width: "100%",
                zIndex: 20,
                p: 2,
            }}>
                <TravelInput />
            </Box>
        </Box>
    </Container>
}
