import { BoxProps } from "@mui/material";

export interface ICardFlipProps extends BoxProps {
    isFlipped?: boolean;
    handleClick?: () => void;
    frontContent?: React.ReactNode;
    backContent?: React.ReactNode;
    speed?: number;
    isHover?: boolean;
    isHandleFlip?: boolean;
    isDoubleClickHandleFlip?: boolean;
};