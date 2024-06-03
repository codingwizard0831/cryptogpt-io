'use client';

import GaugeComponent from 'react-gauge-component'

import { Box, alpha, useTheme, Typography } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import { fNumber } from "src/utils/format-number";

import Chart, { useChart } from 'src/components/chart';

const KnowledgeSettingStorage = () => {
    const theme = useTheme();
    const upMd = useResponsive('up', 'md');

    const radialBarChartOptions = useChart({
        colors: [
            alpha(theme.palette.primary.main, 0.5),
            alpha(theme.palette.grey[500], 0.5),
        ],
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        labels: ['Used', 'Free'],
        legend: {
            show: false,
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '68%',
                },
                dataLabels: {
                    value: {
                        offsetY: 16,
                    },
                    total: {
                        formatter: () => fNumber(2324),
                    },
                },
            },
        },
    });

    const pieChartOptions = useChart({
        colors: [
            alpha(theme.palette.primary.main, 0.5),
            alpha(theme.palette.info.main, 0.5),
            alpha(theme.palette.error.main, 0.5),
            alpha(theme.palette.success.main, 0.5),
        ],
        labels: ['Private', 'Public', 'Other'],
        legend: {
            show: false,
        },
        stroke: {
            show: false,
        },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false,
            },
        },
        tooltip: {
            fillSeriesColor: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: false,
                    },
                },
            },
        },
    });

    return <Box sx={{
        height: "100%",
        display: 'flex',
        flexDirection: upMd ? 'row' : 'column',
        alitItems: 'center',
        justifyContent: "space-around",
        pt: 2,
    }}>
        <Box>
            <Typography variant="h6" sx={{
                textAlign: "center",
            }}>Total</Typography>
            <Chart
                dir="ltr"
                type="radialBar"
                series={[44, 50]}
                options={radialBarChartOptions}
                width="100%"
                height={256}
            />

            <GaugeComponent
                type="semicircle"
                arc={{
                    colorArray: [theme.palette.success.main, theme.palette.error.main],
                    padding: 0.02,
                    subArcs:
                        [
                            { limit: 40 },
                            { limit: 60 },
                            { limit: 70 },
                            {},
                            {},
                            {},
                            {}
                        ]
                }}
                pointer={{ type: "blob", animationDelay: 0 }}
                value={50}
            />

        </Box>
        <Box>
            <Typography variant="h6" sx={{
                textAlign: "center",
            }}>Distributed</Typography>
            <Chart dir="ltr" type="pie" series={[10, 20, 30,]} options={pieChartOptions} width="100%" height={256} />
        </Box>
    </Box>
}
export default KnowledgeSettingStorage;