"use client";

import React, { useState, useEffect, useCallback } from 'react';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Box,
  Grid,
  Card,
  Table,
  alpha,
  Select,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  CircularProgress,
  SelectChangeEvent
} from '@mui/material';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

interface File {
  name: string;
  id: string;
  size: string;
  extension: string;
  processing_status: string;
  created_at: string;
}

const initFiles: File[] = [
  { name: "Document1.pdf", id: "001", size: "1.2 MB", extension: "pdf", processing_status: "Completed", created_at: '2023-08-01' },
  { name: "Image.jpg", id: "002", size: "3.5 MB", extension: "jpg", processing_status: "Processing", created_at: '2023-08-15' },
  { name: "Spreadsheet.xlsx", id: "003", size: "0.5 MB", extension: "xlsx", processing_status: "Completed", created_at: '2023-07-20' },
];

const FilesView: React.FC = () => {
  const { user } = useAuthContext();
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [files, setFiles] = useState<File[]>([]);
  // const [files, setFiles] = useState<File[]>(initFiles);
  const [loading, setLoading] = useState(true);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    if (!user?.id) {
      setError('User ID not available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${endpoints.dashboard.media_storage}?user_id=${user.id}`);
      if (response.data && response.data.files) {
        setFiles(response.data.files);
        setLoading(false);
      } else {
        console.error('Unexpected data structure:', response.data);
        setFiles([]);
      }
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Failed to fetch files. Please try again later.');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [user, setFiles, setLoading, setError]);


  useEffect(() => {
    fetchFiles();
  }, [user?.id, fetchFiles]);

  useEffect(() => {
    if (files.length > 0) {
      const sortedFiles = [...files].sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        return sortOrder === 'asc'
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();

      });
      setFiles(sortedFiles);
    }
  }, [sortBy, sortOrder, setFiles, files]);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as 'name' | 'date');
  };

  const handleOrderChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };

  if (loading) {
    return (
      <Card sx={{ color: 'text.primary', p: 2, borderRadius: 2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mb: 2 }}>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              displayEmpty
              sx={{ mr: 1, bgcolor: 'rgba(249, 250, 251, 0.08)' }}
            >
              <MenuItem value="name">Sort by: Name</MenuItem>
              <MenuItem value="date">Sort by: Date</MenuItem>
            </Select>
            <Select
              value={sortOrder}
              onChange={handleOrderChange}
              sx={{ bgcolor: 'rgba(249, 250, 251, 0.08)' }}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </Box>

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
            }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Name
                    {sortBy === 'name' && (sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Extension</TableCell>
                  <TableCell>Processing Status</TableCell>
                  <TableCell>
                    Date
                    {sortBy === 'date' && (sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
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
                      <TableCell>{file.processing_status}</TableCell>
                      <TableCell>{new Date(file.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
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