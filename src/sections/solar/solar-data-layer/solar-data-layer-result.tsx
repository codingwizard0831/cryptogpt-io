'use client';


import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';



const SolarDataLayerResult: React.FC<BoxProps> = ({ sx, ...other }: BoxProps) => <Box sx={{
    p: 2,
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    background: theme => alpha(theme.palette.background.default, 0.1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    mb: 1,
    ...sx
}} {...other}>
    <Button fullWidth variant='outlined' color='primary'>UPDATED AI ENCINES</Button>
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        my: 1,
    }}>
        <LayersIcon color='primary' />
        <Typography variant='subtitle1' sx={{
            color: theme => theme.palette.primary.main,
            fontWeight: 900,
            ml: 1,
        }}>Data Layers endpoint</Typography>
    </Box>

    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 1,
    }}>
        <Typography variant='subtitle2' sx={{ mb: 1 }}>Monthly sunshine</Typography>
        <Typography variant="caption" component='p'>
            The monthly flux map (sunlight on roofs, broken down by month) of the region. Values are kWh/kW/year. The GeoTIFF imagery file pointed to by this URL will contain twelve bands, corresponding to January...December, in order.
        </Typography>
    </Box>

    <Box>
        <Box sx={{
            width: '100%',
            height: '8px',
            background: "linear-gradient(to right, #00000A,#91009C,#E64616,#FEB400,#FFFFF6)",
            borderRadius: '4px'
        }} />
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <Typography variant='caption'>Shady</Typography>
            <Typography variant='caption'>Sunny</Typography>
        </Box>
    </Box>
</Box>

export default SolarDataLayerResult;