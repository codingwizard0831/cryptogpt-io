'use client';

import { Box, Grid } from '@mui/material';

import OverviewCredit from '../overview-credit';
import OverviewMyAgents from '../overview-my-agents';
import OverviewMyModels from '../overview-my-models';
import OverviewPlanUsage from '../overview-plan-usage';
import OverviewMediaStorage from '../overview-media-storage';
import OverviewFilesStats from '../overview-chart-files-stats';
import OverviewInterfaceStats from '../overview-chart-interface-stats';

export default function DashboardView() {

    const models: Array<any> = []
    const grants: Array<any> = []

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
            <Grid container spacing={2} maxWidth="60%">
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
                    <OverviewMyModels />
                </Grid>
                <Grid item xs={12}>
                    <OverviewCredit grants={grants} />
                </Grid>
            </Grid>
            <Grid container spacing={2} maxWidth="40%">
                <Grid item xs={12} md={12}>
                    <OverviewFilesStats />
                </Grid>
                <Grid item xs={12} md={12}>
                    <OverviewInterfaceStats />
                </Grid>
            </Grid>

        </Box>
    );
}
