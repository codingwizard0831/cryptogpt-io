"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Grid,
  IconButton,
  SelectChangeEvent,
  Card,
  alpha
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
    <Card sx={{ color: 'text.primary', p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mb: 2 }}>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              displayEmpty
              sx={{ mr: 1, bgcolor: 'rgba(249, 250, 251, 0.08)' }}
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
              sx={{ bgcolor: 'rgba(249, 250, 251, 0.08)' }}
            >
              <MenuItem value="Ascending">Ascending</MenuItem>
              <MenuItem value="Descending">Descending</MenuItem>
            </Select>
          </Box>

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
          }}>
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
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, mb: 2, color: 'text.primary' }}>
            <Typography variant="body2">Select a file to view details.</Typography>
          </Card>
          <Card sx={{ p: 2, color: 'text.primary' }}>
            <Typography variant="body2">List of file plugins</Typography>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{ position: 'fixed', bottom: 16, right: 16, color: 'text.primary' }}
        aria-label="help"
      >
        <HelpOutlineIcon />
      </IconButton>
    </Card>
  );
};

export default FilesView;