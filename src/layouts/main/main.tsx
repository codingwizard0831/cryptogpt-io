import Box, { BoxProps } from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/settings';

import { NAV, HEADER, SPACING } from '../config-layout';

// ----------------------------------------------------------------------

export default function Main({ children, sx, ...other }: BoxProps) {
    const settings = useSettingsContext();
    const smUp = useResponsive('up', 'sm');

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                minHeight: 1,
                display: 'flex',
                flexDirection: 'column',

                height: '100vh',
                overflowX: 'hidden',
                overflowY: 'hidden',
                px: `${smUp ? SPACING.md : SPACING.sm}px`,
                pt: smUp ? `${HEADER.H_DESKTOP + SPACING.md * 2}px` : `${HEADER.H_MOBILE + SPACING.sm * 2}px`,
                width: `calc(100% - ${NAV.W_SIDE_BAR_MENU}px)`,
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    );
}
