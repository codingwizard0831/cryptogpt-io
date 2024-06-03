'use client';


import { alpha } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import Box, { BoxProps } from '@mui/material/Box';
import { Button, Divider, Typography } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

const SolarBuildingResult1: React.FC<BoxProps> = ({ sx, ...other }: BoxProps) => {
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
            <HomeIcon color='primary' />
            <Typography variant="subtitle1" sx={{
                color: theme => theme.palette.primary.main,
                fontWeight: 900,
                ml: 1
            }}>Building Insights endpoint</Typography>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="wi:solar-eclipse" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Annual sunshine</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>1,802 hr</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="mdi:home-roof" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Roof area</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>2,399.4 m²</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="game-icons:solar-power" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>Max panel count</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>1,163 panels</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
                <Iconify icon="iwwa:co2" color='primary' sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main, }} />
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    flex: 1,
                    ml: 1,
                }}>CO₂ savings</Typography>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 300,
                    fontSize: "12px",
                }}>428.9 Kg/MWh</Typography>
            </Box>
        </Box>
    </Box>
}

export default SolarBuildingResult1;