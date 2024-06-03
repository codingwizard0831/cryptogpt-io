import { alpha, Theme } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { autocompleteClasses } from '@mui/material/Autocomplete';

import { menuItem, ScrollCustomStyle } from '../../css';

// ----------------------------------------------------------------------

export function autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          [`& span.${autocompleteClasses.tag}`]: {
            ...theme.typography.subtitle2,
            height: 24,
            minWidth: 24,
            lineHeight: '24px',
            textAlign: 'center',
            padding: theme.spacing(0, 0.75),
            color: theme.palette.text.secondary,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.background.default, 0.2),
          },
        },
        paper: {
          // ...paper({ theme, dropdown: true }),
          backgroundColor: alpha(theme.palette.background.default, 0.2),
          backdropFilter: 'blur(10px)',
          boxShadow: 3,
          ...(ScrollCustomStyle(theme, {})),
        },
        listbox: {
          padding: 0,
          [`& .${autocompleteClasses.option}`]: {
            ...menuItem(theme),
          },
        },
        endAdornment: {
          [`& .${svgIconClasses.root}`]: {
            width: 18,
            height: 18,
          },
        },
      },
    },
  };
}
