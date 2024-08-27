import { useState } from "react";

import { Box, alpha } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import Iconify from "../iconify";

export default function PersonColorSelector() {
    const [personColorLevel, setPersonColorLevel] = useState(100);
    const isShowPersonList = useBoolean(false);

    const handleChanglePersonColorLevel = (value: number) => {
        setPersonColorLevel(value);
        isShowPersonList.onFalse();
    }

    return (
        <Box sx={{
            position: 'relative',
            cursor: 'pointer',
        }}>
            <Box
                sx={{
                    width: '37px',
                    height: '37px',
                    p: 0.5,
                    borderRadius: 1,
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
                    border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                }}
                onClick={() => isShowPersonList.onToggle()}
            >
                <Iconify icon={personColors.find((item) => item.value === personColorLevel)?.icon || ""} sx={{
                    color: theme => theme.palette.primary.main,
                    width: '100%',
                    height: '100%',
                }} />
            </Box>
            <Box sx={{
                position: 'absolute',
                left: 0,
                top: '100%',
                width: '100%',
                display: isShowPersonList.value ? 'block' : 'none',
                zIndex: 100,
                borderRadius: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                }}>
                    {personColors.map((_, index) => (
                        <Box key={index}
                            sx={{
                                width: '37px',
                                height: '37px',
                                p: 0.5,
                                borderRadius: 1,
                                backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s',
                                "&:hover": {
                                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                                }
                            }}
                            onClick={() => handleChanglePersonColorLevel(_.value)}
                        >
                            <Iconify icon={_.icon} sx={{
                                color: theme => theme.palette.primary.main,
                                width: '100%',
                                height: '100%',
                            }} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

const personColors = [
    {
        value: 100,
        icon: "twemoji:raised-back-of-hand",
    },
    {
        value: 75,
        icon: "twemoji:raised-back-of-hand-light-skin-tone",
    },
    {
        value: 50,
        icon: "twemoji:raised-back-of-hand-medium-light-skin-tone",
    },
    {
        value: 25,
        icon: "twemoji:raised-back-of-hand-medium-dark-skin-tone",
    },
    {
        value: 0,
        icon: "twemoji:raised-back-of-hand-dark-skin-tone",
    },
];