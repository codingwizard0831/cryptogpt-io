'use client';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Card, Avatar, IconButton, Typography } from '@mui/material';

import Image from 'src/components/image/image';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import DiscoverItem from './discover-item/discover-item';

// ----------------------------------------------------------------------

export default function DiscoverView() {
    const settings = useSettingsContext();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <Box
                sx={{
                    width: 1,
                    height: 1,
                    borderRadius: 2,
                    overflowX: "hidden",
                    overflowY: "auto",
                    bgcolor: (theme) => alpha(theme.palette.background.default, 0.2),
                    backdropFilter: 'blur(10px)',
                    border: (theme) => `dashed 1px ${theme.palette.divider}`,
                }}
            >
                <Scrollbar>
                    <Box sx={{
                        width: "100%",
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
                        gap: 2,
                        p: 2,
                    }}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => <DiscoverItem key={index} />)
                        }
                    </Box>
                </Scrollbar>
            </Box>
        </Container>
    );
}
