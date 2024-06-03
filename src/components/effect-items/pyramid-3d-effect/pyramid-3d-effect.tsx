import * as React from 'react';

import { styled, keyframes } from '@mui/system';

// Define the keyframes for the spin animation
const spin = keyframes`
  100% {
    transform: rotateY(360deg);
  }
`;

// Styled components using MUI's `styled` function
const PyramidLoader = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '300px',
    height: '150px',
    display: 'block',
    transformStyle: 'preserve-3d',
    transform: 'rotateX(-20deg)',
}));

const Wrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    animation: `${spin} 4s linear infinite`,
}));

const Side = styled('span')(({ theme }) => ({
    width: '70px',
    height: '70px',
    background: 'linear-gradient(to bottom right, #FFA500, #FF4500)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    transformOrigin: 'center top',
    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
}));

const Side1 = styled(Side)(({ theme }) => ({
    transform: 'rotateZ(-30deg) rotateY(90deg)',
    background: 'linear-gradient(to bottom right, #FF4500, #FFA500)',
}));

const Side2 = styled(Side)(({ theme }) => ({
    transform: 'rotateZ(30deg) rotateY(90deg)',
    background: 'linear-gradient(to bottom right, #FFA500, #FF4500)',
}));

const Side3 = styled(Side)(({ theme }) => ({
    transform: 'rotateX(30deg)',
}));

const Side4 = styled(Side)(({ theme }) => ({
    transform: 'rotateX(-30deg)',
    background: 'linear-gradient(to bottom right, #FF4500, #FFA500)',
}));

const Shadow = styled('span')(({ theme }) => ({
    width: '60px',
    height: '60px',
    background: '#FF8C00',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    transform: 'rotateX(90deg) translateZ(-40px)',
    filter: 'blur(12px)',
}));

// Pyramid3DEffect component
const Pyramid3DEffect: React.FC = () => (
    <PyramidLoader>
        <Wrapper>
            <Side1 />
            <Side2 />
            <Side3 />
            <Side4 />
            <Shadow />
        </Wrapper>
    </PyramidLoader>
);

export default Pyramid3DEffect;
