"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Grid,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface File {
  name: string;
  id: string;
  size: string;
  extension: string;
  processingStatus: string;
}

const FilesView: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('Name');
  const [sortOrder, setSortOrder] = useState<'Ascending' | 'Descending'>('Ascending');
  const [files, setFiles] = useState<File[]>([]);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (value === 'Ascending' || value === 'Descending') {
      setSortOrder(value);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mb: 2 }}>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              displayEmpty
              sx={{ mr: 1, bgcolor: 'background.paper' }}
            >
              <MenuItem value="" disabled>
                Sort by:
              </MenuItem>
              <MenuItem value="Name">Name</MenuItem>
              <MenuItem value="Date">Date</MenuItem>
            </Select>
            <Select
              value={sortOrder}
              onChange={handleOrderChange}
              sx={{ bgcolor: 'background.paper' }}
            >
              <MenuItem value="Ascending">Ascending</MenuItem>
              <MenuItem value="Descending">Descending</MenuItem>
            </Select>
          </Box>

          <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Name
                    <ArrowDownwardIcon fontSize="small" />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Extension</TableCell>
                  <TableCell>Processing Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      There are no uploaded files with OD API
                    </TableCell>
                  </TableRow>
                ) : (
                  files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{file.id}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{file.extension}</TableCell>
                      <TableCell>{file.processingStatus}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper', color: 'text.primary' }}>
            <Typography variant="body2">Select a file to view details.</Typography>
          </Paper>
          <Paper sx={{ p: 2, bgcolor: 'background.paper', color: 'text.primary' }}>
            <Typography variant="body2">List of file plugins</Typography>
          </Paper>
        </Grid>
      </Grid>

      <IconButton
        sx={{ position: 'fixed', bottom: 16, right: 16, color: 'text.primary' }}
        aria-label="help"
      >
        <HelpOutlineIcon />
      </IconButton>
    </Box>
  );
};

export default FilesView;