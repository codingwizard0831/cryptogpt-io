import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { alpha, useTheme } from '@mui/material/styles';

import { useSettingsContext } from 'src/components/settings';

import SharePopover from '../common/share-popover';
import SearchAgentBar from '../common/searchAgentBar';
import SettingsButton from '../common/settings-button';
import AccountPopover from '../common/account-popover';
import { NAV, HEADER, SPACING } from '../config-layout';
import ContactsPopover from '../common/contacts-popover';
import LanguagePopover from '../common/language-popover';
import NotificationsPopover from '../common/notifications-popover';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const renderContent = (
    <>
      <SearchAgentBar />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <SharePopover />

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
        height: HEADER.H_DESKTOP,
        width: `calc(100% - ${NAV.W_SIDE_BAR_MENU + 1}px - ${SPACING.md * 2}px)`,
        // zIndex: theme.zIndex.appBar + 1,
        zIndex: 998, // Duffel component is 999
        top: `${SPACING.md}px !important`,
        right: `${SPACING.md}px !important`,
        backdropFilter: 'blur(10px)',
        backgroundColor: alpha(theme.palette.background.opposite, 0.1),
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
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
    </AppBar>
  );
}
