import { BoxProps } from "@mui/material";

export interface LampButtonProps extends BoxProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    children?: React.ReactNode;
}