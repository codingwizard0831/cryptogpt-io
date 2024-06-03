import React, { useState } from "react";

import List from '@mui/material/List';
import Popover from '@mui/material/Popover';
import { alpha, styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Avatar, Button, ListItem, IconButton, Typography, ListItemAvatar } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import Image from "src/components/image";
import { usePopover } from "src/components/custom-popover";

import ChatbotEdit from "../conversation/chatbot-edit";


type Props = {

};

const ChatbotSelector: React.FC<Props> = (props) => {
    const chatbotEditDialog = useBoolean();
    const [bot, setBot] = useState(0);
    const popover = usePopover();
    const [botData, setBotData] = useState([1, 2, 3, 4]);

    const selectBotHandle = (botIndex: number) => {
        popover.onClose();
        setBot(1);
    }

    const handleClickSetting = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        chatbotEditDialog.onTrue();
    }

    const StyledPopover = styled(Popover)({
        '&.MuiPopover-root': {
            '& .MuiPaper-root': {
                backdropFilter: "none",
                backgroundColor: "transparent",
                boxShadow: "none",
                backgroundImage: "none",
                padding: "0px",
            }
        },
    });

    return <>
        {
            bot ?
                <Box
                    onClick={popover.onOpen}
                    sx={{
                        width: "300px",
                        height: '50px',
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        borderRadius: 1,
                        padding: 0.5,
                        paddingLeft: 2,
                        backgroundColor: (theme) => alpha(theme.palette.background.neutral, 0.04),
                        border: (theme) => `solid 1px ${alpha(theme.palette.primary.main, 0.5)}`,
                        cursor: "pointer"
                    }}>
                    <Box
                        aria-describedby="chatbot-selector-popover"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        <Typography variant='subtitle1' fontSize="16px">Angular Bot</Typography>
                        <Typography variant='body1' fontSize="10px">Chat GPT 4</Typography>
                    </Box>
                    <IconButton
                        size="small"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClickSetting(e)}
                    >
                        <SettingsIcon fontSize='small' />
                    </IconButton>
                </Box> :
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                        whiteSpace: "nowrap",
                        minWidth: '172px',
                        height: '50px',
                        backdropFilter: "blur(10px)",
                    }}
                    onClick={popover.onOpen}
                >
                    <Image
                        alt="avatar"
                        src="/assets/icons/project/ic_bot.svg"
                        sx={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            marginRight: "6px"
                        }}
                    />
                    My Ai Engine
                </Button>
        }

        <StyledPopover
            open={Boolean(popover.open)}
            anchorEl={popover.open}
            onClose={popover.onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            sx={{
            }}
        >
            <List sx={{
                width: "400px",
            }}>
                {
                    botData.map((item, index) => <Chatbot key={index} onClick={() => { setBot(1); popover.onClose() }} />)
                }

            </List>
        </StyledPopover>

        <ChatbotEdit open={chatbotEditDialog.value} onClose={chatbotEditDialog.onFalse} />
    </>
}

export default ChatbotSelector;

type botProps = {
    bot?: number,
    onClick: Function
}

const Chatbot: React.FC<botProps> = ({ bot = 0, onClick }) => {
    const selectBotHandle = () => {
        onClick();
    }
    return <ListItem
        onClick={() => { selectBotHandle() }}
        sx={{
            borderRadius: 1,
            backgroundColor: (theme) => `${alpha(theme.palette.background.default, 0.2)}`,
            backdropFilter: "blur(10px)",
            border: (theme) => `solid 1px ${alpha(theme.palette.divider, 0.2)}`,
            boxShadow: (theme) => theme.shadows[1],
            marginTop: 1,
            cursor: 'pointer'
        }}>
        <ListItemAvatar>
            <Avatar>
                <Image
                    alt="avatar"
                    src="/assets/icons/project/ic_bot.svg"
                    sx={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                    }}
                />
            </Avatar>
        </ListItemAvatar>
        <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle2" fontSize="16px">Angular Bot</Typography>
            <Box sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography variant="body2" fontSize="10px" sx={{ whiteSpace: "nowrap" }}>Chat GPT 4</Typography>
                <LinearProgress key="color" value={10} variant="determinate" sx={{
                    width: "80px",
                    color: (theme) => theme.palette.primary.main
                }} />
            </Box>
        </Box>
    </ListItem>
}