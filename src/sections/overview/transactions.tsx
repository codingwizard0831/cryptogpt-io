import React, { useState, useEffect, useCallback } from 'react';

import { Card, Table, TableBody, Typography, TableContainer, CircularProgress, TableRow, TableCell } from '@mui/material';

import axios, { endpoints } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';
import {
    useTable,
    emptyRows,
    TableNoData,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TablePaginationCustom,
} from 'src/components/table';

import InvoiceTableRow from './invoice-table-row';

const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'center' },
    { id: 'amount', label: 'Amount' },
    { id: 'address', label: 'Address' },
    { id: 'date', label: 'Date' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action', align: 'center' },
];

const Transactions: React.FC = () => {
    const table = useTable({ defaultOrderBy: 'date' });

    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loadingApprove, setLoadingApprove] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const { enqueueSnackbar } = useSnackbar();

    const fetchHistory = useCallback(async () => {
        try {
            const response = await axios.post(endpoints.history.crgptToken);
            setTableData(response.data);
        } catch (err) {
            enqueueSnackbar(`Failed to fetch user CRGPT token history.`, { variant: 'error' });
            console.error('Error fetching user profile:', err);
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar]);

    const fetchBalance = useCallback(async () => {
        try {
            const response = await axios.post(endpoints.history.balance);
            if (response.data?.balance) {
                setBalance(response.data?.balance);
            }
        } catch (err) {
            enqueueSnackbar(`Failed to fetch user CRGPT token balance.`, { variant: 'error' });
            console.error('Error fetching user balance:', err);
        }
    }, [enqueueSnackbar]);

    useEffect(() => {
        fetchHistory();
        fetchBalance();
    }, [fetchHistory, fetchBalance]);

    useEffect(() => {
        if (tableData?.length) {
            const comparator = getComparator(table.order, table.orderBy);
            const stabilizedThis = tableData.map((el, index) => [el, index] as const);

            stabilizedThis.sort((a, b) => {
                const order = comparator(a[0], b[0]);
                if (order !== 0) return order;
                return a[1] - b[1];
            });
            const sortedData = stabilizedThis.map((el) => el[0]);
            setFilteredTableData(sortedData);
        } else {
            setFilteredTableData([]);
        }
    }, [tableData, table.order, table.orderBy]);

    const handleApprove = async (id: any) => {
        setLoadingApprove(id);
        try {
            await axios.post(endpoints.history.approve, { 'transaction_id': id });
            enqueueSnackbar('Withdrawal approved successfully', { variant: 'success' });
            
            setTableData(prevData => prevData.filter((row: any) => row.id !== id));
            
            fetchBalance();
        } catch (err) {
            enqueueSnackbar('Failed to approve withdrawal', { variant: 'error' });
            console.error('Error approving withdrawal:', err);
        } finally {
            setLoadingApprove(null);
        }
    };

    return (
        <Card sx={{ color: 'text.primary', p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Current Balance: {balance} CRGPT
            </Typography>

            <TableContainer sx={{ position: 'relative', overflow: 'unset', mt: 3 }}>
                <Table size="medium" sx={{ minWidth: 800 }}>
                    <TableHeadCustom
                        headLabel={TABLE_HEAD}
                        order={table.order}
                        orderBy={table.orderBy}
                        onSort={table.onSort}
                        excludeSort={['no', 'action']}
                        sx={{ "th": { color: 'white !important' }, ".MuiTableCell-root.MuiTableCell-head:first-child": { textAlign: "center" } }}
                    />

                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {filteredTableData
                                    .slice(
                                        table.page * table.rowsPerPage,
                                        table.page * table.rowsPerPage + table.rowsPerPage
                                    )
                                    .map((row: any, index) => (
                                        <InvoiceTableRow
                                            key={row.id}
                                            row={row}
                                            index={index}
                                            onApprove={handleApprove}
                                            loading={loadingApprove === row.id}
                                        />
                                    ))}

                                <TableEmptyRows
                                    emptyRows={emptyRows(table.page, table.rowsPerPage, filteredTableData.length)}
                                />

                                <TableNoData notFound={!filteredTableData.length} sx={{ ".MuiTypography-root": { color: 'white' } }} />
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePaginationCustom
                count={tableData.length}
                page={table.page}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                onRowsPerPageChange={table.onChangeRowsPerPage}
            />
        </Card>
    );
};

export default Transactions;