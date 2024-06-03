import React from "react";

import { Theme } from '@mui/material/styles';
import { Box, alpha, styled } from "@mui/material";

import { ToggleProps } from "./types";

const StyledToggle = styled('input')(({ theme }: { theme: Theme }) => ({
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    width: '6.25em',
    height: '3.125em',
    background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.9)} 50%, ${alpha(theme.palette.background.default, 0.9)} 50%) no-repeat`,
    backgroundSize: '205%',
    backgroundPosition: '0',
    transition: '0.4s',
    borderRadius: '99em',
    position: 'relative',
    cursor: 'pointer',
    fontSize: 'inherit',
    backdropFilter: 'blur(10px)',
    '&::before': {
        content: '""',
        width: '2.25em',
        height: '2.25em',
        position: 'absolute',
        top: '0.438em',
        left: '0.438em',
        background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.9)} 50%, ${alpha(theme.palette.background.default, 0.9)} 50%) no-repeat`,
        backgroundSize: '205%',
        backgroundPosition: '100%',
        backdropFilter: 'blur(10px)',
        borderRadius: '50%',
        transition: '0.4s',
    },
    '&:checked::before': {
        left: 'calc(100% - 2.25em - 0.438em)',
        backgroundPosition: '0',
    },
    '&:checked': {
        backgroundPosition: '100%',
    },
}));

const Toggle: React.FC<ToggleProps> = ({ checked = false, onChange, sx, ...other }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event);
        }
    }
    return <Box sx={{
        fontSize: '10px',
        ...sx,
    }} {...other}>
        <StyledToggle type="checkbox" checked={checked} onChange={handleChange} />
    </Box>
}

export default Toggle;