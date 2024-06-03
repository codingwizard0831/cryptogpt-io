"use client";

import React, {
    useRef,
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";

import { Box } from "@mui/material";

import { cn } from "src/utils/cn";

import { Card3dProps, Card3dBodyProps, Card3dItemProps } from "./types";

const MouseEnterContext = createContext<
    [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const Card3d: React.FC<Card3dProps> = ({
    children,
    className,
    containerClassName,
    sx,
    containerSx,
    ...other
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } =
            containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsMouseEntered(true);
        // if (!containerRef.current) return;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        setIsMouseEntered(false);
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };
    return (
        <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
            <Box
                className={cn(
                    "card-3d-container w-full flex items-center justify-center",
                    containerClassName
                )}
                style={{
                    perspective: "1000px",
                }}
                sx={{
                    ...containerSx
                }}
                {...other}
            >
                <Box
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                        "flex items-center justify-center relative transition-all duration-200 ease-linear",
                        className
                    )}
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                    sx={{
                        ...sx
                    }}
                >
                    {children}
                </Box>
            </Box>
        </MouseEnterContext.Provider>
    );
};

export const Card3dBody: React.FC<Card3dBodyProps> = ({
    children,
    className,
    sx
}) => {
    console.log("CardBody");
    return (
        <Box
            className={cn(
                "card-3d-body w-full [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
                className
            )}
            sx={{
                ...sx
            }}
        >
            {children}
        </Box>
    );
};

export const Card3dItem: React.FC<Card3dItemProps> = ({
    as: Tag = "div",
    children,
    className,
    translateX = 0,
    translateY = 0,
    translateZ = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    sx,
    ...rest
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isMouseEntered] = useMouseEnter();

    useEffect(() => {
        handleAnimations();
    }, [isMouseEntered]);

    const handleAnimations = () => {
        if (!ref.current) return;
        if (isMouseEntered) {
            ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        } else {
            ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
        }
    };

    return (
        <Tag
            ref={ref}
            className={cn("card-3m-item w-full transition duration-200 ease-linear", className)}
            {...rest}
            sx={{
                ...sx
            }}
        >
            {children}
        </Tag>
    );
};

// Create a hook to use the context
export const useMouseEnter = () => {
    const context = useContext(MouseEnterContext);
    if (context === undefined) {
        throw new Error("useMouseEnter must be used within a MouseEnterProvider");
    }
    return context;
};
