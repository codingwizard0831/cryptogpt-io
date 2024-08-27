'use client';

import { useState } from "react";

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Card, alpha, Stack, styled, IconButton, Typography } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import { useChatbot } from "src/store/chatbox/useChatbot";
import { HEADER, SPACING } from "src/layouts/config-layout";

import Image from "src/components/image";
import Iconify from "src/components/iconify";
import ChatInput from "src/components/chat-input/chat-input";

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

export default function ChatbotBubble() {
    const isShow = useChatbot((state) => state.isShow);
    const setIsShow = useChatbot((state) => state.setIsShow);
    const [text, setText] = useState('');
    const smUp = useResponsive("up", 'sm');

    return <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        height: `calc(100vh - ${HEADER.H_DESKTOP}px - ${SPACING.md * 3}px)`,
        maxHeight: '700px',
        position: 'fixed',
        right: `${SPACING.md * 2}px`,
        bottom: `${SPACING.md * 2}px`,
        borderRadius: 1,
        zIndex: 100,
        p: 2,
        backdropFilter: 'none',
        backgroundColor: "#100e0d",
        transition: 'all 0.3s',
        opacity: 0,
        visibility: 'hidden',
        ...(isShow && {
            opacity: 1,
            visibility: 'visible',
        })
    }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ pb: 2 }}>
            <Image src="/images/Goldie.png" sx={{
                width: '36px',
                height: '36px',
            }} />
            <Typography variant="h6" sx={{ color: 'primary.main', flex: 1 }}>Goldie</Typography>

            <IconButton size="small" onClick={() => setIsShow(false)} >
                <Iconify icon="material-symbols:close" sx={{
                    color: theme => theme.palette.primary.main,
                }} />
            </IconButton>
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
                    <Stack key={`chat-${index}`} direction="column" spacing={1} sx={{
                        p: 1,
                        my: 1,
                        borderRadius: 1,
                        border: `1px solid transparent`,
                        transition: 'all 0.3s',
                        position: 'relative',
                        ...(_message.isUser ? { backgroundColor: theme => alpha(theme.palette.primary.main, 0.1) } : {}),
                        ":hover": {
                            // transform: 'scale(1.05)',
                        }
                    }}>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            gap: 0.5,
                            alignItems: 'center',
                        }}>
                            <Image src="/images/Goldie.png" sx={{
                                width: '32px',
                                height: '32px',
                            }} />
                            <Box sx={{ flex: 1 }} />
                            <IconButton size="small" sx={{
                            }}>
                                <Iconify icon="lucide:clipboard" sx={{
                                    color: theme => _message.isUser ? theme.palette.text.primary : theme.palette.primary.main,
                                    width: '16px',
                                    height: '16px',
                                }} />
                            </IconButton>
                            <IconButton size="small" sx={{
                            }}>
                                <Iconify icon="ic:baseline-reply" sx={{
                                    color: theme => _message.isUser ? theme.palette.text.primary : theme.palette.primary.main,
                                    width: '16px',
                                    height: '16px',
                                }} />
                            </IconButton>
                            <IconButton size="small" sx={{
                            }}>
                                <Iconify icon="material-symbols:thumb-up-outline" sx={{
                                    color: theme => _message.isUser ? theme.palette.text.primary : theme.palette.primary.main,
                                    width: '16px',
                                    height: '16px',
                                }} />
                            </IconButton>
                            <IconButton size="small" sx={{
                            }}>
                                <Iconify icon="material-symbols:thumb-down-outline" sx={{
                                    color: theme => _message.isUser ? theme.palette.text.primary : theme.palette.primary.main,
                                    width: '16px',
                                    height: '16px',
                                }} />
                            </IconButton>
                            <IconButton size="small" sx={{
                            }}>
                                <Iconify icon="material-symbols:lock-outline" sx={{
                                    color: theme => _message.isUser ? theme.palette.text.primary : theme.palette.primary.main,
                                    width: '16px',
                                    height: '16px',
                                }} />
                            </IconButton>
                        </Box>

                        <Box sx={{
                            width: '100%',
                        }}>
                            <Typography variant="body2">{_message.message}</Typography>
                        </Box>
                    </Stack>
                ))
            }
        </Box>

        <ChatInput sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            p: 1,
        }} />
    </Card>
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
];