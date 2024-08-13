'use client';

import React, { useState, useEffect } from 'react';

import {
    Box,
    Card,
    Button,
    styled,
    Divider,
    ListItem,
    Typography,
    CircularProgress
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';


interface Model {
    id: string;
    model_name: string;
    model_size: string;
    status: string;
}

const ModelEntry = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '&:last-child': {
        marginBottom: 0,
    },
}));

const ModelName = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: 8,
});

const ModelSize = styled(Typography)(({ theme }) => ({
    marginRight: 8,
    color: theme.palette.text.secondary,
}));


const ModelListItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(1, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
        borderBottom: 'none',
    },
}));

const StatusChip = styled(Typography)<{ status: string }>(({ theme, status }) => ({
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: theme.palette.common.white,
}));

const OverviewMyModels: React.FC = () => {
    const router = useRouter();
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                setLoading(true);
                const response = await axios.get(endpoints.dashboard.models);
                setModels(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching models:', err);
                setError('Failed to fetch models. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    if (loading) {
        return (
            <Card sx={{ color: 'text.primary', p: 2, borderRadius: 2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Card>
        );
    }

    if (error) {
        return (
            <Card sx={{ color: 'text.primary', p: 2, borderRadius: 2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography color="error">{error}</Typography>
            </Card>
        );
    }

    return (
        <Card sx={{
            color: 'text.primary',
            p: 2,
            borderRadius: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                    My Models
                </Typography>
                <Button variant="text" color="primary" size="small" onClick={() => router.replace(paths.dashboard.models)}>
                    View all
                </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {models.length === 0 ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            There are no models
                        </Typography>
                        <Button variant="outlined" color="primary" size="small" onClick={() => router.replace(paths.dashboard.modelCreate)}>
                            Create model
                        </Button>
                    </Box>
                ) : (
                    models.slice(0, 3).map((model) => (
                        <ModelEntry key={model.id}>
                            <ModelName variant="body2">{model.model_name}</ModelName>
                            <ModelSize variant="body2">| {model.model_size} |</ModelSize>
                            <StatusChip variant="body2" status={model.status}>
                                {model.status}
                            </StatusChip>
                        </ModelEntry>
                    ))
                )}
            </Box>
        </Card>
    );
};

export default OverviewMyModels;