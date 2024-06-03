'use client';

import { useContext, createContext } from 'react';

import { BackgroundGradientAnimationContextProps } from '../types';

// ----------------------------------------------------------------------

export const BackgroundGradientAnimationContext = createContext({} as BackgroundGradientAnimationContextProps);

export const useBackgroundGradientAnimationContext = () => {
    const context = useContext(BackgroundGradientAnimationContext);

    if (!context) throw new Error('useBackgroundGradientAnimationContext must be use inside SettingsProvider');

    return context;
};
