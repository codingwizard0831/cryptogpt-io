'use client';

import React from "react";

import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

import KnowledgeInput from "src/sections/knowledge/knowledge-input";

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    const settings = useSettingsContext();

    return (<Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
        width: '100%',
        height: '100%',
        pb: 2,
    }}>
        <Box sx={{
            width: 1,
            height: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.background.default, 0.04),
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
            flex: 1,
            p: 2,
            position: 'relative',
        }}>
            <Box sx={{
                flex: 1,
                height: '0',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflowX: "hidden",
                overflowY: "auto",
            }}>
                {children}

                <Box sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    p: 2,
                    width: "100%",
                    zIndex: 20,
                }}>
                    <KnowledgeInput />
                </Box>
            </Box>
        </Box>
    </Container>
    );
}
