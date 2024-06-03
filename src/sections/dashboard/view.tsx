'use client';

import { useEffect } from 'react';
import { useMutation } from "convex/react";

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

import { api } from "../../../convex/_generated/api";

export default function DashboardView() {
    const theme = useTheme();
    const settings = useSettingsContext();
    const tasks = useMutation(api.profile.getByUserId);
    console.log(tasks({ user_id: 28 }));

    useEffect(() => {
        Promise.all([
            tasks({ user_id: 28 }),
        ]).then((data) => {
            console.log("finaly", data);
        });
    }, [tasks]);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <Box>
                Dashboard
            </Box>
        </Container>
    );
}
