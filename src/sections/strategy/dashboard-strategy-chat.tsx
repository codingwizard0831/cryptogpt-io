import { useState, useEffect } from 'react';
import { Line, XAxis, YAxis, Tooltip, LineChart, ResponsiveContainer } from 'recharts';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Chip, Grid, alpha, Stack, styled, Button, IconButton, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify/iconify';

interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}

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

export default function DashboardStrategyChat() {
    const [text, setText] = useState('');
    const isFocus = useBoolean();
    const isMultipleLines = useBoolean();
    const smUp = useResponsive("up", 'sm');
    const isPreview = useStrategy((state) => state.isPreview);
    const setIsPreview = useStrategy((state) => state.setIsPreview);
    const isShowSummary = useStrategy((state) => state.isShowSummary);
    const isChatHistory = useBoolean();

    useEffect(() => {
        if (text.split('\n').length > 2) {
            isMultipleLines.onTrue();
        } else {
            isMultipleLines.onFalse();
        }
    }, [text, isMultipleLines]);

    return <Stack direction="column" spacing={2} sx={{
        width: '100%',
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
        height: '100%',
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
                left: '8px',
                top: '8px',
                zIndex: 1,
            }}
                onClick={() => setIsPreview(!isPreview)}
            >Preview</Button>
        }
        <Box sx={{
            width: '100%',
            height: '100%',
            display: isChatHistory.value ? 'block' : 'none',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowY: 'auto',
                height: '100%',
                pb: 8,
            }}>
                <Box sx={{
                    backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
                    position: 'sticky',
                    top: 0,
                    gap: 1,
                    p: 1,
                    zIndex: 10,
                    backdropFilter: 'blur(10px)',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 1,
                        mb: 1,
                    }}>
                        <IconButton size="small" sx={{
                        }} onClick={() => isChatHistory.onToggle()}>
                            <Iconify icon="material-symbols-light:view-list" sx={{
                                color: 'primary.main',
                            }} />
                        </IconButton>
                        <IconButton size="small" sx={{
                        }}>
                            <Iconify icon="lets-icons:full" sx={{
                                color: 'primary.main',
                            }} />
                        </IconButton>
                        <IconButton size="small" sx={{
                            // backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                        }}>
                            <Iconify icon="lets-icons:setting-fill" sx={{
                                color: 'primary.main',
                            }} />
                        </IconButton>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        <Chip label="ETH/USDT" />
                        <Chip label="BTC/USDT" />
                        <Chip label="ADA/USDT" />
                        <Chip label="XRP/USDT" />
                    </Box>
                </Box>

                <Box sx={{
                    width: '100%',
                    minHeight: '320px',
                    aspectRatio: '4 / 3',
                    p: 1,
                    borderRadius: 1,
                    border: theme => `1px solid ${theme.palette.primary.main}`,
                }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis
                                dataKey="date"
                                stroke="#ddd"
                                tick={{ fill: '#ddd' }}
                            />
                            <YAxis
                                stroke="#ddd"
                                tick={{ fill: '#ddd' }}
                                domain={[0, 32000]}
                                ticks={[0, 7500, 15000, 22500, 30000]}
                            />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        const changePercent = data.change !== 0 ? (data.change / (data.price - data.change) * 100).toFixed(2) : 0;
                                        return (
                                            <Box sx={{
                                                p: 1,
                                                borderRadius: 1,
                                                backgroundColor: '#100e0d',
                                            }}>
                                                <Typography sx={{ color: 'primary.main' }}>{`Time: ${label}`}</Typography>
                                                <Typography sx={{ color: 'primary.main' }}>{`Price: ${data.price.toFixed(2)}`}</Typography>
                                                <Typography sx={{ color: data.change > 0 ? "success.main" : "error.main" }}>{`Change: ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${changePercent}%)`}</Typography>
                                                {
                                                    data.action &&
                                                    <Typography sx={{ color: data.action === 'Buy' ? "success.main" : "error.main" }}>{`Action: ${data.action}`}</Typography>
                                                }
                                            </Box>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#ffd700"
                                strokeWidth={6}
                            />
                            <Line
                                type="monotone"
                                dataKey="change"
                                stroke="#00d700"
                                strokeWidth={6}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>

                {
                    1 && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => <>

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

                {
                    null && <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Button variant="outlined" color="primary">Conversations</Button>
                    </Box>
                }
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
        </Box>
        <Box sx={{
            width: '100%',
            height: '100%',
            display: !isChatHistory.value ? 'flex' : 'none',
            flexDirection: 'column',
        }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ mb: 1 }}>
                <Button size="small" variant="outlined" color="primary" endIcon={<Iconify icon="icon-park-outline:back" />} onClick={() => isChatHistory.onToggle()}>Back to Chat</Button>
            </Stack>
            <Typography variant="body2" sx={{ mb: 2 }}>Recent Chat History</Typography>

            <Box sx={{
                width: '100%',
                height: 'calc(100% - 76px)',
                overflowY: 'auto',
            }}>
                <Grid container spacing={1}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 99].map((item, index) => (
                            <Grid item xs={12} sm={6} md={12} lg={6} xl={4}>
                                <Box sx={{
                                    borderRadius: 1,
                                    border: theme => `1px solid ${theme.palette.primary.main}`,
                                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                                    p: 1,
                                    display: 'flex',
                                    gap: 1,
                                    flexDirection: 'column',
                                    color: 'primary.main',
                                }}>
                                    <Iconify icon="wpf:chat" />
                                    <Typography variant="body2">Great choice! ETH/USDT is highly liquid. Your 4H timeframe balances noise and signals well. Remember, proper risk management is crucial</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>11 minutes ago</Typography>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    </Stack>
}

const data: DataPoint[] = [
    { date: '2023-01', price: 16500, change: 0 },
    { date: '2023-02', price: 21000, change: 0 },
    { date: '2023-03', price: 18500, change: -0.1, action: 'Sell' },
    { date: '2023-04', price: 15500, change: 0.1, action: 'Buy' },
    { date: '2023-05', price: 17500, change: 0.1 },
    { date: '2023-06', price: 11000, change: -0.1, action: 'Sell' },
    { date: '2023-07', price: 19500, change: 0.0 },
    { date: '2023-08', price: 16500, change: -0.1, action: 'Sell' },
];