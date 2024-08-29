"use client"

import React, { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Card,
  Modal,
  Stack,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';

interface ProfileData {
  password: string;
  rpassword: string;
}

interface ErrorList {
  password?: string;
  rpassword?: string;
}

export default function SetPassword({ isSetPassword }: any) {
  const { enqueueSnackbar } = useSnackbar();
  const isSubmitting = useBoolean(false);

  const [errorList, setErrorList] = useState<ErrorList>({});
  const [data, setData] = useState<ProfileData>({
    password: '',
    rpassword: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrorList: ErrorList = {};
    if (!data.password) {
      newErrorList.password = 'You must enter your password.';
    }
    if (!data.rpassword) {
      newErrorList.rpassword = 'You must enter your retype password.';
    }
    if (data.password !== data.rpassword) {
      newErrorList.rpassword = 'Passwords do not match.';
    }

    setErrorList(newErrorList);
    return Object.keys(newErrorList).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      isSubmitting.onTrue();
      const body: any = {
        password: data.password,
        rpassword: data.rpassword
      }
      const response = await axios.post(endpoints.profile.setPassword, body);
      console.log('body', response)
      if (response.data.success) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error(error.error);
      if (error.error?.username) {
        setErrorList((prev) => ({ ...prev, username: error.error?.username }));
      }
      enqueueSnackbar('Profile setup failed', { variant: 'error' });
    } finally {
      isSubmitting.onFalse();
      // isSetPassword.onTrue();
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
          Set Your Password
        </Typography>

        <Stack spacing={3} mt={3}>

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          />
          {errorList.password && <FormHelperText sx={{ marginTop: "-15px", marginLeft: 2 }} error>{errorList.password}</FormHelperText>}

          <TextField
            fullWidth
            label="Retype Password"
            name="rpassword"
            type="password"
            value={data.rpassword}
            onChange={handleChange}
          />
          {errorList.rpassword && <FormHelperText sx={{ marginTop: "-15px", marginLeft: 2 }} error>{errorList.rpassword}</FormHelperText>}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting.value}
            onClick={handleSubmit}
          >
            Save
          </LoadingButton>
        </Stack>
      </Card>
    </Modal>
  );
}