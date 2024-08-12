import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: 'relative',
          boxShadow: theme.customShadows.card,
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha(theme.palette.background.opposite, 0.08),
          border: `solid 1px ${alpha(theme.palette.background.opposite, 0.2)}`,
          borderRadius: theme.shape.borderRadius * 2,
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
