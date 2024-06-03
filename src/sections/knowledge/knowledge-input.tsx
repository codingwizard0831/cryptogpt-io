import React, { useState } from 'react';

import MicIcon from '@mui/icons-material/Mic';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/system';
import MessageIcon from '@mui/icons-material/Message';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

import { useBoolean } from 'src/hooks/use-boolean';

import { bgBlur } from 'src/theme/css';

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    border: none;
    outline: none;
    resize: none;
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
    background: transparent;
  `,
);

const KnowledgeInput: React.FC = () => {
    const [value, setValue] = useState("Please input the message here");
    const moreFlag = useBoolean();
    const theme = useTheme();

    return <Box sx={{
        width: "100%",
        display: "flex",
        alignItems: "end",
        padding: 0.5,
        ...bgBlur({
            color: theme.palette.background.default,
            blur: 10,
            opacity: 0.2,
        }),
        border: `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: 1,
        borderRadius: 1
    }}>
        {
            moreFlag.value ? <Box>
                <IconButton size='small' sx={{
                    ml: '2px',
                }} onClick={moreFlag.onToggle}>
                    <AttachFileIcon fontSize='small' />
                </IconButton>
                <IconButton size='small' onClick={moreFlag.onToggle}>
                    <MicIcon fontSize='small' />
                </IconButton>
            </Box> :
                <IconButton size='small' onClick={moreFlag.onToggle}>
                    <AddIcon fontSize='small' />
                </IconButton>
        }
        <Box flex={1} sx={{
            mx: 1,
            display: "flex",
            mb: '5px'
        }}>
            <Textarea value={value} onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} sx={{
                width: '100%'
            }} />
        </Box>
        <IconButton size="medium" sx={{
            ml: '6px'
        }}>
            <AutoAwesomeIcon sx={{
                fontSize: "16px",
                color: 'white'
            }} />
        </IconButton>
        <IconButton size="medium">
            <MessageIcon sx={{
                fontSize: "16px",
                color: 'white'
            }} />
        </IconButton>
        <IconButton size="medium" sx={{
            backgroundColor: `${theme.palette.primary.main}`,
            borderRadius: 1,
            ml: '6px'
        }}>
            <SendIcon sx={{
                fontSize: "16px",
                color: 'white'
            }} />
        </IconButton>
    </Box>
}

export default KnowledgeInput;