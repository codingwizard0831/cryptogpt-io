import { BoxProps } from "@mui/system";

export interface Card3dProps extends BoxProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    containerSx?: BoxProps["sx"];
}

export interface Card3dBodyProps extends BoxProps {
    children: React.ReactNode;
    className?: string;
}

export interface Card3dItemProps extends BoxProps {
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    translateX?: number | string;
    translateY?: number | string;
    translateZ?: number | string;
    rotateX?: number | string;
    rotateY?: number | string;
    rotateZ?: number | string;
    [key: string]: any;
}