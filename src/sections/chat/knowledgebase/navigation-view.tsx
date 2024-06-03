import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Avatar, Switch, TextField, IconButton, Typography, InputAdornment } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import { fileThumb } from 'src/components/file-thumbnail';
import FileThumbnail from 'src/components/file-thumbnail/file-thumbnail';
import NavSectionVertical from 'src/components/nav-section/vertical/nav-section-vertical';

// import KnowledgebaseItem from './knowledgebase-item';

const NAV_ITEMS = [
    {
        subheader: 'Travel',
        items: [
            {
                title: 'Level',
                path: '#',
                icon: <FileThumbnail file="folder" sx={{ width: '24px', height: '24px' }} />,
                children: [
                    { title: 'Level 2.1', path: '#', icon: <FileThumbnail file="folder" sx={{ width: '24px', height: '24px' }} />, },
                    { title: 'Level 2.2', path: '#', icon: <FileThumbnail file="folder" sx={{ width: '24px', height: '24px' }} />, },
                    {
                        title: 'Level 2.3',
                        path: '#',
                        icon: <FileThumbnail file="folder" sx={{ width: '24px', height: '24px' }} />,
                        children: [
                            {
                                title: 'Level 3.1',
                                path: '#',
                                icon: <Image src={fileThumb('name.pdf')} alt="name.pdf" sx={{
                                    width: '24px',
                                    height: '24px',
                                }} />,
                                info: <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'end',
                                    alignItems: 'center',
                                }}>
                                    <Typography variant='body2' sx={{
                                        mx: 1
                                    }}>12 KB</Typography>
                                    <Avatar alt="person.name" src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg" sx={{
                                        width: '20px',
                                        height: '20px',
                                        pr: 0
                                    }} />
                                    <Switch size='small' />
                                    <IconButton size="small">
                                        <DeleteIcon fontSize='small' />
                                    </IconButton>
                                </Box>
                            },
                            {
                                title: 'Level 3.2',
                                path: '#',
                                icon: <Image src={fileThumb('name.pdf')} alt="name.pdf" sx={{
                                    width: '24px',
                                    height: '24px',
                                }} />,
                                info: <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'end',
                                    alignItems: 'center',
                                }}>
                                    <Typography variant='body2' sx={{
                                        mx: 1
                                    }}>12 KB</Typography>
                                    <Avatar alt="person.name" src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg" sx={{
                                        width: '20px',
                                        height: '20px',
                                        pr: 0
                                    }} />
                                    <Switch size='small' />
                                    <IconButton size="small">
                                        <DeleteIcon fontSize='small' />
                                    </IconButton>
                                </Box>
                            },
                        ],
                    },
                ],
            },
            {
                title: 'About',
                path: '#',
                icon: <Iconify icon="carbon:airport-01" width={1} />,
            },
            {
                title: 'Contact',
                path: '#',
                icon: <Iconify icon="carbon:battery-full" width={1} />,
            },
        ],
    },
    {
        subheader: 'Marketing',
        items: [
            {
                title: 'Landing',
                path: '#',
                icon: <Iconify icon="carbon:bat" width={1} />,
                roles: ['admin'],
                caption: 'Display only admin role',
            },
            {
                title: 'Services',
                path: '#',
                icon: <Iconify icon="carbon:cyclist" width={1} />,
                roles: ['admin', 'user'],
            },
            {
                title: 'Case Studies',
                path: '#',
                icon: <Iconify icon="carbon:3d-cursor-alt" width={1} />,
                info: <Label color="error">+32</Label>,
                children: [
                    { title: 'Case Studies', path: '#' },
                    { title: 'Case Study', path: '#' },
                ],
            },
            {
                title: 'Blog',
                path: '#',
                icon: <Iconify icon="carbon:3d-mpr-toggle" width={1} />,
                children: [
                    { title: 'Blog Posts', path: '#' },
                    { title: 'Blog Post', path: '#' },
                ],
            },
        ],
    },
];

const defaultConfig = {
    gap: 4,
    icon: 24,
    currentRole: 'admin',
    rootItemHeight: 44,
    subItemHeight: 36,
    padding: '4px 8px 4px 12px',
    radius: 8,
    hiddenLabel: false,
    hiddenSubheader: false,
};


const TestView: React.FC = () => {
    const [config,] = useState(defaultConfig);

    return <Box sx={{
        width: '100%',
        height: '10%%',
        position: 'relative',
        p: 2,
    }}>
        <IconButton size='medium' sx={{
            position: 'absolute',
            right: 2,
            top: -1
        }}>
            <CloseIcon fontSize='small' />
        </IconButton>

        <Typography variant='h6' sx={{
            mb: 1
        }}>Knowledge Base Navigation</Typography>


        <TextField
            fullWidth
            variant="outlined"
            // label="Search"
            size='small'
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            sx={{
                mt: 1,
                mb: 1.5
            }}
        />

        {/* {
            dummyData.map((item, index) => <KnowledgebaseItem key={`knowledgebase-${index}`} name={item.name} url={item.url} type={item.type} />)
        } */}

        <NavSectionVertical
            data={NAV_ITEMS}
            sx={{
                py: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows.z20,
            }}
            slotProps={{
                gap: config.gap,
                currentRole: config.currentRole,
                rootItem: {
                    padding: config.padding,
                    minHeight: config.rootItemHeight,
                    borderRadius: `${config.radius}px`,
                    '& .icon, .sub-icon': {
                        width: config.icon,
                        height: config.icon,
                        ...(!config.icon && { display: 'none' }),
                    },
                    ...(config.hiddenLabel && {
                        '& .label, .caption': {
                            display: 'none',
                        },
                    }),
                },
                subItem: {
                    padding: config.padding,
                    minHeight: config.subItemHeight,
                    borderRadius: `${config.radius}px`,
                    '& .icon, .sub-icon': {
                        width: config.icon,
                        height: config.icon,
                        ...(!config.icon && { display: 'none' }),
                    },
                    ...(config.hiddenLabel && {
                        '& .label, .caption': {
                            display: 'none',
                        },
                    }),
                },
                subheader: {
                    ...(config.hiddenSubheader && {
                        display: 'none',
                    }),
                },
            }}
        />

    </Box>
}

export default TestView;