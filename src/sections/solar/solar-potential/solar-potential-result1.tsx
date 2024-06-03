'use client';


import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { Button, Divider, Typography } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

const SolarPotentialResult1: React.FC<BoxProps> = ({ sx, ...other }: BoxProps) => {
    console.log();
    return <Box sx={{
        p: 2,
        borderRadius: "10px",
        backdropFilter: "blur(10px)",
        background: theme => alpha(theme.palette.background.default, 0.1),
        mb: 1,
        ...sx
    }} {...other}>
        <Button fullWidth variant='outlined' color='primary'>UPDATED AI ENCINES</Button>
        <Box sx={{
            display: 'flex',
            alignItems: "center",
            my: 1
        }}>
            <AutoGraphIcon color='primary' />
            <Typography variant="subtitle1" sx={{
                color: theme => theme.palette.primary.main,
                fontWeight: 900,
                ml: 1
            }}>Solar Potential analysis</Typography>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="material-symbols:energy-savings-leaf" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Yearly energy</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>19,388.8 kWh</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="pajamas:dashboard" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Installation size</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>10.8 kW</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="mingcute:receive-money-line" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Installation cost</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>$43,000.00</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="material-symbols:energy-program-time-used-outline" color='primary' sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Energy convered</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>142 %</Typography>
            </Box>
        </Box>
    </Box>
}

export default SolarPotentialResult1;