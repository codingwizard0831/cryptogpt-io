// import Lenis from '@studio-freight/lenis'
import React, { useRef, useEffect } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';

import { Box, BoxProps, useTheme } from '@mui/material';

import { ScrollCustomStyle } from 'src/theme/css';

import SolarCenterPanelCard from './solar-center-panel-card';



type SolarCenterPanelProps = {
    leftPanel?: boolean;
    rightPanel?: boolean;
} & BoxProps;

const SolarCenterPanel: React.FC<SolarCenterPanelProps> = ({ sx, leftPanel = true, rightPanel = true, ...other }: SolarCenterPanelProps) => {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollYProgress = useMotionValue(0);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                scrollYProgress.set(scrollTop / (scrollHeight - clientHeight));
            }
        };

        const container = containerRef.current;
        if (container) container.addEventListener('scroll', updateScale);

        return () => {
            if (container) container.removeEventListener('scroll', updateScale);
        }
    }, [scrollYProgress]);

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <Box sx={{
            height: 'calc(100% - 58px - 5px)',
            overflowX: 'hidden',
            overflowY: 'auto',
            width: `calc(100% - 10px - ${!leftPanel ? '305px' : '5px'} - ${!rightPanel ? '305px' : '5px'})`,
            position: 'absolute',
            left: `calc(5px + ${!leftPanel ? '305px' : '0px'})`,
            bottom: '58px',
            transition: 'all 0.5s',
            px: 1,
            ...(ScrollCustomStyle(theme, {})),
            ...sx,
        }} {...other}
            ref={containerRef}
        >
            {/* {
                projects.map((project, i) => {
                    const targetScale = 1 - ((projects.length - i) * 0.05);
                    return <SolarCenterPanelCard
                        key={`p_${i}`}
                        i={i}
                        {...project}
                        progress={scaleX}
                        range={[i * .33, 1]}
                        targetScale={targetScale}
                    />
                })
            } */}
            <SolarCenterPanelCard i={0} progress={scaleX} range={[0 * .33, 1]} targetScale={1 - ((3 - 0) * 0.05)}>
                <Box sx={{ width: '100%', height: '100%', background: 'red' }} />
            </SolarCenterPanelCard>
            <SolarCenterPanelCard i={1} progress={scaleX} range={[1 * .33, 1]} targetScale={1 - ((3 - 1) * 0.05)}>
                <Box sx={{ width: '100%', height: '100%', background: 'blue' }} />
            </SolarCenterPanelCard>
            <SolarCenterPanelCard i={2} progress={scaleX} range={[2 * .33, 1]} targetScale={1 - ((3 - 2) * 0.05)}>
                <Box sx={{ width: '100%', height: '100%', background: 'green' }} />
            </SolarCenterPanelCard>
        </Box>
    );
}

export default SolarCenterPanel;


const projects = [
    {
        title: "First Screen",
        src: "cactus.webp",
        color: "#BBACAF"
    },
    {
        title: "Second Screen",
        src: "tree.webp",
        color: "#977F6D"
    },
    {
        title: "Third Screen",
        src: "water.webp",
        color: "#C2491D"
    },
]