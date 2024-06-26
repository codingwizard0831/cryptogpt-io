'use client';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Stack, alpha, styled, BoxProps, Typography, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';


const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
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

interface DashboardAIChatProps extends BoxProps {
    isMinimized?: boolean;
    onBlockResize?: () => void;
}

export function DashboardAIChat({ sx, isMinimized = true, onBlockResize, ...other }: DashboardAIChatProps) {
    const isFocus = useBoolean();
    const smUp = useResponsive('up', 'sm');

    const handleChatResize = () => {
        if (onBlockResize) {
            onBlockResize();
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            height: '100%',
            ...sx,
        }} {...other}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
            }}>
                <Typography variant="h6">AI Assistant</Typography>
                {
                    smUp &&
                    <IconButton onClick={() => handleChatResize()}>
                        {isMinimized ? <Iconify icon="fluent-mdl2:minimum-value" /> : <Iconify icon="fluent-mdl2:maximum-value" />}
                    </IconButton>
                }
                {
                    !smUp &&
                    <IconButton onClick={() => handleChatResize()}>
                        {isMinimized ? <Iconify icon="material-symbols:close" /> : <Iconify icon="charm:screen-maximise" />}
                    </IconButton>
                }
            </Stack>
            <Box sx={{
                flex: 1,
                height: '0',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                {
                    dummyChatMessages.map((_message, index) => (
                        <Stack direction="row" justifyContent={!_message.isUser ? 'space-between' : 'flex-end'} sx={{
                            py: 1,
                            my: 0.5,
                            borderRadius: 0.5,
                            ...(_message.isUser ? { backgroundColor: theme => alpha(theme.palette.primary.main, 0.1) } : {}),
                        }} key={`chat-${index}`}>
                            {
                                !_message.isUser && <Iconify icon="mdi:brain-freeze" sx={{
                                    minWidth: '32px',
                                    height: '32px',
                                    fontSize: '32px',
                                }} />
                            }

                            <Box sx={{
                                width: "calc(100% - 36px)"
                            }}>
                                <Typography variant="body2">{_message.message}</Typography>
                            </Box>
                        </Stack>
                    ))
                }
            </Box>

            <Box sx={{
                p: 1,
                pb: 0,
                width: '100%',
                borderRadius: '6px',
                border: theme => `1px solid ${theme.palette.divider}`,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s',
                ...(isFocus.value ? {
                    border: theme => `1px solid ${theme.palette.primary.main}`,
                    background: theme => alpha(theme.palette.primary.main, 0.05),
                } : {}),
            }}>
                <Textarea placeholder="Message" onFocus={() => isFocus.onTrue()} onBlur={() => isFocus.onFalse()} sx={{
                    width: '100%',
                }} />
            </Box>
        </Box>
    );
}

const dummyChatMessages = [
    {
        id: '1',
        message: 'Hi, how can I help you today?',
        isUser: false,
    },
    {
        id: '2',
        message: 'I would like to know more about the current market trends.',
        isUser: true,
    },
    {
        id: '3',
        message: 'Sure, let me check that for you.',
        isUser: false,
    },
    {
        id: '4',
        message: 'Thank you!',
        isUser: true,
    },
    {
        id: '5',
        message: 'You are welcome!',
        isUser: false,
    },
    {
        id: '6',
        message: 'Hi, how can I help you today?',
        isUser: false,
    },
    {
        id: '7',
        message: 'I would like to know more about the current market trends.',
        isUser: true,
    },
    {
        id: '8',
        message: 'Sure, let me check that for you.',
        isUser: false,
    },
    {
        id: '9',
        message: 'Thank you!',
        isUser: true,
    },
    {
        id: '10',
        message: 'You are welcome!',
        isUser: false,
    },
    {
        id: '11',
        message: 'Hi, how can I help you today?',
        isUser: false,
    },
    {
        id: '12',
        message: 'I would like to know more about the current market trends.',
        isUser: true,
    },
    {
        id: '13',
        message: 'Sure, let me check that for you.',
        isUser: false,
    },
    {
        id: '14',
        message: 'Thank you!',
        isUser: true,
    },
    {
        id: '15',
        message: 'You are welcome!',
        isUser: false,
    },
    {
        id: '16',
        message: 'Hi, how can I help you today?',
        isUser: false,
    },
    {
        id: '17',
        message: 'I would like to know more about the current market trends.',
        isUser: true,
    },
    {
        id: '18',
        message: 'Sure, let me check that for you.',
        isUser: false,
    },
    {
        id: '19',
        message: 'Thank you!',
        isUser: true,
    },
    {
        id: '20',
        message: 'You are welcome!',
        isUser: false,
    },
];