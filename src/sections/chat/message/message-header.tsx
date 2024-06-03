import React, { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack, IconButton } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import ChatbotSelector from './chatbot-selector';

const MessageHeader: React.FC = () => {
    const [value, setValue] = useState();
    return <Box sx={{
        width: "100%"
    }}>
        <Stack alignItems="center" justifyContent="space-between" direction="row" sx={{
            height: "50px",
            py: 1
        }}>
            <ChatbotSelector />
            <Box sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <IconButton
                    size="small"
                >
                    <SearchIcon fontSize='small' />
                </IconButton>
                <IconButton
                    size="small"
                >
                    <MenuBookIcon fontSize='small' />
                </IconButton>
            </Box>
        </Stack>
    </Box>
}

export default MessageHeader;