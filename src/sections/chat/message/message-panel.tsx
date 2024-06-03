import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';

import { Box, useTheme } from '@mui/material';

import { Lamp } from 'src/components/lamp';
import Scrollbar from 'src/components/scrollbar';
import ScrollDown from 'src/components/scroll-down/scroll-down';
import ScrollProgress from 'src/components/scroll-progress/scroll-progress';

import Message from './message';


const MessagePanel: React.FC = () => {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainer = useScroll({ container: containerRef });

    return <Box sx={{
        height: "calc(100% - 52px)",
        position: 'relative'
    }}>
        <ScrollProgress
            scrollYProgress={scrollContainer.scrollYProgress}
            color="primary"
            sx={{
                // position: 'relative',
                position: 'unset',
                // left: 0,
                // top: '200px',
                width: 'calc(100vh - 210px)',
                height: 2,
                rotate: '90deg',
                opacity: 0.8,
            }}
        />

        <Box sx={{
            height: "100%",
            overflowX: 'hidden',
            overflowY: "auto",
            paddingBottom: "50px",
            position: 'relative',
            ml: 1,
        }}>
            <Scrollbar ref={containerRef}>
                {
                    theme.palette.mode === 'dark' ?
                        <Lamp className='absolute top-[calc(157px_-_50vh)]'>
                            <br />
                        </Lamp> : ""
                }
                <Message isBot />
                <Message />
                <Message isBot />
                <Message />
            </Scrollbar>

            <ScrollDown ref={containerRef} sx={{
                position: 'absolute',
                bottom: 50,
                right: 'calc(50% - 20px)',
                zIndex: 1000
            }} />
        </Box>

    </Box>
}

export default MessagePanel;