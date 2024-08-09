import React from 'react';
import {
    Box,
    Typography,
    Paper
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
        <Paper sx={{ bgcolor: 'grey.900', color: 'text.primary', p: 3, borderRadius: 2 }}>
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
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
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
                        <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

export default OverviewFilesStats;