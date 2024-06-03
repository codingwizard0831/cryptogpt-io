import React, { useState, useCallback } from 'react';

import { alpha, styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import PersonIcon from '@mui/icons-material/Person';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SubjectIcon from '@mui/icons-material/Subject';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssistantIcon from '@mui/icons-material/Assistant';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, List, Stack, Button, MenuItem, IconButton, Typography, InputLabel, FormControl, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import UploadBox from 'src/components/upload/upload-box';
import { MultiFilePreview } from 'src/components/upload';
import { usePopover } from 'src/components/custom-popover';
import TextGenerateEffect from 'src/components/text-effect/text-effect';
import StyledPopover from 'src/components/styled-component/styled-popover';
import { useDateRangePicker } from 'src/components/custom-date-range-picker';
import CustomDateRangePicker from 'src/components/custom-date-range-picker/custom-date-range-picker';

import MessageSource from './message-source';
import MessageCrypto from './message-crypto';

type Props = {
    isBot?: Boolean
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
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

const Message: React.FC<Props> = ({ isBot = false }) => {
    const [textForEdit] = useState();
    const editStatus = useBoolean();
    const [files, setFiles] = useState<(File | string)[]>([]);
    const morePopover = usePopover();
    const [filterDate, setFilterDate] = useState('any');
    const rangeCalendarPicker = useDateRangePicker(new Date(), null);
    // const [specialDateLabel, setSpecialDateLabel] = useState('Special date');

    const editHandle = () => {
        editStatus.onTrue()
    }

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

    const handleFilterDateChange = (event: SelectChangeEvent) => {
        setFilterDate(event.target.value as string);
        // if (event.target.value === 'special' && rangeCalendarPicker) {
        //     rangeCalendarPicker?.onOpen();
        // }
    };

    return <Box sx={{
        width: "100%",
        borderRadius: '0px 10px 10px 0px',
        borderLeft: theme => `3px solid ${isBot ? 'white' : alpha(theme.palette.primary.main, 0.8)}`,
        padding: 1,
        paddingTop: 2,
        paddingLeft: 2,
        mt: 2,
        backgroundColor: theme => alpha(theme.palette.background.default, isBot ? 0.1 : 0.3),
        backdropFilter: "blur(2px)",
        outline: "2px"
    }}>
        <Box sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between"
        }}>
            {
                isBot ? <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Image
                        alt="avatar"
                        src="/assets/icons/project/ic_bot.svg"
                        sx={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                        }}
                    />
                    <Typography variant="subtitle1" sx={{
                        color: theme => theme.palette.text.primary,
                        ml: 1
                    }}>What are you trying to do?</Typography>
                </Box> : <PersonIcon sx={{
                    fontSize: "36px",
                }} />
            }
            <Stack alignItems="center" direction="row">
                {
                    isBot ? (
                        <>
                            <IconButton size="small">
                                <AutoAwesomeIcon fontSize='small' />
                            </IconButton>
                            <IconButton size="small">
                                <FlashOnIcon fontSize='small' />
                            </IconButton>
                            <IconButton size="small">
                                <FavoriteIcon fontSize='small' />
                            </IconButton>
                            <IconButton size="small" onClick={morePopover.onOpen}>
                                <MoreVertIcon fontSize='small' />
                            </IconButton>


                            <StyledPopover
                                open={Boolean(morePopover.open)}
                                anchorEl={morePopover.open}
                                onClose={morePopover.onClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                }}
                            >
                                <List>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ContentPasteIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Copy" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <TroubleshootIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Search deeper" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <AddIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Create agent/project" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ShareIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Share" />
                                    </ListItemButton>
                                </List>

                            </StyledPopover>
                        </>
                    ) : <>
                        {
                            editStatus.value ? <>
                                <Button variant="outlined" startIcon={<SendIcon />} onClick={editStatus.onFalse} sx={{
                                    marginRight: 0.5
                                }} >
                                    Send
                                </Button>
                                <Button variant="outlined" startIcon={<CloseIcon />} onClick={editStatus.onFalse} sx={{
                                    marginRight: 0.5
                                }} >
                                    Close
                                </Button>
                            </>
                                :
                                <>
                                    <IconButton edge="end" aria-label="edit" size="small" onClick={() => editHandle()}>
                                        <EditIcon fontSize='small' />
                                    </IconButton>
                                    <IconButton size="small">
                                        <AssistantIcon fontSize='small' />
                                    </IconButton>
                                </>
                        }
                    </>
                }
            </Stack>
        </Box>

        {
            isBot ? <Box>
                <Box sx={{
                    mb: 2
                }}>
                    {/* Source Header */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
                        my: 1
                    }} >
                        <Stack direction="row" alignItems="center">
                            <Iconify icon="grommet-icons:resources" />
                            <Typography variant="caption" sx={{
                                ml: 1
                            }}>Sources (total: 6)</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <SortIcon />
                            <FormControl
                                sx={{
                                    ml: 1
                                }}
                                size="small"
                            >
                                <InputLabel id="chatbot-date-label">Sort</InputLabel>
                                <Select
                                    labelId="chatbot-date-label"
                                    value={filterDate}
                                    label="Model"
                                    onChange={handleFilterDateChange}
                                    size='small'
                                >
                                    <MenuItem value="any">Any time</MenuItem>
                                    <MenuItem value="day">24 hours ago</MenuItem>
                                    <MenuItem value="week">Last week</MenuItem>
                                    <MenuItem value="month">Last month</MenuItem>
                                    <MenuItem value="year">Last year</MenuItem>
                                    <MenuItem value="special">Special date</MenuItem>
                                </Select>
                            </FormControl>


                            <CustomDateRangePicker
                                variant="calendar"
                                open={rangeCalendarPicker.open}
                                startDate={rangeCalendarPicker.startDate}
                                endDate={rangeCalendarPicker.endDate}
                                onChangeStartDate={rangeCalendarPicker.onChangeStartDate}
                                onChangeEndDate={rangeCalendarPicker.onChangeEndDate}
                                onClose={rangeCalendarPicker.onClose}
                                error={rangeCalendarPicker.error}
                            />
                        </Stack>
                    </Stack>

                    {/* Source Card List */}
                    <MessageSource />

                    {/* Crypto Card List */}
                    <MessageCrypto />
                </Box>

                {/* Answer Main Message */}
                <Box sx={{
                    mb: 2
                }}>
                    <Stack direction="row" alignItems="center">
                        <SubjectIcon />
                        <Typography variant="caption" sx={{
                            ml: 1
                        }}>Answer</Typography>
                    </Stack>
                    <Box component="pre" sx={{
                        whiteSpace: 'pre-wrap', // Allows text to wrap
                        wordBreak: 'break-word', // Breaks long words
                    }}>This is the example sentence</Box>
                </Box>

                {/* Relatd */}
                <Box>
                    <Stack direction="row" alignItems="center">
                        <AutoAwesomeMotionIcon fontSize='small' />
                        <Typography variant="caption" sx={{
                            ml: 1
                        }}>Related</Typography>
                    </Stack>
                    <Box sx={{
                        overflow: "hidden",
                    }}>
                        {
                            [1, 2, 3].map((item, index) => <Box key={`key-${index}`} sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                                borderTop: theme => `1px solid transparent`,
                                marginBottom: '-1px',
                            }}>
                                <Typography variant="caption">What are you trying to do?</Typography>
                                <IconButton size="small">
                                    <AddIcon fontSize='small' />
                                </IconButton>
                            </Box>)
                        }
                    </Box>
                </Box>
            </Box>
                : <>
                    {
                        editStatus.value ? <Stack>
                            <Box sx={{
                                display: 'flex'
                            }}>
                                <MultiFilePreview files={files} thumbnail onRemove={handleRemoveFile} sx={{
                                    width: '50px',
                                    height: '50px',
                                }} />
                                <UploadBox
                                    multiple
                                    thumbnail
                                    files={files}
                                    onDrop={handleDropMultiFile}
                                    onRemove={handleRemoveFile}
                                    onRemoveAll={handleRemoveAllFiles}
                                    onUpload={() => console.info('ON UPLOAD')}
                                    sx={{
                                        width: '50px',
                                        height: '50px'
                                    }}
                                />
                            </Box>
                            <Box py={1}>
                                <Textarea value={textForEdit} onChange={() => console.log('change')} />
                            </Box>
                        </Stack> :
                            <Box py={1} sx={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                {/* <Textarea value="This is the example sentence." /> */}
                                <TextGenerateEffect words="Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows" />
                            </Box>
                    }
                </>
        }

        <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
        }}>
            <Typography variant="caption" sx={{
                color: theme => theme.palette.text.secondary,
                ml: 1
            }}>{fToNow(new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 10))}</Typography>
        </Box>
    </Box>
}

export default Message;