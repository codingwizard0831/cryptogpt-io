import { BoxProps } from "@mui/material";

export interface ToggleProps extends BoxProps {
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}