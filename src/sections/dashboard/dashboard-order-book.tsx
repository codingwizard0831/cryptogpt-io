"use client";

import { Box, Stack, Table, alpha, TableRow, TableHead, TableCell, TableBody, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function DashboardOrderBook() {
    return (
        <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Iconify icon="fluent:layout-column-two-split-left-focus-top-left-24-filled" sx={{
                    cursor: 'pointer',
                }} />
                <Iconify icon="fluent:layout-column-two-focus-left-24-filled" sx={{
                    cursor: 'pointer',
                }} />
                <Iconify icon="fluent:layout-column-two-16-regular" sx={{
                    cursor: 'pointer',
                }} />
            </Stack>
            <Table sx={{
                "& td,th": {
                    fontSize: '10px',
                    padding: '0px',
                },
                "& th": {
                    backgroundColor: 'transparent',
                },
                "& tbody tr": {
                    transition: 'background-color 0.3s',
                    "&:hover": {
                        backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1)
                    },
                },
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="body2">Price(USDT)</Typography>
                        </TableCell>
                        <TableCell align='right'>
                            <Typography variant="body2">Amount(BTC)</Typography>
                        </TableCell>
                        <TableCell align='right'>
                            <Typography variant="body2">Total</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        [...Array(10)].map((_, _index) => (
                            <TableRow key={`row-key-${_index}`}>
                                <TableCell>
                                    <Typography variant="body2" color="error">0.00000000</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">0.00000000</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">0.00000000</Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Box>
    );
}