import React from 'react';

import BoltIcon from '@mui/icons-material/Bolt';
import SyncIcon from '@mui/icons-material/Sync';
import EvStationIcon from '@mui/icons-material/EvStation';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Box, alpha, Slider, Button, TextField, Typography, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

const SolarPotentialContent: React.FC = () => {
    const advancedShow = useBoolean();

    return <Box sx={{
        borderRadius: "0px 0px 10px 10px",
        backdropFilter: "blur(10px)",
        background: theme => alpha(theme.palette.background.default, 0.005),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 1,
    }}>

        <TextField fullWidth variant='outlined' label="Panel capacity" InputProps={{
            startAdornment: (<CreditCardIcon />),
        }} sx={{ my: 2 }} />
        <Box sx={{
            position: 'relative',
            mb: 2,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-between"
            }}>
                <Iconify icon="material-symbols-light:solar-power" sx={{
                    width: '24px',
                    height: "24px",
                    color: theme => theme.palette.primary.main
                }} />
                <Typography variant="h6" sx={{
                    "fontSize": '15px!important',
                    flex: 1,
                    ml: 1,
                }}>Panels count</Typography>
                <Typography variant="caption" sx={{
                    "fontSize": '12px!important',
                }}>30</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Slider
                    defaultValue={30}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={110}
                />

                <IconButton>
                    <SyncIcon />
                </IconButton>
            </Box>
        </Box>

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mb: 2,
        }}>
            <TextField fullWidth variant='outlined' label="Energy cost per kWh" InputProps={{
                startAdornment: (<AttachMoneyIcon />),
            }} />
            <TextField fullWidth variant='outlined' label="Solar incentives" InputProps={{
                startAdornment: (<Iconify icon="icon-park-outline:gift-bag" sx={{ width: '24px', height: '24px' }} />),
            }} />
            <TextField fullWidth variant='outlined' label="Installation cost per Watt" InputProps={{
                startAdornment: (<Iconify icon="mingcute:receive-money-fill" sx={{ width: '24px', height: '24px' }} />),
            }} />
            <TextField fullWidth variant='outlined' label="Panel capacity" InputProps={{
                startAdornment: (<BoltIcon />),
                endAdornment: (<Typography variant="caption">Watts</Typography>)
            }} />
            <Button variant="outlined" endIcon={<ExpandMoreIcon sx={{
                transform: `rotate(${advancedShow.value ? 180 : 0}deg)`,
                transition: 'all 0.3s',
            }} />}
                onClick={advancedShow.onToggle} >{advancedShow.value ? 'Show' : 'Hide'} advanced setting</Button>
        </Box>

        <Box sx={{
            height: advancedShow.value ? '361px' : '0px',
            transition: 'all 5s',
            overflow: 'hidden',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 0.5,
            }}>
                <TextField fullWidth variant='outlined' label="Installation lifespan" InputProps={{
                    startAdornment: (<DateRangeIcon />),
                    endAdornment: (<Typography variant="caption">years</Typography>)
                }} />
                <TextField fullWidth variant='outlined' label="DC to AC conversion" InputProps={{
                    startAdornment: (<EvStationIcon />),
                    endAdornment: (<Typography variant="caption">%</Typography>)
                }} />
                <TextField fullWidth variant='outlined' label="Panel efficiency decline per year" InputProps={{
                    startAdornment: (<TrendingDownIcon />),
                    endAdornment: (<Typography variant="caption">%</Typography>)
                }} />
                <TextField fullWidth variant='outlined' label="Energy cost increase per year" InputProps={{
                    startAdornment: (<Iconify icon="ic:outline-price-change" sx={{ width: '24px', height: '24px' }} />),
                    endAdornment: (<Typography variant="caption">%</Typography>)
                }} />
                <TextField fullWidth variant='outlined' label="Discount rate per year" InputProps={{
                    startAdornment: (<Iconify icon="ic:twotone-discount" sx={{ width: '24px', height: '24px' }} />),
                    endAdornment: (<Typography variant="caption">%</Typography>)
                }} />
            </Box>
        </Box>
    </Box>
}

export default SolarPotentialContent;