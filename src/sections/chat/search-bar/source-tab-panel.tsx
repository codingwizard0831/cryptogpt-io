import React, { useState } from 'react';

import { Box, alpha, Typography } from '@mui/material';

const dummyData = [
    {
        title: "Overview of ASP.NET Core - Microsoft Learn",
        content: "ASP.NET Core is a cross-platform, high-performance, open-source framework for building modern, cloud-enabled, Internet-connected"
    },
    {
        title: "Overview of ASP.NET Core - Microsoft Learn",
        content: "ASP.NET Core is a cross-platform, high-performance, open-source framework for building modern, cloud-enabled, Internet-connected"
    },
]

const SourceBarPanel: React.FC = () => {
    const [value, setValue] = useState('');

    return <Box sx={{
        p: 2
    }}>
        {
            dummyData.map((item, index) => <Box key={`source-${index}`} sx={{
                p: 2,
                backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
                borderRadius: 1,
                mb: 1
            }}>
                <Typography variant='subtitle1' sx={{
                    textDecoration: 'underline',
                    fontSize: '11px',
                    lineHeight: '1.2',
                    mb: 1
                }}>{item.title}</Typography>
                <Typography variant='body1' sx={{
                    fontSize: '9px',
                    lineHeight: '1.2',
                }}>{item.content}</Typography>
            </Box>)
        }
    </Box>
}

export default SourceBarPanel