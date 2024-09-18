import { Box, alpha, BoxProps, useTheme } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import Iconify from "../iconify";

export type UserStatusType = {
    id: string;
    type: string;
    color: string;
    label: string;
    icon: string;
};

interface UserStatusItemProps extends BoxProps {
    data: UserStatusType;
}

export const USER_STATUS: UserStatusType[] = [
    { id: 'online', type: 'status', color: '#4CAF50', label: 'Online', icon: "carbon:circle-filled" },
    { id: 'idle', type: 'status', color: '#FFC107', label: 'Idle', icon: "icon-park-outline:sleep" },
    { id: 'doNotDisturb', type: 'status', color: '#F44336', label: 'Do Not Disturb', icon: "ic:baseline-do-disturb-on" },
    { id: 'offline', type: 'status', color: '#9E9E9E', label: 'Offline', icon: "ci:circle" },
    { id: 'happy', type: 'mood', color: '#FFD700', label: 'Happy', icon: "ion:happy-outline" },
    { id: 'calm', type: 'mood', color: '#00CED1', label: 'Calm', icon: "healthicons:calm" },
    { id: 'focused', type: 'mood', color: '#4169E1', label: 'Focused', icon: "tdesign:focus" },
    { id: 'tired', type: 'mood', color: '#8A2BE2', label: 'Tired', icon: "bx:tired" },
    { id: 'working', type: 'activity', color: '#FF6347', label: 'Working', icon: "material-symbols:work-outline" },
    { id: 'ai-researching', type: 'activity', color: '#32CD32', label: 'AI Researching', icon: "ph:brain" },
    { id: 'backtesting', type: 'activity', color: '#32CD32', label: 'Backtesting', icon: "tdesign:chart-combo" },
    { id: 'exercising', type: 'activity', color: '#FF8C00', label: 'Exercising', icon: "healthicons:exercise-running" },
    { id: 'eating', type: 'activity', color: '#32CD32', label: 'Eating', icon: "fluent-mdl2:eat-drink" },
    { id: 'vacationing', type: 'activity', color: '#FF69B4', label: 'Vacationing', icon: "icon-park-outline:vacation" },
];

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