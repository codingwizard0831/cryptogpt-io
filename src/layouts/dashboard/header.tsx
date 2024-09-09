import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo/logo';
import { useSettingsContext } from 'src/components/settings';

import SettingsButton from '../common/settings-button';
import AccountPopover from '../common/account-popover';
import { NAV, HEADER, SPACING } from '../config-layout';
import ContactsPopover from '../common/contacts-popover';
import LanguagePopover from '../common/language-popover';
import SearchBarGoldie from '../common/searchbar-goldie';
import NotificationsPopover from '../common/notifications-popover';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const settings = useSettingsContext();
  const smUp = useResponsive('up', 'sm');

  const renderContent = (
    <>
      <Logo />

      <SearchBarGoldie sx={{
        mx: 2,
      }} />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <LanguagePopover />

        <NotificationsPopover />

        <ContactsPopover />

        <SettingsButton />

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: smUp ? HEADER.H_DESKTOP : HEADER.H_MOBILE,
        width: smUp ? `calc(100% - ${NAV.W_SIDE_BAR_MENU + 1}px - ${SPACING.md * 2}px)` : `calc(100% - ${SPACING.sm * 2}px)`,
        // zIndex: theme.zIndex.appBar + 1,
        zIndex: 998, // Duffel component is 999
        top: `${smUp ? SPACING.md : SPACING.sm}px !important`,
        right: smUp ? `${SPACING.md}px !important` : `${SPACING.sm}px !important`,
        backdropFilter: 'blur(20px)',
        backgroundColor: alpha(theme.palette.background.opposite, 0.1),
        borderRadius: theme.shape.borderRadius,
        border: `solid 1px ${alpha(theme.palette.background.opposite, 0.2)}`,
        transition: 'all 225ms cubic-bezier(0.4, 0, 0.6, 1)',
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar >
  );
}
