"use client";

import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  alpha,
  Card
} from '@mui/material';

interface Model {
  name: string;
  repoId: string;
  size: string;
  repoToken: string;
  status: string;
}

interface ModelsViewProps {
  models?: Model[];
}

const ModelsView: React.FC<ModelsViewProps> = ({ models = [] }) => {
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
            models.map((model, index) => {
              <TableRow key={model.name || index}>
                <TableCell component={"th"} scope='row' sx={{ color: 'text.primary' }}>
                  {model.name}
                </TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{model.repoId}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{model.size}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{model.repoToken}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{model.status}</TableCell>
                <TableCell sx={{ color: 'text.primary' }}>{ }</TableCell>
              </TableRow>
            })
          )}
        </TableBody>
      </Table>
    </Card>
  )
}

export default ModelsView;