import React from "react"

import { Box, alpha, BoxProps, IconButton } from "@mui/material";

import Iconify from "src/components/iconify";

import DeliverOrdersDrawer from "./order-section/deliver-orders-drawer";

export interface DeliverOrderBarProps extends BoxProps {

}

export default function DeliverOrdersBar({ sx, ...other }: DeliverOrderBarProps) {
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
                    <Iconify icon="fluent-emoji-high-contrast:shopping-cart" />
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

            <DeliverOrdersDrawer open={drawerOpen} onOpen={() => setDrawerOpen(true)} onClose={() => setDrawerOpen(false)} />
        </>
    )
}