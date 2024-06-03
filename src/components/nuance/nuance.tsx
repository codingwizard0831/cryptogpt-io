import React from "react";

import { Box, useTheme, Typography } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { NuanceProps } from "./types";

const Nuance: React.FC<NuanceProps> = ({ children, value, sx, ...other }) => {
    const theme = useTheme();
    const isRaised = Number(value) > 0;
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            ...(
                isRaised ? {
                    color: theme.palette.success.main,
                } : {
                    color: theme.palette.error.main,
                }
            ),
            ...sx
        }} {...other}>
            {
                isRaised ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />
            }
            <Typography variant="body2" sx={{
                fontSize: "inherit",
            }}>{String(value)} %</Typography>
            {
                children
            }
        </Box>
    );
}

export default Nuance;