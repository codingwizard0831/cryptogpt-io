'use client';

import { useMemo } from 'react';

import { useTheme } from '@mui/material/styles';

import { BackgroundGradientAnimation } from '../background-gradient-animation';
import { BackgroundGradientAnimationContext } from './background-gradient-animation-context';

// ----------------------------------------------------------------------

type BackgroundGradientAnimationProviderProps = {
    children: React.ReactNode;
};

export function BackgroundGradientAnimationProvider({ children }: BackgroundGradientAnimationProviderProps) {
    const theme = useTheme();

    const { backgroundGradientEffect } = theme.palette;

    const memoizedValue = useMemo(
        () => ({
        }),
        []
    );

    return <BackgroundGradientAnimationContext.Provider value={memoizedValue}>
        <BackgroundGradientAnimation {...backgroundGradientEffect} />
        {children}
    </BackgroundGradientAnimationContext.Provider>;
}
