'use client';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Stack, alpha, styled, BoxProps, Typography, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

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
                <IconButton onClick={() => handleChatResize()}>
                    {isMinimized ? <Iconify icon="fluent-mdl2:minimum-value" /> : <Iconify icon="fluent-mdl2:maximum-value" />}
                </IconButton>
            </Stack>
            <Box sx={{
                flex: 1,
                height: '0',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                {
                    Array.from({ length: 8 }).map((_, index) => (
                        <Stack direction="row" justifyContent={index % 2 === 0 ? 'space-between' : 'flex-end'} sx={{
                            py: 1,
                            my: 0.5,
                            borderRadius: 0.5,
                            ...(index % 2 === 0 ? { backgroundColor: theme => alpha(theme.palette.primary.main, 0.1) } : {}),
                        }} key={index}>
                            {
                                index % 2 === 0 && <Iconify icon="mdi:brain-freeze" sx={{
                                    minWidth: '32px',
                                    height: '32px',
                                    fontSize: '32px',
                                }} />
                            }

                            <Box sx={{
                                width: "calc(100% - 36px)"
                            }}>
                                <Typography variant="body2">AI Assistant is a tool that helps you to make better trading decisions by providing you with real-time market analysis and insights.</Typography>
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