import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: 'relative',
          boxShadow: theme.customShadows.card,
          backgroundColor: alpha(theme.palette.background.neutral, 0.07),
          backdropFilter: 'blur(10px)',
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
