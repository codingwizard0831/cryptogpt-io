
import { Box, alpha, BoxProps, Typography } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

interface CalendarDateItemProps extends BoxProps {
    date?: Date;
    selected?: boolean;
    isActive?: boolean;
    isToday?: boolean;
    disabled?: boolean;
    size?: 'small' | 'large';
    displayAttribute?: "week" | "month" | "none";
}

export function CalendarDateItem({
    date = new Date(),
    selected,
    isActive,
    isToday,
    disabled,
    size = 'small',
    displayAttribute = "week",
    sx, ...other
}: CalendarDateItemProps) {

    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }); // e.g., "Wednesday"
    const dateOfMonth = date.getDate(); // e.g., 17
    const monthOfYear = date.toLocaleString('en-US', { month: 'long' }).substring(0, 3); // e.g., "September"

    const isHovered = useBoolean(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                position: 'relative',
                '&:hover': {
                    '& > div:last-child': {
                        opacity: 1,
                        visibility: 'visible',
                    }
                },
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
                width: size === "small" ? '24px' : "32px",
                height: size === "small" ? '24px' : "32px",
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
                ...(isHovered.value && {
                    borderColor: 'primary.main',
                    borderStyle: 'dashed',
                }),
                ...(disabled && {
                    borderColor: 'transparent',
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
                    ...(isHovered.value && {
                        backgroundColor: 'primary.main',
                    }),
                    ...(disabled && {
                        backgroundColor: theme => alpha(theme.palette.background.opposite, 0.2),
                    }),
                }} />
            </Box>
            <Typography variant="caption" sx={{
                fontSize: size === "small" ? '8px' : '10px',
                mt: '2px',
                display: 'block',
                whiteSpace: 'nowrap',
            }}>{disabled ? <>&nbsp;</> : <>
                {
                    displayAttribute === "none" && ""
                }
                {
                    displayAttribute === "week" && `${dayOfWeek.substring(0, 3)} ${dateOfMonth}`
                }
                {
                    displayAttribute === "month" && `${monthOfYear} ${dateOfMonth}th`
                }
            </>
                }</Typography>

            <Box sx={{
                position: 'absolute',
                bottom: 32,
                left: 32,
                backgroundColor: (theme) => alpha(theme.palette.background.opposite, 0.1),
                backdropFilter: 'blur(10px)',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                transition: 'all 0.3s',
                opacity: 0,
                invisility: 'hidden',
                width: '200px',
            }}>
                <Typography variant="caption" sx={{
                    fontSize: '8px',
                    color: 'text.disabled',
                }}>Hoever Detail</Typography>
            </Box>
        </Box>
    );
}