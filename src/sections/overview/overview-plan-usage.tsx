'use client';

import React from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

import CircularProgressChart from './circle-progress-chart';

interface PlanUsageProps {
	type: string;
	limit: string;
	value: number;
}

const OverviewPlanUsage: React.FC<PlanUsageProps> = ({ type, limit, value }) => {
	return (
		<Box sx={{ bgcolor: 'grey.900', color: 'text.primary', p: 3, borderRadius: 2, maxWidth: 450, height: '100%' }}>
			<Box Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
				<ArrowBackIosIcon sx={{ color: 'grey.500', cursor: 'pointer' }} />
				<Box sx={{ textAlign: 'center' }}>
					<Typography variant="subtitle2" fontWeight="bold" mb={2}>
						Plan Usage
					</Typography>
					<Typography variant="h5" fontWeight="bold">
						{type}
					</Typography>
				</Box>
				<ArrowForwardIosIcon sx={{ color: 'grey.500', cursor: 'pointer' }} />
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 2, mb: 2 }}>
				<CircularProgressChart percentage={30} />

				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
					<Typography variant="h6" component="div" fontWeight="bold">
						{value}
					</Typography>
					<Typography variant="h6" component="div" fontWeight="bold">
						{`${limit} limit`}
					</Typography>
				</Box>
			</Box>

			<Button
				variant="contained"
				fullWidth
				sx={{ mt: 2, bgcolor: 'grey.800', '&:hover': { bgcolor: 'grey.700' }, color: "text.primary" }}
			>
				View Usage
			</Button>
		</Box >
	);
};

export default OverviewPlanUsage;
