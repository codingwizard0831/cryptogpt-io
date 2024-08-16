'use client';

import React, { useState, useEffect } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Box,
  Card,
  Table,
  alpha,
  Alert,
  Button,
  Dialog,
  TableRow,
  Snackbar,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  CircularProgress
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

interface Agent {
  icon: React.ReactNode;
  name: string;
  last_modified: string;
  agent_id: string;
  type: string;
  category: string;
  status: string;
}

const initialAgents: Agent[] = [
  { icon: <PlayCircleOutlineIcon />, name: 'Youtube Plugin', last_modified: '07/15/2024 , 09:28 AM', agent_id: 'plugin-1713961903', type: 'File / Youtube', category: 'Education', status: 'Public' },
  { icon: <HelpOutlineIcon />, name: 'Media Knowledge Plugin', last_modified: '04/24/2024 , 05:31 AM', agent_id: 'plugin-1713962163', type: 'Chat / Media Knowle...', category: 'Education', status: 'Public' },
  { icon: <VideoLibraryIcon />, name: 'Video Plugin', last_modified: '04/24/2024 , 05:31 AM', agent_id: 'plugin-1713967141', type: 'File / Video', category: 'Education', status: 'Public' },
  { icon: <AudiotrackIcon />, name: 'Audio Plugin', last_modified: '04/24/2024 , 04:40 AM', agent_id: 'plugin-1713958830', type: 'File / Audio', category: 'Education', status: 'Public' },
  { icon: <DescriptionIcon />, name: 'Document Plugin', last_modified: '04/24/2024 , 03:28 AM', agent_id: 'plugin-1713954536', type: 'File / Document', category: 'Finance', status: 'Public' },
];

const iconMap: { [key: string]: React.ReactNode } = {
  'youtube': <PlayCircleOutlineIcon />,
  'audio': <AudiotrackIcon />,
  'video': <VideoLibraryIcon />,
  'document': <DescriptionIcon />,
  'help': <HelpOutlineIcon />,
  'knowledge': <TipsAndUpdatesIcon />,
  'error': <ErrorOutlineIcon />,
};

const getIconForAgent = (iconType: string): React.ReactNode => iconMap[iconType] || <ErrorOutlineIcon />;

const ManageAgents: React.FC = () => {

  const smUp = useResponsive("up", "sm")

  const { user } = useAuthContext();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Agents');
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchAgents = async () => {
      if (!user?.id) {
        setError('User ID not available');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${endpoints.dashboard.agents}?user_id=${user.id}`);
        const fetchedAgents = response.data.map((agent: any) => ({
          name: agent.name,
          last_modified: new Date(agent.last_modified).toLocaleString(),
          agent_id: agent.agent_id,
          icon: getIconForAgent(agent.icon),
          type: agent.type,
          category: agent.category,
          status: agent.status,
        }));
        setAgents(fetchedAgents);
        setError(null);
      } catch (err) {
        console.error('Error fetching agents:', err);
        setError('Failed to fetch agents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [user?.id]);

  const handleEdit = async (agent: Agent) => {
    try {
      setIsEditLoading(true);
      const response = await axios.get(`${endpoints.dashboard.agents}/${agent.agent_id}`);
      setEditingAgent(response.data);
      setIsEditDialogOpen(true);
      setIsEditLoading(false);
    } catch (e) {
      console.error('Error fetching agent details:', e);
      setSnackbar({ open: true, message: 'Failed to fetch agent details', severity: 'error' });
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (editingAgent) {
      try {
        setIsEditLoading(true);
        const response = await axios.put(`${endpoints.dashboard.agents}/${editingAgent.agent_id}`, {
          name: editingAgent.name,
          category: editingAgent.category,
          status: editingAgent.status,
          icon: editingAgent.icon,
        });

        setAgents(agents.map(agent =>
          agent.agent_id === editingAgent.agent_id ? { ...response.data, icon: getIconForAgent(response.data.icon) } : agent
        ));
        setIsEditDialogOpen(false);
        setEditingAgent(null);
        setSnackbar({ open: true, message: 'Agent updated successfully', severity: 'success' });
      } catch (e) {
        console.error('Error updating agent:', e);
        setSnackbar({ open: true, message: 'Failed to update agent', severity: 'error' });
      } finally {
        setIsEditLoading(false);
      }
    }
  };

  const handleUnsubscribe = async (agent_id: string) => {
    try {
      setIsDeleteLoading(true);
      await axios.delete(`${endpoints.dashboard.agents}/${agent_id}`);
      setAgents(agents.filter(agent => agent.agent_id !== agent_id));
      setSnackbar({ open: true, message: 'Agent unsubscribed successfully', severity: 'success' });
      setIsDeleteLoading(false);
    } catch (e) {
      console.error('Error unsubscribing agent:', e);
      setSnackbar({ open: true, message: 'Failed to unsubscribe agent', severity: 'error' });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const filteredAgents = React.useMemo(() => agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agent_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === 'All Agents' ||
      (filter === 'Chat Agents' && agent.type.toLowerCase().includes('chat')) ||
      (filter === 'File Agents' && agent.type.toLowerCase().includes('file'));

    return matchesSearch && matchesFilter;
  }), [agents, searchTerm, filter]);

  if (loading) {
    return (
      <Card sx={{ color: 'text.primary', p: 2, borderRadius: 2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ color: 'text.primary', p: 2, borderRadius: 2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ color: 'text.primary', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Manage agents to access knowledge bases and facilitate OnDemand model interaction with external services.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3, flexDirection: smUp ? 'row' : "column" }}>
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: smUp ? '50%' : '100%', bgcolor: 'rgba(249, 250, 251, 0.08)', mb: smUp ? '0' : 2 }}
        />
        <Box sx={{ display: 'flex' }}>
          {['All Agents', 'Chat Agents', 'File Agents'].map((text) => (
            <Button
              key={text}
              variant={filter === text ? "contained" : "outlined"}
              onClick={() => setFilter(text)}
              color="primary"
              sx={{ mx: 1, color: "text.primary" }}
            >
              {text}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ overflowY: 'auto' }}>
        <Table sx={{
          overflow: 'auto',
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
        }} aria-label="agents table">
          <TableHead>
            <TableRow>
              <TableCell>Icon</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Agent ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.agent_id}>
                <TableCell>{agent.icon}</TableCell>
                <TableCell>
                  <Typography variant="body1">{agent.name}</Typography>
                  <Typography variant="caption" color="text.secondary">Last modified on: {agent.last_modified}</Typography>
                </TableCell>
                <TableCell>{agent.agent_id}</TableCell>
                <TableCell>{agent.type}</TableCell>
                <TableCell>{agent.category}</TableCell>
                <TableCell>
                  <Typography color="success.main">{agent.status}</Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(agent)}
                    disabled={isEditLoading}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleUnsubscribe(agent.agent_id)}
                    disabled={isDeleteLoading}
                  >
                    Unsubscribe
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <IconButton sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <HelpOutlineIcon />
      </IconButton>

      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Agent</DialogTitle>
        <DialogContent>
          {editingAgent && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={editingAgent.name}
                onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Category"
                type="text"
                fullWidth
                variant="standard"
                value={editingAgent.category}
                onChange={(e) => setEditingAgent({ ...editingAgent, category: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Status"
                type="text"
                fullWidth
                variant="standard"
                value={editingAgent.status}
                onChange={(e) => setEditingAgent({ ...editingAgent, status: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)} disabled={isEditLoading}>Cancel</Button>
          <Button onClick={handleSaveEdit} disabled={isEditLoading}>
            {isEditLoading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton sx={{ position: 'fixed', bottom: 16, right: 16 }}>
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

export default ManageAgents;