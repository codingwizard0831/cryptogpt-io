'use client';

import React from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Typography, Card } from '@mui/material';

import PlanUsageModal from './PlanUsageModal';
import PlanUsageModalChart from './PlanUsageModalChart';
interface PlanUsageItem {
	type: string;
	limit: string;
	value: number;
	percentage: number;
}

const OverviewPlanUsage: React.FC = () => {
	const [open, setOpen] = React.useState(false);

	const usageData = [
		{ type: 'Storage', value: 0, limit: '512.00 MB', unit: 'MB', percentage: 0 },
		{ type: 'RAG Calls', value: 0, limit: '500', percentage: 0 },
		{ type: 'Tokens', value: 0, limit: '500K', percentage: 0 },
		{ type: 'Vectors', value: 0, limit: '10K', percentage: 0 },
		{ type: 'Transcription Hours', value: 0, limit: '10', percentage: 0 },
	];

	const [pUsageData, setPUsageData] = React.useState<PlanUsageItem>(usageData[0]);
	const [currentIndex, setCurrentIndex] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % usageData.length);
		}, 2500);

		return () => clearInterval(interval);
	}, []);

	React.useEffect(() => {
		setPUsageData(usageData[currentIndex]);
	}, [currentIndex]);

	return (
		<Card sx={{ color: 'text.primary', p: 3, borderRadius: 2, height: '100%' }}>
			<Box Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
				<ArrowBackIosIcon sx={{ color: 'grey.500', cursor: 'pointer' }} />
				<Box sx={{ textAlign: 'center' }}>
					<Typography variant="subtitle2" fontWeight="bold" mb={2}>
						Plan Usage
					</Typography>
					<Typography variant="h5" fontWeight="bold">
						{pUsageData.type}
					</Typography>
				</Box>
				<ArrowForwardIosIcon sx={{ color: 'grey.500', cursor: 'pointer' }} />
			</Box>

			<PlanUsageModalChart value={pUsageData.value} limit={pUsageData.limit} percentage={pUsageData.percentage} />

			<Button
				variant="contained"
				fullWidth
				sx={{ mt: 2, bgcolor: theme => theme.palette.primary.main, color: "text.primary" }}
				onClick={() => setOpen(true)}
			>
				View Usage
			</Button>
			<PlanUsageModal
				open={open}
				onClose={() => setOpen(false)}
				usageData={usageData}
			/>
		</Card >
	);
};

export default OverviewPlanUsage;
