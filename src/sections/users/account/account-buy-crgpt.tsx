import React, { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import usePayStripeCardPayment from 'src/hooks/use-pay-stripe-card-payment';

import axios, { endpoints } from 'src/utils/axios';

import Stripe from 'src/provider/Stripe';

import Label from 'src/components/label';
import CardElement from 'src/components/stripe-card';
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
];

const UIComponents = () => {
  const table = useTable({ defaultOrderBy: 'date', defaultOrder: 'desc' });

  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [cardPaymentState, setCardPaymentState] = useState({
    errorMessage: ''
  });

  const [cardElementState, setCardElementState] = useState({
    errorMessage: '',
    complete: false,
  });

  const [depositState, setDepositState] = useState({
    submitting: false,
    error: '',
    success: '',
  })

  const payStripeCardPayment = usePayStripeCardPayment();

  const _OnCardElementChange = useCallback(({ error, complete }: { error: any, complete: any }) => {
    setCardPaymentState({
      errorMessage: ''
    });
    setCardElementState({
      errorMessage: !error ? undefined : error.message,
      complete
    });
  }, [setCardElementState]);
  
  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(endpoints.history.crgptToken);
      setTableData(response.data);
    } catch (err) {
      enqueueSnackbar(`Failed to fetch user CRGPT token history.`, { variant: 'error' });
      console.error('Error fetching user profile:', err);
    } finally {
      setIsLoading(false);
    }
  }, [enqueueSnackbar]);

  const fetchPrice = useCallback(async () => {
    try {
      const response = await axios.post(endpoints.history.price);
      setCurrentPrice(parseFloat(response.data.price));
    } catch (err) {
      enqueueSnackbar(`Failed to fetch current CRGPT price.`, { variant: 'error' });
      console.error('Error fetching price:', err);
    }
  }, [enqueueSnackbar]);

  const _OnContinue = useCallback(async () => {
    if (amount < 10) {
      enqueueSnackbar(`You must purchase over $10.`, { variant: 'error' });
      return;
    }
    if (!address) {
      enqueueSnackbar(`You must enter your ERC20 token address.`, { variant: 'error' });
      return;
    }
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      enqueueSnackbar(`Please enter a valid ERC20 token address.`, { variant: 'error' });
      return;
    }
    setDepositState({
      error: '',
      success: '',
      submitting: true
    });
    try {
      setCardPaymentState({
        errorMessage: '',
      });
      const { data }: { success: boolean, data: any } = await axios.post(endpoints.credits.createPaymentIntent,
        {
          "amount": amount
        }
      );

      const { success, data: paymentIntent } = data;
      console.log('success', success)
      console.log('paymentIntent', paymentIntent)
      if (success) {
        const payResult: any = await payStripeCardPayment({
          client_secret: paymentIntent.client_secret
        }, {
          name: ''
        }
        );
        try {
          if (payResult && payResult.paymentIntent && payResult.paymentIntent.status === 'succeeded') {
            await axios.post(endpoints.history.confirmPaymentIntent,
              {
                "payment_intent_id": payResult.paymentIntent.id,
                "amount": (amount / currentPrice).toFixed(1),
                "address": address
              }
            );
            enqueueSnackbar(`Your request has been successfully submitted to the administrator. Please wait for the administrator to approve it.`, { variant: 'success' });
            setIsLoading(true);
            setAmount(0);
            setAddress("");
            setDepositState({
              submitting: false,
              error: '',
              success: '',
            });
            fetchHistory();
          }
        } catch (err) {
          console.error(err)
          setDepositState({
            submitting: false,
            error: err,
            success: '',
          });
        }

      } else if (paymentIntent && paymentIntent.error) {
        setCardPaymentState({
          errorMessage: paymentIntent.error
        });
        setDepositState({
          submitting: false,
          error: paymentIntent.error,
          success: '',
        });
      } else {
        setCardPaymentState({
          errorMessage: `The server responded`
        });
        setDepositState({
          submitting: false,
          error: `The server responded`,
          success: '',
        });
      }

    } catch (e: any) {
      setDepositState({
        success: '',
        submitting: false,
        error: e?.message
      });
      setCardPaymentState({
        errorMessage: e.message
      });
    }
  }, [amount, address, enqueueSnackbar, payStripeCardPayment, currentPrice, fetchHistory]);

  const isDepositButtonDisabled = !!cardElementState.errorMessage || !!cardPaymentState.errorMessage || !cardElementState.complete || !amount;

  useEffect(() => {
    fetchHistory();
    fetchPrice();

    const intervalId = setInterval(() => {
      fetchPrice();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchHistory, fetchPrice]);

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

  return (
    <Grid xs={12} md={12}>
      <Card sx={{ marginTop: 3 }}>
        <CardHeader title="Buy CRGPT Token" />

        <Typography variant="subtitle1" gutterBottom sx={{ width: "100%", p: 3, pb: 0 }}>
          Current Price: ${currentPrice.toFixed(4)} per CRGPT
        </Typography>

        <Stack direction="column" sx={{ width: "100%", p: 3 }}>
          <TextField
            variant="outlined"
            fullWidth
            type="number"
            label="Amount(USD)"
            value={amount}
            InputLabelProps={{ shrink: true }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseFloat(event.target.value);
              if (Number.isNaN(value) || value < 0) {
                setAmount(0);
              } else {
                setAmount(value);
              }
            }}
          />
          <Typography variant="caption" sx={{ width: "100%", pt: 2 }}>
            You will receive {(amount / currentPrice).toFixed(1)} CRGPT.
          </Typography>
        </Stack>

        <Stack direction="column" sx={{ width: "100%", p: 3, pt: 0 }}>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            label="ERC20 Address"
            InputLabelProps={{ shrink: true }}
            placeholder='Please enter your erc20 address for receiving CRGPT.'
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />
        </Stack>

        <Stack direction="column" sx={{ width: "100%", p: 3, "#card-element": { width: '100%' }, ".InputElement": { color: "white" } }}>
          <CardElement
            onChange={_OnCardElementChange}
          />
          {(cardElementState.errorMessage || cardPaymentState.errorMessage) && <Label
            color="error"
            sx={{
              background: 'transparent',
              justifyContent: 'left',
              padding: 0,
              marginTop: 1
            }}
          >
            {cardElementState.errorMessage || cardPaymentState.errorMessage || <>&nbsp;</>}
          </Label>}
        </Stack>

        <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ p: 3, paddingTop: 0 }}>
          <LoadingButton
            size="medium"
            sx={{ paddingLeft: 5, paddingRight: 5 }}
            onClick={_OnContinue}
            loading={depositState.submitting}
            variant="contained"
            disabled={isDepositButtonDisabled}
          >
            Buy CRGPT
          </LoadingButton>
        </Stack>
      </Card >
      <Card sx={{ mt: 3 }}>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Table size="medium" sx={{ minWidth: 800 }}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
              order={table.order}
              orderBy={table.orderBy}
              onSort={table.onSort}
              excludeSort={['no']}
              sx={{ "th": { color: 'white !important' }, ".MuiTableCell-root.MuiTableCell-head:first-child": { textAlign: "center" } }}
            />

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
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
                    .map((row, index) => (
                      <InvoiceTableRow
                        key={index}
                        row={row}
                        index={index}
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
    </Grid>
  );
}

const AccountBuyCRGPT: any = (props: any) => (
  <Stripe>
    <UIComponents {...props} />
  </Stripe>
);

export default AccountBuyCRGPT;