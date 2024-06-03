import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DraftsIcon from '@mui/icons-material/Drafts';
import DialogActions from '@mui/material/DialogActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { alpha, Avatar, Tooltip, Checkbox, TextField, Typography, IconButton, FormControlLabel } from '@mui/material';

import { fData } from 'src/utils/format-number';

import Image from 'src/components/image';
import { MultiFilePreview } from 'src/components/upload';
import UploadBox from 'src/components/upload/upload-box';
import UploadAvatar from 'src/components/upload/upload-avatar';
import { StyledDialog as StyledBasicDialog } from "src/components/styled-component";

const StyledDialog = styled(StyledBasicDialog)({
    '& .MuiDialog-container': {
        '& .MuiDialog-paper': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            backdropFilter: 'none',
            borderRadius: '0px',
        },
    },
});

type Props = {
    open: boolean,
    onClose: () => void
};

const ChatbotCreate: React.FC<Props> = ({ open = false, onClose }) => {
    const [avatarUrl, setAvatarUrl] = useState<File | string | null>(null);
    const [model, setModel] = React.useState('');
    const [privacy, setPrivacy] = React.useState(false);
    const [interaction, setInteraction] = React.useState('');
    const [ecosystem, setEcosystem] = React.useState('public');
    const [temperature, setTemperature] = useState<number>(30);
    const [files, setFiles] = useState<(File | string)[]>([]);
    const [links, setLinks] = useState<string[]>([]);
    const [milestones, setMilestones] = useState<string[]>([]);
    const [usernameList, setUsernameList] = useState<string[]>([]);

    const handleDropAvatar = useCallback((acceptedFiles: File[]) => {
        const newFile = acceptedFiles[0];
        if (newFile) {
            setAvatarUrl(
                Object.assign(newFile, {
                    preview: URL.createObjectURL(newFile),
                })
            );
        }
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setModel(event.target.value as string);
    };

    const handleInteractionChange = (event: SelectChangeEvent) => {
        setInteraction(event.target.value as string);
    };

    const handleEcosystemChange = (event: SelectChangeEvent) => {
        setEcosystem(event.target.value as string);
    };

    const handleChangeTemperature = (event: Event, newValue: number | number[]) => {
        setTemperature(newValue as number);
    };

    const handleDropMultiFile = useCallback(
        (acceptedFiles: File[]) => {
            setFiles([
                ...files,
                ...acceptedFiles.map((newFile) =>
                    Object.assign(newFile, {
                        preview: URL.createObjectURL(newFile),
                    })
                ),
            ]);
        },
        [files]
    );


    const handleRemoveFile = (inputFile: File | string) => {
        const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
        setFiles(filesFiltered);
    };

    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    const [modelFiles, setModelFiles] = useState<(File | string)[]>([]);
    const handleDropMultiModelFile = useCallback(
        (acceptedFiles: File[]) => {
            setModelFiles([
                ...modelFiles,
                ...acceptedFiles.map((newFile) =>
                    Object.assign(newFile, {
                        preview: URL.createObjectURL(newFile),
                    })
                ),
            ]);
        },
        [modelFiles]
    );

    const handleRemoveModelFile = (inputFile: File | string) => {
        const filesFiltered = modelFiles.filter((fileFiltered) => fileFiltered !== inputFile);
        setModelFiles(filesFiltered);
    };

    const handleRemoveAllModelFiles = () => {
        setModelFiles([]);
    };

    const addMilestone = () => {
        setMilestones([...milestones, ""]);
    }

    const addFriend = () => {
        setUsernameList([...usernameList, ""]);
    }

    return <StyledDialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth scroll="body">
        <DialogTitle textAlign="center">CREATE  NEW PROJECT &  Ai AGENT</DialogTitle>

        <Box sx={{
            boxShadow: theme => theme.customShadows.dialog,
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            // backgroundColor: theme => 'black',
            backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
            // backgroundColor: 'transparent',
            pt: 7,
            mt: 7,
            position: 'relative'
        }}>
            <Box sx={{
                position: 'absolute',
                top: '-84px',
                left: 'calc(50% - 78px)',
                backdropFilter: 'blur(4px)',
                backgroundColor: 'transparent',
                borderRadius: '50%',
                padding: 1.5,
                flex: '1 1 auto',
                overflowY: 'auto'
            }}>
                <UploadAvatar
                    file={avatarUrl}
                    onDrop={handleDropAvatar}
                    validator={(fileData) => {
                        if (fileData.size > 1000000) {
                            return {
                                code: 'file-too-large',
                                message: `File is larger than ${fData(1000000)}`,
                            };
                        }
                        return null;
                    }}
                />
            </Box>
            <Box px={2} pt={4}>
                <Tooltip title="Please input the Ai Agent Name" placement="bottom">
                    <TextField
                        autoFocus
                        fullWidth
                        type="text"
                        margin="dense"
                        variant="outlined"
                        label="Ai Agent Name*"
                        sx={{
                            mb: 3
                        }}
                    />
                </Tooltip>
                <Tooltip title="Please input the description" placement="bottom">
                    <TextField
                        multiline
                        autoFocus
                        fullWidth
                        type="text"
                        margin="dense"
                        variant="outlined"
                        label="Description*"
                        sx={{
                            mb: 3
                        }}
                    />
                </Tooltip>
                <Tooltip title="Choose the AI model that will power your agent. Each model has unique capabilities and use cases." placement="bottom">
                    <FormControl fullWidth
                        sx={{
                            mb: 3
                        }}
                    >
                        <InputLabel id="chatbot-model-label">My Ai Engines*</InputLabel>
                        <Select
                            labelId="chatbot-model-label"
                            id="chatbot-model"
                            value={model}
                            label="My Ai Engines*"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>GPT 3.5</MenuItem>
                            <MenuItem value={20}>GPT 4.0</MenuItem>
                            <MenuItem value="custom">Custom LLM</MenuItem>
                        </Select>
                    </FormControl>
                </Tooltip>
                {
                    model === 'custom' && <Tooltip title="Please input the url for the custom Ai model or upload.">
                        <Box sx={{
                            display: 'flex',
                        }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                placeholder="Please input the model"
                                label="Model (Optional)"
                                sx={{
                                    mb: 3
                                }}
                            />
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <MultiFilePreview files={modelFiles} thumbnail onRemove={handleRemoveModelFile} sx={{
                                    width: '55px',
                                    height: '55px',
                                    margin: 0,
                                    marginLeft: 1
                                }} />
                                <UploadBox
                                    thumbnail
                                    files={modelFiles}
                                    onDrop={handleDropMultiModelFile}
                                    onRemove={handleRemoveModelFile}
                                    onRemoveAll={handleRemoveAllModelFiles}
                                    onUpload={() => console.info('ON UPLOAD')}
                                    sx={{
                                        width: '55px',
                                        height: '55px',
                                        margin: 0,
                                        marginLeft: 1
                                    }}
                                />
                            </Box>
                        </Box>
                    </Tooltip>
                }
                <Box mb={3}>
                    <Tooltip title={<Box>
                        <Box>
                            <Typography component="p" sx={{ fontSize: '12px' }}>1,Most Predictable: Highly deterministic, favoring accuracy.</Typography>
                        </Box>
                        <Box>
                            <Typography component="p" sx={{ fontSize: '12px' }}>2,High Precision: Minimal randomness, clear responses.</Typography>
                        </Box>
                        <Box>
                            <Typography component="p" sx={{ fontSize: '12px' }}>3,Slight Variety: A touch of randomness for some variety.</Typography>
                        </Box>
                        <Box>
                            <Typography component="p" sx={{ fontSize: '12px' }}>4,Balanced: Even mix of predictability and creativity.</Typography>
                        </Box>
                        <Box>
                            <Typography component="p" sx={{ fontSize: '12px' }}>5,Moderate Diversity: Fairly creative, with balanced outputs.</Typography>
                        </Box>
                        <Box>
                            <Typography component="p" sx={{ fontSize: '12px' }}>6,Creative: Unique responses with more variability.</Typography>
                        </Box>
                        <Box>
                            <Typography component="p" sx={{ fontSize: '12px' }}>7,High Creativity: Diverse and inventive outputs.</Typography>
                        </Box>
                        <Box>
                            <Typography component="p" sx={{ fontSize: '12px' }}>8,Very Creative: Increased novelty, less predictability.</Typography>
                        </Box>
                        <Box>
                            <Typography component="p" sx={{ fontSize: '12px' }}>9,Extreme Variety: Wide range of inventive outputs.</Typography>
                        </Box>
                        <Box>
                            <Typography component="p" sx={{ fontSize: '12px' }}>10,Max Creativity: Maximum randomness, highly unique.</Typography>
                        </Box>
                    </Box>}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Image
                                alt="avatar"
                                src="/assets/icons/project/openai-svgrepo-com.svg"
                                sx={{
                                    width: '24px',
                                    height: '24px',
                                    color: 'white',
                                    borderRadius: '50%',
                                    marginRight: "6px"
                                }}
                            />
                            <Typography variant="subtitle2"> 🌡️1 for predictable, 100 for highly varied outputs 😜</Typography>
                        </Box>
                    </Tooltip>
                    <Stack direction='row' alignItems="center" justifyContent="space-between" sx={{

                    }}>
                        <Slider value={temperature} onChange={handleChangeTemperature} aria-labelledby="continuous-slider" sx={{
                            width: 'calc(100% - 24px)'
                        }} />
                        <Typography variant="subtitle2">{temperature}</Typography>
                    </Stack>
                </Box>

                <Tooltip title="Select how your agent will communicate. This affects its tone and language in responses." placement="bottom">
                    <FormControl fullWidth
                        sx={{
                            mb: 3
                        }}
                    >
                        <InputLabel id="chatbot-interaction-label">Interaction Style (Optional)</InputLabel>
                        <Select
                            labelId="chatbot-interaction-label"
                            id="chatbot-model"
                            value={interaction}
                            label="Model"
                            onChange={handleInteractionChange}
                        >
                            <MenuItem value="formal">formal</MenuItem>
                            <MenuItem value="casual">casual</MenuItem>
                            <MenuItem value="technical">technical</MenuItem>
                        </Select>
                    </FormControl>
                </Tooltip>

                <Tooltip title="Outline what you aim for your AI agent to learn or achieve. Set clear goals for its development.">
                    <TextField
                        variant="outlined"
                        // rows={3}
                        fullWidth
                        multiline
                        label="Learning Objective (Optional)"
                        sx={{
                            mb: 3
                        }}
                    />
                </Tooltip>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <UploadBox
                        thumbnail
                        files={files}
                        onDrop={handleDropMultiFile}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                        onUpload={() => console.info('ON UPLOAD')}
                        sx={{
                            margin: 0,
                            marginRight: 1,
                            width: '53px',
                            height: '53px'
                        }}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Knowlegdebase (Optional)"
                        InputProps={{
                            endAdornment: (
                                <IconButton edge="end" aria-label="delete" size="small" onClick={() => {
                                    setLinks([...links, ""]);
                                }}>
                                    <AddIcon fontSize='small' />
                                </IconButton>
                            )
                        }}
                    />
                </Box>
                <MultiFilePreview files={files} onRemove={handleRemoveFile} />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mb: 3
                }}>
                    {
                        links.map((link, index) => <TextField
                            key={`Link ${index + 1}`}
                            variant="outlined"
                            fullWidth
                            label={`Link ${index + 1}`}
                            aria-readonly
                            InputProps={{
                                endAdornment: (
                                    <IconButton edge="end" aria-label="delete" size="small" onClick={() => {
                                        const linksFiltered = links.filter((linkFiltered, i) => i !== index);
                                        setLinks(linksFiltered);
                                    }}>
                                        <CloseIcon fontSize='small' />
                                    </IconButton>
                                )
                            }}
                            sx={{
                                mb: 1
                            }}
                        />
                        )
                    }
                </Box>

                <FormControl fullWidth
                    sx={{
                        mb: 1
                    }}
                >
                    <InputLabel id="chatbot-interaction-label">Ecosystem*</InputLabel>
                    <Select
                        labelId="chatbot-interaction-label"
                        id="chatbot-model"
                        value={ecosystem}
                        label="Model"
                        onChange={handleEcosystemChange}
                    >
                        <MenuItem value="private">Space: Cloud (private)</MenuItem>
                        <MenuItem value="public">Web (internet & our network)</MenuItem>
                        <MenuItem value="share">My friends or partners</MenuItem>
                    </Select>
                </FormControl>
                {
                    ecosystem === 'share' ?
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'end',
                            flexDirection: 'column',
                            mb: 3,
                        }}>
                            {
                                usernameList.map((username, index) => <TextField
                                    key={`Username ${index + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    label={`Username ${index + 1}`}
                                    InputProps={{
                                        startAdornment: (
                                            <Avatar alt="person.name" src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg" sx={{
                                                width: '20px',
                                                height: '20px',
                                                pr: 0,
                                                marginRight: '8px'
                                            }} />
                                        ),
                                        endAdornment: (
                                            <IconButton edge="end" aria-label="delete" size="small" onClick={() => {
                                                const usernameListFiltered = usernameList.filter((usernameFiltered, i) => i !== index);
                                                setUsernameList(usernameListFiltered);
                                            }}>
                                                <CloseIcon fontSize='small' />
                                            </IconButton>
                                        )
                                    }}
                                    sx={{
                                        mb: 1
                                    }}
                                />
                                )
                            }
                            <Button variant="contained" color="primary" onClick={addFriend}>Add friend or Partner</Button>
                        </Box> : null
                }

                <Tooltip title="Set and track significant achievements in your agent's development. Use milestones to measure progress.">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'end',
                        flexDirection: 'column',
                        mb: 3,
                    }}>
                        {
                            milestones.map((milestone, index) => <TextField
                                key={`Milestone ${index + 1}`}
                                variant="outlined"
                                fullWidth
                                label={`Milestone ${index + 1}`}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton edge="end" aria-label="delete" size="small" onClick={() => {
                                            const milestonesFiltered = milestones.filter((milestoneFiltered, i) => i !== index);
                                            setMilestones(milestonesFiltered);
                                        }}>
                                            <CloseIcon fontSize='small' />
                                        </IconButton>
                                    )
                                }}
                                sx={{
                                    mb: 1
                                }}
                            />
                            )
                        }
                        <Button variant="contained" color="primary" onClick={addMilestone}>Add Milestone</Button>
                    </Box>
                </Tooltip>

                <Tooltip title="Choose who can interact with or view your AI agent. Private agents are only accessible by you or selected users.">
                    <FormControlLabel
                        value={privacy}
                        label="I agree to the  privacy and terms of use policies."
                        color='primary'
                        control={<Checkbox size="medium" />}
                        sx={{ textTransform: 'capitalize', mb: 1 }}
                        onChange={(event: any) => setPrivacy(event.target.checked)}
                    />
                </Tooltip>
            </Box>

            <DialogActions sx={{
                justifyContent: 'center'
            }}>
                <Tooltip title="Provide information on each action, emphasizing the importance of reviewing settings before deployment.">
                    <Button onClick={() => onClose()} variant="outlined" color="primary" startIcon={<VisibilityIcon />}>
                        Preview
                    </Button>
                </Tooltip>
                <Button onClick={() => onClose()} variant="outlined" color="primary" startIcon={<DraftsIcon />}>
                    Save Draft
                </Button>
                <Button onClick={() => onClose()} variant="outlined" color="primary" startIcon={<AddIcon />}>
                    Deploy
                </Button>
                <Button onClick={() => onClose()} variant="contained" color="primary" startIcon={<CloseIcon />}>
                    Candel
                </Button>
            </DialogActions>
        </Box >
    </StyledDialog >
}

export default ChatbotCreate;