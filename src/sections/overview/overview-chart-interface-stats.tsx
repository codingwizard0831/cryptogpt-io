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
}

const OverviewInterfaceStats: React.FC = () => {

    const [apiCalls, setApiCalls] = useState<DataPoint[]>([]);
    const [tokensConsumed, setTokensConsumed] = useState<DataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                setLoading(true);
                const today = new Date().toISOString().split('T')[0];
                const response = await axios.get(`${endpoints.dashboard.stats}?date=${today}`);
                const { data } = response

                const formattedApis = data.map(item => ({
                    time: item.hour,
                    value: item.api_calls
                }))

                const formattedTokensConsumed = data.map(item => ({
                    time: item.hour,
                    value: item.io_tokens_consumed
                }))

                setApiCalls(formattedApis);
                setTokensConsumed(formattedTokensConsumed);
            } catch (err) {
                console.log('Error Fetching stats data: ', err);
                setError("Failed to fetch stats data");
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
                Inference Stats Overview
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                    API calls (Today) - UTC
                </Typography>
                <ResponsiveContainer {...chartConfig}>
                    <AreaChart data={apiCalls}>
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
                    Total I/O Tokens Consumed (Today) - UTC
                </Typography>
                <ResponsiveContainer {...chartConfig}>
                    <AreaChart data={tokensConsumed}>
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
                            strokeWidth={2}
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

export default OverviewInterfaceStats;