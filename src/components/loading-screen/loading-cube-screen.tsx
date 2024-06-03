
import { useState, useEffect } from 'react';

import { Box, BoxProps } from '@mui/material';
import { alpha, styled, keyframes } from '@mui/system';

const squareAnimation = keyframes`
0% {
 left: 0;
 top: 0;
}

10.5% {
 left: 0;
 top: 0;
}

12.5% {
 left: 32px;
 top: 0;
}

23% {
 left: 32px;
 top: 0;
}

25% {
 left: 64px;
 top: 0;
}

35.5% {
 left: 64px;
 top: 0;
}

37.5% {
 left: 64px;
 top: 32px;
}

48% {
 left: 64px;
 top: 32px;
}

50% {
 left: 32px;
 top: 32px;
}

60.5% {
 left: 32px;
 top: 32px;
}

62.5% {
 left: 32px;
 top: 64px;
}

73% {
 left: 32px;
 top: 64px;
}

75% {
 left: 0;
 top: 64px;
}

85.5% {
 left: 0;
 top: 64px;
}

87.5% {
 left: 0;
 top: 32px;
}

98% {
 left: 0;
 top: 32px;
}

100% {
 left: 0;
 top: 0;
}
`;

// Styled loader container
const Loader = styled('div')`
position: relative;
width: 96px;
height: 96px;
transform: rotate(45deg);
`;

// Styled loader square with animation
const LoaderSquare = styled('div')<{ delay: string }>(
    ({ delay }) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '28px',
        height: '28px',
        margin: '2px',
        borderRadius: '0px',
        background: 'white',
        animation: `${squareAnimation} 10s ease-in-out infinite both`,
        animationDelay: delay,
    })
);


export default function LoadingCubeScreen({ sx, ...other }: BoxProps) {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // Generate squares with different animation delays
    const squares = Array.from({ length: 8 }, (_, index) => (
        <LoaderSquare key={index} delay={`${-1.4285714286 * index}s`} />
    ));


    return (
        <Box
            sx={{
                px: 5,
                width: 1,
                flexGrow: 1,
                minHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                backgroundColor: theme => alpha(theme.palette.background.default, 0.5),
                ...sx,
            }}
            {...other}
        >
            <Loader>
                {squares}
            </Loader>
        </Box>
    );
}