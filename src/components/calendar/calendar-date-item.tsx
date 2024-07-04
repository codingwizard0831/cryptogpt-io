
import { Box, alpha, BoxProps, Typography } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

interface CalendarDateItemProps extends BoxProps {
    date?: Date;
    selected?: boolean;
    isActive?: boolean;
    isToday?: boolean;
    disabled?: boolean;
}

export function CalendarDateItem({
    date = new Date(),
    selected,
    isActive,
    isToday,
    disabled,
    sx, ...other
}: CalendarDateItemProps) {

    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }); // e.g., "Wednesday"
    const dateOfMonth = date.getDate(); // e.g., 17

    const isHovered = useBoolean(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                ...(disabled && {
                    cursor: 'not-allowed',
                }),
                ...sx,
            }}
            onMouseEnter={() => isHovered.onTrue()}
            onMouseLeave={() => isHovered.onFalse()}
            {...other}
        >
            <Box sx={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'transparent',
                transition: 'all 0.2s',
                p: '3px',
                ...(isToday && {
                    borderColor: theme => alpha(theme.palette.primary.main, 0.6),
                }),
                ...(isActive && {
                    borderColor: 'primary.main',
                }),
                ...(selected && {
                    borderColor: 'primary.main',
                    borderStyle: 'dashed',
                }),
                ...(disabled && {
                    borderColor: 'transparent',
                }),
                ...(isHovered.value && {
                    borderColor: 'primary.main',
                    borderStyle: 'dashed',
                }),
            }}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.6),
                    transition: 'all 0.2s',
                    ...(isActive && {
                        backgroundColor: 'primary.main',
                    }),
                    ...(selected && {
                        backgroundColor: 'primary.main',
                    }),
                    ...(disabled && {
                        backgroundColor: theme => alpha(theme.palette.background.opposite, 0.2),
                    }),
                    ...(isHovered.value && {
                        backgroundColor: 'primary.main',
                    }),
                }} />
            </Box>
            <Typography variant="caption" sx={{
                fontSize: '8px',
                mt: '2px',
            }}>{!disabled && `${dayOfWeek.substring(0, 3)} ${dateOfMonth}`}</Typography>
        </Box>
    );
}