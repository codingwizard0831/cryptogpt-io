import React, { useRef, useEffect } from 'react';
import { m, useSpring, useMotionValue } from 'framer-motion';

import { Box, Typography } from '@mui/material';

const SolarCenterPanel = () => {
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
        <Box ref={containerRef} sx={{ overflow: 'auto', height: '700px', width: '100%' }}>

            <m.div
                style={{
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    height: '5px',
                    backgroundColor: 'red',
                    scaleX,
                }}
            />
            {/* The scrollable content container */}
            <m.div>
                {Array.from({ length: 29 }).map((_, i) => (
                    <Box key={`item-${i}`} sx={{ marginBottom: 2 }}>
                        <Typography variant="body2" component="h6">
                            Title{i + 1}
                        </Typography>
                    </Box>
                ))}
            </m.div>
        </Box>
    );
};

export default SolarCenterPanel;
