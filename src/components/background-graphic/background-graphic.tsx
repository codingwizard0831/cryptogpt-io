import React from 'react';

import { Box, styled } from '@mui/material';

// Styled components
const SceneBox = styled(Box)(({ theme }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    perspective: '5px',
    perspectiveOrigin: '50% 50%',
    position: 'relative',
}));

const WrapBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '1000px',
    height: '1000px',
    left: '-500px',
    top: '-500px',
    transformStyle: 'preserve-3d',
    animation: 'move 48s infinite linear',
    animationFillMode: 'forwards',
    '&:nth-of-type(2)': {
        animationDelay: '6s',
    },
}));

const Wall = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0,
    animation: 'fade 48s infinite linear',
    // animationDelay: 0,
    background: 'url(/assets/background/5.png)',
    backgroundSize: 'cover',
}));

const WallRight = styled(Wall)({
    transform: 'rotateY(90deg) translateZ(500px)',
});

const WallLeft = styled(Wall)({
    transform: 'rotateY(-90deg) translateZ(500px)',
});

const WallTop = styled(Wall)({
    transform: 'rotateX(90deg) translateZ(500px)',
});

const WallBottom = styled(Wall)({
    transform: 'rotateX(-90deg) translateZ(500px)',
});

const WallBack = styled(Wall)({
    transform: 'rotateX(180deg) translateZ(500px)',
});

// Keyframes
const keyframes = `
  @keyframes move {
    0% {
      transform: translateZ(-500px) rotate(0deg);
    }
    100% {
      transform: translateZ(500px) rotate(0deg);
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

// Scene component
const Scene: React.FC = () => (
    <Box sx={{
        zIndex: -2,
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
    }}>
        <style>{keyframes}</style>
        <SceneBox>
            <WrapBox>
                <WallRight />
                <WallLeft />
                <WallTop />
                <WallBottom />
                <WallBack />
            </WrapBox>
            <WrapBox sx={{ '& .MuiBox-root': { animationDelay: '6s' } }}>
                <WallRight />
                <WallLeft />
                <WallTop />
                <WallBottom />
                <WallBack />
            </WrapBox>
        </SceneBox>
    </Box>
);

export default Scene;