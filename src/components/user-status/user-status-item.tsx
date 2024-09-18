import { Box, alpha, BoxProps, useTheme } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import Iconify from "../iconify";

export type UserStatusType = {
    id: string;
    color: string;
    label: string;
    icon: string;
};

interface UserStatusItemProps extends BoxProps {
    data: UserStatusType;
}

export const USER_STATUS: {
    [key: string]: UserStatusType[];
} = {
    status: [
        { id: 'online', color: '#4CAF50', label: 'Online', icon: "carbon:circle-filled" },
        { id: 'idle', color: '#FFC107', label: 'Idle', icon: "icon-park-outline:sleep" },
        { id: 'doNotDisturb', color: '#F44336', label: 'Do Not Disturb', icon: "ic:baseline-do-disturb-on" },
        { id: 'offline', color: '#9E9E9E', label: 'Offline', icon: "ci:circle" }
    ],
    mood: [
        { id: 'happy', color: '#FFD700', label: 'Happy', icon: "ion:happy-outline" },
        { id: 'calm', color: '#00CED1', label: 'Calm', icon: "healthicons:calm" },
        { id: 'focused', color: '#4169E1', label: 'Focused', icon: "tdesign:focus" },
        { id: 'tired', color: '#8A2BE2', label: 'Tired', icon: "bx:tired" }
    ],
    activity: [
        { id: 'working', color: '#FF6347', label: 'Working', icon: "material-symbols:work-outline" },
        { id: 'ai-researching', color: '#32CD32', label: 'AI Researching', icon: "ph:brain" },
        { id: 'backtesting', color: '#32CD32', label: 'Backtesting', icon: "tdesign:chart-combo" },
        { id: 'exercising', color: '#FF8C00', label: 'Exercising', icon: "healthicons:exercise-running" },
        { id: 'eating', color: '#32CD32', label: 'Eating', icon: "fluent-mdl2:eat-drink" },
        { id: 'vacationing', color: '#FF69B4', label: 'Vacationing', icon: "icon-park-outline:vacation" },
    ]
};

export default function UserStatusItem({
    data,
    sx,
    ...other
}: UserStatusItemProps) {
    const smUp = useResponsive('up', 'sm');
    const theme = useTheme();

    return (
        <Box sx={{
            width: smUp ? '28px' : '16px',
            height: smUp ? '28px' : '16px',
            backgroundColor: alpha(theme.palette.background.default, 0.2),
            borderRadius: '50%',
            // border: `1px solid ${theme.palette.background.default}`,
            boxShadow: `0 0 5px 1px ${data.color}`,
            ...sx,
        }}  {...other} >
            <Iconify sx={{
                width: '100%',
                height: '100%',
            }} icon={data.icon} color={data.color} />
        </Box>
    );
}