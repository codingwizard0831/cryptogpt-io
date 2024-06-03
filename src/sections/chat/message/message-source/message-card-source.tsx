import React from 'react';

import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Box, List, alpha, Stack, IconButton, Typography, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import CardFlip from 'src/components/card-flip/card-flip';
import { usePopover } from 'src/components/custom-popover';
import { Meteors } from 'src/components/card/card-meteor/card-meteor';
import StyledPopover from 'src/components/styled-component/styled-popover';

const MessageCardSource: React.FC = () => {
    const sourcePopover = usePopover();

    const moreClickHandle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        sourcePopover.onOpen(e);
    }

    return <CardFlip
        sx={{
            height: "120px",
        }}
        frontContent={
            <Box sx={{
                p: 1,
                backdropFilter: "blur(10px)",
                backgroundColor: theme => `${alpha(theme.palette.background.default, 0.4)}`,
                borderRadius: 1,
                position: "relative",
                overflow: "hidden",
            }}>
                <Meteors number={20} />
                <Stack direction="row" alignItems="center">
                    <Image
                        alt="avatar"
                        src="/assets/icons/project/ic_bot.svg"
                        sx={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            mr: 1,
                        }} />
                    <Typography variant="subtitle2" sx={{
                        color: theme => theme.palette.text.primary,
                        flex: 1
                    }}>AMAZON</Typography>
                    <IconButton size="small" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => moreClickHandle(e)}>
                        <MoreVertIcon fontSize='small' />
                    </IconButton>

                    <StyledPopover
                        open={Boolean(sourcePopover.open)}
                        anchorEl={sourcePopover.open}
                        onClose={sourcePopover.onClose}
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
                                    <SaveIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Save in Knowlege base" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Iconify icon="gridicons:external" />
                                </ListItemIcon>
                                <ListItemText primary="Visit Website" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ContentPasteIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Copy URL" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ShareIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Share" />
                            </ListItemButton>
                        </List>
                    </StyledPopover>
                </Stack>
                <Typography variant="subtitle2" sx={{
                    color: theme => theme.palette.text.primary,
                }}>What are you trying to do?</Typography>
                <Typography variant="caption" sx={{
                    color: theme => theme.palette.text.secondary,
                }}>What are you trying to do?</Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center"
                }}>
                    <IconButton size="small">
                        <AutoAwesomeIcon sx={{
                            fontSize: '12px'
                        }} />
                    </IconButton>
                    <IconButton size="small">
                        <FavoriteIcon sx={{
                            fontSize: '12px'
                        }} />
                    </IconButton>
                </Box>
            </Box>
        }
        backContent={
            <Box sx={{
                height: "100%",
                p: 1,
                backdropFilter: "blur(10px)",
                backgroundColor: theme => `${alpha(theme.palette.background.default, 0.2)}`,
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
            }}>
                <Meteors number={20} />
                <Typography variant="subtitle2" sx={{
                    color: theme => theme.palette.text.primary,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }}>Insightful exploration of AIs impact on search engine evolution.</Typography>
                <Typography variant="caption" sx={{
                    color: theme => theme.palette.text.secondary,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    display: 'block',
                }}>Relates to Semantic Analysis & User Experience Trends.</Typography>
                <Box flex={1} />
                <Box sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center"
                }}>
                    <IconButton size="small">
                        <SaveIcon sx={{
                            fontSize: '12px'
                        }} />
                    </IconButton>
                    <IconButton size="small">
                        <ShareIcon sx={{
                            fontSize: '12px'
                        }} />
                    </IconButton>
                </Box>
            </Box >
        }
    />
}

export default MessageCardSource;