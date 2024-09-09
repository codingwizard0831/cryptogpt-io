import React from 'react';

import { Stack, alpha, IconButton, Typography, StackProps } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useChatbot } from "src/store/chatbox/useChatbot";

import Iconify from 'src/components/iconify';

interface SearchBarGoldieProps extends StackProps {
}

export default function SearchBarGoldie({
    sx,
    ...other
}: SearchBarGoldieProps) {
    const smUp = useResponsive("up", 'sm');

    const setIsShow = useChatbot((state) => state.setIsShow);
    return <Stack direction="row" alignItems="center" justifyContent="space-between"
        sx={{
            borderRadius: 4,
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
            boxShadown: theme => `0px 0px 10px 3px ${alpha(theme.palette.background.opposite, 0.2)}`,
            cursor: 'pointer',
            ...sx,
        }}
        {...other}
        onClick={() => setIsShow(true)}
    >
        <IconButton>
            <Iconify icon="eva:search-fill" sx={{ color: 'primary.main' }} />
        </IconButton>

        {
            smUp &&
            <Typography variant="subtitle2" sx={{
                color: 'primary.main',
                pr: 2,
            }}>Ask Goldie, your AI Assistant</Typography>
        }

    </Stack>
}