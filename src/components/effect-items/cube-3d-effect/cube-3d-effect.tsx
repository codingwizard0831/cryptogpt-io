import * as React from 'react';

import { styled, keyframes } from '@mui/system';
// Keyframes for the animation
const animate = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`;


interface CubeProps {
    index: number;
}

const Cube3dEffect = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
    const sizeToUnitMap = {
        lg: 4,
        md: 3,
        sm: 2,
    };

    const unit = sizeToUnitMap[size] || 3;

    const Container = styled('div')({
        position: 'relative',
        top: `-${8 * unit}px`,
        transform: 'skewY(-20deg)',
        animation: `${animate} 5s linear infinite`,
    });

    const Cube = styled('div')<CubeProps>(({ index }) => ({
        position: 'relative',
        zIndex: 2,
        ...(index === 1 && {
            zIndex: 1,
            transform: `translate(-${6 * unit}px, -${6 * unit}px)`,
        }),
        ...(index === 2 && {
            zIndex: 3,
            transform: `translate(${6 * unit}px, ${6 * unit}px)`,
        }),
        '& div': {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            gap: `${3 * unit}px`,
            translate: `calc(-${7 * unit}px * var(--x)) calc(-${6 * unit}px * var(--y))`,
        },
        '& span': {
            position: 'relative',
            display: 'inline-block',
            width: `${5 * unit}px`,
            height: `${5 * unit}px`,
            background: '#dcdcdc',
            zIndex: `calc(1 * var(--i))`,
            transition: '1.5s',
            '&:hover': {
                transition: '0s',
                background: '#ef4149',
                filter: `drop-shadow(0 0 ${3 * unit}px #ef4149)`,
                '&:before, &:after': {
                    transition: '0s',
                    background: '#ef4149',
                },
            },
            '&:before': {
                content: '""',
                position: 'absolute',
                left: `-${4 * unit}px`,
                width: `${4 * unit}px`,
                height: '100%',
                background: '#fff',
                transformOrigin: 'right',
                transform: 'skewY(45deg)',
                transition: '1.5s',
            },
            '&:after': {
                content: '""',
                position: 'absolute',
                top: `-${4 * unit}px`,
                left: "0px",
                width: "100%",
                height: `${4 * unit}px`,
                background: '#f2f2f2',
                transformOrigin: 'bottom',
                transform: 'skewX(45deg)',
                transition: '1.5s',
            },
        },
    }));

    return <Container>
        {Array.from({ length: 3 }).map((_, cubeIndex) => (
            <Cube key={cubeIndex} index={cubeIndex}>
                {Array.from({ length: 3 }).map((__, divIndex) => (
                    <div key={divIndex} style={{ '--x': `${divIndex - 1}`, '--y': '0' } as React.CSSProperties}>
                        {Array.from({ length: 3 }).map((___, spanIndex) => (
                            <span key={spanIndex} style={{ '--i': `${3 - spanIndex}` } as React.CSSProperties} />
                        ))}
                    </div>
                ))}
            </Cube>
        ))}
    </Container>
}

export default Cube3dEffect;