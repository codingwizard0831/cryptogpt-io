import React from 'react';

import { Box } from '@mui/material';

import MessagePanel from './message-panel';
import MessageInput from './message-input';
import MessageHeader from "./message-header";

const MessageView: React.FC = () => <Box sx={{
    width: "100%",
    height: "100%",
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}}>
    <MessageHeader />


    <MessagePanel />
    <Box sx={{
        width: '100%',
        position: 'absolute',
        bottom: '0px'
    }}>
        <MessageInput />
    </Box>
</Box>

export default MessageView;