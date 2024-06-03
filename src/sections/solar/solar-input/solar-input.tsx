'use client';


import { useWavesurfer } from '@wavesurfer/react';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import PauseIcon from '@mui/icons-material/Pause';
import MessageIcon from '@mui/icons-material/Message';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { Input, Switch, Slider, Button, Divider, useTheme, IconButton, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { formatTimeFromSeconds } from 'src/utils/format-time';

import { NAV } from 'src/layouts/config-layout';

import { usePopover } from 'src/components/custom-popover';
import { useSettingsContext } from 'src/components/settings';
import { StyledDialog, StyledPopover } from "src/components/styled-component";

import AudioRecorder from './solar-record';

const SolarInput = () => {
    const [value, setValue] = useState("Please input the message here");
    const toggle = useBoolean();
    const containerRef = useRef(null);
    const settings = useSettingsContext();
    const theme = useTheme();
    const lgUp = useResponsive('up', 'lg');
    const isNavMini = settings.themeLayout === 'mini';
    const [microphoneConnected, setMicrophoneConnected] = useState<boolean>(false);
    const micPopover = usePopover();
    const [volume, setVolume] = useState(0.5);
    const recordDialogFlag = useBoolean();
    const calculatedWidth = useMemo(() => {
        if (lgUp) return `calc(100vw - ${isNavMini ? NAV.W_MINI : NAV.W_VERTICAL}px - 48px - 260px)`;
        return `calc(100vw - 260px)`;;
    }, [lgUp, isNavMini]);

    const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
        container: containerRef,
        width: calculatedWidth,
        height: 32,
        waveColor: theme.palette.grey[400],
        progressColor: theme.palette.primary.main,
        url: "/assets/file_example_MP3_700KB.mp3",
    });

    const onPlayPause = useCallback(() => {
        if (wavesurfer) wavesurfer.playPause()
    }, [wavesurfer])

    const handleVolumeChange = (event: Event, newVolume: number | number[]) => {
        setVolume(newVolume as number);
        if (wavesurfer) {
            wavesurfer.setVolume(newVolume as number / 100);
        }
    }

    const recordClickHandle = (event: React.MouseEvent<HTMLElement>) => {
        console.log("Record");
        micPopover.onOpen(event);
    }

    useEffect(() => {
        checkMicrophonePresence();
    }, []);

    const checkMicrophonePresence = async () => {
        try {
            // Check if navigator.mediaDevices is supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                console.log("Media Devices API not supported.");
                return false;
            }

            const _devices = await navigator.mediaDevices.enumerateDevices();
            const microphones = _devices.filter(device => device.kind === 'audioinput');

            if (microphones.length > 0) {
                console.log("Microphone(s) found:", microphones);
                setMicrophoneConnected(true);
                return true;
            }
            console.log("No microphones found.");
            setMicrophoneConnected(false);
            return false;

        } catch (error) {
            console.error("Error checking for microphones:", error);
            return false;
        }
    };

    useEffect(() => {
        if (wavesurfer) {
            wavesurfer.setVolume(volume);
        }
    }, [volume, wavesurfer]);

    return (
        <Box sx={{
            position: 'absolute',
            left: '5px',
            right: '5px',
            bottom: '5px',
            backdropFilter: "blur(10px)",
            background: alpha(theme.palette.background.default, 0.1),
            boxShadow: 1,
            borderRadius: 1,
            zIndex: 3,
            p: 1,
            display: 'flex',
            alignItems: 'flex-end',
        }}>

            <Box flex={1} sx={{
                display: toggle.value ? "none" : 'flex',
            }}>
                <Input multiline disableUnderline value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} sx={{
                    width: '100%'
                }} />
            </Box>
            <Box sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 1,
                flex: 1,
                display: toggle.value ? "flex" : 'none',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Box ref={containerRef} />
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: 1
                }}>
                    <Typography variant="caption" sx={{
                        color: 'white',
                        ml: 1
                    }}>
                        {formatTimeFromSeconds(currentTime)}
                    </Typography>
                    <IconButton size="small" onClick={onPlayPause} sx={{
                    }}>
                        {
                            isPlaying ? <PauseIcon sx={{
                                fontSize: "16px",
                                color: 'white',
                            }} /> : <PlayArrowIcon sx={{
                                fontSize: "16px",
                                color: 'white',
                            }} />
                        }
                    </IconButton>
                </Box>
            </Box>


            {
                !toggle.value ? <>
                    <IconButton size="medium" sx={{
                        ml: '6px'
                    }}>
                        <AutoAwesomeIcon sx={{
                            fontSize: "16px",
                            color: 'white',
                        }} />
                    </IconButton>
                    <IconButton size="medium">
                        <MessageIcon sx={{
                            fontSize: "16px",
                            color: 'white',
                        }} />
                    </IconButton>
                </> : <>
                    <IconButton size="medium" sx={{
                        ml: '2px',
                    }} onClick={recordClickHandle}>
                        <MicIcon sx={{
                            fontSize: "16px",
                            color: 'white'
                        }} />
                    </IconButton>
                    <StyledPopover
                        open={Boolean(micPopover.open)}
                        anchorEl={micPopover.open}
                        onClose={micPopover.onClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                        }}>
                        <Box sx={{
                            backgroundColor: alpha(theme.palette.background.default, 0.1),
                            borderRadius: 1,
                            backdropFilter: "blur(10px)",
                            padding: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            width: 200,
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <MicIcon sx={{
                                    fontSize: "16px",
                                    color: 'white'
                                }} />
                                <Typography variant="caption" sx={{
                                    color: 'white',
                                    ml: 1,
                                    flex: 1,
                                }}>
                                    Microphone
                                </Typography>
                                <Switch size="small" checked={microphoneConnected} sx={{
                                    ml: 0.5
                                }} />
                            </Box>
                            <Divider sx={{ my: 0.5 }} />
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                {
                                    +volume === 0 ?
                                        <VolumeOffIcon sx={{
                                            fontSize: "16px",
                                            color: 'white'
                                        }} />
                                        : <>
                                            {
                                                +volume < 50 ?
                                                    <VolumeDownIcon sx={{
                                                        fontSize: "16px",
                                                        color: 'white'
                                                    }} />
                                                    :
                                                    <VolumeUpIcon sx={{
                                                        fontSize: "16px",
                                                        color: 'white'
                                                    }} />
                                            }
                                        </>
                                }
                                <Typography variant="caption" sx={{
                                    color: 'white',
                                    ml: 1,
                                    flex: 1,
                                }}>
                                    Sound{volume}
                                </Typography>
                                <Switch size="small" sx={{
                                    ml: 0.5
                                }} />
                            </Box>
                            <Box sx={{
                                px: 1,
                                height: 28,
                            }}>
                                <Slider
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                mx: 1,
                            }}>
                                <Button size="small" color='primary' variant="contained" sx={{
                                    ml: 0.5,
                                    fontSize: "10px",
                                }} startIcon={<SettingsVoiceIcon sx={{
                                    fontSize: "8px",
                                }} />} onClick={recordDialogFlag.onTrue}>
                                    Record
                                </Button>
                            </Box>
                        </Box>
                    </StyledPopover>
                    <StyledDialog open={Boolean(recordDialogFlag.value)} onClose={recordDialogFlag.onFalse}>
                        <AudioRecorder recordDialogFlag={recordDialogFlag} />
                    </StyledDialog>
                </>
            }
            <Switch checked={toggle.value} onChange={toggle.onToggle} size="small" sx={{
                mb: 0.5
            }} />
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
    );
}

export default SolarInput;