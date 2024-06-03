import Box, { BoxProps } from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/settings';

import { NAV, HEADER } from '../config-layout';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }: BoxProps) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: 'column',

          height: '100vh',
          overflowX: 'hidden',
          overflowY: 'auto',
          // backgroundColor: (theme) => `${alpha(theme.palette.primary.darker, 0.2)}`,

          pt: `${HEADER.H_MOBILE + SPACING}px`,
          // height: `calc(100vh - ${HEADER.H_MOBILE + 24}px)`,
          // pb: 10,
          ...(lgUp && {
            pt: `${HEADER.H_MOBILE * 2 + 40}px`,
            // height: `calc(100vh - ${HEADER.H_MOBILE * 2 + 40}px)`,
            // pb: 15,
          }),
        }}
      >
        {children}
      </Box>
    );
  }

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
        // backgroundColor: (theme) => `${alpha(theme.palette.primary.darker, 0.2)}`,

        pt: `${HEADER.H_MOBILE + SPACING}px`,
        // height: `calc(100vh - ${HEADER.H_MOBILE + SPACING}px)`,
        ...(lgUp && {
          px: 2,
          pt: `${HEADER.H_DESKTOP + SPACING}px`,
          // height: `calc(100vh - ${HEADER.H_DESKTOP + SPACING}px)`,
          width: `calc(100% - ${NAV.W_VERTICAL}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI}px)`,
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
