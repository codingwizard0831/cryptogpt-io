'use client';

import { useState, useEffect } from 'react';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Stack, alpha, styled, Switch, BoxProps, Typography, IconButton } from '@mui/material';

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
    const [text, setText] = useState('');
    const isMultipleLines = useBoolean();

    useEffect(() => {
        if (text.split('\n').length > 2) {
            isMultipleLines.onTrue();
        } else {
            isMultipleLines.onFalse();
        }
    }, [text, isMultipleLines]);

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
            position: 'relative',
            ...sx,
        }} {...other}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
            }}>
                <Typography variant="h6">AI Assistant</Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <IconButton size="small" sx={{
                    }}>
                        <Iconify icon="lucide:video" sx={{
                            color: theme => theme.palette.text.primary,
                        }} />
                    </IconButton>
                    <IconButton size="small" sx={{
                    }}>
                        <Iconify icon="gg:record" sx={{
                            color: theme => theme.palette.text.primary,
                        }} />
                    </IconButton>
                    <IconButton size="small" sx={{
                    }}>
                        <Iconify icon="bx:headphone" sx={{
                            color: theme => theme.palette.text.primary,
                        }} />
                    </IconButton>
                    {
                        smUp &&
                        <IconButton onClick={() => handleChatResize()}>
                            {isMinimized ? <Iconify icon="fluent-mdl2:minimum-value" sx={{
                                color: theme => theme.palette.text.primary,
                            }} /> : <Iconify icon="fluent-mdl2:maximum-value" sx={{
                                color: theme => theme.palette.text.primary,
                            }} />}
                        </IconButton>
                    }
                    {
                        !smUp &&
                        <IconButton onClick={() => handleChatResize()}>
                            {isMinimized ? <Iconify icon="material-symbols:close" sx={{
                                color: theme => theme.palette.text.primary,
                            }} /> : <Iconify icon="charm:screen-maximise" sx={{
                                color: theme => theme.palette.text.primary,
                            }} />}
                        </IconButton>
                    }
                </Box>
            </Stack>
            <Box sx={{
                flex: 1,
                height: '0',
                overflowY: 'auto',
                overflowX: 'hidden',
                pb: 4,
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
                position: 'absolute',
                bottom: 0,
                left: 0,
                p: 1,
                width: '100%',
                borderRadius: '40px',
                backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
                backdropFilter: 'blur(10px)',
                ...(isFocus.value ? {
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
                    // backgroundColor: theme => theme.palette.background.paper,
                } : {}),
                ...(isMultipleLines.value ? {
                    borderRadius: '16px',
                } : {}),
            }}>
                <Box sx={{
                    borderRadius: '30px',
                    border: theme => `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
                    transition: 'all 0.3s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    ...(isFocus.value ? {
                        border: theme => `1px solid ${theme.palette.primary.main}`,
                    } : {}),
                    ...(isMultipleLines.value ? {
                        borderRadius: '10px',
                        flexWrap: 'wrap',
                    } : {}),
                }}>
                    <IconButton size="small" sx={{
                        order: !isMultipleLines.value ? 0 : 1,
                    }}>
                        <Iconify icon="gg:add" sx={{
                            color: theme => theme.palette.text.primary,
                        }} />
                    </IconButton>
                    <Box sx={{
                        width: '100%',
                        order: !isMultipleLines.value ? 1 : 0,
                        maxHeight: '100px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Message" onFocus={() => isFocus.onTrue()} onBlur={() => isFocus.onFalse()} sx={{
                            width: '100%',
                            height: '100%',
                        }} />
                    </Box>

                    <Box sx={{
                        order: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        <IconButton size="small" sx={{
                        }}>
                            <Iconify icon="majesticons:underline-2" sx={{
                                color: theme => theme.palette.text.primary,
                            }} />
                        </IconButton>
                        <IconButton size="small" sx={{
                        }}>
                            <Iconify icon="mingcute:emoji-line" sx={{
                                color: theme => theme.palette.text.primary,
                            }} />
                        </IconButton>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            pr: 1,
                        }}>
                            <Switch />
                            <Typography variant="body2">Pro</Typography>
                        </Box>
                        <IconButton size="small" sx={{
                            backgroundColor: theme => theme.palette.primary.main,
                        }}>
                            <Iconify icon="ph:arrow-up-bold" sx={{
                                color: theme => theme.palette.text.primary,
                            }} />
                        </IconButton>
                    </Box>
                </Box>
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