import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

interface CircularProgressChartProps {
    percentage: number;
}

const CircularProgressChart: React.FC<CircularProgressChartProps> = ({ percentage }) => {
    const data = [
        { name: 'Progress', value: percentage },
        { name: 'Remaining', value: 100 - percentage }
    ];

    return (
        <Box sx={{ position: 'relative', width: 200, height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={90}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                    >
                        <Cell fill="#fda92d" /> {/* Progress color */}
                        <Cell fill="rgba(249, 250, 251, 0.08)" /> {/* Background color */}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h4" component="div" sx={{ color: 'white' }}>
                    {`${percentage}%`}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularProgressChart;