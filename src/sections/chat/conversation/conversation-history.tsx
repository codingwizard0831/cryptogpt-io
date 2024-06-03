import React from 'react';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Conversation from './conversation';

function generate(element: React.ReactElement) {
    return [0, 1, 2, 4, 5].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function ConversationHistory() {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return <Stack alignItems='center'>
        <Typography textAlign="left" variant="h6" component="p" sx={{
            width: '100%'
        }}>History</Typography>

        <List dense={dense} sx={{
            width: "100%"
        }}>
            {generate(
                <Conversation />,
            )}
        </List>
    </Stack >
}