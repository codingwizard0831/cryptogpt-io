'use client';


import Box, { BoxProps } from '@mui/material/Box';

import Scrollbar from 'src/components/scrollbar';

import SolarMessageItem from './solar-message-item';

type SolarMessageContentProps = {
    leftPanel?: boolean;
    rightPanel?: boolean;
} & BoxProps;

const SolarMessageContent: React.FC<SolarMessageContentProps> = ({ sx, leftPanel = true, rightPanel = true, ...other }: SolarMessageContentProps) => <Box sx={{
    maxHeight: 'calc(100% - 58px - 10px)',
    // height: 'calc(100% - 58px - 10px)',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'absolute',
    width: `calc(100% - 10px - ${!leftPanel ? '305px' : '5px'} - ${!rightPanel ? '305px' : '5px'})`,
    left: `calc(5px + ${!leftPanel ? '305px' : '0px'})`,
    bottom: '58px',
    ...sx,
}}>
    <Scrollbar>
        <SolarMessageItem isBot sx={{
        }} />
        <SolarMessageItem sx={{
        }} />
        <SolarMessageItem isBot sx={{
            mb: 0
        }} />
    </Scrollbar>
</Box>

export default SolarMessageContent;