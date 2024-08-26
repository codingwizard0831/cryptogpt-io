"use client"

import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

import { LoadingButton } from '@mui/lab';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Box, Card, Grid, Modal, Stack, TextField, Typography, Autocomplete, Skeleton, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fData } from 'src/utils/format-number';
import axios, { endpoints } from 'src/utils/axios';

import { loadUserProfileData } from 'src/auth/context/jwt/utils';

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
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const isSubmitting = useBoolean(false);

  const [errorList, setErrorList] = useState<ErrorList>({});
  const [models, setModels] = useState<any>([]);
  const [avatars, setAvatars] = useState<any>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(avatars?.length).fill(false));
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [data, setData] = useState<ProfileData>({
    size: "256x256",
    model: "flux",
    avatar: null,
    idealDescription: "",
  });

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newLoadedImages = [...prev];
      newLoadedImages[index] = true;
      console.log('newLoadedImages', newLoadedImages)
      return newLoadedImages;
    });
  };

  const handleImageError = (index: number) => {
    setLoadedImages(prev => {
      const newLoadedImages = [...prev];
      newLoadedImages[index] = false;
      console.log('newLoadedImages', newLoadedImages)
      return newLoadedImages;
    });
  };

  useEffect(() => {
    setLoadedImages(new Array(avatars?.length).fill(null));
  }, [avatars]);

  console.log('loadedImages', loadedImages)

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
        setAvatars(response.data.data);
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

  const handleUpdateAvatar = async () => {
    if (!selectedAvatar) {
      enqueueSnackbar('Please choose one image what you like.', { variant: 'error' });
      return;
    }
    isSubmitting.onTrue();
    try {
      const response = await axios.put(endpoints.profile.updateAvatar, { imageUrl: avatars[selectedAvatar] });
      console.log('response', response)
      if (response.data.success) {
        await loadUserProfileData();
        enqueueSnackbar('Update your avatar successfully!', { variant: 'success' });
        router.replace(paths.dashboard.root);
      } else {
        throw new Error(response.data.error || 'Failed to update your avatar');
      }
    } catch (error) {
      console.error('Error generating avatar:', error);
      enqueueSnackbar('Failed to update your avatar. Please try again.', { variant: 'error' });
    } finally {
      isSubmitting.onFalse();
    }
  };

  const handleAvatarClick = (index: number) => {
    setSelectedAvatar(index);
  };

  return (
    <Modal
      open
      aria-labelledby="profile-avatar-setup-modal"
      aria-describedby="modal-to-setup-user-profile-avatar"
    >
      {
        avatars?.length > 0 ?
          (
            <Card
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                maxWidth: 400,
                minWidth: 360,
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" align="center" gutterBottom sx={{ color: theme => theme.palette.primary.main }}>
                Choose your avatar from these AI images
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
                {avatars.map((avatar: string, index: number) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      onClick={() => handleAvatarClick(index)}
                      sx={{
                        cursor: 'pointer',
                        border: selectedAvatar === index ? '4px solid #1976d2' : 'none',
                        borderRadius: '12px',
                        padding: '4px',
                        position: 'relative',
                        width: 150,
                        height: 150,
                        overflow: 'hidden',
                      }}
                    >
                      {loadedImages[index] === null && (
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={150}
                          animation="wave"
                          sx={{
                            borderRadius: '8px',
                            bgcolor: 'grey.800',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1
                          }}
                        />
                      )}
                      {loadedImages[index] === false && (
                        <Box
                          sx={{
                            width: 150,
                            height: 150,
                            borderRadius: '8px',
                            bgcolor: 'grey.800',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1
                          }}
                        >
                          <Typography variant="caption">Failed to load</Typography>
                        </Box>
                      )}
                      <Image
                        src={avatar}
                        alt={`Generated avatar ${index + 1}`}
                        width={150}
                        height={150}
                        style={{
                          borderRadius: '8px',
                          opacity: loadedImages[index] === true ? 1 : 0,
                          transition: 'opacity 0.3s ease',
                        }}
                        loading="lazy"
                        onLoadingComplete={(result) => {
                          console.log('Image loaded:', result.naturalWidth, result.naturalHeight);
                          if (result.naturalWidth === 0) {
                            console.log('Image failed to load');
                            handleImageError(index);
                          } else {
                            console.log('Image loaded successfully');
                            handleImageLoad(index);
                          }
                        }}
                      />
                      <IconButton
                        sx={{
                          position: 'absolute',
                          bottom: 5,
                          right: 5,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.7)',
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEnlargedImage(avatar);
                        }}
                      >
                        <ZoomInIcon sx={{ color: 'white' }} />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <LoadingButton
                  size="large"
                  variant="outlined"
                  loading={isSubmitting.value}
                  onClick={() => setAvatars(null)}
                >
                  Regenerate
                </LoadingButton>
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting.value}
                  disabled={selectedAvatar == null}
                  onClick={handleUpdateAvatar}
                >
                  Continue
                </LoadingButton>
              </Box>
              <Modal
                open={enlargedImage !== null}
                onClose={() => setEnlargedImage(null)}
                aria-labelledby="enlarged-image-modal"
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 2,
                  maxWidth: 680,
                  minWidth: 360,
                  maxHeight: 730,
                  borderRadius: 2,
                }}>
                  {enlargedImage && (
                    <>
                      <Image
                        src={enlargedImage}
                        alt="Enlarged avatar"
                        layout="responsive"
                        width={500}
                        height={500}
                        objectFit="contain"
                        style={{ borderRadius: '8px' }}
                      />
                      <Typography variant="h6" align="center" sx={{ mb: 0, mt: 1, color: theme => theme.palette.primary.main }}>
                        {data.idealDescription}
                      </Typography>
                    </>
                  )}
                </Box>
              </Modal>
            </Card>
          ) :
          (
            <Card
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                maxWidth: 400,
                minWidth: 360,
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" align="center" gutterBottom sx={{ color: theme => theme.palette.primary.main }}>
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
          )
      }
    </Modal>
  );
}