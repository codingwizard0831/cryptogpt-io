import { BoxProps } from "@mui/material";

export interface NuanceProps extends BoxProps {
    children?: React.ReactNode;
    value?: string | Number;
};