import { BoxProps } from "@mui/material";

export interface TimelineDataType {
    upElement?: React.ReactNode;
    downElement?: React.ReactNode;
    color?: string;
    icon?: React.ReactNode;
    amount?: number;
}

export interface TimelineProps extends BoxProps {
    data?: TimelineDataType[];
}