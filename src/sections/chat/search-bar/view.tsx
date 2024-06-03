import React, { useState } from 'react';

import { Box } from '@mui/material';

import SearchBarTab from './search-bar-tab';
import ImageBarPanel from './image-tab-panel';
import SourceBarPanel from './source-tab-panel';

const SearchBarView: React.FC = () => {
    const [currentTab, setCurrentTab] = useState('source');

    return <Box sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }}>
        <SearchBarTab currentTab={currentTab} setTab={setCurrentTab} />
        <Box sx={{
            width: '100%',
        }}>
            {
                (() => {
                    switch (currentTab) {
                        case 'source':
                            return <SourceBarPanel />;
                        case 'image':
                            return <ImageBarPanel />;
                        case 'news':
                            return <></>;
                        case 'places':
                            return <></>;
                        default:
                            return <></>;
                    }
                })()
            }
        </Box>
    </Box>
}

export default SearchBarView;