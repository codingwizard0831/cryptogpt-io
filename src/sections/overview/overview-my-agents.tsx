import React, { useState, useEffect } from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Box,
  List,
  Card,
  Button,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  ListItemIcon,
  CircularProgress
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

interface Agent {
  name: string;
  last_modified: string;
  agent_id: string;
  icon: React.ReactNode;
}

const getIconForAgent = (name: string): React.ReactNode => {
  if (name.toLowerCase().includes('youtube')) {
    return <PlayCircleOutlineIcon />;
  } if (name.toLowerCase().includes('knowledge')) {
    return <TipsAndUpdatesIcon />;
  }
  return <ErrorOutlineIcon />;
};

const OverviewMyAgents: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          icon: getIconForAgent(agent.name)
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
    <Card sx={{ color: 'text.primary', p: 2, borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          My Agents
        </Typography>
        <Button variant="text" color="primary" size="small" onClick={() => router.replace(paths.dashboard.agents)}>
          View All
        </Button>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'rgba(249, 250, 251, 0.08)' }}>
        {agents.length === 0 ? (
          <ListItem>
            <ListItemText primary="No agents found" />
          </ListItem>
        ) : (
          agents.map((agent, index) => (
            <React.Fragment key={agent.agent_id}>
              {index > 0 && <Divider variant="fullWidth" component="li" />}
              <ListItem alignItems="flex-start" sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 40, color: 'text.primary' }}>
                  {agent.icon}
                </ListItemIcon>
                <ListItemText
                  primary={agent.name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        Last modified: {agent.last_modified}
                      </Typography>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        Agent ID: {agent.agent_id}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))
        )}
      </List>
    </Card>
  );
};

export default OverviewMyAgents;
