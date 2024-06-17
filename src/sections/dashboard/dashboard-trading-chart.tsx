'use client';

import CandlestickChart from 'react-candlestick-chart';

import { Box, BoxProps, useTheme } from '@mui/material';

export interface DashboardTradingChartProps extends BoxProps {
    data?: any[];
}

export default function DashBoardTradingChart({ data = dummyData, sx, ...other }: DashboardTradingChartProps) {
    const theme = useTheme();

    return (
        <Box sx={{
            ...sx,
        }} {...other}>
            <CandlestickChart
                data={data}
                id="candlestick-chart"
                width={1200}
                height={600}
                decimal={2}
                scrollZoom={{
                    enable: true,
                    max: 20,
                }}
                rangeSelector={{
                    enable: true,
                    height: 150,
                    initialRange: { type: "month", value: 1 },
                }}
                dataViewerColors={{
                    shortPositionLabel: "#b2b5be",
                    shortPositionData: "#fff",
                    longPositionLabel: "#b2b5be",
                    longPositionData: "#fff",
                    stopLossLabel: "#b2b5be",
                    stopLossData: "#F9DB04",
                    takeProfitLabel: "#b2b5be",
                    takeProfitData: "#04F5F9",
                    openLabel: "#b2b5be",
                    openDataUp: "#ffb22e",
                    openDataDown: "#bbbbbb",
                    highLabel: "#b2b5be",
                    highDataUp: "#ffb22e",
                    highDataDown: "#bbbbbb",
                    lowLabel: "#b2b5be",
                    lowDataUp: "#ffb22e",
                    lowDataDown: "#bbbbbb",
                    closeLabel: "#b2b5be",
                    closeDataUp: "#ffb22e",
                    closeDataDown: "#bbbbbb",
                }}
                ColorPalette={{
                    background: "#ffffff11",
                    grid: "#ffffff22",
                    tick: "#b2b5be",
                    selectorLine: "#ffb22e",
                    selectorLabelBackground: "#2a2e39",
                    selectorLabelText: "#b2b5be",
                    greenCandle: "#ffb22e",
                    redCandle: "#000000",
                    longPosition: "#ffb22e",
                    shortPosition: "#ffb22e",
                    tp: "#ffb22e",
                    sl: "#000000",
                    RSChartStroke: "#ffb22e",
                    RSChartOverlay: "#ffffff55",
                    RSChartOverlayResize: "#ffffff22",
                    resetButtonColor: theme.palette.primary.main,
                }}
            />
        </Box>
    );
}

const dummyData = [
    {
        date: "2018-10-23", // or 1540166400000 or "2018-10-22 03:30"
        open: 182.47,
        high: 183.01,
        low: 177.39,
        close: 179.93,
        // position is optional
        position: {
            positionType: "long", // or "short"
            sl: 170, // stop loss
            tp: 190, // take profit
            positionValue: 180,
        },
    },
    {
        date: "2018-10-24",
        open: 180.82,
        high: 181.4,
        low: 177.56,
        close: 178.75,
    },
    {
        date: "2018-10-25",
        open: 179.21,
        high: 180.5,
        low: 178.57,
        close: 179.4,
    },
    {
        date: "2018-10-26",
        open: 175.22,
        high: 179.5,
        low: 175.22,
        close: 178.65,
    },
    {
        date: "2018-10-27",
        open: 178.35,
        high: 179.1,
        low: 176.68,
        close: 177.75,
    },
    {
        date: "2018-10-28",
        open: 175.88,
        high: 177.5,
        low: 175.88,
        close: 176.15,
    },
    {
        date: "2018-10-29",
        open: 177.65,
        high: 178.05,
        low: 175.07,
        close: 175.3,
    },
    {
        date: "2018-10-30",
        open: 175.44,
        high: 176.8,
        low: 172.92,
        close: 176.6,
    },
    {
        date: "2018-10-31",
        open: 177.95,
        high: 178.2,
        low: 175.8,
        close: 176.9,
    },
    {
        date: "2018-11-01",
        open: 176.15,
        high: 177.18,
        low: 174.94,
        close: 175.5,
    },
    {
        date: "2018-11-02",
        open: 175.4,
        high: 176.74,
        low: 174.43,
        close: 176.45,
    },
    {
        date: "2018-11-03",
        open: 176.35,
        high: 177.5,
        low: 175.53,
        close: 176.5,
    },
    {
        date: "2018-11-04",
        open: 176.6,
        high: 177.3,
        low: 175.2,
        close: 176.15,
    },
    {
        date: "2018-11-05",
        open: 176.15,
        high: 177.5,
        low: 175.8,
        close: 176.7,
    },
    {
        date: "2018-11-06",
        open: 176.7,
        high: 177.8,
        low: 175.7,
        close: 177.2,
    },
    {
        date: "2018-11-07",
        open: 177.3,
        high: 178.2,
        low: 176.8,
        close: 177.9,
    },
    {
        date: "2018-11-08",
        open: 177.9,
        high: 178.2,
        low: 177.3,
        close: 177.8,
    },
    {
        date: "2018-11-09",
        open: 177.8,
        high: 178.2,
        low: 177.3,
        close: 177.9,
    },
    {
        date: "2018-11-10",
        open: 177.9,
        high: 178.2,
        low: 177.3,
        close: 177.8,
    },
    {
        date: "2018-11-11",
        open: 177.8,
        high: 178.2,
        low: 177.3,
        close: 177.9,
    },
    {
        date: "2018-11-12",
        open: 177.9,
        high: 178.2,
        low: 177.3,
        close: 177.8,
    },
    {
        date: "2018-11-13",
        open: 177.8,
        high: 178.2,
        low: 177.3,
        close: 177.9,
    },
    {
        date: "2018-11-14",
        open: 177.9,
        high: 178.2,
        low: 177.3,
        close: 177.8,
    },
    {
        date: "2018-11-15",
        open: 177.8,
        high: 178.2,
        low: 177.3,
        close: 177.9,
    },
    {
        date: "2018-11-16",
        open: 177.9,
        high: 178.2,
        low: 177.3,
        close: 177.8,
    },
    {
        date: "2018-11-17",
        open: 177.8,
        high: 178.2,
        low: 177.3,
        close: 177.9,
    },
    {
        date: "2018-11-18",
        open: 177.9,
        high: 178.2,
        low: 177.3,
        close: 177.8,
    },
    {
        date: "2018-11-19",
        open: 177.8,
        high: 178.2,
        low: 177.3,
        close: 177.9,
    },
    {
        date: "2018-11-20",
        open: 177.9,
        high: 178.2,
        low: 177.3,
        close: 177.8,
    },
    {
        date: "2018-11-21",
        open: 177.8,
        high: 178.2,
        low: 177.3,
        close: 177.9,
    },
    {
        date: "2018-11-22",
        open: 177.9,
        high: 178.2,
        low: 177.3,
        close: 177.8,
    },
    {
        date: "2018-11-23",
        open: 177.8,
        high: 178.2,
        low: 177.3,
        close: 177.9,
    },
    {
        date: "2018-11-24",
        open: 177.9,
        high: 178.2,
        low: 177.3,
        close: 177.8,
    },
    {
        date: "2018-11-25",
        open: 177.8,
        high: 178.2,
        low: 177.3,
        close: 177.9,
    },
    {
        date: "2018-11-26",
        open: 177.9,
        high: 178.2,
        low: 177.3,
        close: 177.8,
    },
]