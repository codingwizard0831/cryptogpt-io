import React from 'react';

import { styled } from '@mui/system';
import { Box, alpha, Accordion, Typography, AccordionDetails, AccordionSummary } from '@mui/material';

import Iconify from 'src/components/iconify';


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
                '& .MuiAccordionSummary-expandIconWrapper': {
                    color: 'primary.main'
                },
            },
            '& .MuiAccordionDetails-root': {
                padding: '0px 0px 0px 10px !important',
            },
        },
    },
}));

export default function DashboardStrategyAccordion() {
    return <StyledAccordion sx={{
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
    }}>
        <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                <Iconify icon="ion:search" sx={{ color: 'info.main' }} />
                <Typography variant="body1" sx={{
                    color: 'primary.main',
                }}>Step 1: Pair Selection</Typography>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
            Detail
        </AccordionDetails>
    </StyledAccordion>
}