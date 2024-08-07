import { ReactNode } from "react";

import ThemeProvider from "src/theme";

import { SettingsProvider } from "src/components/settings";


export default function CanvasLayout({ children }: { children: ReactNode }) {
    return <SettingsProvider
        defaultSettings={{
            themeMode: 'dark', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'orange', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
        }}>
        <ThemeProvider>
            {children}
        </ThemeProvider>
    </SettingsProvider>
}