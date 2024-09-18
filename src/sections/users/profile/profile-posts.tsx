'use client';

import { useRef } from 'react';

import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Avatar, BoxProps, Checkbox, Typography, IconButton, AvatarGroup, FormControlLabel, avatarGroupClasses } from '@mui/material';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { _userFeeds } from 'src/_mock';

import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function ProfilePosts({ sx, ...other }: BoxProps) {
    const fileRef = useRef<HTMLInputElement>(null);

    const handleAttach = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };

    const renderPostInput = (
        <Card sx={{
            backdropFilter: 'none',
            p: 2,
        }}>
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mb: 2,
                ...sx,
            }}
            {...other}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>Posts</Typography>
            <Stack spacing={3}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    <Typography variant="body2">Posts: 15</Typography>
                    <Typography variant="body2">Upvotes: 100</Typography>
                    <Typography variant="body2">Comments: 100</Typography>
                </Box>

                {renderPostInput}

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}>
                    {
                        _userFeeds.map((post) => (
                            <PostListItem key={post.id} post={post} />
                        ))
                    }
                </Box>

                {/* {_userFeeds.map((post) => (
                    <ProfilePostItem key={post.id} post={post} />
                ))} */}
            </Stack>
        </Box>
    );
}

const PostListItem = ({
    post
}: {
    post: any
}) => {
    const { user } = useMockedUser();

    return (
        <Card sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'space-between',
            borderRadius: 1,
            backdropFilter: 'none',
            p: 1,
        }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                <Avatar src={user?.photoURL} alt={user?.displayName}>
                    {user?.displayName?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>{user?.displayName}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{fDate(post.createdAt)}</Typography>
                </Box>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    p: 1,
                }}
            >
                <Box sx={{ flexGrow: 1 }} />

                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked
                            color="error"
                            icon={<Iconify icon="solar:heart-bold" />}
                            checkedIcon={<Iconify icon="solar:heart-bold" />}
                        />
                    }
                    label={fShortenNumber(post.personLikes.length)}
                    sx={{ mr: 1 }}
                />

                {!!post.personLikes.length && (
                    <AvatarGroup
                        sx={{
                            [`& .${avatarGroupClasses.avatar}`]: {
                                width: 32,
                                height: 32,
                            },
                        }}
                    >
                        {post.personLikes.map((person) => (
                            <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
                        ))}
                    </AvatarGroup>
                )}

                <IconButton>
                    <Iconify icon="solar:chat-round-dots-bold" />
                </IconButton>

                <IconButton>
                    <Iconify icon="solar:share-bold" />
                </IconButton>
            </Stack>
        </Card>
    );
}