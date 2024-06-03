'use client';

import React from "react";

import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { List, alpha, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import { useResponsive } from "src/hooks/use-responsive";

import { knowledgeBaseNavbarType } from 'src/sections/knowledge/types';
import { KNOWLEDGEBASE_NAV } from "src/sections/knowledge/config-layout";

const navData = [
    {
        key: "private",
        icon: <SecurityIcon />,
        primary: "Private",
        secondary: "Main Folder My Files",
    },
    {
        key: "public",
        icon: <PublicIcon />,
        primary: "Public",
        secondary: "Shared on the internet",
    },
    {
        key: "other",
        icon: <Diversity3Icon />,
        primary: "Other",
        secondary: "Teams of Partners",
    },
    {
        key: "graph",
        icon: <SsidChartIcon />,
        primary: "Knowledgebase Graph",
        secondary: "Whole Knowledgebase Chart",
    },
    {
        key: "settings",
        icon: <SettingsIcon />,
        primary: "Settings",
        secondary: "Knowledgebase Settings",
    }
]

type KnowledgeNavbarProps = {
    tab: knowledgeBaseNavbarType;
    setTab?: (tab: knowledgeBaseNavbarType) => void;
}

const KnowledgeNavbar: React.FC<KnowledgeNavbarProps> = ({
    tab = "private",
    setTab: handleTabChange = (v: knowledgeBaseNavbarType) => { },
}) => {
    const upMd = useResponsive('up', 'md');

    return <List component="nav" sx={{
        minWidth: upMd ? `${KNOWLEDGEBASE_NAV.W_DESKTOP}px` : "unset",
    }}>
        {
            navData.map((item, index) => (
                <ListItem key={item.key} sx={{
                    p: 0,
                    my: 0,
                }}>
                    <ListItemButton onClick={() => handleTabChange(item.key as knowledgeBaseNavbarType)} sx={{
                        backgroundColor: theme => tab === item.key ? alpha(theme.palette.background.default, 0.3) : "transparent",
                        px: upMd ? 1 : 1,
                    }}>
                        <ListItemIcon sx={{
                            marginRight: upMd ? 1 : 0,
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        {
                            upMd ? <ListItemText primary={item.primary} secondary={item.secondary} /> : null
                        }
                    </ListItemButton>
                </ListItem>
            ))
        }
    </List>
}

export default KnowledgeNavbar;