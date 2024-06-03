"use client";

import { useEffect } from "react";
import { m, stagger, useAnimate } from "framer-motion";

import { useTheme } from "@mui/material";

import { cn } from "src/utils/cn";

const TextGenerateEffect = ({
    words,
    className,
}: {
    words: string;
    className?: string;
}) => {
    const [scope, animate] = useAnimate();
    const theme = useTheme();
    const wordsArray = words.split(" ");
    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
            },
            {
                duration: 2,
                delay: stagger(0.2),
            }
        );
    }, [scope.current]);

    const renderWords = () => (
        <m.div ref={scope}>
            {wordsArray.map((word, idx) => (
                <m.span
                    key={word + idx}
                    className="opacity-0"
                >
                    {word}{" "}
                </m.span>
            ))}
        </m.div>
    );

    return (
        <div className={cn(className)}>
            <div className="mt-4">
                <div className="leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};

export default TextGenerateEffect;