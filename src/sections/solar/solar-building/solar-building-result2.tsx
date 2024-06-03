'use client';


import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

const SolarBuildingResult2: React.FC<BoxProps> = ({ sx, ...other }: BoxProps) => {
    console.log();
    return <Box sx={{
        p: 2,
        borderRadius: "10px",
        backdropFilter: "blur(10px)",
        background: theme => alpha(theme.palette.background.default, 0.1),
        display: 'flex',
        justifyContent: 'space-between',
        mb: 1,
        ...sx
    }} {...other}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant='subtitle2'>Panels count</Typography>
            <IconButton>
                <Iconify icon="material-symbols-light:solar-power" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main }} />
            </IconButton>
            <Typography variant="caption">31 panels</Typography>
        </Box>

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant='subtitle2'>Panels count</Typography>
            <IconButton>
                <Iconify icon="ic:round-energy-savings-leaf" sx={{ width: '24px', height: '24px', color: theme => theme.palette.primary.main }} />
            </IconButton>
            <Typography variant="caption"><b>14,000.2</b> KWh</Typography>
        </Box>
    </Box>
}

export default SolarBuildingResult2;