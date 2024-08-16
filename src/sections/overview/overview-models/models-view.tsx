"use client";

import React, { useState, useEffect } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Card,
  Table,
  alpha,
  Alert,
  Stack,
  Button,
  TableRow,
  Snackbar,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CircularProgress
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';

import axios, { endpoints } from 'src/utils/axios';

interface Model {
  id: string; // Make sure your model has an id field
  model_name: string;
  hugging_face_repo_id: string;
  model_size: string;
  hugging_face_repo_token: string;
  status: string;
}

const ModelsView: React.FC = () => {
  const router = useRouter();
  const smUp = useResponsive("up", "sm")

  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditLoading, setIsEditLoading] = useState(false);
  const [unsubscribingModelId, setUnsubscribingModelId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoints.dashboard.models);
        setModels(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching models:', err);
        setError('Failed to fetch models. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const handleEdit = async (modelId: string) => {
    try {
      setIsEditLoading(true);
      // Navigate to the edit page with the model ID
      const updatePath = paths.dashboard.modelUpdate(modelId);
      router.replace(updatePath);
    } catch (err) {
      console.error('Error navigating to edit page:', err);
      setSnackbar({
        open: true,
        message: 'Failed to open edit page',
        severity: 'error'
      });
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleUnsubscribe = async (modelId: string) => {
    try {
      setUnsubscribingModelId(modelId);
      await axios.delete(`${endpoints.dashboard.models}/${modelId}`);
      setModels(models.filter(model => model.id !== modelId));
      setSnackbar({
        open: true,
        message: 'Model unsubscribed successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error unsubscribing model:', err);
      setSnackbar({
        open: true,
        message: 'Failed to unsubscribe model',
        severity: 'error'
      });
    } finally {
      setUnsubscribingModelId(null);
    }
  };

  if (loading) {
    return (
      <Card sx={{ color: "text.primary", p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ color: "text.primary", p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Typography color="error">{error}</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ color: "text.primary", p: 3 }}>
      <Stack justifyContent="space-between" alignItems="center" sx={{ mb: 2 }} flexDirection={smUp ? 'row' : 'column'}>
        <Typography variant="h6" gutterBottom>
          Manage available models to deploy and seamlessly integrate into the OnDemand ecosystem.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 1, color: "text.primary" }}
          onClick={() => router.replace(paths.dashboard.modelCreate)}
        >
          Create New Model
        </Button>
      </Stack>

      <Box sx={{ overflowY: 'auto' }}>
        <Table sx={{
          "& tr": { px: 1 },
          "& td,th": { py: 0.5, px: 2 },
          "& tbody tr": {
            py: 0.5,
            transition: 'background-color 0.3s',
            "&:hover": {
              backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1)
            },
          },
        }} aria-label="model table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary' }}>Model Name</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Hugging face repo ID</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Model Size</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Hugging face repo token</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Status</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {models.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align='center' sx={{ color: 'warning.main' }}>
                  There are no Models
                </TableCell>
              </TableRow>
            ) : (
              models.map((model) => (
                <TableRow key={model.id}>
                  <TableCell component="th" scope='row' sx={{ color: 'text.primary' }}>
                    {model.model_name}
                  </TableCell>
                  <TableCell sx={{ color: 'text.primary' }}>{model.hugging_face_repo_id}</TableCell>
                  <TableCell sx={{ color: 'text.primary' }}>{model.model_size}</TableCell>
                  <TableCell sx={{ color: 'text.primary' }}>{model.hugging_face_repo_token}</TableCell>
                  <TableCell sx={{ color: 'text.primary' }}>{model.status}</TableCell>
                  <TableCell sx={{ color: 'text.primary' }}>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      sx={{ mr: 1 }}
                      disabled={isEditLoading}
                      onClick={() => handleEdit(model.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleUnsubscribe(model.id)}
                      disabled={unsubscribingModelId === model.id}
                    >
                      {unsubscribingModelId === model.id ? <CircularProgress size={24} /> : 'Unsubscribe'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>


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
}

export default ModelsView;