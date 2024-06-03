'use client';

import React, { useMemo } from "react";

import { Box } from '@mui/material';

import { knowledgeBaseSettingsNavbarType } from "../types";
import KnowledgeSetting2fa from "../knowledge-content/knowledge-settings/knowledge-setting-2fa";
import KnowledgeSettingNavbar from "../knowledge-content/knowledge-settings/knowledge-setting-navbar";
import KnowledgeSettingStorage from "../knowledge-content/knowledge-settings/knowledge-setting-storage";
import KnowledgeSettingVersion from "../knowledge-content/knowledge-settings/knowledge-setting-version";
import KnowledgeSettingActivity from "../knowledge-content/knowledge-settings/knowledge-setting-activity";
import KnowledgeSettingAdvanced from "../knowledge-content/knowledge-settings/knowledge-setting-advanced";
import KnowledgeSettingEncryption from "../knowledge-content/knowledge-settings/knowledge-setting-encryption";
import { KNOWLEDGEBASE_EMPTY_BOTTOM_FOR_INPUT, KNOWLEDGEBASE_EMPTY_TOP_SETTING_TABBAR } from "../config-layout";
import KnowledgeSettingCollaboration from "../knowledge-content/knowledge-settings/knowledge-setting-collaboration";
import KnowledgeSettingFileAccessManagement from "../knowledge-content/knowledge-settings/knowledge-setting-file-access-management";

export default function KnowledgeSettings() {
    const [tab, setTab] = React.useState<knowledgeBaseSettingsNavbarType>("storage");

    const KnowledgeBaseSettingsContent = useMemo(() => {
        switch (tab) {
            case "storage":
                return <KnowledgeSettingStorage />;
            case "file-access":
                return <KnowledgeSettingFileAccessManagement />;
            case "encryption":
                return <KnowledgeSettingEncryption />;
            case "file-versioning":
                return <KnowledgeSettingVersion />;
            case "activity":
                return <KnowledgeSettingActivity />;
            case "2fa":
                return <KnowledgeSetting2fa />;
            case "collaboration":
                return <KnowledgeSettingCollaboration />;
            case "advanced":
                return <KnowledgeSettingAdvanced />;
            default:
                return null;
        }
    }, [tab]);

    return <Box sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
    }}>
        <Box sx={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 20,
            width: "100%",
        }}>
            <KnowledgeSettingNavbar tab={tab} setTab={setTab} />
        </Box>
        <Box sx={{
            pt: `${KNOWLEDGEBASE_EMPTY_TOP_SETTING_TABBAR}px`, // navbar space
            overflowX: "hidden",
            overflowY: "auto",
            zIndex: 10,
        }}>
            <Box sx={{
                pb: `${KNOWLEDGEBASE_EMPTY_BOTTOM_FOR_INPUT}px`, // message input space
            }}>
                {
                    KnowledgeBaseSettingsContent
                }
            </Box>
        </Box>
    </Box>
}
