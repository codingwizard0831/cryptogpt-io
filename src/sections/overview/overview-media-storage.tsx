'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Box,
    Button,
    Card,
    alpha
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
                "& tr": {
                    px: 1,
                },
                "& td,th": {
                    py: 0.5,
                    px: 2,
                },
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
        </Card>
    );
};

export default OverviewMediaStorage;