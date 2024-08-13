import React from 'react';
import {
    Box,
    Typography,
    Card
} from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface DataPoint {
    time: number;
    value: number;
}

interface FilesStatsOverviewProps {
    filesUploaded: DataPoint[];
    storageBytes: DataPoint[];
}

const OverviewFilesStats: React.FC<FilesStatsOverviewProps> = ({ filesUploaded, storageBytes }) => {
    const chartConfig = {
        width: '100%',
        height: 200,
        margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    return (
        <Card sx={{ color: 'text.primary', p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Files Stats Overview
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Files Uploaded (Today) - UTC
                </Typography>
                <ResponsiveContainer {...chartConfig}>
                    <AreaChart data={filesUploaded}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="time" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Area type="monotone" dataKey="value" stroke="#FFD700" fill="#FFD700" fillOpacity={0.1} />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>

            <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Storage Bytes Ingested (Today) - UTC
                </Typography>
                <ResponsiveContainer {...chartConfig}>
                    <AreaChart data={storageBytes}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="time" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Area type="monotone" dataKey="value" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.1} />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Card>
    );
};

export default OverviewFilesStats;