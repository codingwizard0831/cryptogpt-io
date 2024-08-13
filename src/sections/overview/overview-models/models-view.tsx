"use client";

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  alpha,
  Card,
  CircularProgress,
  Button
} from '@mui/material';
import axios from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';

interface Model {
  name: string;
  repoId: string;
  size: string;
  repoToken: string;
  status: string;
}

const ModelsView: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoints.dashboard.models);
        const fetchedModels: Model[] = response.data.map((model: any) => ({
          name: model.name,
          repoId: model.repo_id,
          size: model.size,
          repoToken: model.repo_token,
          status: model.status
        }));
        setModels(fetchedModels);
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
      <Typography variant="h6" gutterBottom>
        Manage available models to deploy and seamlessly integrate into the OnDemand ecosystem.
      </Typography>

      <Table sx={{
        "& tr": {
          px: 1,
        },
        "& td,th": {
          py: 0.5,
          px: 2,
        },
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
            models.map((model, index) => (
              <TableRow key={model.name || index}>
                <TableCell component="th" scope='row' sx={{ color: 'text.primary' }}>
                  {model.name}
                </TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{model.repoId}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{model.size}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{model.repoToken}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{model.status}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>
                  <Button variant="outlined" size="small">Edit</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

export default ModelsView;