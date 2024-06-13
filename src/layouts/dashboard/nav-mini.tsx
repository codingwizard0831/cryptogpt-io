import Box from '@mui/material/Box';
import { alpha } from '@mui/system';
import Stack from '@mui/material/Stack';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { hideScroll } from 'src/theme/css';

import Logo from 'src/components/logo';
import { NavSectionMini } from 'src/components/nav-section';

import { NAV, SPACING } from '../config-layout';
import { useNavData } from './config-navigation';
import NavToggleButton from '../common/nav-toggle-button';

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useMockedUser();

  const navData = useNavData();

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_SIDE_BAR_MENU },
      }}
    >
      <Stack sx={{
        position: 'fixed',
        top: 0,
        left: SPACING.md,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'end',
      }}>
        <Stack
          sx={{
            pb: 2,
            height: 1,
            maxHeight: '70vh',
            minHeight: '300px',
            width: (NAV.W_SIDE_BAR_MENU - SPACING.md),
            position: 'relative',
            backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1),
            borderRadius: theme => theme.shape.borderRadius,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <NavToggleButton
            sx={{
              position: 'absolute',
              top: -6,
              left: 'unset',
              zIndex: 999,
            }}
          />

          <Logo sx={{ mx: 'auto', my: 2 }} />

          <NavSectionMini
            data={navData}
            slotProps={{
              currentRole: user?.role,
            }}
            sx={{
              flex: 1,
              ...hideScroll.x,
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
