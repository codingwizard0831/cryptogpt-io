"use client"

import React, { useState, useEffect, useCallback } from 'react';

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

import { useBoolean } from 'src/hooks/use-boolean';
import { useUserProfile } from 'src/hooks/use-user-profile';

import axios from 'src/utils/axios';
import { fData } from 'src/utils/format-number';

// Ensure this import is correct and the file exists
import { languages } from 'src/assets/data';

import { useSnackbar } from 'src/components/snackbar';
import UploadAvatar from 'src/components/upload/upload-avatar';

type Language = {
  code: string;
  name: string;
};

type ProfileData = {
  languages: Language[];
  birthday: Date | null;
  avatar: File | null;
  username: string;
  agreeToTerms: boolean;
};

export default function ProfileSetup() {
  const { profile } = useUserProfile();
  const { enqueueSnackbar } = useSnackbar();
  const isSubmitting = useBoolean(false);

  const [errorList, setErrorList] = useState<any>({});

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
        languages: profile?.languages || [],
        birthday: profile?.birthday || null,
        avatar: profile?.avatar || null,
        username: profile?.user_name || '',
        agreeToTerms: profile?.terms || false,
      })
    }
  }, [profile, setData])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleChangeLanguages = (event: React.SyntheticEvent, newValue: Language[]) => {
    setData({ ...data, languages: newValue });
  };

  const handleChangeBirthday = (newValue: Date | null) => {
    if (newValue) {
      const today = new Date();
      const sixteenYearsAgo = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

      if (newValue > sixteenYearsAgo) {
        setErrorList((prev) => ({ ...prev, birthday: 'You must be at least 16 years old.' }));
      } else {
        setErrorList((prev) => ({ ...prev, birthday: null }));
      }
    } else {
      setErrorList((prev) => ({ ...prev, birthday: null }));
    }
    setData({ ...data, birthday: newValue });
  };

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setData((prev) => ({ ...prev, avatar: file }));
    }
  }, []);

  const handleAgreeToTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, agreeToTerms: event.target.checked });
  };

  const handleSubmit = async () => {
    try {
      isSubmitting.onTrue();
      if (!data.languages?.length) {
        setErrorList((prev) => ({ ...prev, language: 'You must select your language.' }));
        return;
      }
      setErrorList((prev) => ({ ...prev, language: null }));
      if (!data.birthday) {
        setErrorList((prev) => ({ ...prev, birthday: 'You must select your birthday.' }));
        return;
      }
      if (!data.username) {
        setErrorList((prev) => ({ ...prev, username: 'You must enter your username.' }));
        return;
      }
      setErrorList((prev) => ({ ...prev, username: null }));
      if (!data.agreeToTerms) {
        setErrorList((prev) => ({ ...prev, terms: 'You must accept out terms.' }));
        return;
      }
      setErrorList((prev) => ({ ...prev, terms: null }));
      console.log('data', data)
      // await axios.post('/api/profile-setup', data);
      // enqueueSnackbar('Profile setup successful!');
    } catch (error) {
      console.error(error);
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
          margin: 'auto',
          mt: 5
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Complete Your Profile
        </Typography>

        <Stack spacing={3} mt={3}>
          <UploadAvatar
            file={data.avatar}
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography variant="caption" sx={{ mt: 2, textAlign: 'center', display: 'block' }}>
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(3145728)}
              </Typography>
            }
          />

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
          {errorList?.language && <FormHelperText error>{errorList?.language}</FormHelperText>}

          <DatePicker
            label="Enter your birthday"
            value={data.birthday}
            onChange={handleChangeBirthday}
          />
          {errorList?.birthday && <FormHelperText error>{errorList?.birthday}</FormHelperText>}

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={data.username}
            onChange={handleChange}
          />
          {errorList?.username && <FormHelperText error>{errorList?.username}</FormHelperText>}

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
          {errorList?.terms && <FormHelperText error>{errorList?.terms}</FormHelperText>}

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

          {/* <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Skip
          </LoadingButton> */}
        </Stack>
      </Card>
    </Modal>
  );
}