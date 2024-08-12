import React from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Button
} from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
interface Agent {
    name: string;
    lastModified: string;
    agentId: string;
    icon: React.ReactNode;
}

const agents: Agent[] = [
    {
        name: 'Youtube Plugin',
        lastModified: '15/07/2024, 9:29 AM',
        agentId: 'plugin-171396903',
        icon: <PlayCircleOutlineIcon />
    },
    {
        name: 'Media Knowledge Plugin',
        lastModified: '24/04/2024, 5:31 AM',
        agentId: 'plugin-171392163',
        icon: <TipsAndUpdatesIcon />
    }
];

const OverviewMyAgents: React.FC = () => {
    const router = useRouter();

    return (
        <Box sx={{ bgcolor: 'grey.900', color: 'text.primary', p: 2, borderRadius: 2, maxWidth: 450, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                    My Agents
                </Typography>
                <Button variant="text" color="primary" size="small" onClick={() => router.replace(paths.dashboard.agents)}>
                    View All
                </Button>
            </Box>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {agents.map((agent, index) => (
                    <React.Fragment key={agent.agentId}>
                        {index > 0 && <Divider variant="fullWidth" component="li" />}
                        <ListItem alignItems="flex-start" sx={{ py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 40, color: 'text.primary' }}>
                                {agent.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={agent.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'block' }}
                                            component="span"
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Last modified: {agent.lastModified}
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'block' }}
                                            component="span"
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Agent ID: {agent.agentId}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default OverviewMyAgents;