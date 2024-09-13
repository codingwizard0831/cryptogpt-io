import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { ButtonBase } from '@mui/material';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { getUserProfileInfo } from 'src/auth/context/jwt/utils';

import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { StyledDialog } from 'src/components/styled-component';
import UserStatus from 'src/components/user-status/user-status';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import UserStatusButton from 'src/components/user-status/user-status-button';
import UserStatusItem, { USER_STATUS } from 'src/components/user-status/user-status-item';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Profile',
    linkTo: paths.dashboard.user.profile,
  },
  {
    label: 'Setting',
    linkTo: paths.dashboard.user.account,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { logout, user } = useAuthContext();

  const user_profile = getUserProfileInfo();

  const popover = usePopover();
  const userStatusDialogVisible = useBoolean(false);

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace(paths.auth.jwt.login);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <Box sx={{
        position: 'relative',
      }}>

        <IconButton
          component={m.button}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.05)}
          onClick={popover.onOpen}
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <Avatar
            alt={user_profile?.user_name || ""}
            src={user_profile?.avatar || ''}
            sx={{
              mx: 'auto',
              width: 36,
              height: 36,
              fontSize: 18,
              backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
              color: 'primary.main',
              border: theme => `solid 1px ${theme.palette.primary.main}`,
            }}
          >
            {user_profile?.user_name?.charAt(0).toUpperCase() || 'J'}
          </Avatar>
        </IconButton>

        <Box sx={{
          position: 'absolute',
          bottom: -32,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 1,
          backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
          borderRadius: 2,
        }}>
          <UserStatusItem data={USER_STATUS.status[0]} sx={{
            width: '16px',
            height: '16px',
          }} />
          <UserStatusItem data={USER_STATUS.status[1]} sx={{
            width: '16px',
            height: '16px',
          }} />
          <UserStatusItem data={USER_STATUS.status[2]} sx={{
            width: '16px',
            height: '16px',
          }} />
          <UserStatusItem data={USER_STATUS.status[3]} sx={{
            width: '16px',
            height: '16px',
          }} />
        </Box>
      </Box>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user_profile?.user_name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <ButtonBase
          sx={{
            px: 2,
            py: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
          onClick={() => userStatusDialogVisible.onTrue()}
        >
          <UserStatusItem data={USER_STATUS.status[0]} sx={{
            width: '16px',
            height: '16px',
          }} onClick={() => userStatusDialogVisible.onTrue()} />
          <Typography variant="body2" sx={{
            flex: 1,
            textAlign: 'left',
          }}>
            Online
          </Typography>

          <IconButton size="small">
            <Iconify icon="mingcute:right-line" />
          </IconButton>
        </ButtonBase>

        <StyledDialog open={userStatusDialogVisible.value} onClose={() => userStatusDialogVisible.onFalse()}>
          <Stack direction='column' alignItem="center" spacing={2} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            position: 'relative',
          }}>
            <IconButton sx={{
              position: 'absolute',
              top: 2,
              right: 2,
            }}>
              <Iconify icon="eva:close-outline" sx={{
                color: 'primary.main',
              }} onClick={() => userStatusDialogVisible.onFalse()} />
            </IconButton>

            <Box sx={{
              position: 'relative',
            }}>
              <Avatar
                alt={user_profile?.user_name || ""}
                src={user_profile?.avatar || ''}
                sx={{
                  mx: 'auto',
                  width: { xs: 64, md: 96 },
                  height: { xs: 64, md: 96 },
                  fontSize: { xs: 32, md: 48 },
                  backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
                  color: 'primary.main',
                  border: theme => `solid 2px ${theme.palette.primary.main}`,
                }}
              >
                {user_profile?.user_name?.charAt(0).toUpperCase() || 'J'}
              </Avatar>

              <UserStatus data={USER_STATUS.status[0]} sx={{
                position: 'absolute',
                top: '-8px',
                left: '-8px',
              }} />
              <UserStatus data={USER_STATUS.status[1]} sx={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
              }} />
              <UserStatus data={USER_STATUS.status[2]} sx={{
                position: 'absolute',
                bottom: '-8px',
                left: '-8px',
              }} />
              <UserStatus data={USER_STATUS.status[3]} sx={{
                position: 'absolute',
                bottom: '-8px',
                right: '-8px',
              }} />
            </Box>

            {
              Object.keys(USER_STATUS).map((_statusArray, _g_index) => (
                <Stack key={`status-group-${_g_index}`} direction='column' alignItem="center" spacing={2} sx={{
                  p: 2,
                }}>
                  <Typography variant="subtitle1" sx={{
                    textAlign: 'center',
                  }}>
                    {_statusArray.charAt(0).toUpperCase() + _statusArray.slice(1)}
                  </Typography>
                  <Stack direction='row' alignItem="center" spacing={2} sx={{
                    flexWrap: 'wrap',
                    width: '400px',
                  }}>
                    {
                      USER_STATUS[_statusArray].map((_status) => (
                        <UserStatusButton key={`user-status-button-${_g_index}-${_status.id}`} data={_status} sx={{
                          width: 'calc(50% - 8px)',
                        }} />
                      ))
                    }
                  </Stack>
                </Stack>
              ))
            }
          </Stack>
        </StyledDialog>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
