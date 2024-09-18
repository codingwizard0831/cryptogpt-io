import { alpha, Button, useTheme, Typography, ButtonProps } from "@mui/material";

import UserStatusItem, { UserStatusType } from "./user-status-item";


export interface UserStatusButtonProps extends ButtonProps {
    data: UserStatusType,
    isSelected?: boolean,
}

export default function UserStatusButton({
    data,
    isSelected = false,
    sx,
    ...other
}: UserStatusButtonProps) {
    const theme = useTheme();

    return <Button variant="soft" sx={{
        width: "96px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        backgroundColor: alpha(data.color, 0.1),
        border: `1px solid ${data.color}`,
        boxShadow: `0 0 5px 1px ${alpha(data.color, 0.8)}`,
        "&:hover": {
            backgroundColor: alpha(data.color, 0.3),
        },
        ...(isSelected && {
            backgroundColor: alpha(data.color, 0.3),
        }),
        ...sx,
    }} {...other}>
        <UserStatusItem data={data} sx={{
            border: 'none',
            boxShadow: 'none',
        }} />
        <Typography variant="subtitle2" sx={{
            textAlign: 'center',
        }}>
            {data.label}
        </Typography>
    </Button>
}