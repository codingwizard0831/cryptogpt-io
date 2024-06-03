import React from 'react';

import { Box, BoxProps } from '@mui/material';

import Image from 'src/components/image';

const SolarSliderBoxItem: React.FC<BoxProps> = ({ sx, ...other }: BoxProps) => {
    console.log('SolarSliderBoxItem');
    return (
        <Box sx={{
            width: '86px',
            aspectRatio: '1/1',
            p: 1,
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.18)',
            backgroundColor: 'transparent',
            position: 'relative',
            ...sx
        }} {...other}>
            <Image src="/assets/images/project/tree.png" alt="solar-slider-1" sx={{
                width: 1,
                height: 1,
                objectFit: 'cover'
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '-7%',
                left: 0,
                width: '100%',
                height: '10%',
                backgroundImage: 'radial-gradient(#000000ff, #ffffff55)',
                backdropFilter: 'blur(4px)',
                opacity: 0.6,
                borderRadius: '50%',
            }} />

            <Box sx={{
                position: 'absolute',
                top: '0',
                left: '20%',
                width: '5px',
                height: '0',
                boxShadow: '0 0 6px 5px #ffffff',
            }} />
            <Box sx={{
                position: 'absolute',
                top: '65%',
                left: '0%',
                width: '0px',
                height: '8px',
                boxShadow: '0 0 6px 5px #ffffff',
            }} />
            <Box sx={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                // backgroundImage: 'linear-gradient(45deg, #00000000, #ffffff55)',
                backgroundImage: 'radial-gradient(#00000000, #ffffff66)',
                // backgroundColor: 'rgba(255, 255, 255, 0.1)',
                clipPath: 'polygon(0% 0%, 70% 0%, 50% 10%, 37.5% 15%, 26% 26%, 15% 37.5%, 10% 50%, 0% 70%)',
            }} />
        </Box>
    );
}

export default SolarSliderBoxItem;