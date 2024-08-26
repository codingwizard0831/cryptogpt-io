import WaveSurfer from 'wavesurfer.js';
import { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line import/extensions
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';

import Select from "@mui/material/Select";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, alpha, Stack, styled, Button, useTheme, BoxProps, MenuItem, Typography, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify/iconify';

import { usePopover } from '../custom-popover';
import { StyledPopover } from '../styled-component';

interface AudioDevice {
    deviceId: string;
    label: string;
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

export interface ChatInputProps extends BoxProps {

}

export default function ChatInput({ sx, ...other }: ChatInputProps) {
    const theme = useTheme();

    const [text, setText] = useState('');
    const isFocus = useBoolean();
    const isMultipleLines = useBoolean();
    const isRecordingBarShow = useBoolean(false);
    const uploadButtonsPopover = usePopover();
    const isUploadPanelShow = useBoolean(true);

    useEffect(() => {
        if (text.split('\n').length > 2) {
            isMultipleLines.onTrue();
        } else {
            isMultipleLines.onFalse();
        }
    }, [text, isMultipleLines]);

    const handleOpenRecordingBar = () => {
        isRecordingBarShow.onToggle();
    }

    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
    const [recordedWavesurfer, setRecordedWavesurfer] = useState<WaveSurfer | null>(null);
    const [record, setRecord] = useState<any>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [scrollingWaveform, setScrollingWaveform] = useState(false);
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<string>('');
    const [progress, setProgress] = useState('00:00');

    const micRef = useRef<HTMLDivElement>(null);
    const recordingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isRecordingBarShow.value) {
            createWaveSurfer();
            loadAudioDevices();
        }

        return () => {
            if (wavesurfer) {
                wavesurfer.destroy();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecordingBarShow.value]);

    const createWaveSurfer = () => {
        console.log("createWaveSurfer");

        if (wavesurfer) {
            wavesurfer.destroy();
        }

        if (micRef.current) {
            micRef.current.innerHTML = "";

            const newWavesurfer = WaveSurfer.create({
                container: micRef.current,
                // width: 300,
                height: 32,
                waveColor: theme.palette.info.main,
                progressColor: theme.palette.info.dark,
            });

            const newRecord = newWavesurfer.registerPlugin(RecordPlugin.create({
                scrollingWaveform,
                renderRecordedAudio: false
            }));

            newRecord.on('record-end', (blob: Blob) => {
                if (recordingsRef.current) recordingsRef.current.innerHTML = "";
                const container = recordingsRef.current;
                if (!container) return;

                const recordedUrl = URL.createObjectURL(blob);

                if (recordedWavesurfer) {
                    recordedWavesurfer.destroy();
                }

                const newRecordedWavesurfer = WaveSurfer.create({
                    container,
                    // width: 300,
                    height: 32,
                    waveColor: theme.palette.primary.main, // 'rgb(200, 100, 0)',
                    progressColor: theme.palette.primary.dark, // 'rgb(100, 50, 0)',
                    url: recordedUrl,
                });
                setRecordedWavesurfer(newRecordedWavesurfer);
            });

            newRecord.on('record-progress', (time: number) => {
                updateProgress(time);
            });

            setWavesurfer(newWavesurfer);
            setRecord(newRecord);
        }
    };

    const loadAudioDevices = async () => {
        const devices = await RecordPlugin.getAvailableAudioDevices();
        setAudioDevices(devices);
    };

    const updateProgress = (time: number) => {
        const formattedTime = [
            Math.floor((time % 3600000) / 60000),
            Math.floor((time % 60000) / 1000),
        ]
            .map((v) => (v < 10 ? `0${v}` : v))
            .join(':');
        setProgress(formattedTime);
    };

    const handleRecord = () => {
        if (isRecording || isPaused) {
            record.stopRecording();
            setIsRecording(false);
            setIsPaused(false);
        } else {
            record.startRecording({ deviceId: selectedDevice }).then(() => {
                setIsRecording(true);
            });
        }
    };

    const handlePause = () => {
        if (isPaused) {
            record.resumeRecording();
            setIsPaused(false);
        } else {
            record.pauseRecording();
            setIsPaused(true);
        }
    };

    const handleScrollingWaveform = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScrollingWaveform(event.target.checked);
        createWaveSurfer();
    };

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
            }} onClick={(e) => { uploadButtonsPopover.onOpen(e); isUploadPanelShow.onToggle() }}>
                <Iconify icon="gg:add" sx={{
                    color: theme.palette.text.primary,
                }} />
            </IconButton>

            <StyledPopover
                open={Boolean(uploadButtonsPopover.open)}
                anchorEl={uploadButtonsPopover.open}
                onClose={uploadButtonsPopover.onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{
                    p: 0.5,
                }}>
                    <Stack direction="column" spacing={1} sx={{
                        border: `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
                        borderRadius: 1,
                        p: 0.5,
                    }}>
                        <Button variant="outlined" color="primary"
                            startIcon={<Iconify icon="material-symbols:upload" />}
                            onClick={() => { }}>Upload single file</Button>
                        <Button variant="outlined" color="primary"
                            startIcon={<Iconify icon="formkit:uploadcloud" />}
                            onClick={() => { }}>Upload multi files</Button>
                        <Button variant="outlined" color="primary"
                            startIcon={<Iconify icon="vaadin:cloud-upload" />}
                            onClick={() => { }}>Import from the driver</Button>
                    </Stack>
                </Box>
            </StyledPopover>

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
            backgroundColor: alpha(theme.palette.background.default, 0.9),
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
            position: 'absolute',
            left: 0,
            width: '100%',
            top: "-114px",
            height: '110px',
            opacity: isRecordingBarShow.value ? 1 : 0,
            visibility: isRecordingBarShow.value ? 'visible' : 'hidden',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 1,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'space-between',
            }}>
                <Box ref={micRef} sx={{
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                    height: '32px',
                    flex: 1,
                }} />

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <IconButton size="small" sx={{
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                    }}
                        onClick={handleRecord}
                    >
                        <Iconify icon={isRecording ? "material-symbols:stop" : "material-symbols:mic"} sx={{
                            color: 'text.primary'
                        }} />
                    </IconButton>

                    <IconButton size="small" sx={{
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                    }}
                        onClick={handlePause}
                    >
                        <Iconify icon={isPaused ? "material-symbols:resume" : "material-symbols:pause"} sx={{
                            color: 'text.primary'
                        }} />
                    </IconButton>
                </Box>

                <Typography variant="body1">
                    {progress}
                </Typography>

                <Select
                    size="small"
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value as string)}
                    displayEmpty
                    sx={{ width: 120 }}
                >
                    <MenuItem value="" disabled>Select mic</MenuItem>
                    {audioDevices.map((device) => (
                        <MenuItem key={device.deviceId} value={device.deviceId}>
                            {device.label || device.deviceId}
                        </MenuItem>
                    ))}
                </Select>
                {/* 
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={scrollingWaveform}
                            onChange={handleScrollingWaveform}
                        />
                    }
                    label="Scrolling"
                /> */}
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'space-between',
            }}>
                <Box ref={recordingsRef} sx={{
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                    height: '32px',
                    flex: 1,
                }} />

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <IconButton size="small" sx={{
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                    }}
                        onClick={() => recordedWavesurfer?.playPause()}
                    >
                        <Iconify icon="material-symbols:resume" sx={{
                            color: 'text.primary'
                        }} />
                    </IconButton>
                    <IconButton size="small" sx={{
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                    }}
                        onClick={() => { }}
                    >
                        <Iconify icon="material-symbols:close" sx={{
                            color: 'text.primary'
                        }} />
                    </IconButton>
                    <IconButton size="small" sx={{
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                    }}
                        onClick={() => { }}
                    >
                        <Iconify icon="material-symbols:check" sx={{
                            color: 'text.primary'
                        }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>

        <Box sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.9),
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
            position: 'absolute',
            left: 0,
            width: '100%',
            bottom: "72px",
            maxHeight: '240px',
            opacity: isUploadPanelShow.value ? 1 : 0,
            visibility: isUploadPanelShow.value ? 'visible' : 'hidden',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 1,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
            }}>
                <Typography variant="subtitle2">
                    Selected files to upload
                </Typography>

                <IconButton size="small" sx={{
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                }} onClick={() => isUploadPanelShow.onToggle()}>
                    <Iconify icon="material-symbols:close" sx={{
                        color: theme.palette.text.primary,
                    }} />
                </IconButton>
            </Box>


            <Box sx={{
                width: '100%',
                height: 'calc(100% - 20px)',
                overflowX: 'hidden',
                overflowY: 'auto',
            }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                            <Box key={index} sx={{
                                width: "100%",
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                borderRadius: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.5,
                                p: 1,
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                    <Iconify icon="fluent:delete-20-filled" sx={{
                                        color: "primary.main",
                                    }} />
                                    <Typography variant="body2" sx={{ flex: 1 }}>
                                        File name {item}
                                    </Typography>
                                    <Typography variant="caption" sx={{
                                        color: "text.secondary",
                                    }}>
                                        6 KB
                                    </Typography>
                                </Box>

                                <Typography variant="body2">
                                    File description {item}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Last modified 1 hour ago
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                    <Iconify icon="fluent:delete-20-filled" sx={{
                                        color: "success.main",
                                    }} />
                                    <Typography variant="caption" sx={{
                                        color: "text.secondary",
                                    }}>
                                        Public
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    </Box>
}