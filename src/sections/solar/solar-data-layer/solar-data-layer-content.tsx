import React from 'react';

import LayersIcon from '@mui/icons-material/Layers';
import { Box, List, Button, Typography, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import Toggle from 'src/components/toggle';
import { usePopover } from 'src/components/custom-popover';
import StyledPopover from 'src/components/styled-component/styled-popover';

const SolarDataLayerContent = () => {
    const typePopover = usePopover();

    return <Box>
        <Typography variant="caption" component='p' sx={{
            lineHeight: "1.5",
            mb: 2,
        }}><b>Data Layers endpoint</b> provides raw and processed imagery and granular details on an area surrounding a location.</Typography>

        <Box>
            <Button fullWidth variant="outlined" onClick={typePopover.onOpen}>Monthly sunshine</Button>
            <StyledPopover
                open={Boolean(typePopover.open)}
                anchorEl={typePopover.open}
                onClose={typePopover.onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                }}
            >
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <LayersIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Share" />
                    </ListItemButton>
                </List>

            </StyledPopover>
        </Box>

        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
        }}>
            <Toggle color="primary" sx={{ fontSize: '8px', mr: 1 }} />
            <Typography variant='caption' component='label'>Solar panels</Typography>
        </Box>

        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
        }}>
            <Toggle color="primary" sx={{ fontSize: '8px', mr: 1 }} />
            <Typography variant='caption' component='label'>Roof only</Typography>
        </Box>

        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
        }}>
            <Toggle color="primary" sx={{ fontSize: '8px', mr: 1 }} />
            <Typography variant='caption' component='label'>Play animation</Typography>
        </Box>
    </Box>
}

export default SolarDataLayerContent;