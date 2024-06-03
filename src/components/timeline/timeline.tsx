import { Box, alpha, useTheme } from "@mui/material";

import { TimelineProps } from "./type";

export default function Timeline({ data = [] }: TimelineProps) {
    const theme = useTheme();
    const timelineData = data;

    return <Box sx={{
        display: 'flex',
        height: '120px',
    }}>
        {
            timelineData.map((item, index) => <Box key={`timeline${index}`} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                width: item.amount ? `${item.amount}%` : 'auto',
                ...(index === timelineData.length - 1 ? { flex: 1 } : {}),
            }}>
                <Box sx={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 'calc(50% + 14px)',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    {item.upElement}
                </Box>
                <Box sx={{
                    position: 'absolute',
                    left: '50%',
                    top: 'calc(50% + 14px)',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    {item.downElement}
                </Box>

                <Box sx={{
                    width: 'calc(50% - 10px)',
                    height: '3px',
                    bgcolor: alpha(theme.palette.divider, 0.2),
                    ...(index === 0 ? {} : { bgcolor: timelineData[index - 1].color ? timelineData[index - 1].color : alpha(theme.palette.divider, 0.2) })
                }} />
                <Box sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: item.color ? item.color : alpha(theme.palette.divider, 0.2),
                    border: '1px solid white',
                }} />
                <Box sx={{
                    width: 'calc(50% - 10px)',
                    height: '3px',
                    bgcolor: alpha(theme.palette.divider, 0.2),
                    ...(index === timelineData.length - 1 ? {} : { bgcolor: item.color ? item.color : alpha(theme.palette.divider, 0.2) })
                }} />

            </Box>)
        }

    </Box>
}