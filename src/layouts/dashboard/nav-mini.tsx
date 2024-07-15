import { useMemo } from 'react';

import Box from '@mui/material/Box';
import { alpha } from '@mui/system';
import Stack from '@mui/material/Stack';

import { useResponsive } from 'src/hooks/use-responsive';
import { useMockedUser } from 'src/hooks/use-mocked-user';

import Image from 'src/components/image';
import { NavSectionMini } from 'src/components/nav-section';
import { useSettingsContext } from 'src/components/settings';

import { NAV, SPACING } from '../config-layout';
import { useNavData } from './config-navigation';
import NavToggleButton from '../common/nav-toggle-button';

// ----------------------------------------------------------------------

export default function NavMini() {
  const smUp = useResponsive('up', 'sm');
  const { user } = useMockedUser();

  const settings = useSettingsContext();
  const navData = useNavData();

  const leftMenuSpacing = useMemo(() => {
    if (smUp) return SPACING.md;
    if (settings.isShowMenu) return SPACING.sm * 2;
    return `-${NAV.W_SIDE_BAR_MENU}px`;
  }, [smUp, settings.isShowMenu]);

  const NavToggleButtonLeftSpacing = useMemo(() => {
    if (smUp) return '10px';
    if (settings.isShowMenu) return '10px';
    return `${NAV.W_SIDE_BAR_MENU + SPACING.sm * 2}px`;
  }, [smUp, settings.isShowMenu]);

  return (
    <Box
      sx={{
        width: smUp ? NAV.W_SIDE_BAR_MENU : 0,
        transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1)',
      }}
    >
      <Stack sx={{
        position: 'fixed',
        top: 0,
        left: leftMenuSpacing,
        zIndex: 999,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'end',
        transition: 'all 0.3s ease-in-out',
      }}>
        <Stack
          sx={{
            pb: 2,
            width: (NAV.W_SIDE_BAR_MENU - (smUp ? SPACING.md : SPACING.md + 10)),
            position: 'relative',
            backgroundColor: (theme: any) => alpha(theme.palette.background.opposite, 0.1),
            backdropFilter: 'blur(20px)',
            borderRadius: (theme: any) => theme.shape.borderRadius,
            border: (theme: any) => `solid 1px ${alpha(theme.palette.background.opposite, 0.2)}`,
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
              top: 42,
              left: NavToggleButtonLeftSpacing,
              zIndex: 999,
            }}
          />

          {/* <Logo sx={{ mx: 'auto', my: 2 }} /> */}
          <Image src="/logo/crgpt-icon-full.png" alt="logo" sx={{
            width: '32px',
            height: '32px',
            borderRadius: 1,
            mt: 1.5,
            mb: 1,
          }} />

          <NavSectionMini
            data={navData}
            slotProps={{
              currentRole: user?.role,
            }}
            sx={{
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
