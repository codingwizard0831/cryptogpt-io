'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Box,
  Grid,
  Card,
  Alert,
  Button,
  Snackbar,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
  InputAdornment,
  CircularProgress
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';

interface Model {
  id?: string;
  model_name: string;
  hugging_face_repo_id: string;
  model_size: string;
  hugging_face_repo_token: string;
  status: string;
  context_length: string;
}

const ModelUpdateView: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [model, setModel] = useState<Model>({
    model_name: '',
    hugging_face_repo_id: '',
    model_size: '',
    hugging_face_repo_token: '',
    status: 'inactive',
    context_length: '4096',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (id) {
      fetchModel(id as string);
    }
  }, [id]);

  const fetchModel = async (modelId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${endpoints.dashboard.models}/${modelId}`);
      setModel(response.data);
    } catch (err) {
      console.error('Error fetching model:', err);
      setError('Failed to fetch model details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModel(prevModel => ({ ...prevModel, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await axios.put(`${endpoints.dashboard.models}/${id}`, model);
        setSnackbar({ open: true, message: 'Model updated successfully', severity: 'success' });
        router.push(paths.dashboard.models);
      }
    } catch (err) {
      console.error('Error saving model:', err);
      setSnackbar({ open: true, message: 'Failed to save model', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return (
      <Card sx={{ color: 'text.primary', p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ color: 'text.primary', p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Typography color="error">{error}</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ color: 'text.primary', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Edit Model</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1, color: "text.primary" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ color: "text.primary" }}
            onClick={() => router.push(paths.dashboard.models)}
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      <Card sx={{ p: 3, mb: 3, }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, bgcolor: theme => theme.palette.primary.main, color: "text.primary", mb: 2 }}
        >
          Connect with Hugging Face
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Hugging face model search
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Search for Hugging Face models by name, tags, or keywords.
            </Typography>
            <Autocomplete
              freeSolo
              options={[]}  // You would populate this with actual search results
              renderInput={(prop) => (
                <TextField
                  {...prop}
                  placeholder="Search models"
                  InputProps={{
                    ...prop.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Hugging face repo ID
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Enter the unique identifier for your Hugging Face repository.
            </Typography>
            <TextField
              fullWidth
              name="hugging_face_repo_id"
              placeholder="eg. meta-llama/Llama-2-7b-chat-hf"
              value={model.hugging_face_repo_id}
              onChange={handleInputChange}
            />
            <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
              Hugging face repo token (optional)
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Optionally provide a token for accessing private Hugging Face repositories.
            </Typography>
            <TextField
              fullWidth
              name="hugging_face_repo_token"
              type="password"
              value={model.hugging_face_repo_token}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            Model name
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Type the name of the model.
          </Typography>
          <TextField
            fullWidth
            name="model_name"
            placeholder="Type here"
            value={model.model_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            Model Size
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter the size of the model.
          </Typography>
          <TextField
            fullWidth
            name="model_size"
            placeholder="e.g., 7B, 13B"
            value={model.model_size}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Context length
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Specify the desired length of the context for model input.
        </Typography>
        <TextField
          sx={{ width: '200px' }}
          name="context_length"
          value={model.context_length}
          onChange={handleInputChange}
        />
      </Box>

      <IconButton
        sx={{ position: 'fixed', bottom: 16, right: 16, color: 'text.primary' }}
        aria-label="help"
      >
        <HelpOutlineIcon />
      </IconButton>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ModelUpdateView;