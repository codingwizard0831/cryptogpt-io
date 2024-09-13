import { useState, useCallback } from 'react';
import { startRegistration } from '@simplewebauthn/browser';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { alpha, Select, Tooltip, MenuItem, TextField, InputLabel, FormControl, Autocomplete } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fData } from 'src/utils/format-number';
import axios, { endpoints } from 'src/utils/axios';

import { countries } from 'src/assets/data';
import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import UploadAvatar from 'src/components/upload/upload-avatar';

import SetPassword from './set-password';

// ----------------------------------------------------------------------

type UserType = {
  displayName: string;
  email: string;
  firstName: string;
  lastName: string;
  photoURL: any;
  phoneNumber: string;
  location: string;
  about: string;
  birthday: Date;
  gender: 'M' | 'F' | 'O';
  privacyLevel: 'public' | 'private' | 'super-private';
};

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();
  const isSubmitting = useBoolean(false);
  const isSetPassword = useBoolean(true);

  const [data, setData] = useState<UserType>({
    displayName: user?.displayName || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || null,
    phoneNumber: user?.phoneNumber || '',
    location: user?.country || '',
    about: user?.about || '',
    gender: user?.gender || '',
    birthday: user?.birthday || new Date(),
    privacyLevel: user?.privacyLevel || 'public',
  });

  const handleChangeSubmit = async () => {
    try {
      isSubmitting.onTrue();
      enqueueSnackbar('Update success!');
      const res = await axios.post(endpoints.auth.profileUpdate, {
        "display_name": data.displayName,
        "first_name": data.firstName,
        "last_name": data.lastName,
        "email": data.email,
        "phone_number": data.phoneNumber,
        "country": data.location,
        "bio": data.about,
        "privacy_level": data.privacyLevel,
        'gender': data.gender,
        'birthday': fDate(data.birthday, 'yyyy-MM-dd'),
        'image_url': data.photoURL,
      });
      isSubmitting.onFalse();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      isSubmitting.onFalse();
    }
  };

  const handleWebAuthnRegister = async () => {
    try {
      if (!window.PublicKeyCredential) {
        enqueueSnackbar('WebAuthn is not supported in this browser.', { variant: 'error' });
        return;
      }
      isSubmitting.onTrue();
      const { data: optionsResponse } = await axios.post(endpoints.auth.registerFaceId);
      const { success, options } = optionsResponse;
      alert(`success: ${success}`);
      if (success) {
        alert(`options: ${options?.challenge}`);
        const attestationResponse = await startRegistration(options);
        alert(`attestationResponse: ${attestationResponse}`);
        const { data: verificationResponse } = await axios.put(endpoints.auth.registerFaceId, { attestationResponse });

        alert(`verificationResponse: ${verificationResponse}`);
        if (verificationResponse.success) {
          enqueueSnackbar('Face id registration successful!', { variant: 'success' });
          if (verificationResponse.message) {
            isSetPassword.onFalse();
          }
        } else {
          enqueueSnackbar('Face id registration failed!', { variant: 'success' });
        }
      } else {
        enqueueSnackbar('Error during face id registration.', { variant: 'error' });
      }
      isSubmitting.onFalse();
    } catch (error) {
      console.error('Detailed error:', error);
      if (error.name === 'NotAllowedError') {
        enqueueSnackbar('Face ID permission was denied. Please ensure Face ID is enabled and try again.', { variant: 'error' });
      } else {
        enqueueSnackbar(`Error during face id registration: ${error.message}`, { variant: 'error' });
      }
      isSubmitting.onFalse();
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setData({
          ...data,
          photoURL: newFile,
        });
      }
    },
    [data]
  );

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{
            pt: 10, pb: 5, px: 3,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'none',
          }}>
            <UploadAvatar
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              mt: 5,
            }}>
              {
                privacyLevels.map((_level) => <Tooltip key={`jouryney-${_level.key}`} title={_level.tooltip}>
                  <Box sx={{
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    border: theme => `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                    width: '72px',
                    height: '72px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    ":hover": {
                      backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
                      border: theme => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                      color: theme => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                      '& span': {
                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.4),
                      },
                      '& svg': {
                        color: theme => alpha(theme.palette.primary.main, 0.4),
                      },
                      '& p': {
                        color: theme => alpha(theme.palette.primary.main, 0.8),
                      },
                    },
                    ...(_level.key === data.privacyLevel && {
                      backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
                      border: theme => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                      color: theme => `solid 1px ${alpha(theme.palette.primary.main, 0.8)}`,
                    }),
                  }}
                    onClick={() => {
                      const newData = { ...data };
                      newData.privacyLevel = _level.key as 'public' | 'private' | 'super-private';
                      setData(newData);
                    }}
                  >
                    <Box component="span" sx={{
                      position: 'absolute',
                      left: '6px',
                      top: '6px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      transition: 'all 0.3s',
                      backgroundColor: 'transparent',
                      ...(_level.key === data.privacyLevel && {
                        backgroundColor: theme => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                      }),
                    }} />
                    <Iconify icon={_level.icon} sx={{
                      width: '32px',
                      height: '32px',
                      transition: 'all 0.3s',
                      color: theme => alpha(theme.palette.text.primary, 0.5),
                      ...(_level.key === data.privacyLevel && {
                        color: theme => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                      }),
                    }} />
                    <Typography variant='body2' sx={{
                      transition: 'all 0.3s',
                      fontSize: '12px',
                      ...(_level.key === data.privacyLevel && {
                        color: theme => `${alpha(theme.palette.primary.main, 0.8)}!important`,
                      }),
                    }}>{_level.label}</Typography>
                  </Box>
                </Tooltip>
                )
              }
            </Box>

            {/* <LoadingButton variant="contained" color="primary" sx={{ mt: 3, width: 235, mx: 'auto', color: "white" }} onClick={handleWebAuthnRegister} loading={isSubmitting.value}>
              Register Face Id
            </LoadingButton> */}

            <Button variant="contained" color="error" sx={{ mt: 1, width: 235, mx: 'auto' }} disabled={isSubmitting.value}>
              Delete User
            </Button>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{
            p: 3,
            backdropFilter: 'none',
          }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <TextField name="displayName" label="Name" value={data.displayName} onChange={(event) => {
                const newData = { ...data };
                newData.displayName = event.target.value;
                setData(newData);
              }} />
              <TextField name="email" label="Email Address" value={data.email} onChange={(event) => {
                const newData = { ...data };
                newData.email = event.target.value;
                setData(newData);
              }} />
              <TextField name="firstName" label="First Name" value={data.firstName} onChange={(event) => {
                const newData = { ...data };
                newData.firstName = event.target.value;
                setData(newData);
              }} />
              <TextField name="lastName" label="Last Name" value={data.lastName} onChange={(event) => {
                const newData = { ...data };
                newData.lastName = event.target.value;
                setData(newData);
              }} />
              <TextField name="phoneNumber" label="Phone Number" value={data.phoneNumber} onChange={(event) => {
                const newData = { ...data };
                newData.phoneNumber = event.target.value;
                setData(newData);
              }} />

              <Autocomplete
                id="country-select-demo"
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
                value={countries.find((option) => option.code === data.location) || countries[0]}
                onChange={(event, newValue) => {
                  console.log('newValue', newValue);
                  const newData = { ...data };
                  newData.location = newValue?.code || '';
                  setData(newData);
                }}
              />

              <FormControl>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  id="gender"
                  labelId='gender-label'
                  placeholder='Choose your gender'
                  value={data.gender}
                  onChange={(event) => {
                    const newData = { ...data };
                    newData.gender = event.target.value as 'M' | 'F' | 'O';
                    setData(newData);
                  }}
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="O">Prefer not to say</MenuItem>
                </Select>
              </FormControl>

              <DesktopDatePicker
                label="Birthday"
                value={new Date(data.birthday)}
                onChange={(newValue) => {
                  const newData = { ...data };
                  newData.birthday = newValue as Date;
                  setData(newData);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                  },
                }}
                sx={{
                  mt: 0,
                  mb: 0,
                  '& .MuiFormControl-root': {
                  },
                }}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <TextField name="about" fullWidth multiline rows={4} label="About" value={data.about} onChange={(event) => {
                const newData = { ...data };
                newData.about = event.target.value;
                setData(newData);
              }} />

              <LoadingButton variant="contained" loading={isSubmitting.value} onClick={() => handleChangeSubmit()}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      {!isSetPassword.value && <SetPassword isSetPassword={isSetPassword} />}
    </>
  );
}

const privacyLevels = [
  {
    key: 'public',
    icon: 'material-symbols:public',
    label: 'Public',
    tooltip: 'My profile is for everyone to see',
  },
  {
    key: 'private',
    icon: 'fluent:inprivate-account-28-regular',
    label: 'Private',
    tooltip: 'Only I have access',
  },
  {
    key: 'Other',
    icon: 'carbon:friendship',
    label: 'Other',
    tooltip: 'My friends and teams  only',
  },
];