import { Box, Button, ButtonProps } from "@mui/material";

import Iconify from "src/components/iconify";

interface InternetNoiseItemProps extends ButtonProps {
    name?: string;
    startColor?: string;
    endColor?: string;
    logo?: string;
    isActive?: boolean;
    onChangleActive?: () => void;
}

export default function InternetNoiseItem({
    name = "Ai news",
    startColor = "#00C107",
    endColor = "#FF0107",
    logo = "/images/usd-coin-usdc-logo.png",
    isActive = false,
    onChangleActive = () => { },
    sx,
    ...other }: InternetNoiseItemProps) {
    return <Button variant="outlined" color="primary" sx={{
        position: 'relative',
        ...(isActive && {
            backgroundImage: `linear-gradient(to right, ${startColor} 0%, ${endColor} 100%)`,
            color: 'white',
        }),
        ...sx,
    }} {...other}
        onClick={onChangleActive}
        startIcon={
            <Box sx={{
                width: '24px',
                height: '24px',
                backgroundImage: `url(${logo})`,
                backgroundSize: 'cover',
            }} />
        }
    >
        {name}
        {
            isActive && <>
                <Iconify icon="ph:warning-bold" sx={{
                    position: 'absolute',
                    right: '-8px',
                    top: '-6px',
                    backgroundColor: 'error.main',
                    color: 'white',
                    borderRadius: '50%',
                    p: '3px',
                }} />
                <Iconify icon="mingcute:time-line" sx={{
                    position: 'absolute',
                    right: '-8px',
                    bottom: '-6px',
                    backgroundColor: 'success.main',
                    color: 'white',
                    borderRadius: '50%',
                    p: '3px',
                }} />
            </>
        }
    </Button>
}