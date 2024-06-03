import React, { useRef, useMemo, useEffect } from 'react';
import { m, useSpring, MotionValue, useTransform, useMotionValue } from 'framer-motion';

import { Box, alpha, BoxProps, useTheme } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from 'src/layouts/config-layout';

import { useSettingsContext } from 'src/components/settings';

type SolarCenterPanelCardProps = {
    i?: number;
    progress: MotionValue<number>;
    range: number[];
    targetScale: number;
    children?: React.ReactNode;
} & BoxProps;

const SolarCenterPanelCard: React.FC<SolarCenterPanelCardProps> = ({ i = 0, progress, range, targetScale, children, sx, ...other }: SolarCenterPanelCardProps) => {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollYProgress = useMotionValue(0);

    const settings = useSettingsContext();
    const lgUp = useResponsive('up', 'lg');
    const isNavHorizontal = settings.themeLayout === 'horizontal';

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                const newProgress = scrollTop / (scrollHeight - clientHeight);
                scrollYProgress.set(newProgress);
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

    const scale = useTransform(progress, range, [1, targetScale]);
    const imageScale = useTransform(scaleX, [0, 1], [2, 1]);

    const calcHeight = useMemo(() => {
        const PaddingAndInputSize = 58 + 10 * 2 + 5;
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
            width: "100%",
            position: 'sticky',
            top: 0,
            ...sx,
        }} {...other}
            ref={containerRef}
        >
            <m.div
                style={{
                    scale,
                    position: 'relative',
                    top: `calc(${i * 25}px)`,
                    height: calcHeight,
                }}
            >
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    padding: '10px',
                    backgroundColor: alpha(theme.palette.background.default, 0.1),
                    boxShadow: '0 0 10px 0 #ffffff55',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '10px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        mb: '3px',
                    }}>
                        <Box component='span' sx={{ width: '12px', height: '12px', borderRadius: '10px', backgroundColor: theme.palette.error.main, mr: 0.5 }} />
                        <Box component='span' sx={{ width: '12px', height: '12px', borderRadius: '10px', backgroundColor: theme.palette.warning.main, mr: 0.5 }} />
                        <Box component='span' sx={{ width: '12px', height: '12px', borderRadius: '10px', backgroundColor: theme.palette.success.main, mr: 0.5 }} />
                    </Box>
                    <Box sx={{
                        width: '100%',
                        height: 'calc(100% - 20px)',
                    }}>
                        {children}
                    </Box>
                </Box>
            </m.div >
        </Box >
    );
}

export default SolarCenterPanelCard;