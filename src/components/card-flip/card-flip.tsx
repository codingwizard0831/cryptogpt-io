import React, { useEffect } from "react";

import { Box } from "@mui/material";

import { ICardFlipProps } from "./types";

const CardFlip: React.FC<ICardFlipProps> = ({
    isFlipped: defaultIsFlipped = false,
    handleClick,
    frontContent,
    backContent,
    isHover = false,
    isHandleFlip = false,
    isDoubleClickHandleFlip = false,
    speed = 0.6,
    sx,
    ...other
}) => {
    const [isFlipped, setIsFlipped] = React.useState(defaultIsFlipped);
    useEffect(() => {
        setIsFlipped(defaultIsFlipped);
    }, [defaultIsFlipped]);
    const flipHandle = () => {
        if (handleClick) handleClick();
        if (isHandleFlip === false) setIsFlipped(!isFlipped);
    };
    const [lastTouch, setLastTouch] = React.useState(Date.now());

    const touchEndHandle = () => {
        const now = Date.now();
        if (now - lastTouch < 500) {
            flipHandle();
        }
        setLastTouch(now);
    };

    return (
        <Box sx={{
            perspective: "1000px",
            width: "100%",
            height: "200px",
            position: 'relative',
            ...(
                isHover ? {
                    "&:hover": {
                        "& > div": {
                            transform: "rotateY(180deg)",
                        },
                    }
                } : {}
            ),
            ...(
                isFlipped ? {
                    "& > div": {
                        transform: "rotateY(180deg)",
                    }
                } : {}
            ),
            ...sx
        }}
            onDoubleClick={isDoubleClickHandleFlip ? flipHandle : undefined}
            onClick={isDoubleClickHandleFlip ? undefined : flipHandle}
            onTouchEnd={touchEndHandle}
            {...other}
        >
            <Box sx={{
                transition: `transform ${speed}s`,
                transformStyle: "preserve-3d",
                position: "relative",
                width: "100%",
                height: "100%",
            }}>
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backfaceVisibility: "hidden",
                    zIndex: isFlipped ? 0 : 1,
                    transform: "rotateY(0deg)",
                }}>
                    {
                        frontContent || ""
                    }
                </Box>
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backfaceVisibility: "hidden",
                    zIndex: isFlipped ? 1 : 0,
                    transform: "rotateY(180deg)",
                }}>
                    {
                        backContent || ""
                    }
                </Box>
            </Box>
        </Box >
    );
}

export default CardFlip;