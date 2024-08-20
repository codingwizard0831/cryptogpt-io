'use client';

import React, { useState, useEffect } from 'react';

import {
    Box,
    Card,
    Table,
    alpha,
    Button,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Typography,
    CircularProgress
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

interface MediaSummaryItem {
    count: number;
    size: number;
}

interface MediaSummary {
    [key: string]: MediaSummaryItem;
}

const defaultMediaSummary: MediaSummary = {
    Video: { count: 0, size: 0 },
    Youtube: { count: 0, size: 0 },
    Image: { count: 0, size: 0 },
    Audio: { count: 0, size: 0 },
    Document: { count: 0, size: 0 },
};

const OverviewMediaStorage: React.FC = () => {
    const { user } = useAuthContext();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [mediaSummary, setMediaSummary] = useState<MediaSummary>(defaultMediaSummary);

    useEffect(() => {
        const fetchMediaStorageData = async () => {
            if (!user?.id) {
                console.error('User ID not available');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`${endpoints.dashboard.media_storage}?user_id=${user.id}`);
                if (response.data && response.data.summary) {
                    setMediaSummary(response.data.summary);
                    setLoading(true);
                } else {
                    console.error('Unexpected data structure:', response.data);
                    setMediaSummary({});
                }
            } catch (error) {
                console.error('Error fetching media storage data:', error);
                setMediaSummary(defaultMediaSummary);
            } finally {
                setLoading(false);
            }
        };

        fetchMediaStorageData();
    }, [user?.id]);

    const totalSize = Object.values(mediaSummary).reduce((sum, item) => sum + item.size, 0);

    if (loading) {
        return (
            <Card sx={{ color: 'text.primary', p: 2, borderRadius: 2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Card>
        );
    }

    return (
        <Card sx={{ color: 'text.primary', p: 3, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                    Media storage
                </Typography>
                <Button variant="text" color="primary" onClick={() => router.replace(paths.dashboard.files)}>
                    View Files
                </Button>
            </Box>

            <Table sx={{
                "& tr": { px: 1 },
                "& td,th": { py: 0.5, px: 2 },
                "& tbody tr": {
                    py: 0.5,
                    transition: 'background-color 0.3s',
                    "&:hover": {
                        backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1)
                    },
                },
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary' }}>File type</TableCell>
                        <TableCell align="right" sx={{ color: 'text.secondary' }}>Number of files</TableCell>
                        <TableCell align="right" sx={{ color: 'text.secondary' }}>Size</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(mediaSummary).map(([type, item]) => (
                        <TableRow key={type} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" sx={{ color: 'text.primary' }}>
                                {type}
                            </TableCell>
                            <TableCell align="right" sx={{ color: 'text.primary' }}>{item.count}</TableCell>
                            <TableCell align="right" sx={{ color: 'text.primary' }}>{formatSize(item.size)}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                            Total size
                        </TableCell>
                        <TableCell align="right" />
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{formatSize(totalSize)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
};

// Helper function to format size in bytes to a more readable format
const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};

export default OverviewMediaStorage;