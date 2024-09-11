import React, { useState, useEffect } from 'react';

import { Card, Table, TableBody, Typography, TableContainer } from '@mui/material';

import axios, { endpoints } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';
import {
    useTable,
    emptyRows,
    TableNoData,
    TableEmptyRows,
    TableHeadCustom,
    TablePaginationCustom,
} from 'src/components/table';

import InvoiceTableRow from './invoice-table-row';

const TABLE_HEAD = [
    { id: 'no', label: 'No' },
    { id: 'amount', label: 'Amount' },
    { id: 'address', label: 'Address' },
    { id: 'date', label: 'Date' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
];

const Transactions: React.FC = () => {
    const table = useTable({ defaultOrderBy: 'No' });

    const [tableData, setTableData] = useState([]);
    
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.post(endpoints.history.crgptToken);
                console.log('response', response.data)
                setTableData(response.data);
            } catch (err) {
                enqueueSnackbar(`Failed to fetch user CRGPT token history.`, { variant: 'error' });
                console.error('Error fetching user profile:', err);
            }
        };

        fetchHistory();
    }, [enqueueSnackbar]);

    return (
        <Card sx={{ color: 'text.primary', p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Current Balance: 0 CRGPT
            </Typography>

            <TableContainer sx={{ position: 'relative', overflow: 'unset', mt: 3 }}>
                <Table size="medium" sx={{ minWidth: 800 }}>
                    <TableHeadCustom
                        headLabel={TABLE_HEAD}
                        sx={{ "th": { color: 'white !important' }, ".MuiTableCell-root.MuiTableCell-head:first-child": { textAlign: "center" } }}
                    />

                    <TableBody>
                        {tableData
                            .slice(
                                table.page * table.rowsPerPage,
                                table.page * table.rowsPerPage + table.rowsPerPage
                            )
                            .map((row, index) => (
                                <InvoiceTableRow
                                    key={index}
                                    row={row}
                                    index={index}
                                />
                            ))}

                        <TableEmptyRows
                            emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                        />

                        <TableNoData notFound={!tableData.length} sx={{ ".MuiTypography-root": { color: 'white' } }} />
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