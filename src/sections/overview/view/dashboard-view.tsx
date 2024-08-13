'use client';

import { Box, Grid } from '@mui/material';

import OverviewPlanUsage from '../overview-plan-usage';
import OverviewMediaStorage from '../overview-media-storage';
import OverviewMyAgents from '../overview-my-agents';
import OverviewMyModels from '../overview-my-models';
import OverviewCredit from '../overview-credit';
import OverviewFilesStats from '../overview-chart-files-stats';
import OverviewInterfaceStats from '../overview-chart-interface-stats';



export default function DashboardView() {

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
            <Grid container spacing={2} maxWidth={"60%"}>
                <Grid item xs={12} md={6}>
                    <OverviewPlanUsage />
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
            <Grid container spacing={2} maxWidth={"40%"}>
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
