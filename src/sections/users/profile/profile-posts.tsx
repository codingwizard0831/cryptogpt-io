'use client';

import { useRef } from 'react';

import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Unstable_Grid2';

import { _userFeeds } from 'src/_mock';

import Iconify from 'src/components/iconify';

import ProfilePostItem from './profile-post-item';

// ----------------------------------------------------------------------

export default function ProfilePosts() {
    const fileRef = useRef<HTMLInputElement>(null);

    const handleAttach = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };

    const renderPostInput = (
        <Card sx={{ p: 3 }}>
            <InputBase
                multiline
                fullWidth
                rows={4}
                placeholder="Share what you are thinking here..."
                sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: 1,
                    border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
                }}
            />

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                    <Fab size="small" color="inherit" variant="softExtended" onClick={handleAttach}>
                        <Iconify icon="solar:gallery-wide-bold" width={24} sx={{ color: 'success.main' }} />
                        Image/Video
                    </Fab>

                    <Fab size="small" color="inherit" variant="softExtended">
                        <Iconify icon="solar:videocamera-record-bold" width={24} sx={{ color: 'error.main' }} />
                        Streaming
                    </Fab>
                </Stack>

                <Button variant="contained">Post</Button>
            </Stack>

            <input ref={fileRef} type="file" style={{ display: 'none' }} />
        </Card>
    );


    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={8}>
                <Stack spacing={3}>
                    {renderPostInput}

                    {_userFeeds.map((post) => (
                        <ProfilePostItem key={post.id} post={post} />
                    ))}
                </Stack>
            </Grid>
        </Grid>
    );
}