import { listClasses } from '@mui/material/List';
import { Theme, alpha } from '@mui/material/styles';

import { paper } from '../../css';

// ----------------------------------------------------------------------

export function popover(theme: Theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          ...paper({ theme, dropdown: true }),
          [`& .${listClasses.root}`]: {
            paddingTop: 0,
            paddingBottom: 0,
          },
          // backgroundColor: (th: Theme) => alpha(th.palette.background.default, 0.2),
          backgroundColor: alpha(theme.palette.background.default, 0.2),
          backdropFilter: 'blur(5px)',
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
  };
}
