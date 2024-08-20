import React, { useState, useEffect } from 'react';
import { Area, XAxis, YAxis, Tooltip, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';

import { Box, Card, Typography, CircularProgress } from '@mui/material';

import axios, { endpoints } from 'src/utils/axios';

interface DataPoint {
    time: number;
    value: number;
    change?: number;
    percentChange?: number;
}

const chartConfig = {
    width: '100%',
    height: 200,
    margin: { top: 10, right: 30, left: 0, bottom: 0 },
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <Box sx={{
                p: 1,
                borderRadius: 1,
                backgroundColor: '#100e0d',
            }}>
                <Typography sx={{ color: 'primary.main' }}>{`Time: ${data.time}`}</Typography>
                <Typography sx={{ color: 'primary.main' }}>{`Value: ${data.value}`}</Typography>
                {data.change !== undefined && (
                    <Typography sx={{ color: data.change > 0 ? "success.main" : "error.main" }}>
                        {`Change: ${data.change >= 0 ? '+' : ''}${data.change} (${data.percentChange?.toFixed(2)}%)`}
                    </Typography>
                )}
            </Box>
        );
    }
    return null;
};

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
                const { data } = response;

                const processData = (rawData: any[], key: string): DataPoint[] => {
                    const sortedData = rawData
                        .map(item => ({ time: item.hour, value: item[key] }))
                        .sort((a, b) => a.time - b.time);

                    return sortedData.map((item, index, array) => {
                        if (index === 0) {
                            return { ...item, change: 0, percentChange: 0 };
                        }
                        const previousValue = array[index - 1].value;
                        const change = item.value - previousValue;
                        const percentChange = previousValue !== 0 ? (change / previousValue) * 100 : 0;
                        return { ...item, change, percentChange };
                    });
                };

                const ensureDataPoints = (dataArray: DataPoint[]) => {
                    const hours = [1, 3, 4, 12, 23];
                    hours.forEach(hour => {
                        if (!dataArray.some(item => item.time === hour)) {
                            const lastKnownValue = dataArray.find(item => item.time < hour)?.value ?? 0;
                            dataArray.push({ time: hour, value: lastKnownValue, change: 0, percentChange: 0 });
                        }
                    });
                    return dataArray.sort((a, b) => a.time - b.time);
                };

                setApiCalls(ensureDataPoints(processData(data, 'api_calls')));
                setTokensConsumed(ensureDataPoints(processData(data, 'io_tokens_consumed')));
            } catch (err) {
                console.log('Error fetching stats data: ', err);
                setError('Failed to fetch stats data');
            } finally {
                setLoading(false);
            }
        };

        fetchStatsData();
    }, []);

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

    const renderChart = (data: DataPoint[], title: string, color: string) => (
        <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
                {title}
            </Typography>
            <ResponsiveContainer {...chartConfig}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="time" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip content={<CustomTooltip />} />
                    <defs>
                        <linearGradient id={`neonGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2}
                        fill={`url(#neonGradient-${color})`}
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
                    {data.map((entry: DataPoint, index) => {
                        if (entry.change !== undefined && entry.change !== 0) {
                            return (
                                <ReferenceLine
                                    key={`referenceline-${index}`}
                                    x={entry.time}
                                    stroke={entry.change > 0 ? "#4CAF50" : "#FF5252"}
                                    strokeWidth={2}
                                    label={{
                                        value: entry.change > 0 ? '+' : '-',
                                        position: 'top',
                                        fill: entry.change > 0 ? "#4CAF50" : "#FF5252",
                                        style: { textShadow: `0 0 8px ${entry.change > 0 ? "#4CAF50" : "#FF5252"}` }
                                    }}
                                />
                            );
                        }
                        return null;
                    })}
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );

    return (
        <Card sx={{ color: 'text.primary', p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Inference Stats Overview
            </Typography>

            {renderChart(apiCalls, "API calls (Today) - UTC", "#FFD700")}
            {renderChart(tokensConsumed, "Total I/O Tokens Consumed (Today) - UTC", "#4CAF50")}
        </Card>
    );
};

export default OverviewInterfaceStats;