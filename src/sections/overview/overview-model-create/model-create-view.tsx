'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ModelCreateView: React.FC = () => {
  const [repoId, setRepoId] = useState('');
  const [repoToken, setRepoToken] = useState('');
  const [modelName, setModelName] = useState('');
  const [contextLength, setContextLength] = useState('4096');

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Deploy a new Model</Typography>
        <Box>
          <Button variant="contained" color="primary" sx={{ mr: 1 }}>
            Deploy
          </Button>
          <Button variant="outlined" color="primary">
            Cancel
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
        <Button variant="contained" color="success" sx={{ mb: 2 }}>
          Connected with Hugging Face
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search models"
                  InputProps={{
                    ...params.InputProps,
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
              placeholder="eg. meta-llama/Llama-2-7b-chat-hf"
              value={repoId}
              onChange={(e) => setRepoId(e.target.value)}
            />
            <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
              Hugging face repo token (optional)
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Optionally provide a token for accessing private Hugging Face repositories.
            </Typography>
            <TextField
              fullWidth
              type="password"
              value={repoToken}
              onChange={(e) => setRepoToken(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

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
            placeholder="Type here"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            Number of parameters
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number of parameters will be auto detected.
          </Typography>
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
          value={contextLength}
          onChange={(e) => setContextLength(e.target.value)}
        />
      </Box>

      <IconButton
        sx={{ position: 'fixed', bottom: 16, right: 16, color: 'text.primary' }}
        aria-label="help"
      >
        <HelpOutlineIcon />
      </IconButton>
    </Box>
  );
};

export default ModelCreateView;