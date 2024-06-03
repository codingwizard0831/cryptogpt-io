import React, { useState, useCallback } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Box, Tab, Tabs, TextField, InputAdornment } from '@mui/material';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

type Props = {
    currentTab?: string,
    setTab?: (tab: string) => void
}

const SearchBarTab: React.FC<Props> = ({ currentTab = 'source', setTab = (tab: string) => { } }) => {
    const [scrollableTab, setScrollableTab] = useState(currentTab);
    const handleChangeScrollableTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setScrollableTab(newValue);
        setTab(newValue);
    }, [setTab]);

    return <Box sx={{
        width: '100%',
    }}>
        <Tabs value={scrollableTab} onChange={handleChangeScrollableTab} sx={{
            fontSize: "14px",
            height: '36px',
        }}>
            <Tab label="Source" value="source" icon={<InsertLinkIcon fontSize='small' />} sx={{
                px: 1
            }} />
            <Tab label="Image" value="image" icon={<InsertPhotoIcon fontSize='small' />} sx={{
                px: 1
            }} />
            <Tab label="News" value="news" icon={<NotificationImportantIcon fontSize='small' />} sx={{
                px: 1
            }} />
            <Tab label="Places" value="places" icon={<LocationOnIcon fontSize='small' />} sx={{
                px: 1
            }} />
            <Tab label="Videos" value="videos" icon={<OndemandVideoIcon fontSize='small' />} sx={{
                px: 1
            }} />
        </Tabs>


        <Box sx={{
            width: '100%',
            pt: 2,
            px: 2
        }}>
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
            />
        </Box>
    </Box>
}

export default SearchBarTab;