'use client';

import React, { useCallback } from 'react';
import {
    Box,
    Typography,
    Button,
    Divider
} from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

interface MyModelsProps {
    models: string[];
}

const OverviewMyModels: React.FC<MyModelsProps> = ({ models }) => {
    const router = useRouter();

    return (
        <Box sx={{
            bgcolor: 'grey.900',
            color: 'text.primary',
            p: 2,
            borderRadius: 2,
            maxWidth: 450,
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

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {models.length === 0 ? (
                    <>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            There are no models
                        </Typography>
                        <Button variant="outlined" color="primary" size="small" onClick={() => router.replace(paths.dashboard.modelCreate)}>
                            Create model
                        </Button>
                    </>
                ) : (
                    // You can add the logic to display models here when they exist
                    <Typography variant="body2" color="text.primary">
                        {`You have ${models.length} model(s)`}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default OverviewMyModels;