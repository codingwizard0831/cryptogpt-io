"use client";

import React from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { ScrollCustomStyle } from 'src/theme/css';

import ScrollDown from 'src/components/scroll-down';
// import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';

import TravelInput from 'src/sections/travel/travel-input';
import DeliverOrdersBar from 'src/sections/deliver/deliver-orders-bar';
import DeliverSearchBar from 'src/sections/deliver/deliver-search-bar';
import ChatbotSelector from 'src/sections/chat/message/chatbot-selector';
import DeliverLocationBar from 'src/sections/deliver/deliver-location-bar';
import DeliverYourOrderBar from 'src/sections/deliver/deliver-your-order-bar';

type Props = {
    children: React.ReactNode;
};

export default function DashboardTravelLayout({ children }: Props) {
    const theme = useTheme();
    const settings = useSettingsContext();
    const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);


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
                        justifyContent: 'flex-start',
                        gap: 2,
                        p: 2,
                        pb: 0,
                        mb: 2,
                    }}>
                        <ChatbotSelector />
                        <DeliverLocationBar />
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                        }}>
                            <DeliverSearchBar />
                        </Box>

                        <DeliverOrdersBar />
                        <DeliverYourOrderBar id="id" />
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
