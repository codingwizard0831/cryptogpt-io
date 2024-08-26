"use client"

import React, { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Card,
  Link,
  Chip,
  Modal,
  Stack,
  Checkbox,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useUserProfile } from 'src/hooks/use-user-profile';

// import { fData } from 'src/utils/format-number';
import axios, { endpoints } from 'src/utils/axios';

import { languages } from 'src/assets/data';

import { useSnackbar } from 'src/components/snackbar';
// import UploadAvatar from 'src/components/upload/upload-avatar';

interface Language {
  code: string;
  name: string;
}

interface ProfileData {
  languages: Language[];
  birthday: Date | null;
  avatar: File | null;
  username: string;
  agreeToTerms: boolean;
}

interface ErrorList {
  language?: string;
  birthday?: string;
  username?: string;
  terms?: string;
}

export default function ProfileSetup() {
  const router = useRouter();
  const { profile } = useUserProfile();
  const { enqueueSnackbar } = useSnackbar();
  const isSubmitting = useBoolean(false);

  const [errorList, setErrorList] = useState<ErrorList>({});
  const [data, setData] = useState<ProfileData>({
    languages: [],
    birthday: null,
    avatar: null,
    username: '',
    agreeToTerms: false,
  });

  useEffect(() => {
    if (profile?.length) {
      setData({
        languages: profile.languages || [],
        birthday: profile.birthday || null,
        avatar: profile.avatar || null,
        username: profile.user_name || '',
        agreeToTerms: profile.terms || false,
      });
    }
  }, [profile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeLanguages = (_event: React.SyntheticEvent, newValue: Language[]) => {
    setData((prevData) => ({ ...prevData, languages: newValue }));
  };

  const handleChangeBirthday = (newValue: Date | null) => {
    if (newValue) {
      const today = new Date();
      const sixteenYearsAgo = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

      if (newValue > sixteenYearsAgo) {
        setErrorList((prev) => ({ ...prev, birthday: 'You must be at least 16 years old.' }));
      } else {
        setErrorList((prev) => ({ ...prev, birthday: undefined }));
      }
    } else {
      setErrorList((prev) => ({ ...prev, birthday: undefined }));
    }
    setData((prevData) => ({ ...prevData, birthday: newValue }));
  };

  // const handleDrop = useCallback((acceptedFiles: File[]) => {
  //   const file = acceptedFiles[0];
  //   if (file) {
  //     setData((prevData) => ({ ...prevData, avatar: file }));
  //   }
  // }, []);

  const handleAgreeToTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, agreeToTerms: event.target.checked }));
  };

  const validateForm = (): boolean => {
    const newErrorList: ErrorList = {};

    if (!data.languages.length) {
      newErrorList.language = 'You must select your language.';
    }
    if (!data.birthday) {
      newErrorList.birthday = 'You must select your birthday.';
    }
    if (!data.username) {
      newErrorList.username = 'You must enter your username.';
    }
    if (!data.agreeToTerms) {
      newErrorList.terms = 'You must accept our terms.';
    }

    setErrorList(newErrorList);
    return Object.keys(newErrorList).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      isSubmitting.onTrue();
      const body: any = {
        user_name: data.username,
        languages: data.languages,
        terms: data.agreeToTerms,
        birthday: data.birthday
      }
      const response = await axios.post(endpoints.profile.index, body);
      console.log('body', response)
      enqueueSnackbar('Profile setup successful!');
      router.push(paths.dashboard.user.profileSetupAvatar);
    } catch (error) {
      console.error(error.error);
      if (error.error?.username) {
        setErrorList((prev) => ({ ...prev, username: error.error?.username }));
      }
      enqueueSnackbar('Profile setup failed', { variant: 'error' });
    } finally {
      isSubmitting.onFalse();
    }
  };

  return (
    <Modal
      open
      aria-labelledby="profile-setup-modal"
      aria-describedby="modal-to-setup-user-profile"
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          outline: 'none',
          p: 3,
          maxWidth: 400,
          minWidth: 360,
          margin: 'auto',
          mt: 5
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: theme => theme.palette.primary.main }}>
          Complete Your Profile
        </Typography>

        <Stack spacing={3} mt={3}>
          {/* <UploadAvatar
            file={data.avatar}
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography variant="caption" sx={{ mt: 2, textAlign: 'center', display: 'block' }}>
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(3145728)}
              </Typography>
            }
          /> */}

          <Autocomplete
            multiple
            options={languages}
            getOptionLabel={(option) => option.name}
            value={data.languages}
            onChange={handleChangeLanguages}
            renderInput={(params) => <TextField {...params} label="Languages" />}
            renderTags={(value: Language[], getTagProps) =>
              value.map((option: Language, index: number) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                  key={option.code}
                />
              ))
            }
            filterSelectedOptions
          />
          {errorList.language && <FormHelperText sx={{ marginTop: "-15px", marginLeft: 2 }} error>{errorList.language}</FormHelperText>}

          <DatePicker
            label="Enter your birthday"
            value={data.birthday}
            onChange={handleChangeBirthday}
          />
          {errorList.birthday && <FormHelperText sx={{ marginTop: "-15px", marginLeft: 2 }} error>{errorList.birthday}</FormHelperText>}

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={data.username}
            onChange={handleChange}
          />
          {errorList.username && <FormHelperText sx={{ marginTop: "-15px", marginLeft: 2 }} error>{errorList.username}</FormHelperText>}

          <FormControlLabel
            control={
              <Checkbox
                checked={data.agreeToTerms}
                onChange={handleAgreeToTerms}
                name="agreeToTerms"
              />
            }
            label={
              <Typography variant="body2">
                I agree to Cryptogpt&apos;s <Link href="#">Terms and Conditions</Link>.
              </Typography>
            }
          />
          {errorList.terms && <FormHelperText sx={{ marginTop: "-15px", marginLeft: 2 }} error>{errorList.terms}</FormHelperText>}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting.value}
            onClick={handleSubmit}
          >
            I Agree
          </LoadingButton>
        </Stack>
      </Card>
    </Modal>
  );
}