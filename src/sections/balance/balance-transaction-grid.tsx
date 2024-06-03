import { Box, alpha, styled, Button, BoxProps, useTheme, Accordion, Typography, AccordionSummary, AccordionDetails } from "@mui/material";

import Label from "src/components/label";
import Iconify from "src/components/iconify";

const HEADER = [
    'Type',
    'ID',
    'Date',
    'Balance (EUR)',
];

export type TransactionType = {
    type: string;
    id: string;
    date: string;
    balance: string;
    invoiceNo: string;
    booking?: string;
    description?: string;
    source?: string;
    status: string;
}

export interface BalanceTransactionGridProps extends BoxProps {
    data?: TransactionType[];
}

export default function BalanceTransactionGrid({ data = [], sx, ...other }: BalanceTransactionGridProps) {
    const theme = useTheme();

    return <Box sx={{
        width: '100%',
        ...sx,
    }} {...other}
    >
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2px',
        }}>
            {HEADER.map((item, index) => <Box key={index} sx={{
                flex: 1,
                px: 2,
                py: 1,
                backgroundColor: `${alpha(theme.palette.primary.main, 0.2)}`,
            }}>
                <Typography variant='subtitle2' sx={{ fontSize: "14px" }}>{item}</Typography>
            </Box>)}
        </Box>
        <Box sx={{
        }}>
            {data.map((item, index) => <TransactionItem key={index} data={item} expanded />)}
        </Box>
    </Box>
}

const TYPE_ICONS = {
    'Solar': 'ph:solar-panel-bold',
    'Travel': 'ic:twotone-travel-explore',
    'Chat': 'bi:chat-text',
}

interface TransactionItemProps extends BoxProps {
    data: TransactionType,
    expanded?: boolean;
}

function TransactionItem({ data: { type, id, date, balance, invoiceNo, description, booking, source, status }, expanded, sx }: TransactionItemProps) {
    const StyledAccordion = styled(Accordion)(({ theme }) => ({
        '&.MuiAccordion-root': {
            boxShadow: 'none',
            backgroundColor: `${alpha(theme.palette.divider, 0.05)}`,
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            '&.Mui-expanded': {
                margin: '0px', // Adjust this value to your needs
                backgroundColor: `${alpha(theme.palette.divider, 0.05)}`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                '& .MuiAccordionSummary-root': {
                    margin: '0',
                    paddingRight: '0px !improtant',
                    minHeight: '48px',
                    '& .MuiAccordionSummary-content': {
                        margin: '0',
                    },
                },
                '& .MuiAccordionDetails-root': {
                    padding: '0px !important',
                },
            },
        },
    }));

    return <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        p: 1,
        ...sx,
    }}>
        <StyledAccordion expanded={expanded} sx={{
            width: '100%',
        }}>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alighItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{
                        flex: 1,
                    }}>
                        <Typography variant='subtitle2'>{type}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 1,
                    }}>
                        <Typography variant='subtitle2'>{id}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 1,
                    }}>
                        <Typography variant='subtitle2' textAlign="center">{date}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 1,
                        pr: 1,
                    }}>
                        <Typography variant='subtitle2' textAlign="right">{balance}</Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                    p: 2,
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1,
                    }}>
                        <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>Invoice no:</Typography>
                        <Typography variant='subtitle2'>{invoiceNo}</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1,
                    }}>
                        <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>Description:</Typography>
                        <Typography variant='subtitle2'>{description}</Typography>
                    </Box>
                    {
                        booking && <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 1,
                        }}>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>Booking:</Typography>
                            <Typography variant='subtitle2'>{booking}</Typography>
                        </Box>
                    }
                    {
                        source && <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 1,
                        }}>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>Source:</Typography>
                            <Typography variant='subtitle2'>{source}</Typography>
                        </Box>
                    }
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1,
                    }}>
                        <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>Status:</Typography>
                        <Label color="warning">{status}</Label>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        <Button variant='contained' size="small" color='error'>Delete</Button>
                    </Box>

                    <Iconify icon={TYPE_ICONS[type as keyof typeof TYPE_ICONS]} sx={{
                        position: 'absolute',
                        width: '164px',
                        height: '164px',
                        right: '-40px',
                        bottom: '-40px',
                        color: theme => `${alpha(theme.palette.primary.main, 0.2)}`
                    }} />
                </Box>
            </AccordionDetails>
        </StyledAccordion>
    </Box>
}