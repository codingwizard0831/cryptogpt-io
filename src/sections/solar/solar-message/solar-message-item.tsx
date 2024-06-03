import React from "react";

import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Box, alpha, BoxProps, Typography, IconButton, ButtonGroup } from "@mui/material";

import Iconify from "src/components/iconify";

type SolarMessageItemProps = {
    isBot?: boolean;
} & BoxProps;

const SolarMessageItem: React.FC<SolarMessageItemProps> = ({ sx, isBot = false, ...other }: SolarMessageItemProps) => {
    console.log("SolarMessageItem");
    return <Box sx={{
        backdropFilter: 'blur(5px)',
        background: theme => isBot ? alpha(theme.palette.background.default, 0.2) : alpha(theme.palette.primary.main, 0.2),
        boxShadow: 1,
        p: 1,
        borderRadius: '10px',
        position: 'relative',
        mb: 0.5,
        ...sx,
    }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            {
                isBot ? <Iconify icon="carbon:bot" sx={{ width: '16px', height: '16px' }} /> : <Iconify icon="ph:user" sx={{ width: '16px', height: '16px' }} />
            }
            <ButtonGroup sx={{ color: 'white' }}>
                <IconButton size="small" sx={{
                }}>
                    <AutoAwesomeIcon sx={{
                        fontSize: '14px',
                        color: 'white',
                    }} />
                </IconButton>
                <IconButton size="small" sx={{
                }}>
                    <ContentPasteIcon sx={{
                        fontSize: '14px',
                        color: 'white',
                    }} />
                </IconButton>
                <IconButton size="small" sx={{
                }}>
                    <CloseIcon sx={{
                        fontSize: '14px',
                        color: 'white',
                    }} />
                </IconButton>
            </ButtonGroup>
        </Box>
        <Typography variant="body2" sx={{
        }}>
            Fizemos um sistema web que nos foi entregue, mas que ainda não conseguimos iniciar a sua utilização porque tem vários pontos a serem ajustados, sejam eles bugs ou ajustes de funcionalidades, como por exemplo o sistema demora a atualizar as informações que colocamos nele, muitas vezes só atualiza as... View more
        </Typography>
    </Box>;
}

export default SolarMessageItem;