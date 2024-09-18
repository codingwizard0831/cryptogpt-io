import WaveSurfer from 'wavesurfer.js';
import { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line import/extensions
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';

import Select from "@mui/material/Select";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Tab, Tabs, alpha, Stack, styled, Button, useTheme, BoxProps, MenuItem, Collapse, Typography, IconButton, FormControl, OutlinedInput, InputAdornment } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify/iconify';

import Image from '../image/image';
import { usePopover } from '../custom-popover';
import { StyledPopover } from '../styled-component';
import { PersonColorSelector } from '../person-color-selector';

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


type EmojiType = {
    image: string;
    value: string;
    group: string;
}

type EmojiGroupType = {
    image: string;
    name: string;
    value: string;
}

type FileType = {
    image: string;
    name: string;
    percentage: number;
    chartData: any[],
    value: string;
    group: string;
}

type FileGroupType = {
    image: string;
    name: string;
    value: string;
}

export interface ChatInputProps extends BoxProps {

}

export default function ChatInput({ sx, ...other }: ChatInputProps) {
    const theme = useTheme();

    const [text, setText] = useState('');
    const isFocus = useBoolean();
    const isMultipleLines = useBoolean(false);

    const isUploadPanelVisible = useBoolean(false);
    const uploadingPanelRef = useRef<HTMLDivElement | null>(null);
    const uploadButtonsPopover = usePopover();

    useEffect(() => {
        if (text.split('\n').length > 2) {
            isMultipleLines.onTrue();
        } else {
            isMultipleLines.onFalse();
        }
    }, [text, isMultipleLines]);


    // Recording bar
    const isRecordingPanelVisible = useBoolean(false);
    const recordingPanelRef = useRef<HTMLDivElement | null>(null);

    const handleOpenRecordingBar = () => {
        isRecordingPanelVisible.onToggle();
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
        if (isRecordingPanelVisible.value) {
            createWaveSurfer();
            loadAudioDevices();
        }

        return () => {
            if (wavesurfer) {
                wavesurfer.destroy();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecordingPanelVisible.value]);

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


    // Emoji panel
    const emojiPanelRef = useRef<HTMLDivElement | null>(null);
    const isEmojiPanelVisible = useBoolean(false);
    const [emojiTab, setEmojiTab] = useState<string>("emoji");
    const [emojiData, setEmojiData] = useState<EmojiType[][]>([...emojiDummyData]);
    const [emojiGroup, setEmojiGroup] = useState<EmojiGroupType[]>([...emojiGroupsDummyData]);
    const [hoveredEmoji, setHoveredEmoji] = useState<any>(null);
    const [emojiGroupCollapse, setEmojiGroupCollapse] = useState<boolean[]>([]);
    // File panel
    const [fileData, setFileData] = useState<FileType[][]>([...fileDummyData]);
    const [fileGroup, setFileGroup] = useState<FileGroupType[]>([...fileGroupsDummyData]);
    const [hoveredFile, setHoveredFile] = useState<any>(null);
    const [fileGroupCollapse, setFileGroupCollapse] = useState<boolean[]>([]);

    useEffect(() => {
        setEmojiGroupCollapse(emojiGroup.map(() => true));
    }, [emojiGroup]);

    const handleMoveEmojiGroup = (groupValue: string) => {
        if (emojiPanelRef.current) {
            const section = emojiPanelRef.current.querySelector(`.emoji-section-${groupValue}`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    const handleMoveFileGroup = (groupValue: string) => {
        if (emojiPanelRef.current) {
            const section = emojiPanelRef.current.querySelector(`.file-section-${groupValue}`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        const targetElement = event.target as HTMLElement;
        const specialSelector = '.MuiPopover-root';
        const { parentElement } = targetElement;

        if (parentElement && parentElement.closest(specialSelector)) {
            return;
        }

        if (
            recordingPanelRef.current &&
            !recordingPanelRef.current.contains(event.target as Node)
        ) {
            isRecordingPanelVisible.onFalse();
        }

        if (
            emojiPanelRef.current &&
            !emojiPanelRef.current.contains(event.target as Node)
        ) {
            isEmojiPanelVisible.onFalse();
        }

        if (
            uploadingPanelRef.current &&
            !uploadingPanelRef.current.contains(event.target as Node)
        ) {
            isUploadPanelVisible.onFalse();
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            }} onClick={(e) => { uploadButtonsPopover.onOpen(e); isUploadPanelVisible.onTrue() }}>
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
                            onClick={() => { }}>Import from driver</Button>
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

            {/* tool bar */}
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
                }} onClick={() => isEmojiPanelVisible.onToggle()} >
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

        {/* recording panel */}
        <Box ref={recordingPanelRef} sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.9),
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
            position: 'absolute',
            left: 0,
            width: '100%',
            top: "-114px",
            height: '110px',
            opacity: isRecordingPanelVisible.value ? 1 : 0,
            visibility: isRecordingPanelVisible.value ? 'visible' : 'hidden',
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

        {/* uploading panel */}
        <Box ref={uploadingPanelRef} sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.9),
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
            position: 'absolute',
            left: 0,
            width: '100%',
            bottom: "72px",
            maxHeight: '240px',
            opacity: isUploadPanelVisible.value ? 1 : 0,
            visibility: isUploadPanelVisible.value ? 'visible' : 'hidden',
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
                }} onClick={() => isUploadPanelVisible.onToggle()}>
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

        {/* emoji panel */}
        <Box ref={emojiPanelRef} sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.9),
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
            position: 'absolute',
            left: 0,
            width: '100%',
            bottom: "68px",
            opacity: isEmojiPanelVisible.value ? 1 : 0,
            visibility: isEmojiPanelVisible.value ? 'visible' : 'hidden',
            transition: 'all 0.3s',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                p: 1,
                boxShadow: `0 0 10px 4px ${theme.palette.background.default}`,
            }}>
                <Tabs value={emojiTab}
                    onChange={(e, v) => setEmojiTab(v)}
                    sx={{
                        '& .MuiTab-root': {
                            margin: '0px 2px !important',
                            padding: '4px 8px',
                        },
                        '& .MuiTab-selected': {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                        },
                        '& .MuiTab-indicator': {
                            display: 'none !important',
                        },
                    }}>
                    <Tab value="file" label='My File' />
                    <Tab value="emoji" label='Emoji' />
                </Tabs>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <FormControl variant="outlined" size="small" fullWidth sx={{}}>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type='text'
                            endAdornment={
                                <InputAdornment position="end">
                                    <Iconify icon="ic:baseline-search" />
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <PersonColorSelector />
                </Box>
            </Box>

            {/* Emoji System section */}
            <Box sx={{
                width: '100%',
                maxHeight: '240px',
                display: emojiTab === 'emoji' ? 'flex' : 'none',
                flexDirection: 'row',
                alignItems: 'stretch',
            }}>
                <Box sx={{
                    width: '48px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollbarWidth: 'none',
                    borderColor: alpha(theme.palette.background.opposite, 0.2),
                    borderStyle: 'solid',
                    borderWidth: '1px 1px 0px 0px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        alignItems: 'center',
                        p: 1,
                    }}>
                        {
                            emojiGroup.map((item, index) => (
                                <Box key={index}
                                    sx={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: "50%",
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        color: 'text.secondary',
                                        transition: 'all 0.3s',
                                        "&:hover": {
                                            borderRadius: "10px",
                                            color: 'text.primary',
                                        }
                                    }}
                                    onClick={() => handleMoveEmojiGroup(item.value)}
                                >
                                    <Image src={item.image} alt={item.value} sx={{
                                        width: '100%',
                                        height: '100%',
                                    }} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>

                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        flex: 1,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        p: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        scrollBehavior: 'smooth',
                    }}>
                        {
                            emojiData.map((_emojis, emojiDataIndex) => (
                                <Box key={`emojis-${emojiDataIndex}`} className={`emoji-section-${emojiGroup.find((item) => item.value === _emojis[0].group)?.value || ""}`} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        pl: 1,
                                        cursor: 'pointer',
                                    }} onClick={() => setEmojiGroupCollapse([
                                        ...emojiGroupCollapse.slice(0, emojiDataIndex),
                                        !emojiGroupCollapse[emojiDataIndex],
                                        ...emojiGroupCollapse.slice(emojiDataIndex + 1),
                                    ])}>
                                        <Image src={emojiGroup.find((item) => item.value === _emojis[0].group)?.image || ""} sx={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                        }} />
                                        <Typography variant="button">{emojiGroup.find((item) => item.value === _emojis[0].group)?.name || ""}</Typography>
                                        <Iconify icon="fluent:chevron-down-12-filled" sx={{
                                            transition: 'rotate 0.3s',
                                            transform: emojiGroupCollapse[emojiDataIndex] ? 'rotate(0deg)' : 'rotate(-90deg)',
                                        }} />
                                    </Box>
                                    <Collapse in={emojiGroupCollapse[emojiDataIndex]}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                        }}>
                                            {
                                                [..._emojis, ..._emojis, ..._emojis, ..._emojis, ..._emojis, ..._emojis, ..._emojis].map((_, emojisIndex) => (
                                                    <Box key={emojisIndex} sx={{
                                                        width: '48px',
                                                        height: '48px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        overflow: 'hidden',
                                                        cursor: 'pointer',
                                                        color: 'text.secondary',
                                                        "&:hover": {
                                                            backgroundColor: theme.palette.background.default,
                                                            color: 'text.primary',
                                                        }
                                                    }}
                                                        onMouseEnter={() => setHoveredEmoji(_)}
                                                    // onMouseLeave={() => setHoveredEmoji(null)}
                                                    >
                                                        <Image src={_.image} sx={{
                                                            width: '32px',
                                                            height: '32px',
                                                        }} />
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </Collapse>
                                </Box>
                            ))
                        }
                    </Box>

                    <Box sx={{
                        display: hoveredEmoji ? 'flex' : 'none',
                        alignItems: 'center',
                        gap: 1,
                        width: '100%',
                        backgroundColor: alpha(theme.palette.background.default, 0.5),
                        px: 1,
                        py: 0.5,
                    }}>
                        <Image src={hoveredEmoji?.image || ""} sx={{
                            width: '32px',
                            height: '32px',
                        }} />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                        }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: '800' }}>{hoveredEmoji?.value || ""}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>from {hoveredEmoji?.group || ""}</Typography>
                        </Box>
                        <Image src={emojiGroup.find((item) => item.value === hoveredEmoji?.group)?.image || ""} sx={{
                            width: '32px',
                            height: '32px',
                        }} />
                    </Box>
                </Box>
            </Box>


            {/* File System section */}
            <Box sx={{
                width: '100%',
                maxHeight: '240px',
                display: emojiTab !== 'emoji' ? 'flex' : 'none',
                flexDirection: 'row',
                alignItems: 'stretch',
            }}>
                <Box sx={{
                    width: '48px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollbarWidth: 'none',
                    borderColor: alpha(theme.palette.background.opposite, 0.2),
                    borderStyle: 'solid',
                    borderWidth: '1px 1px 0px 0px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        alignItems: 'center',
                        p: 1,
                    }}>
                        {
                            fileGroup.map((item, index) => (
                                <Box key={index}
                                    sx={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: "50%",
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        color: 'text.secondary',
                                        transition: 'all 0.3s',
                                        "&:hover": {
                                            borderRadius: "10px",
                                            color: 'text.primary',
                                        }
                                    }}
                                    onClick={() => handleMoveFileGroup(item.value)}
                                >
                                    <Image src={item.image} alt={item.value} sx={{
                                        width: '100%',
                                        height: '100%',
                                    }} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>

                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        flex: 1,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        p: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        scrollBehavior: 'smooth',
                    }}>
                        {
                            fileData.map((_filess, fileDataIndex) => (
                                <Box key={`files-${fileDataIndex}`} className={`file-section-${fileGroup.find((item) => item.value === _filess[0].group)?.value || ""}`} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        pl: 1,
                                        cursor: 'pointer',
                                    }} onClick={() => setFileGroupCollapse([
                                        ...fileGroupCollapse.slice(0, fileDataIndex),
                                        !fileGroupCollapse[fileDataIndex],
                                        ...fileGroupCollapse.slice(fileDataIndex + 1),
                                    ])}>
                                        <Image src={fileGroup.find((item) => item.value === _filess[0].group)?.image || ""} sx={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                        }} />
                                        <Typography variant="button">{fileGroup.find((item) => item.value === _filess[0].group)?.name || ""}</Typography>
                                        <Iconify icon="fluent:chevron-down-12-filled" sx={{
                                            transition: 'rotate 0.3s',
                                            transform: fileGroupCollapse[fileDataIndex] ? 'rotate(0deg)' : 'rotate(-90deg)',
                                        }} />
                                    </Box>
                                    <Collapse in={fileGroupCollapse[fileDataIndex]}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                        }}>
                                            {
                                                [..._filess, ..._filess, ..._filess, ..._filess, ..._filess, ..._filess, ..._filess].map((_, fileIndex) => (
                                                    <Box key={fileIndex} sx={{
                                                        width: '100%',
                                                        maxWidth: '360px',
                                                        minWidth: '180px',
                                                        height: '48px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        gap: 1,
                                                        overflow: 'hidden',
                                                        cursor: 'pointer',
                                                        color: 'text.secondary',
                                                        p: 1,
                                                        backgroundColor: alpha(theme.palette.background.default, 0.5),
                                                        border: `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
                                                        "&:hover": {
                                                            backgroundColor: theme.palette.background.default,
                                                            color: 'text.primary',
                                                        }
                                                    }}
                                                        onMouseEnter={() => setHoveredFile(_)}
                                                    // onMouseLeave={() => setHoveredFile(null)}
                                                    >
                                                        <Image src={_.image} sx={{
                                                            width: '36px',
                                                            height: '36px',
                                                        }} />
                                                        <Typography variant="body2" sx={{
                                                            color: 'primary.main',
                                                            width: 0,
                                                            flex: 1,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                        }}>{_.name}</Typography>
                                                        <Typography variant="caption" sx={{
                                                            color: 'success.main',
                                                        }}>{_.percentage * 100}%</Typography>
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </Collapse>
                                </Box>
                            ))
                        }
                    </Box>

                    <Box sx={{
                        display: hoveredFile ? 'flex' : 'none',
                        alignItems: 'center',
                        gap: 1,
                        width: '100%',
                        backgroundColor: alpha(theme.palette.background.default, 0.5),
                        px: 1,
                        py: 0.5,
                    }}>
                        <Image src={hoveredFile?.image || ""} sx={{
                            width: '32px',
                            height: '32px',
                        }} />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant="body2" sx={{
                                color: 'primary.main',
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>{hoveredFile?.name}</Typography>
                            <Typography variant="caption" sx={{
                                color: 'success.main',
                            }}>{hoveredFile ? (hoveredFile.percentage * 100) : 0}%</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                        }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: '800' }}>{hoveredFile?.value || ""}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>from {hoveredFile?.group || ""}</Typography>
                        </Box>
                        <Image src={fileGroup.find((item) => item.value === hoveredFile?.group)?.image || ""} sx={{
                            width: '32px',
                            height: '32px',
                        }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
}

const emojiGroupsDummyData: EmojiGroupType[] = [
    {
        image: '/images/bitcoin-btc-logo.png',
        name: 'CrytoCurrency logo',
        value: 'crypto',
    },
    {
        image: '/images/uniswap-uni-logo.png',
        name: 'Uniswap',
        value: 'uniswap',
    },
    {
        image: '/images/dot-logo.png',
        name: 'Among Us',
        value: 'among-us',
    },
];

const emojiDummyData: EmojiType[][] = [
    [
        {
            image: '/images/Goldie.png',
            value: ':AU_yelloflushed:',
            group: 'uniswap',
        },
        {
            image: '/images/Nanami.jpg',
            value: ':icon1:',
            group: 'crypto',
        },
        {
            image: '/images/Naoki.jpg',
            value: ':icon2:',
            group: 'among-us',
        },
        {
            image: '/images/Nicolas.png',
            value: ':icon3:',
            group: 'among-us',
        },
        {
            image: '/images/what-is-trading-strategy-1000x375.jpg',
            value: ':icon4:',
            group: 'among-us',
        },
    ],
    [
        {
            image: '/images/Goldie.png',
            value: ':AU_yelloflushed:',
            group: 'among-us',
        },
        {
            image: '/images/Nanami.jpg',
            value: ':icon1:',
            group: 'among-us',
        },
        {
            image: '/images/Naoki.jpg',
            value: ':icon2:',
            group: 'among-us',
        },
        {
            image: '/images/Nicolas.png',
            value: ':icon3:',
            group: 'among-us',
        },
        {
            image: '/images/what-is-trading-strategy-1000x375.jpg',
            value: ':icon4:',
            group: 'among-us',
        },
        {
            image: '/images/2021-04-crypto-cataclysm.jpg',
            value: ':icon5:',
            group: 'among-us',
        },
    ],
]

const fileGroupsDummyData: FileGroupType[] = [
    {
        image: '/images/bitcoin-btc-logo.png',
        name: 'Recent',
        value: 'recent',
    },
    {
        image: '/images/uniswap-uni-logo.png',
        name: 'Top Strategy',
        value: 'top-1',
    },
    {
        image: '/images/dot-logo.png',
        name: 'Among Us',
        value: 'amount-us',
    },
];


const fileDummyData: FileType[][] = [
    [
        {
            image: '/images/Goldie.png',
            name: 'strategy 1',
            percentage: 0.5,
            chartData: [],
            value: ':AU_yelloflushed:',
            group: 'top-1',
        },
        {
            image: '/images/Nanami.jpg',
            name: 'strategy 2',
            percentage: 0.5,
            chartData: [],
            value: ':icon1:',
            group: 'recent',
        },
        {
            image: '/images/Naoki.jpg',
            name: 'strategy 3',
            percentage: 0.5,
            chartData: [],
            value: ':icon2:',
            group: 'top-1',
        },
        {
            image: '/images/Nicolas.png',
            name: 'strategy 4',
            percentage: 0.5,
            chartData: [],
            value: ':icon3:',
            group: 'top-1',
        },
        {
            image: '/images/what-is-trading-strategy-1000x375.jpg',
            name: 'strategy 5',
            percentage: 0.5,
            chartData: [],
            value: ':icon4:',
            group: 'top-1',
        },
    ],
]