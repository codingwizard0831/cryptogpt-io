import React from "react";

import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { Box, alpha, useTheme, IconButton } from "@mui/material";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";

import DeliverYourOrderSection from "./deliver-your-order-section";

type DeliverYourOrderDrawerProps = {
    id: string;
    open?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
}

export default function DeliverYourOrderDrawer({ id, open = false, onOpen, onClose }: DeliverYourOrderDrawerProps) {
    const theme = useTheme();

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            slotProps={{
                backdrop: { invisible: true },
            }}
            sx={{
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: alpha(theme.palette.background.default, 0.4),
                    backdropFilter: 'blur(10px)',
                    boxShadow: 3,
                    p: 2,
                    width: 480,
                },
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                my: 2,
            }}>
                <IconButton onClick={handleClose} sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    color: 'white',
                }}>
                    <Iconify icon="material-symbols:close" />
                </IconButton>
            </Box>

            <Scrollbar>
                <DeliverYourOrderSection isDrawer id={id} />
            </Scrollbar>
        </Drawer>
    )
}