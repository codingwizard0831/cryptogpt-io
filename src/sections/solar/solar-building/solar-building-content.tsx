import React from "react";

import BoltIcon from '@mui/icons-material/Bolt';
import { Box, Slider, TextField, Typography } from "@mui/material";

import Iconify from "src/components/iconify";
import Toggle from "src/components/toggle/toggle";

const SolarBuildingContent: React.FC = () => {
    const [panelCount, setPanelCount] = React.useState(0);
    return <Box sx={{

    }}>
        <Typography variant="caption" component='p' sx={{
            lineHeight: "1.5",
            mb: 2,
        }}><b>Building Insights endpoint</b> provides data on the locations.
            dimensions & solar potential of a building.</Typography>
        <Box>
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
            <Slider
                defaultValue={30}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
            />
        </Box>

        <Box>
            <TextField fullWidth variant='outlined' label="Panel capacity" InputProps={{
                startAdornment: (<BoltIcon />),
                endAdornment: (<Typography variant="caption">Watts</Typography>)
            }} />
        </Box>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
        }}>
            <Toggle color="primary" sx={{ fontSize: '8px', mr: 1 }} />
            <Typography variant='caption' component='label'>Solar panels</Typography>
        </Box>
    </Box>
}

export default SolarBuildingContent;