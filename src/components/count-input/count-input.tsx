import React from "react";

import { Box, Button, BoxProps, Typography } from "@mui/material";

import Iconify from "../iconify";

interface CountInputProps extends BoxProps {
    min?: number;
    max?: number;
    value: number;
    onValueChange: (value: number) => void;
}

export default function CountInput({ value, onValueChange, min = 0, max = 100, sx, ...other }: CountInputProps) {
    return <Box sx={{
        display: 'flex',
        alignItems: 'center',
        ...sx,
    }} {...other}>
        <Button color="primary" variant="outlined" size="small" sx={{
            borderRadius: '4px',
            minWidth: '30px',
            width: '30px',
        }} onClick={() => onValueChange(value - 1)}
            disabled={value <= min}
        >
            <Iconify icon="eva:minus-outline" sx={{
                width: 20,
                height: 20,
            }} />
        </Button>
        <Typography variant="body2" sx={{
            width: '30px',
            textAlign: 'center',
        }}>{value}</Typography>
        <Button color="primary" variant="outlined" size="small" sx={{
            borderRadius: '4px',
            minWidth: '30px',
            width: '30px',
        }} onClick={() => onValueChange(value + 1)}
            disabled={value >= max}
        >
            <Iconify icon="eva:plus-outline" sx={{
                width: 20,
                height: 20,
            }} />
        </Button>
    </Box>;
}