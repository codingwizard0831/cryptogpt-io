'use client';

import { useState, useEffect } from 'react';

import { Box, Grid } from '@mui/material';

import OverviewCredit from '../overview-credit';
import OverviewMyAgents from '../overview-my-agents';
import OverviewMyModels from '../overview-my-models';
import OverviewPlanUsage from '../overview-plan-usage';
import OverviewMediaStorage from '../overview-media-storage';
import OverviewFilesStats from '../overview-chart-files-stats';
import OverviewInterfaceStats from '../overview-chart-interface-stats';

interface PlanUsageItem {
    type: string;
    limit: string;
    value: number;
}

const planUsageData: PlanUsageItem[] = [
    { type: 'Storage', limit: '512.00 MB', value: 0 },
    { type: 'RAG Calls', limit: '500', value: 0 },
    { type: 'Vectors', limit: '10k', value: 0 },
    { type: 'Transcription Hours', limit: '10', value: 0 },
    { type: 'Tokens', limit: '500k', value: 0 },
];

export default function DashboardView() {


    const [pUsageData, setPUsageData] = useState<PlanUsageItem>(planUsageData[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % planUsageData.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setPUsageData(planUsageData[currentIndex]);
    }, [setPUsageData, currentIndex]);

    const models: Array<any> = []
    const grants: Array<any> = []

    const filesUploaded = [
        { time: 1, value: 0 },
        { time: 3, value: 1 },
        { time: 23, value: 1 }
    ];

    const storageBytes = [
        { time: 1, value: 0 },
        { time: 3, value: 3 },
        { time: 23, value: 1 }
    ];
    const apiCalls = [
        { time: 1, value: 0 },
        { time: 3, value: 5 },
        { time: 20, value: 5 },
        { time: 23, value: 1 }
    ];

    const tokensConsumed = [
        { time: 1, value: 0 },
        { time: 3, value: 3 },
        { time: 20, value: 4 },
        { time: 23, value: 1 }
    ];

    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'start',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Grid container spacing={2} maxWidth="50%">
                <Grid item xs={12} md={6}>
                    <OverviewPlanUsage type={pUsageData.type} limit={pUsageData.limit} value={pUsageData.value} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <OverviewMediaStorage />
                </Grid>
                <Grid item xs={12} md={6}>
                    <OverviewMyAgents />
                </Grid>
                <Grid item xs={12} md={6}>
                    <OverviewMyModels models={models} />
                </Grid>
                <Grid item xs={12}>
                    <OverviewCredit grants={grants} />
                </Grid>
            </Grid>
            <Grid container spacing={2} maxWidth="40%">
                <Grid item xs={12} md={12}>
                    <OverviewFilesStats filesUploaded={filesUploaded} storageBytes={storageBytes} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <OverviewInterfaceStats apiCalls={apiCalls} tokensConsumed={tokensConsumed} />
                </Grid>
            </Grid>

        </Box>
    );
}
