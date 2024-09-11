import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';
import { useUserProfile } from 'src/store/user/userProfile';

import Iconify from 'src/components/iconify/iconify';
import UserStatus from 'src/components/user-status/user-status';
import { USER_STATUS } from 'src/components/user-status/user-status-item';

import { IUserProfileCover } from 'src/types/user';

// ----------------------------------------------------------------------

export default function ProfileCover({
  name = 'John Deo',
  avatarUrl,
  role,
  coverUrl,
}: IUserProfileCover) {
  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');
  const status = useUserProfile((state) => state.status);

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.darker, 0.8),
          imgUrl: coverUrl,
        }),
        height: 1,
        color: 'common.white',
      }}
    >
      {/* <Box
        sx={{
          position: 'absolute',
          left: '-16px',
          top: '-16px',
        }}
      >
        <Iconify
          icon="material-symbols:privacy-tip-outline"
          sx={{
            width: '128px',
            height: '128px',
            color: alpha(theme.palette.primary.main, 0.8),
          }}
        />
      </Box> */}

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'center', md: 'flex-end' }}
        spacing={2}
        sx={{
          left: { md: 12 },
          bottom: { md: 12 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Avatar
            alt={name}
            src={avatarUrl || ''}
            sx={{
              mx: 'auto',
              width: { xs: 64, md: 128 },
              height: { xs: 64, md: 128 },
              fontSize: { xs: 32, md: 64 },
              backgroundColor: alpha(theme.palette.background.default, 0.2),
              color: 'primary.main',
              border: `solid 2px ${theme.palette.primary.main}`,
            }}
          >
            {name?.charAt(0).toUpperCase()}
          </Avatar>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.25,
            }}
          >
            <UserStatus
              data={USER_STATUS.status[0]}
              sx={{
              }}
            />
            <UserStatus
              data={USER_STATUS.status[1]}
              sx={{
              }}
            />
            <UserStatus
              data={USER_STATUS.status[2]}
              sx={{
              }}
            />
            <UserStatus
              data={USER_STATUS.status[3]}
              sx={{
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="caption">DevOps Engineer</Typography>
          <Typography variant="h4">John Deo</Typography>
        </Box>
      </Stack>
    </Box>
  );
}
