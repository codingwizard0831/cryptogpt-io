import React, { useState } from 'react';

import { Box, alpha, Typography } from '@mui/material';

import Image from 'src/components/image/image';

const dummyData = [
    {
        title: "Overview of ASP.NET Core - Microsoft Learn",
        link: "/assets/images/project/test-item.png"
    },
    {
        title: "Overview of ASP.NET Core - Microsoft Learn",
        link: "/assets/images/project/test-item.png"
    },
]

const ImageBarPanel: React.FC = () => {
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
                    mb: 1.5
                }}>{item.title}</Typography>

                <Image
                    alt="avatar"
                    src={item.link}
                    sx={{
                        width: '100%',
                        aspectRatio: '2/1',
                    }}
                />
            </Box>)
        }
    </Box>
}

export default ImageBarPanel