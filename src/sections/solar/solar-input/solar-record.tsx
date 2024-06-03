import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import { useRef, useState, useEffect, useCallback } from 'react';
// import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';

import Box from '@mui/material/Box';
import { BoxProps } from '@mui/system';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Tab, Tabs, alpha, Switch, Button, MenuItem, useTheme, Typography, InputLabel, FormControl, DialogTitle } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

type AudioRecorderProps = {
    recordDialogFlag: {
        onTrue: () => void;
        onFalse: () => void;
    }
} & BoxProps;

const AudioRecorder: React.FC<AudioRecorderProps> = ({ recordDialogFlag, sx, ...other }: AudioRecorderProps) => {
    const theme = useTheme();
    const [recordTab, setRecordTab] = useState<string>("wavesurfer");
    const micRef = useRef<HTMLElement | string>("");
    const recordRef = useRef<HTMLElement | string>("");
    const [recordedAudioWavesurfer, setRecordedAudioWavesurfer] = useState<WaveSurfer | null>(null);
    const [record, setRecord] = useState<RecordPlugin | null>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
    const [scrollingWaveform, setScrollingWaveform] = useState<boolean>(false);
    const isRecording = useBoolean();
    const isPaused = useBoolean();
    const recordedAudioIsPaused = useBoolean(true);
    const [recordedUrl, setRecordedUrl] = useState("");

    useEffect(() => {
        if (micRef.current && recordRef.current) {
            const ws = WaveSurfer.create({
                container: micRef.current,
                height: 100,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
            });

            ws.on('ready', () => {
                console.log('WaveSurfer is ready');
            });

            ws.on('error', (e) => {
                console.error(e);
            });

            RecordPlugin.getAvailableAudioDevices().then((availableDevices) => {
                // console.log("Available devices", availableDevices);
                setDevices(availableDevices);
                if (availableDevices.length > 0) {
                    setSelectedDeviceId(availableDevices[0].deviceId);
                }
            });

            const recordInstance = ws.registerPlugin(RecordPlugin.create({ scrollingWaveform, renderRecordedAudio: false }));
            setRecord(recordInstance);
            recordInstance.on('record-end', (blob) => {
                const _recordedUrl = URL.createObjectURL(blob);
                setRecordedUrl(_recordedUrl);
                (recordRef.current as HTMLElement).innerHTML = '';
                const wavesurferInstance = WaveSurfer.create({
                    container: recordRef.current,
                    height: 100,
                    waveColor: 'rgb(200, 100, 0)',
                    progressColor: 'rgb(100, 50, 0)',
                    url: _recordedUrl,
                });
                setRecordedAudioWavesurfer(wavesurferInstance);
                wavesurferInstance.on('pause', () => {
                    recordedAudioIsPaused.onTrue();
                })
                wavesurferInstance.on('play', () => {
                    recordedAudioIsPaused.onFalse();
                })
            })

            return () => ws.destroy();
        }
        return undefined;
    }, [scrollingWaveform]);

    const handleDeviceChange = (event: SelectChangeEvent) => {
        setSelectedDeviceId(event.target.value);
    };

    const handleScrollingWaveformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScrollingWaveform(event.target.checked);
    };

    const handleRecord = () => {
        if (record && (record.isRecording() || record.isPaused())) {
            record.stopRecording();
            isRecording.onFalse();
            isPaused.onFalse();
            return
        }

        if (selectedDeviceId) {
            if (record) {
                record.startRecording({ deviceId: selectedDeviceId }).then(() => {
                    isRecording.onTrue();
                }).catch((err) => {
                    console.error(err);
                });
            }
        }
    };

    const handlePause = () => {
        if (record) {
            if (record.isPaused()) {
                record.resumeRecording();
                isPaused.onFalse();
                return
            }
            record.pauseRecording();
            isPaused.onTrue();
        }
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then((stream) => {
                const audioTracks = stream.getAudioTracks();
                console.log('Available audio devices:', audioTracks);
                stream.getTracks().forEach(track => track.stop()); // Stop the media stream
            })
            .catch((err) => {
                console.error('Error accessing media devices:', err);
            });
    }, [scrollingWaveform]);

    const downloadHandle = () => {
        const filename = 'recordedaudio.webm';

        const link = document.createElement('a');
        link.href = recordedUrl;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const recordedAudioPlayPause = () => {
        if (recordedAudioWavesurfer) {
            recordedAudioWavesurfer.playPause();
        }
    }


    const handleRecordChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setRecordTab(newValue);
    }, []);

    return (
        <>
            <DialogTitle textAlign="center">CREATE  NEW PROJECT &  Ai AGENT</DialogTitle>
            <Box sx={{
                backgroundColor: alpha(theme.palette.background.default, 0.2),
                boxShadow: theme.customShadows.dialog,
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                maxWidth: '600px',
                width: '90vw',
                pt: 5,
                mt: 5,
                position: 'relative',
            }}>

                <Box sx={{
                    position: 'absolute',
                    top: '-50px',
                    left: 'calc(50% - 50px)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50%',
                    flex: '1 1 auto',
                    overflowY: 'auto'
                }}>
                    <Box sx={{
                        width: '100px',
                        height: '100px',
                        padding: 1.5,
                    }}>
                        <Iconify icon="fluent:mic-record-20-filled" color="white" sx={{
                            width: '100%',
                            height: '100%',
                        }} />
                    </Box>
                </Box>

                <Typography variant="h6" sx={{
                    color: 'white',
                }}>
                    Recording
                </Typography>

                <Tabs value={recordTab} onChange={handleRecordChangeTab} sx={{
                    '& .MuiTabs-indicator': {
                        backgroundColor: 'white',
                    },
                    '& .MuiTab-root': {
                        color: 'white',
                    }
                }}>
                    <Tab label="Record" value="wavesurfer" />
                    <Tab label="Premium" value="premium" />
                </Tabs>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flex: 1,
                    my: 1,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        {
                            record && !isRecording.value ?
                                <Button variant='contained' color='primary' startIcon={<RadioButtonCheckedIcon />} sx={{ mr: 1, }} onClick={handleRecord}>Start</Button>
                                :
                                <Button variant='contained' color='primary' startIcon={<StopIcon />} sx={{ mr: 1, }} onClick={handleRecord}>Stop</Button>
                        }

                        {
                            (record && isRecording.value) ? <>
                                {
                                    !isPaused.value ? <Button variant='contained' color='primary' sx={{ mr: 1, }} startIcon={<PauseIcon />} onClick={handlePause}>Pause</Button>
                                        :
                                        <Button variant='contained' color='primary' sx={{ mr: 1, }} startIcon={<PlayArrowIcon />} onClick={handlePause}>Resume</Button>
                                }
                            </> : ''
                        }
                        <FormControl size='small' sx={{ width: '200px' }}>
                            <InputLabel id="mic-select-label">Mic</InputLabel>
                            <Select
                                labelId="mic-select-label"
                                id="mic-select"
                                value={selectedDeviceId}
                                label="Age"
                                onChange={handleDeviceChange}
                            >
                                {
                                    devices.map((device: any, index: number) => (
                                        <MenuItem key={index} value={device.deviceId}>{device.label}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Switch
                        checked={scrollingWaveform}
                        onChange={handleScrollingWaveformChange}
                        sx={{
                            ml: 1
                        }} />
                </Box>
                <Box ref={micRef} sx={{
                    width: '100%',
                    minHeight: '100px',
                    height: '100px',
                    border: `1px solid ${theme.palette.primary.main}`,
                    mb: 1,
                }} />

                <Box sx={{
                    display: recordedAudioWavesurfer ? 'block' : 'none'
                }}>
                    <Box ref={recordRef} sx={{
                        width: '100%',
                        height: '100px',
                        minHeight: '100px',
                        mb: 1,
                    }} />

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                        {
                            recordedAudioIsPaused.value ?
                                <Button variant='contained' color='primary' startIcon={<PlayArrowIcon />} onClick={recordedAudioPlayPause}>Play</Button>
                                :
                                <Button variant='contained' color='primary' startIcon={<PauseIcon />} onClick={recordedAudioPlayPause}>Pause</Button>
                        }
                        <Button variant='outlined' color='primary' sx={{ ml: 1, textDecoration: 'underline' }} startIcon={<CloudDownloadIcon />} onClick={() => downloadHandle()}>Download recording</Button>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant='contained' color='primary' startIcon={<SettingsVoiceIcon sx={{
                        fontSize: "8px",
                    }} />}>Record</Button>
                    <Button variant='outlined' color='primary' onClick={recordDialogFlag.onFalse}>Cancel</Button>
                </Box>
            </Box>
        </>
    );
};

export default AudioRecorder;
