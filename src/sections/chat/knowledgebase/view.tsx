import React from 'react';

import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button, Accordion, TextField, IconButton, Typography, InputAdornment, AccordionDetails, AccordionSummary } from '@mui/material';

import { _mock } from 'src/_mock';

import Iconify from 'src/components/iconify';
import FileThumbnail from 'src/components/file-thumbnail/file-thumbnail';

import KnowledgebaseItem from './knowledgebase-item';

const _accordions = [...Array(4)].map((_, index) => ({
    id: _mock.id(index),
    value: `panel${index + 1}`,
    heading: `Accordion ${index + 1}`,
    subHeading: _mock.postTitle(index),
    detail: _mock.description(index),
}));

const KnowledgebaseView: React.FC = () => {

    const StyledAccordion = styled(Accordion)(({ theme }) => ({
        '&.MuiAccordion-root': {
            boxShadow: 'none',
            '&.Mui-expanded': {
                margin: '0px', // Adjust this value to your needs
                backgroundColor: 'transparent',
                '& .MuiAccordionSummary-root': {
                    margin: '0',
                    paddingRight: '0px !improtant',
                    minHeight: '48px',
                    '& .MuiAccordionSummary-content': {
                        margin: '0',
                    },
                },
                '& .MuiAccordionDetails-root': {
                    padding: '0px 0px 0px 10px !important',
                },
            },
        },
    }));

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
        }}>Knowledge Base</Typography>

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

        {_accordions.map((accordion, index) => (
            <StyledAccordion key={accordion.value} disabled={index === 3} sx={{

            }}>
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                    <FileThumbnail file="folder" sx={{ width: '16px', height: '16px', marginRight: 1 }} />
                    <Typography variant="subtitle1" sx={{
                        fontSize: '12px'
                    }}>{accordion.heading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {_accordions.map((_accordion, _index) => (
                        <StyledAccordion key={_accordion.value} disabled={_index === 3}>
                            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                <FileThumbnail file="folder" sx={{ width: '16px', height: '16px', marginRight: 1 }} />
                                <Typography variant="subtitle1" sx={{
                                    fontSize: '12px'
                                }}>{accordion.heading}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <KnowledgebaseItem />
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    paddingBottom: '8px'
                                }}>
                                    <Button variant="outlined" size="small" startIcon={<UploadIcon />}>Upload more files</Button>
                                </Box>
                            </AccordionDetails>
                        </StyledAccordion>
                    ))}
                </AccordionDetails>
            </StyledAccordion>
        ))}
    </Box>
}

export default KnowledgebaseView;