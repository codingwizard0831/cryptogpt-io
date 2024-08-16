"use client"

import React, { useState, useEffect, useCallback } from 'react';

import { LoadingButton } from '@mui/lab';
import { Card, Stack, TextField, Typography, Autocomplete } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fData } from 'src/utils/format-number';
import axios, { endpoints } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';
import UploadAvatar from 'src/components/upload/upload-avatar';

interface ProfileData {
  size: string;
  model: string;
  avatar: File | null;
  idealDescription: string;
}

interface ErrorList {
  size?: string;
  model?: string;
  idealDescription?: string;
}

const sizes = ["256x256", "512x512", "1024x1024"];

export default function ProfileSetupAvatar() {
  const { enqueueSnackbar } = useSnackbar();
  const isSubmitting = useBoolean(false);

  const [errorList, setErrorList] = useState<ErrorList>({});
  const [models, setModels] = useState<any>([]);
  const [data, setData] = useState<ProfileData>({
    size: "256x256",
    model: "flux",
    avatar: null,
    idealDescription: "",
  });

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.post(endpoints.profile.models);
        const modelList = response.data.data?.map((item: any) => (item.name));
        setModels(modelList);
        console.log('response', modelList)
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };

    fetchModels();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeSize = (_event: React.SyntheticEvent, newValue: string | null) => {
    if (newValue) {
      setData((prevData) => ({ ...prevData, size: newValue }));
    }
  };

  const handleChangeModel = (_event: React.SyntheticEvent, newValue: string | null) => {
    if (newValue) {
      setData((prevData) => ({ ...prevData, model: newValue }));
    }
  };

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setData((prevData) => ({ ...prevData, avatar: file }));
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrorList: ErrorList = {};
    if (!data.avatar) {
      enqueueSnackbar('Please upload an image.', { variant: 'error' });
      return false;
    }
    if (!data.size) {
      newErrorList.size = 'You must select your size.';
    }
    if (!data.model) {
      newErrorList.model = 'You must select your model.';
    }
    if (!data.idealDescription) {
      newErrorList.idealDescription = 'Please describe your ideal avatar.';
    }

    setErrorList(newErrorList);
    return Object.keys(newErrorList).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    isSubmitting.onTrue();
    try {
      const formData = new FormData();
      if (data.avatar) {
        formData.append('image', data.avatar);
      } else {
        enqueueSnackbar('Please upload an image.', { variant: 'error' });
        return
      }
      formData.append('prompt', data.idealDescription);
      formData.append('width', data.size.split('x')[0]);
      formData.append('height', data.size.split('x')[1]);
      formData.append('model', data.model);
      const response = await axios.post(endpoints.profile.generateImage, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        enqueueSnackbar('Avatar generated successfully!', { variant: 'success' });
        console.log('Generated avatars:', response.data.data);
      } else {
        throw new Error(response.data.error || 'Failed to generate avatar');
      }
      enqueueSnackbar('Avatar generated successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error generating avatar:', error);
      enqueueSnackbar('Failed to generate avatar. Please try again.', { variant: 'error' });
    } finally {
      isSubmitting.onFalse();
    }
  };

  return (
    <Card
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        maxWidth: 400,
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Generate your avatar from your picture
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

        <TextField
          fullWidth
          label="Describe your ideal avatar"
          name="idealDescription"
          value={data.idealDescription}
          onChange={handleChange}
          error={!!errorList.idealDescription}
          helperText={errorList.idealDescription}
        />

        <Stack spacing={1.5} direction="row">
          <Autocomplete
            sx={{ width: "50%" }}
            options={sizes}
            value={data.size}
            onChange={handleChangeSize}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Size"
                error={!!errorList.size}
                helperText={errorList.size}
              />
            )}
            disableClearable
          />
          <Autocomplete
            sx={{ width: "50%" }}
            options={models}
            value={data.model}
            onChange={handleChangeModel}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Model"
                error={!!errorList.model}
                helperText={errorList.model}
              />
            )}
            disableClearable
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting.value}
          onClick={handleSubmit}
        >
          Generate My Avatar
        </LoadingButton>
      </Stack>
    </Card>
  );
}