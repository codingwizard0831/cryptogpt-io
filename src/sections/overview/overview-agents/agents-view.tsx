'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface Agent {
  icon: React.ReactNode;
  name: string;
  lastModified: string;
  agentId: string;
  type: string;
  category: string;
  status: string;
}

const initialAgents: Agent[] = [
  { icon: <PlayCircleOutlineIcon />, name: 'Youtube Plugin', lastModified: '07/15/2024 , 09:28 AM', agentId: 'plugin-1713961903', type: 'File / Youtube', category: 'Education', status: 'Public' },
  { icon: <HelpOutlineIcon />, name: 'Media Knowledge Plugin', lastModified: '04/24/2024 , 05:31 AM', agentId: 'plugin-1713962163', type: 'Chat / Media Knowle...', category: 'Education', status: 'Public' },
  { icon: <VideoLibraryIcon />, name: 'Video Plugin', lastModified: '04/24/2024 , 05:31 AM', agentId: 'plugin-1713967141', type: 'File / Video', category: 'Education', status: 'Public' },
  { icon: <AudiotrackIcon />, name: 'Audio Plugin', lastModified: '04/24/2024 , 04:40 AM', agentId: 'plugin-1713958830', type: 'File / Audio', category: 'Education', status: 'Public' },
  { icon: <DescriptionIcon />, name: 'Document Plugin', lastModified: '04/24/2024 , 03:28 AM', agentId: 'plugin-1713954536', type: 'File / Document', category: 'Finance', status: 'Public' },
];

const ManageAgents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Agents');
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingAgent) {
      setAgents(agents.map(agent =>
        agent.agentId === editingAgent.agentId ? editingAgent : agent
      ));
      setIsEditDialogOpen(false);
      setEditingAgent(null);
    }
  };

  const handleUnsubscribe = (agentId: string) => {
    setAgents(agents.filter(agent => agent.agentId !== agentId));
  };

  const filteredAgents = React.useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filter === 'All Agents' ||
        (filter === 'Chat Agents' && agent.type.toLowerCase().includes('chat')) ||
        (filter === 'File Agents' && agent.type.toLowerCase().includes('file'));

      return matchesSearch && matchesFilter;
    });
  }, [agents, searchTerm, filter]);

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Manage agents to access knowledge bases and facilitate OnDemand model interaction with external services.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
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
          sx={{ width: '50%', bgcolor: 'background.paper' }}
        />
        <Box>
          {['All Agents', 'Chat Agents', 'File Agents'].map((text) => (
            <Button
              key={text}
              variant={filter === text ? "contained" : "outlined"}
              onClick={() => setFilter(text)}
              sx={{ mx: 1 }}
            >
              {text}
            </Button>
          ))}
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table sx={{ minWidth: 650 }} aria-label="agents table">
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
              <TableRow key={agent.agentId}>
                <TableCell>{agent.icon}</TableCell>
                <TableCell>
                  <Typography variant="body1">{agent.name}</Typography>
                  <Typography variant="caption" color="text.secondary">Last modified on: {agent.lastModified}</Typography>
                </TableCell>
                <TableCell>{agent.agentId}</TableCell>
                <TableCell>{agent.type}</TableCell>
                <TableCell>{agent.category}</TableCell>
                <TableCell>
                  <Typography color="success.main">{agent.status}</Typography>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<EditIcon />} sx={{ mr: 1 }} onClick={() => handleEdit(agent)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleUnsubscribe(agent.agentId)}>Unsubscribe</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <IconButton sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <HelpOutlineIcon />
      </IconButton>

      {/* Edit Dialog */}
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
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAgents;