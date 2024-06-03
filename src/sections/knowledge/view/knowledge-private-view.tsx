'use client';

import React from "react";

import { Box, styled, Accordion, Typography, AccordionDetails, AccordionSummary } from '@mui/material';

import { _mock } from 'src/_mock';

import Iconify from "src/components/iconify";
import FileThumbnail from "src/components/file-thumbnail/file-thumbnail";

import KnowledgebaseItem from "src/sections/chat/knowledgebase/knowledgebase-item";
import { KNOWLEDGEBASE_EMPTY_BOTTOM_FOR_INPUT } from "src/sections/knowledge/config-layout";

const _accordions = [...Array(4)].map((_, index) => ({
    id: _mock.id(index),
    value: `panel${index + 1}`,
    heading: `Accordion ${index + 1}`,
    subHeading: _mock.postTitle(index),
    detail: _mock.description(index),
}));

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
                padding: '0px 0px 0px 20px !important',
            },
        },
    },
}));

export default function KnowledgePrivateView() {
    return <Box sx={{
        width: 1,
        height: 1,
        pb: `${KNOWLEDGEBASE_EMPTY_BOTTOM_FOR_INPUT}px`, // for message input
    }}>
        {
            _accordions.map((accordion, index) => (
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
                                </AccordionDetails>
                            </StyledAccordion>
                        ))}
                    </AccordionDetails>
                </StyledAccordion>
            ))
        }
    </Box>
};