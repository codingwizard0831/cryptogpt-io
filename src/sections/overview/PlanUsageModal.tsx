import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Grid,
    Card,
    Modal,
    Button,
    Typography,
    IconButton
} from '@mui/material';

import PlanUsageModalChart from './PlanUsageModalChart';

interface UsageItem {
    type: string;
    value: number;
    limit_value: string;
    unit?: string;
    percentage: number;
}

interface PlanUsageModalProps {
    open: boolean;
    onClose: () => void;
    usageData: UsageItem[];
}

const UsageCard: React.FC<UsageItem> = ({ type, value, limit_value, unit, percentage }) => (
    <Card sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom> {type} </Typography>
        <PlanUsageModalChart value={value} limit_value={limit_value} percentage={percentage} />
        <Typography variant="h6" sx={{ mt: 1 }}> {value} {unit} </Typography>
        <Typography variant="body2" color="text.secondary"> {limit_value} limit </Typography>
        <Button variant="outlined" sx={{ mt: 2 }}>Increase limit</Button>
    </Card>
)

const PlanUsageModal: React.FC<PlanUsageModalProps> = ({ open, onClose, usageData }) => (
    <Modal open={open} onClose={onClose} aria-labelledby="plan-usage-modal-title">
        <Card sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography id="plan-usage-modal-title" variant="h6" component="h2">
                    Plan Usage
                </Typography>
                <IconButton onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </Box>
            <Grid container spacing={3}>
                {usageData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <UsageCard {...item} />
                    </Grid>
                ))}
            </Grid>
        </Card>
    </Modal>
)

export default PlanUsageModal;