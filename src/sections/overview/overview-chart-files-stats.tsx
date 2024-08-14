import React, { useState, useEffect } from 'react';
import { Area, XAxis, YAxis, AreaChart, CartesianGrid, ResponsiveContainer } from 'recharts';

import {
    Box,
    Card,
    Typography,
    CircularProgress
} from '@mui/material';

import axios, { endpoints } from 'src/utils/axios';

interface DataPoint {
    time: number;
    value: number;
}

const chartConfig = {
    width: '100%',
    height: 200,
    margin: { top: 10, right: 30, left: 0, bottom: 0 },
};

const OverviewFilesStats: React.FC = () => {
    const [filesUploaded, setFilesUploaded] = useState<DataPoint[]>([]);
    const [storageBytes, setStorageBytes] = useState<DataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                setLoading(true);
                const today = new Date().toISOString().split('T')[0];
                const response = await axios.get(`${endpoints.dashboard.stats}?date=${today}`);
                const { data } = response

                const formattedFilesUploaded = data.map(item => ({
                    time: item.hour,
                    value: item.files_uploaded
                }))

                const formattedStorageBytes = data.map(item => ({
                    time: item.hour,
                    value: item.storage_bytes_ingested
                }));

                // Ensure we have data points for hours 1, 3, and 23
                const ensureDataPoints = (dataArray: DataPoint[]) => {
                    const hours = [1, 3, 23];
                    hours.forEach(hour => {
                        if (!dataArray.some(item => item.time === hour)) {
                            dataArray.push({ time: hour, value: 0 });
                        }
                    });
                    return dataArray.sort((a, b) => a.time - b.time);
                };

                setFilesUploaded(ensureDataPoints(formattedFilesUploaded));
                setStorageBytes(ensureDataPoints(formattedStorageBytes));

            } catch (err) {
                console.log('Error fetching stats data: ', err);
                setError('Failed to fetch stats data');
            } finally {
                setLoading(false)
            }
        }

        fetchStatsData()
    }, [])

    if (loading) {
        return (
            <Card sx={{ color: 'text.primary', p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <CircularProgress />
            </Card>
        );
    }

    if (error) {
        return (
            <Card sx={{ color: 'text.primary', p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <Typography color="error">{error}</Typography>
            </Card>
        );
    }

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
                        <defs>
                            <linearGradient id="neonGradient-FFD700" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#ffd700"
                            strokeWidth={2}
                            fill="url(#neonGradient-FFD700)"
                            filter="url(#neonGlow)"
                        />
                        <defs>
                            <filter id="neonGlow" height="300%" width="300%" x="-75%" y="-75%">
                                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
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
                        <defs>
                            <linearGradient id="neonGradient-4CAF50" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#4CAF50"
                            strokeWidth={6}
                            fill="url(#neonGradient-4CAF50)"
                            filter="url(#neonGlow)"
                        />
                        <defs>
                            <filter id="neonGlow" height="300%" width="300%" x="-75%" y="-75%">
                                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Card>
    );
};

export default OverviewFilesStats;