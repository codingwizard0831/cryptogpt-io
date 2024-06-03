import React from 'react';

import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';

import Iconify from 'src/components/iconify';

import { knowledgeBaseSettingsNavbarType } from '../../types';

export const knowledgeBaseSettingsNavbarData = [
    {
        key: "storage",
        icon: <Iconify icon="mdi:storage" fontSize='small' />,
        title: "Storage",
        label: "Storage Capacity"
    },
    {
        key: "file-access",
        icon: <FileOpenIcon fontSize='small' />,
        title: "File",
        label: "File Access Management"
    },
    {
        key: "encryption",
        icon: <Iconify icon="cbi:letsencrypt" fontSize='small' />,
        title: "Encryption",
        label: "Encryption Settings for Files"
    },
    {
        key: "file-versioning",
        icon: <Iconify icon="ic:round-backup" fontSize='small' />,
        title: "Version",
        label: "File Versioning"
    },
    {
        key: "activity",
        icon: <Iconify icon="quill:activity" fontSize='small' />,
        title: "Activity",
        label: "Activity and Notifications"
    },
    {
        key: "2fa",
        icon: <Iconify icon="ic:outline-privacy-tip" fontSize='small' />,
        title: "2FA",
        label: "Data Privacy and Security"
    },
    {
        key: "collaboration",
        icon: <Diversity3Icon fontSize='small' />,
        title: "Collaboration",
        label: "Collaboration"
    },
    {
        key: "advanced",
        icon: <Iconify icon="oui:ml-create-advanced-job" fontSize='small' />,
        title: "Advanced",
        label: "Advanced Security Options"
    },
];

type KnowledgeSettingNavbarProps = {
    tab?: knowledgeBaseSettingsNavbarType;
    setTab?: (tab: knowledgeBaseSettingsNavbarType) => void;
}

const KnowledgeSettingNavbar: React.FC<KnowledgeSettingNavbarProps> = ({ tab = "storage", setTab = (v) => { } }) => {
    const [settingTab, setSettingTab] = React.useState(tab);
    const handleChangeSettingTab = (event: React.SyntheticEvent, newValue: knowledgeBaseSettingsNavbarType) => {
        setSettingTab(newValue);
        setTab(newValue);
    }
    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        backdropFilter: 'blur(10px)',
    }}>
        <Tabs
            value={settingTab}
            onChange={handleChangeSettingTab}
            sx={{
                fontSize: "14px",
                height: '36px',
            }}>
            {
                knowledgeBaseSettingsNavbarData.map((item, index) => (
                    <Tab key={item.key} label={item.title} value={item.key} icon={item.icon} sx={{
                        px: 1,
                    }} />
                ))
            }
        </Tabs>
        <Typography variant='h6' sx={{
            fontSize: '1.1rem !important',
            fontWeight: 600,
            mt: 1.5
        }}>{knowledgeBaseSettingsNavbarData.find((item) => item.key === settingTab)?.label}</Typography>
    </Box>
}

export default KnowledgeSettingNavbar;