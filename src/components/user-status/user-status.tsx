import { IconButton, IconButtonProps } from "@mui/material";

import UserStatusItem, { UserStatusType } from "./user-status-item";

interface UserStatusProps extends IconButtonProps {
    data: UserStatusType;
}

export default function UserStatus({
    data,
    sx,
    ...other
}: UserStatusProps) {

    return (
        <IconButton sx={{
            ...sx,
        }} {...other}>
            <UserStatusItem data={data} />
        </IconButton>
    );
}