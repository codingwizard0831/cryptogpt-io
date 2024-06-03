'use client';


import { Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import Iconify from 'src/components/iconify/iconify';
import Chart, { useChart } from 'src/components/chart';

const SolarPotentialResult2: React.FC<BoxProps> = ({ sx, ...other }: BoxProps) => {
    const chartOptions = useChart({
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
        tooltip: {
            x: {
                show: false,
            },
            marker: { show: false },
        },
    });

    return <Box sx={{
        p: 2,
        borderRadius: "10px",
        backdropFilter: "blur(10px)",
        background: theme => alpha(theme.palette.background.default, 0.1),
        mb: 1,
        ...sx
    }} {...other}>
        <Box sx={{
            my: 1
        }}>
            <Typography variant="subtitle1" sx={{
                ml: 1
            }}>Solar Potential analysis</Typography>
            <Chart dir="ltr" type="line" series={[
                {
                    name: 'Solar',
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                },
                {
                    name: 'No solar',
                    data: [30, 11, 45, 61, 59, 42, 59, 101, 138],
                },
            ]} options={chartOptions} width="100%" height={200} />
        </Box>
        <Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="ri:money-dollar-circle-line" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Cost without solar</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>$61,305.29</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="wi:solar-eclipse" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Cost with solar</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>$36,000.00</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="material-symbols:savings-outline" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Savings</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>$25,305.29</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="fluent-mdl2:compare" color='primary' sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Break even</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>2035 in 11 years</Typography>
            </Box>
        </Box>
    </Box>
}

export default SolarPotentialResult2;