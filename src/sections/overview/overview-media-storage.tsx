'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Button
} from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

interface MediaItem {
    type: string;
    numberOfFiles: number;
    size: number;
}

const mediaItems: MediaItem[] = [
    { type: 'Video', numberOfFiles: 0, size: 0 },
    { type: 'Youtube', numberOfFiles: 0, size: 0 },
    { type: 'Image', numberOfFiles: 0, size: 0 },
    { type: 'Audio', numberOfFiles: 0, size: 0 },
    { type: 'Document', numberOfFiles: 0, size: 0 },
];

const OverviewMediaStorage: React.FC = () => {
    const totalSize = mediaItems.reduce((sum, item) => sum + item.size, 0);
    const router = useRouter();

    return (
        <Box sx={{ bgcolor: 'grey.900', color: 'text.primary', p: 3, borderRadius: 2, maxWidth: 450, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                    Media storage
                </Typography>
                <Button variant="text" color="primary" onClick={() => router.replace(paths.dashboard.files)}>
                    View Files
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'text.secondary' }}>File type</TableCell>
                            <TableCell align="right" sx={{ color: 'text.secondary' }}>Number of files</TableCell>
                            <TableCell align="right" sx={{ color: 'text.secondary' }}>Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mediaItems.map((item) => (
                            <TableRow key={item.type} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" sx={{ color: 'text.primary' }}>
                                    {item.type}
                                </TableCell>
                                <TableCell align="right" sx={{ color: 'text.primary' }}>{item.numberOfFiles}</TableCell>
                                <TableCell align="right" sx={{ color: 'text.primary' }}>{item.size}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                Total size
                            </TableCell>
                            <TableCell align="right" />
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{totalSize}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OverviewMediaStorage;