'use client';

import { Box, alpha, Button, Divider, useTheme, Typography } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { fDate } from 'src/utils/format-time';

import { ScrollCustomStyle } from "src/theme/css";

import Iconify from "src/components/iconify";
import { StyledDialog } from "src/components/styled-component";
import CustomDateRangePicker, { useDateRangePicker } from 'src/components/custom-date-range-picker';

import BalanceTrasantionGrid, { TransactionType } from "./balance-transaction-grid";

export default function BalanceView() {
    const rangeCalendarPicker = useDateRangePicker(new Date(new Date().setDate(new Date().getDate() - 1)), new Date());
    const theme = useTheme();
    const bankDetailsDialog = useBoolean(true);

    return <Box sx={{
        width: 1,
        height: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        ...(ScrollCustomStyle(theme, {})),
    }}>
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Balance</Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
            }}>
                <Box sx={{
                    flex: 1,
                    padding: 3,
                    backgroundColor: `${alpha(theme.palette.primary.main, 0.1)}`,
                }}>
                    <Typography variant="subtitle1" textAlign="center" gutterBottom>CURRENT BALANCE</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'center',
                        color: 'primary.dark',
                    }}>
                        <Typography variant="h5" textAlign="center" gutterBottom sx={{ fontSize: '72px!important', mb: 0, lineHeight: '72px' }}>€0</Typography>
                        <Typography variant="subtitle1" textAlign="center" sx={{ fontSize: '32px', position: 'relative', bottom: '-2px' }}>.00</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    flex: 1,
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Typography variant="subtitle1">Currency</Typography>
                        <Typography variant="h6">Euro (EUR)</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        <Button variant='contained' color='primary' fullWidth disabled>Request payout</Button>
                        <Button variant='contained' color='primary' fullWidth onClick={bankDetailsDialog.onTrue}>Top-up balance</Button>
                    </Box>
                </Box>
            </Box>
        </Box>

        <Box sx={{

        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
            }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Transactions</Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Button variant="contained" color='primary' onClick={rangeCalendarPicker.onOpen} sx={{
                        mr: 1,
                    }}>
                        <Iconify icon="uil:calender" sx={{ mr: 1 }} />
                        <Typography variant="button"> {fDate(rangeCalendarPicker.startDate)} - {fDate(rangeCalendarPicker.endDate)} </Typography>
                    </Button>


                    <CustomDateRangePicker
                        variant="calendar"
                        open={rangeCalendarPicker.open}
                        startDate={rangeCalendarPicker.startDate}
                        endDate={rangeCalendarPicker.endDate}
                        onChangeStartDate={rangeCalendarPicker.onChangeStartDate}
                        onChangeEndDate={rangeCalendarPicker.onChangeEndDate}
                        onClose={rangeCalendarPicker.onClose}
                        error={rangeCalendarPicker.error}
                    />


                    <Button variant="contained" color='primary' sx={{
                        minWidth: '38px',
                        padding: '8px',
                    }}>
                        <Iconify icon="material-symbols:download" />
                    </Button>
                </Box>
            </Box>

            <BalanceTrasantionGrid data={TRANSACTION_DATA} />
        </Box>

        <StyledDialog open={bankDetailsDialog.value} onClose={bankDetailsDialog.onFalse}>
            <Box sx={{
                p: 3,
                overflowY: 'auto',
                overflowX: 'hidden',
                height: '70vh',
                ...(ScrollCustomStyle(theme, {})),
            }}>
                <Typography variant="h5" mb={2}>Top-ip instructions</Typography>
                <Typography variant="body1" mb={2}>To top up your Duffel Balance, send us a bank transfer using the details below. In order for the transfer to be processed, the reference must match exactly the payment reference shown below.</Typography>
                <Typography variant="h5" mb={2}>Band details</Typography>
                <Box sx={{
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    borderRadius: '4px',
                    p: 2,
                    mb: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: 2,
                    }}>
                        <Typography variant="body1">Baneficiary</Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Typography variant="body1" sx={{ mr: 2 }}>Duffel Technology Limited</Typography>
                            <Iconify icon="ph:copy-fill" />
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: 2,
                    }}>
                        <Typography variant="body1">Sort code</Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Typography variant="body1" sx={{ mr: 2 }}>18-50-09</Typography>
                            <Iconify icon="ph:copy-fill" />
                        </Box>
                    </Box>
                    <Divider />

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: 2,
                    }}>
                        <Typography variant="body1">Account number</Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Typography variant="body1" sx={{ mr: 2 }}>14703154</Typography>
                            <Iconify icon="ph:copy-fill" />
                        </Box>
                    </Box>
                    <Divider />

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: 2,
                    }}>
                        <Typography variant="body1">Bank Address</Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Typography variant="body1" sx={{ mr: 2, maxWidth: '320px' }}>Citibank N.A. London
                                Canada Sq Service Ctr
                                Citigroup Ctr 25 Canada Sq
                                London E14 5LB
                                United Kingdom</Typography>
                            <Iconify icon="ph:copy-fill" />
                        </Box>
                    </Box>
                    <Divider />

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: 2,
                    }}>
                        <Typography variant="body1">IBAN</Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Typography variant="body1" sx={{ mr: 2 }}>GB07CITI18500814703154</Typography>
                            <Iconify icon="ph:copy-fill" />
                        </Box>
                    </Box>
                    <Divider />

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: 2,
                    }}>
                        <Typography variant="body1">BIC / SWIFT</Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Typography variant="body1" sx={{ mr: 2 }}>CITIGB2LXXX</Typography>
                            <Iconify icon="ph:copy-fill" />
                        </Box>
                    </Box>
                </Box>

                <Typography variant="h5" mb={2}>Band details</Typography>
                <Box sx={{
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    borderRadius: '4px',
                    p: 2,
                    position: 'relative',
                    mb: 2,
                }}>
                    <Typography sx={{}}>E83FPOVQ8S</Typography>
                    <Iconify icon="ph:copy-fill" sx={{
                        position: 'absolute',
                        right: '16px',
                        top: '16px',
                    }} />
                </Box>
                <Typography variant="body1" mb={2}>Once you have sent your bank transfer, please send us an email at accountsreceivable@duffel.com to let us know. This will help us to process your payment as quickly as possible.</Typography>
                <Button variant='contained' fullWidth onClick={bankDetailsDialog.onFalse}>Dismiss</Button>
            </Box>
        </StyledDialog>
    </Box>
}


const TRANSACTION_DATA: TransactionType[] = [{
    type: 'Solar',
    id: 'ord_0000Aga8D0m9HgCRjc4B60',
    date: '27 MAR 2024',
    balance: '$100.00',
    invoiceNo: '1234',
    description: 'The solar chat feature is activated',
    source: '',
    status: 'Hold',
}, {
    type: 'Travel',
    id: 'ord_0000Aga8D0m9HgCRjc4B60',
    date: '27 MAR 2024',
    balance: '$100.00',
    invoiceNo: '1234',
    description: 'You booked a flight to Paris',
    source: 'Duffel Airways',
    status: 'Sell',
}, {
    type: 'Chat',
    id: 'ord_0000Aga8D0m9HgCRjc4B60',
    date: '27 MAR 2024',
    balance: '$100.00',
    invoiceNo: '1234',
    description: 'You booked a flight to Paris',
    source: '',
    status: 'Success',
}];