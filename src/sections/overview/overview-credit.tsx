import React from 'react';

import {
    Box,
    Button,
    Card,
    Table,
    alpha,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Typography,
    CircularProgress
} from '@mui/material';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useTokenBalances } from './useTokenBalances';

interface TokenBalance {
    token: string;
    balance: string;
}

const OverviewCredit: React.FC = () => {
    const { eth, usdt, usdc, crgpt } = useTokenBalances();

    const balances: TokenBalance[] = [
        { token: 'ETH', balance: eth },
        { token: 'USDT', balance: usdt },
        { token: 'USDC', balance: usdc },
        { token: 'CRGPT', balance: crgpt },
    ];

    return (
        <Card sx={{
            color: 'text.primary',
            p: 2,
            borderRadius: 2,
            width: '100%',
            overflow: 'auto'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                    Token Balances
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<VisibilityOffIcon />}
                    color="primary"
                    sx={{ bgcolor: theme => theme.palette.primary.main, color: "text.primary" }}
                    onClick={() => console.log('hidden data')}
                >
                    Hidden
                </Button>
            </Box>

            <Box sx={{ overflowY: "auto" }}>
                <Table sx={{
                    "& tr": { px: 1 },
                    "& td,th": { py: 0.5, px: 2 },
                    "& tbody tr": {
                        py: 0.5,
                        transition: 'background-color 0.3s',
                        "&:hover": {
                            backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1)
                        },
                    },
                }} aria-label="token balances table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'text.secondary' }}>Token</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {balances.every(b => b.balance === '-1') ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center" sx={{ color: 'text.secondary' }}>
                                    <CircularProgress size={20} sx={{ mr: 1 }} />
                                    Loading balances...
                                </TableCell>
                            </TableRow>
                        ) : (
                            balances.map((balance, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ color: 'text.primary' }}>{balance.token}</TableCell>
                                    <TableCell sx={{ color: 'text.primary' }}>{balance.balance}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
};

export default OverviewCredit;