import { useState, useEffect, useCallback } from 'react';
import { LiveAudioVisualizer } from 'react-audio-visualize';

import { Box, alpha, styled, useTheme, BoxProps, IconButton } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify/iconify';

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

export interface ChatInputProps extends BoxProps {

}

export default function ChatInput({ sx, ...other }: ChatInputProps) {
    const theme = useTheme();

    const [text, setText] = useState('');
    const isFocus = useBoolean();
    const isMultipleLines = useBoolean();
    const isRecordingBarShow = useBoolean(true);

    useEffect(() => {
        if (text.split('\n').length > 2) {
            isMultipleLines.onTrue();
        } else {
            isMultipleLines.onFalse();
        }
    }, [text, isMultipleLines]);

    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
    const isDeviceExists = useBoolean(true);
    const isUserApproved = useBoolean(true);

    const requestMicrophoneAccess = useCallback(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const _mediaRecorder = new MediaRecorder(stream);
                // _mediaRecorder.ondataavailable = (e) => {
                //     setBlob(e.data);
                // };
                _mediaRecorder.start();
                setMediaRecorder(_mediaRecorder);
            })
            .catch((err) => {
                console.log('error: ', err);
                if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                    console.log('No audio input devices found.');
                    // Device does not exist
                    isDeviceExists.onFalse();
                } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                    // User dismissed the request
                    console.log('The user refused to let this app use audio inputs.');
                    isUserApproved.onFalse();
                } else {
                    // Handle other errors
                }
            });
    }, [isDeviceExists, isUserApproved]);

    useEffect(() => {
        if (isRecordingBarShow.value) {
            console.log('requestMicrophoneAccess');
            requestMicrophoneAccess();
        }
    }, [isRecordingBarShow.value]);

    const handleOpenRecordingBar = () => {
        if (!isRecordingBarShow.value) {
            requestMicrophoneAccess();
        }
        isRecordingBarShow.onToggle();
    }

    return <Box sx={{
        width: '100%',
        borderRadius: '40px',
        backgroundColor: alpha(theme.palette.background.default, 0.6),
        backdropFilter: 'blur(10px)',
        boxShadow: `0 0 10px 4px ${alpha(theme.palette.primary.main, 0.2)}`,
        position: 'relative',
        ...(isFocus.value ? {
            backgroundColor: alpha(theme.palette.background.default, 0.9),
        } : {}),
        ...(isMultipleLines.value ? {
            borderRadius: '16px',
        } : {}),
        ...sx,
    }} {...other}>
        <Box sx={{
            borderRadius: '30px',
            border: `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
            transition: 'all 0.3s',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
            p: 1,
            ...(isFocus.value ? {
                border: `1px solid ${theme.palette.primary.main}`,
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
                    color: theme.palette.text.primary,
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
                        color: theme.palette.text.primary,
                    }} />
                </IconButton>
                <IconButton size="small" sx={{
                }} onClick={() => handleOpenRecordingBar()}>
                    <Iconify icon="fluent:mic-record-20-filled" sx={{
                        color: theme.palette.text.primary,
                    }} />
                </IconButton>
                <IconButton size="small" sx={{
                }}>
                    <Iconify icon="mingcute:emoji-line" sx={{
                        color: theme.palette.text.primary,
                    }} />
                </IconButton>
                <IconButton size="small" sx={{
                    backgroundColor: theme.palette.primary.main,
                }}>
                    <Iconify icon="ph:arrow-up-bold" sx={{
                        color: theme.palette.text.primary,
                    }} />
                </IconButton>
            </Box>
        </Box>

        <Box sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.8),
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
            position: 'absolute',
            left: 0,
            width: '100%',
            top: "-64px",
            height: '60px',
            opacity: isRecordingBarShow.value ? 1 : 0,
            visibility: isRecordingBarShow.value ? 'visible' : 'hidden',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            p: 1,
        }}>

            <Box sx={{ flex: 1 }}>
                {mediaRecorder && (
                    <LiveAudioVisualizer
                        mediaRecorder={mediaRecorder}
                        width={500}
                        height={36}
                    />
                )}
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                <IconButton size="small" sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.8),
                }}
                    onClick={() => { }}
                >
                    <Iconify icon="fluent:record-20-regular" sx={{
                        color: 'text.primary'
                    }} />
                </IconButton>

                <IconButton size="small" sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.8),
                }}
                    onClick={() => { }}
                >
                    <Iconify icon="material-symbols:pause" sx={{
                        color: 'text.primary'
                    }} />
                </IconButton>

                <IconButton size="small" sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.8),
                }}
                    onClick={() => { }}
                >
                    <Iconify icon="mdi:check-bold" sx={{
                        color: 'text.primary'
                    }} />
                </IconButton>
            </Box>
        </Box>
    </Box>
}