import Box, { BoxProps } from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/settings';

import { NAV, HEADER, SPACING } from '../config-layout';

// ----------------------------------------------------------------------

export default function Main({ children, sx, ...other }: BoxProps) {
  const settings = useSettingsContext();
  const lgUp = useResponsive('up', 'lg');

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
        px: 2,
        pt: `${HEADER.H_DESKTOP + SPACING.md * 2}px`,
        width: `calc(100% - ${NAV.W_SIDE_BAR_MENU}px)`,
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
