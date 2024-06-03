import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { useBoolean } from 'src/hooks/use-boolean';

import ChatbotCreate from './chatbot-create';
import ConversationHistory from './conversation-history';

export default function ConversationView() {
    const dialog = useBoolean();

    return <Box p={2}>
        <Stack direction='column' mb={2}>
            <Button variant='outlined' size='large'
                onClick={dialog.onTrue}
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                    width: "100%",
                    marginBottom: 1
                }}>Create Agent</Button>
            <Button variant='contained' color="primary" size='large'>New Chat</Button>
        </Stack>

        <ConversationHistory />

        <ChatbotCreate open={dialog.value} onClose={dialog.onFalse} />
    </Box>
}