// Desc: This file contains the content of the strategy dashboard.

import { useState, useEffect } from 'react';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, alpha, Stack, styled, Button, BoxProps, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Iconify from 'src/components/iconify/iconify';
import MobileMenu from 'src/components/mobile-tab/mobile-tab';

import DashboardStrategyStep1 from './steps/strategy-1';
import DashboardStrategyStep2 from './steps/strategy-2';
import DashboardStrategyStep3 from './steps/strategy-3';
import DashboardStrategyStep4 from './steps/strategy-4';


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

interface MenuButton {
    icon: React.ReactNode;
    id: string;
}

const menuButtons: MenuButton[] = [
    { icon: <Iconify icon="pepicons-pop:coins" />, id: '1.2.choose-pair' },
    { icon: <Iconify icon="hugeicons:bitcoin-invoice" />, id: '3.detail' },
    { icon: <Iconify icon="carbon:chart-multitype" />, id: '4.backtesting' },
    { icon: <Iconify icon="vaadin:chart-3d" />, id: '5.review' },
];

interface DashboardStrategyContentProps extends BoxProps {

}

export default function DashboardStrategyContent({ sx, ...other }: DashboardStrategyContentProps) {
    const step = useStrategy(state => state.step);
    const setStep = useStrategy(state => state.setStep);
    const [text, setText] = useState('');
    const isFocus = useBoolean();
    const isMultipleLines = useBoolean();
    const smUp = useResponsive("up", 'sm');
    const isPreview = useBoolean(false);

    useEffect(() => {
        if (text.split('\n').length > 2) {
            isMultipleLines.onTrue();
        } else {
            isMultipleLines.onFalse();
        }
    }, [text, isMultipleLines]);

    return <Box sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        ...sx,
    }} {...other}>
        <Stack direction="column" spacing={2} sx={{
            width: '100%',
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
            height: '100%',
            position: 'relative',
            p: 1,
            ...(
                (isPreview.value && !smUp) && {
                    display: 'none',
                }
            )
        }}>
            {
                !smUp &&
                <Button size="small" variant="outlined" sx={{
                    position: 'absolute',
                    right: '8px',
                    top: '8px',
                }}
                    onClick={() => isPreview.onToggle()}
                >Preview</Button>
            }
            <Box sx={{
                width: 0,
                flex: 1,
            }}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => <Box key={`msg-${item}`}>
                        Message {item}
                    </Box>)
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
        </Stack>

        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            ...(
                (!isPreview.value && !smUp) && {
                    display: 'none',
                }
            )
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between',
            }}>
                <MobileMenu data={menuButtons} value={step} handleChange={setStep} />

                {
                    !smUp &&
                    <Button size="small" variant="outlined" sx={{
                    }}
                        onClick={() => isPreview.onToggle()}
                    >Chat</Button>
                }
            </Box>

            <Box sx={{
                height: 0,
                flex: 1,
                width: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
            }}>
                {
                    step === "1.2.choose-pair" &&
                    <DashboardStrategyStep1 />
                }
                {
                    step === "3.detail" &&
                    <DashboardStrategyStep2 />
                }
                {
                    step === "4.backtesting" &&
                    <DashboardStrategyStep3 />
                }
                {
                    step === "5.review" &&
                    <DashboardStrategyStep4 />
                }
            </Box>
        </Box>
    </Box>
}