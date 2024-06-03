import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import { alpha, TextField, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { fData } from 'src/utils/format-number';

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

const ChatbotEdit: React.FC<Props> = ({ open = false, onClose }) => {
    const [avatarUrl, setAvatarUrl] = useState<File | string | null>(null);
    const [model, setModel] = React.useState('');
    const [temperature, setTemperature] = useState<number>(30);

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

    const handleChangeTemperature = (event: Event, newValue: number | number[]) => {
        setTemperature(newValue as number);
    };

    return <StyledDialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
        <DialogTitle textAlign="center">Edit Chatbot Setting</DialogTitle>

        <Box sx={{
            boxShadow: theme => theme.customShadows.dialog,
            borderRadius: 2,
            backdropFilter: 'blur(4px)',
            backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
            pt: 7,
            mt: 7,
            position: 'relative'
        }}>
            <Box sx={{
                position: 'absolute',
                top: '-72px',
                left: 'calc(50% - 72px)',
                borderRadius: '50%',
                // background: 'black',
                backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
                padding: 1.5
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
                <TextField
                    autoFocus
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="Chatbot Name"
                    sx={{
                        mb: 3
                    }}
                />
                <FormControl fullWidth
                    sx={{
                        mb: 3
                    }}
                >
                    <InputLabel id="chatbot-model-label">Modal</InputLabel>
                    <Select
                        labelId="chatbot-model-label"
                        id="chatbot-model"
                        value={model}
                        label="Model"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>GPT 3.5</MenuItem>
                        <MenuItem value={20}>GPT 4.0</MenuItem>
                    </Select>
                </FormControl>
                <Box mb={3}>
                    <Typography variant="subtitle2">Temperature</Typography>
                    <Stack direction='row' alignItems="center" justifyContent="space-between" sx={{

                    }}>
                        <Slider value={temperature} onChange={handleChangeTemperature} aria-labelledby="continuous-slider" sx={{
                            width: 'calc(100% - 24px)'
                        }} />
                        <Typography variant="subtitle2">{temperature}</Typography>
                    </Stack>
                </Box>

                <TextField
                    variant="outlined"
                    rows={3}
                    fullWidth
                    multiline
                    placeholder="Please input the instructions"
                    label="Add instructions"
                />

            </Box>

            <DialogActions sx={{
                justifyContent: 'center'
            }}>
                <Button onClick={() => onClose()} variant="outlined" color="primary">
                    Cancel
                </Button>
                <Button onClick={() => onClose()} variant="contained" color="primary">
                    Update
                </Button>
            </DialogActions>
        </Box>
    </StyledDialog>
}

export default ChatbotEdit;