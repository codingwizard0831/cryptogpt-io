import React from 'react';

import { alpha } from '@mui/material/styles';
import { Box, Avatar, Typography } from '@mui/material';

const KnowledgeHeader: React.FC = () => <Box sx={{
    backgroundColor: (theme) => alpha(theme.palette.background.default, 0.2),
    p: 2,
    mb: 2,
    borderRadius: 2,
}}>
    <Typography variant="subtitle2" sx={{
        fontSize: "18px",
        position: "relative",
        bottom: "4px",
        fontWeight: 'bold',
        color: theme => theme.palette.text.secondary,
    }}>Team</Typography>
    <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    }}>
        <Avatar alt="Vue" src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg" sx={{
            width: 36,
            height: 36,
        }} />
        <Avatar alt="Vue" src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg" sx={{
            width: 36,
            height: 36,
        }} />
        <Avatar alt="Vue" src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg" sx={{
            width: 36,
            height: 36,
        }} />
    </Box>
</Box>

export default KnowledgeHeader;