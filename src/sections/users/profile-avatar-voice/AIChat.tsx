import { useState, useEffect } from 'react';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, alpha, Stack, styled, Button, IconButton, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Image from 'src/components/image';
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

export default function AIChatBox() {
    const [text, setText] = useState('');
    const isFocus = useBoolean();
    const isMultipleLines = useBoolean();
    const smUp = useResponsive("up", 'sm');
    const isPreview = useStrategy((state) => state.isPreview);
    const setIsPreview = useStrategy((state) => state.setIsPreview);
    const isShowSummary = useStrategy((state) => state.isShowSummary);

    useEffect(() => {
        if (text.split('\n').length > 2) {
            isMultipleLines.onTrue();
        } else {
            isMultipleLines.onFalse();
        }
    }, [text, isMultipleLines]);

    return <Stack direction="column" spacing={2} sx={{
        flex: 1,
        width: '100%',
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
        position: 'relative',
        p: 1,
        ...(
            (isPreview && !smUp) && {
                display: 'none',
            }
        ),
        ...(
            (isShowSummary && !smUp) && {
                display: 'none',
            }
        ),
    }}>
        {
            !smUp &&
            <Button size="small" variant="outlined" sx={{
                position: 'absolute',
                right: '8px',
                top: '8px',
            }}
                onClick={() => setIsPreview(!isPreview)}
            >Preview</Button>
        }
        <Box sx={{
            width: 1,
            flex: 1,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowY: 'auto',
            }}>

                {
                    null && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => <>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}>
                            <Box sx={{
                                width: '100%',
                                maxWidth: '600px',
                                display: 'flex',
                                gap: 2,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                ':hover': {
                                    '.action-buttons': {
                                        opacity: 1,
                                        visibility: 'visible',
                                    },
                                },
                            }}>
                                <Image src="/images/Goldie.png" sx={{
                                    width: '32px',
                                    minWidth: '32px',
                                    height: '32px',
                                }} />
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: theme => alpha(theme.palette.info.main, 0.8),
                                    borderRadius: 2,
                                    p: 1,
                                    cursor: 'pointer',
                                }}>
                                    <Typography variant="body2" sx={{
                                        color: theme => theme.palette.background.default,
                                    }}>
                                        Great choice! ETH/USDT is highly liquid. Your 4H timeframe balances noise and signals well.
                                        Remember, proper risk management is crucial
                                    </Typography>
                                </Box>
                                <Box className="action-buttons" sx={{
                                    display: 'flex',
                                    gap: 0.5,
                                    alignItems: 'center',
                                    opacity: 0,
                                    visibility: 'hidden',
                                    transition: 'all 0.3s',
                                }}>
                                    <IconButton size="small" sx={{
                                    }}>
                                        <Iconify icon="lucide:clipboard" sx={{
                                            color: 'primary.main',
                                            width: '16px',
                                            height: '16px',
                                        }} />
                                    </IconButton>
                                    <IconButton size="small" sx={{
                                    }}>
                                        <Iconify icon="ic:baseline-reply" sx={{
                                            color: 'primary.main',
                                            width: '16px',
                                            height: '16px',
                                        }} />
                                    </IconButton>
                                    <IconButton size="small" sx={{
                                    }}>
                                        <Iconify icon="material-symbols:thumb-up-outline" sx={{
                                            color: 'primary.main',
                                            width: '16px',
                                            height: '16px',
                                        }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                            <Box sx={{
                                width: '100%',
                                maxWidth: '600px',
                                display: 'flex',
                                gap: 2,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-end',
                                ':hover': {
                                    '.action-buttons': {
                                        opacity: 1,
                                        visibility: 'visible',
                                    },
                                },
                            }}>
                                <Box className="action-buttons" sx={{
                                    display: 'flex',
                                    gap: 0.5,
                                    alignItems: 'center',
                                    opacity: 0,
                                    visibility: 'hidden',
                                    transition: 'all 0.3s',
                                }}>
                                    <IconButton size="small" sx={{
                                    }}>
                                        <Iconify icon="lucide:clipboard" sx={{
                                            color: 'primary.main',
                                            width: '16px',
                                            height: '16px',
                                        }} />
                                    </IconButton>
                                    <IconButton size="small" sx={{
                                    }}>
                                        <Iconify icon="ic:baseline-reply" sx={{
                                            color: 'primary.main',
                                            width: '16px',
                                            height: '16px',
                                        }} />
                                    </IconButton>
                                    <IconButton size="small" sx={{
                                    }}>
                                        <Iconify icon="material-symbols:thumb-up-outline" sx={{
                                            color: 'primary.main',
                                            width: '16px',
                                            height: '16px',
                                        }} />
                                    </IconButton>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.8),
                                    borderRadius: 2,
                                    p: 1,
                                    cursor: 'pointer',
                                }}>
                                    <Typography variant="body2" sx={{
                                        color: theme => theme.palette.background.default,
                                    }}>
                                        Great choice!
                                    </Typography>
                                </Box>
                                <Image src="/images/Goldie.png" sx={{
                                    width: '32px',
                                    minWidth: '32px',
                                    height: '32px',
                                }} />
                            </Box>
                        </Box>
                    </>
                    )
                }
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button variant="outlined" color="primary">Conversations</Button>
                </Box>
            </Box>
        </Box>

        <Box sx={{
            position: 'absolute',
            bottom: '4px',
            left: '4px',
            right: '4px',
            p: 1,
            width: 'calc(100% - 8px)',
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
    </Stack>
}