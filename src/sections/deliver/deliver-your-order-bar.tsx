import React from "react"

import { Box, alpha, BoxProps, IconButton } from "@mui/material";

import Iconify from "src/components/iconify";

import DeliverYourOrderDrawer from "./order-section/deliver-your-order-drawer";

export interface DeliverOrderBarProps extends BoxProps {
    id: string;
}

export default function DeliverYourOrderBar({ id, sx, ...other }: DeliverOrderBarProps) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...sx,
            }} {...other}>
                <IconButton color="primary" sx={{
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                    position: 'relative',
                }} onClick={() => setDrawerOpen(true)}>
                    <Iconify icon="fontisto:shopping-bag-1" />
                    <Box sx={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        fontSize: '11px',
                        backgroundColor: theme => alpha(theme.palette.primary.dark, 0.8),
                        color: 'white',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        lineHeight: '16px',
                    }}>2</Box>
                </IconButton>
            </Box>
            <DeliverYourOrderDrawer id={id} open={drawerOpen} onOpen={() => setDrawerOpen(true)} onClose={() => setDrawerOpen(false)} />
        </>
    )
}