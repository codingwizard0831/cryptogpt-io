import { m, useAnimation } from 'framer-motion';
import React, { useEffect, useCallback } from 'react';

import { Box, Fab, SxProps } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type Props = {
    sx?: SxProps;
}

const ScrollTop = React.forwardRef<HTMLDivElement, Props>(({ sx }, ref) => {
    const controls = useAnimation();

    const checkScroll = useCallback(() => {
        const currentRef = (ref as React.MutableRefObject<HTMLDivElement | null>).current;
        const isScrolled = currentRef ? currentRef.scrollTop > 100 : false;
        if (isScrolled) {
            controls.start({ opacity: 1, scale: 1 });
        } else {
            controls.start({ opacity: 0, scale: 0 });
        }
    }, [ref, controls]);

    useEffect(() => {
        const currentRef = (ref as React.MutableRefObject<HTMLDivElement | null>).current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScroll);
            }
        };
    }, [ref, checkScroll]);

    const handleClick = () => {
        const currentRef = (ref as React.MutableRefObject<HTMLDivElement | null>).current;
        if (currentRef) {
            currentRef.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    return (
        <Box
            sx={{ ...sx }}
        >
            <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={controls}
            >
                <Fab color="primary" size="small" aria-label="scroll back to top" onClick={handleClick}>
                    <KeyboardArrowUpIcon sx={{
                        color: theme => theme.palette.primary.contrastText
                    }} />
                </Fab>
            </m.div>
        </Box>
    );
});

export default ScrollTop;