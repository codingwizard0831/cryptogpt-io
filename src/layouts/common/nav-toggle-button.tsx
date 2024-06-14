import { alpha, useTheme } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';


// ----------------------------------------------------------------------

export default function NavToggleButton({ sx, ...other }: IconButtonProps) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const smUp = useResponsive('up', 'sm');

  if (smUp) {
    return null;
  }

  return (
    <IconButton
      size="small"
      onClick={() =>
        settings.onToggleMenu()
      }
      sx={{
        p: 0.5,
        zIndex: theme.zIndex.appBar + 1,
        border: `dashed 1px ${theme.palette.divider}`,
        backgroundColor: alpha(theme.palette.background.default, 0.2),
        backdropFilter: 'blur(10px)',
        transition: `all ${settings.isShowMenu ? '' : '0.3s'} 0.3s ease-in-out`,
        '&:hover': {
          backgroundColor: alpha(theme.palette.background.default, 0.4),
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={16}
        icon='eva:arrow-ios-back-fill'
        sx={{
          transition: 'all 0.24s ease-in-out',
          transform: settings.isShowMenu ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
      />
    </IconButton>
  );
}
