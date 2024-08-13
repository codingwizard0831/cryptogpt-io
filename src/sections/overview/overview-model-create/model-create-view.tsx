'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Autocomplete,
  Card
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const ModelCreateView: React.FC = () => {
  const [repoId, setRepoId] = useState('');
  const [repoToken, setRepoToken] = useState('');
  const [modelName, setModelName] = useState('');
  const [contextLength, setContextLength] = useState('4096');

  const router = useRouter();

  return (
    <Card sx={{ color: 'text.primary', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Deploy a new Model</Typography>
        <Box>
          <Button variant="contained" color="primary" sx={{ mr: 1, color: "text.primary" }}>
            Deploy
          </Button>
          <Button variant="outlined" color="primary" sx={{ color: "text.primary" }} onClick={() => router.replace(paths.dashboard.root)}>
            Cancel
          </Button>
        </Box>
      </Box>

      <Card sx={{ p: 3, mb: 3, }}>
        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: theme => theme.palette.primary.main, color: "text.primary", mb: 2 }}
          onClick={() => setOpen(true)}
        >
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
    </Card>
  );
};

export default ModelCreateView;