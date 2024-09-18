import { useState, useEffect } from 'react';

import { Box, alpha, Stack, Button, TextField, Typography, ButtonBase } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { StyledDialog } from 'src/components/styled-component';
import { LoadingCubeScreen } from 'src/components/loading-screen';

import SubaccountDetail from './subaccount/subaccount-detail';
import SubaccountCardItem from './subaccount/subaccount-card-item';

// ----------------------------------------------------------------------

export default function AccountSubaccounts() {
    const { enqueueSnackbar } = useSnackbar();
    const [currentAccount, setCurrentAccount] = useState('1');
    const exchangeAddDialogVisible = useBoolean(false);
    const [accountTypeTab, setAccountTypeTab] = useState('exchange');
    const [allServiceAccounts, setAllServiceAccounts] = useState<any[]>([]);
    const [apiKeysData, setApiKeysData] = useState<any[]>([]);
    const [exchangeSelectedAccount, setExchangeSelectedAccount] = useState('');
    const [serviceLoading, setServiceLoading] = useState(true);
    const [apiKeysLoading, setApiKeysLoading] = useState(true);
    const [newName, setNewName] = useState<string>('');
    const [newApikey, setNewApikey] = useState<string>('');
    const [newSecretkey, setNewSecretkey] = useState<string>('');
    const addKeysDialogVisible = useBoolean();

    useEffect(() => {
        // axios.get("https://api.binance.com/api/v3/uiKlines?symbol=BNBUSDT&interval=3m", {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // }).then((response) => {
        //     console.log(response.data);
        // }).catch((error) => {
        //     console.log(error);
        // });

        // const timestamp = Date.now();
        // const signature = BINANCE_API.secretKey;
        // console.log("apiKey", BINANCE_API.apiKey);
        // console.log("signature", signature);
        // axios.get(endpoints.binance, {
        //     url: `https://api.binance.com/api/v3/allOrders?symbol=BNBUSDT&timestamp=${timestamp}&signature=${signature}`,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-MBX-APIKEY': BINANCE_API.apiKey,
        //     }
        // }).then((response) => {
        //     console.log(response.data);
        // }).catch((error) => {
        //     console.log(error);
        // });

        // const timestamp = Date.now();
        // const queryString = `symbol=BNBUSDT&timestamp=${timestamp}`;
        // const signature = crypto
        //     .createHmac('sha256', BINANCE_API.secretKey as string)
        //     .update(queryString)
        //     .digest('hex');

        // console.log("signature", signature);

        // const url = `https://testnet.binance.vision/api/v3/allOrders?${queryString}&signature=${signature}`;

        // axios.get('/api/binance', {
        //     params: {
        //         url,
        //         apiKey: BINANCE_API.apiKey
        //     }
        // }).then((response) => {
        //     console.log(response.data);
        // }).catch((error) => {
        //     console.log(error);
        // });
        console.log("SubAccounts");
        axios.get(endpoints.exchange.index, {
        }).then((response) => {
            console.log(response.data);
            setAllServiceAccounts(response.data);
            setServiceLoading(false);
        }).catch((error) => {
            console.log(error);
            setServiceLoading(false);
        });
        axios.get(endpoints.exchange.key, {
        }).then((response) => {
            console.log(response.data);
            setApiKeysData(response.data);
            setApiKeysLoading(false);
        }).catch((error) => {
            console.log(error);
            setApiKeysLoading(false);
        });
    }, [])

    const handleAddSubAccount = () => {
        console.log("Add SubAccount");
        if (!exchangeSelectedAccount) {
            enqueueSnackbar("Please select the new exchange", { variant: 'error' });
            return;
        }
        if (!apiKeysData.find((_key) => _key.exchange_id === exchangeSelectedAccount)) {
            enqueueSnackbar("Please add the first keys", { variant: 'success' });
            addKeysDialogVisible.onTrue();
        }
        exchangeAddDialogVisible.onFalse();
    }

    const handleAdd = () => {
        axios.post(endpoints.exchange.key, {
            exchange_id: exchangeSelectedAccount,
            api_key: newApikey,
            secret_key: newSecretkey,
            name: newName,
        }).then((response) => {
            setApiKeysData([...apiKeysData, {
                id: response.data.id,
                exchange_id: exchangeSelectedAccount,
                api_key: newApikey,
                secret_key: newSecretkey,
                name: newName,
            }]);
            enqueueSnackbar('Added successfully', { variant: 'success' });
            addKeysDialogVisible.onFalse();
        }).catch((error) => {
            console.error(error);
            enqueueSnackbar('Failed to add', { variant: 'error' });
        });
    }

    return (
        <>
            {(serviceLoading || apiKeysLoading) && <LoadingCubeScreen />}

            <Box sx={{
                display: (serviceLoading || apiKeysLoading) ? 'none' : 'block',
            }}>
                <Typography variant='h6' sx={{ mb: 2 }}>CRYPTO GPT OFFICIAL PARTNERS</Typography>

                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    overflowY: 'hidden',
                    overflowX: 'auto',
                    height: '130px',
                    mb: 2,
                }}>
                    <Box sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                    }}>
                        {
                            allServiceAccounts.map((_subaccount) => {
                                if (!apiKeysData.find((_key) => _key.exchange_id === _subaccount.id)) return null;
                                return <SubaccountCardItem
                                    key={`allServiceAccounts-${_subaccount.id}`}
                                    data={_subaccount}
                                    isActive={_subaccount.id === currentAccount}
                                    handleSelect={(key) => setCurrentAccount(key)}
                                    handleRemove={() => console.log("Remove")}
                                />
                            })
                        }
                        <Box sx={{
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            gap: 1,
                            backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.08),
                            border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                            color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.8)}`,
                            width: '164px',
                            p: 1.5,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            position: 'relative',
                        }} onClick={() => exchangeAddDialogVisible.onTrue()}>
                            <Iconify icon="carbon:add" sx={{
                                width: '36px',
                                height: '36px',
                                color: "primary.main",
                            }} />
                            <Typography variant='subtitle2' sx={{
                                transition: 'all 0.3s',
                                fontWeight: 'bold',
                                color: "primary.main",

                            }}>Add</Typography>
                            <Typography variant='body2' sx={{
                                transition: 'all 0.3s',
                                fontSize: '12px',
                                color: "primary.main",
                            }}>New Subaccount</Typography>
                        </Box>
                    </Box>
                </Box>

                {
                    allServiceAccounts.map((_subaccount) => <SubaccountDetail
                        key={`SubaccountDetail-${_subaccount.id}`}
                        accountInfo={_subaccount}
                        apiKeys={apiKeysData.filter((_key) => _key.exchange_id === _subaccount.id)}
                        allApiKeys={apiKeysData}
                        handleSetAllApiKeys={setApiKeysData}
                        sx={{
                            display: _subaccount.id === currentAccount ? 'flex' : 'none',
                        }}
                    />
                    )
                }

                <StyledDialog
                    open={exchangeAddDialogVisible.value}
                    onClose={() => exchangeAddDialogVisible.onFalse()}
                    fullWidth
                    maxWidth="xs"
                    PaperProps={{
                        sx: {
                            mt: 15,
                            overflow: 'unset',
                        },
                    }}
                >
                    <Box sx={{
                        p: 2,
                    }}>
                        <Typography variant='h6'>Tell us more about you</Typography>
                        <Typography variant='body2' sx={{ color: 'text.secondary' }}>What tools do you currently use in your design business?</Typography>

                        <Box sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            borderBottom: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                            pl: 1,
                        }}>
                            <ButtonBase sx={{
                                px: 2,
                                py: 0.5,
                                gap: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '-1px',
                                borderRadius: '4px 4px 0px 0px',
                                borderStyle: 'solid',
                                borderWidth: '1px 1px 0px 1px',
                                borderColor: 'transparent',
                                transition: 'all 0.3s',

                                ...accountTypeTab === 'exchange' && {
                                    backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.2),
                                    color: 'text.primary',
                                    borderColor: (theme: any) => alpha(theme.palette.primary.main, 0.2),
                                },
                            }} onClick={() => setAccountTypeTab('exchange')}>
                                <Iconify icon="ri:exchange-line" />
                                <Typography variant='subtitle2'>Exchange</Typography>
                            </ButtonBase>
                            <ButtonBase sx={{
                                px: 2,
                                py: 0.5,
                                gap: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '-1px',
                                borderRadius: '4px 4px 0px 0px',
                                borderStyle: 'solid',
                                borderWidth: '1px 1px 0px 1px',
                                borderColor: 'transparent',
                                transition: 'all 0.3s',

                                ...accountTypeTab === 'platform' && {
                                    backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.2),
                                    color: 'text.primary',
                                    borderColor: (theme: any) => alpha(theme.palette.primary.main, 0.2),
                                },
                            }} onClick={() => setAccountTypeTab('platform')}>
                                <Iconify icon="carbon:platforms" />
                                <Typography variant='subtitle2'>Platform</Typography>
                            </ButtonBase>
                        </Box>

                        {
                            accountTypeTab === 'exchange' ?
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    mt: 2,
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    maxHeight: '300px',
                                }}>
                                    {
                                        allServiceAccounts.filter((_service) => _service.is_exchange === true).map((_subaccount) => <SubaccountCardItem
                                            key={`exchange-${_subaccount.id}`}
                                            data={_subaccount}
                                            isSelected={_subaccount.id === exchangeSelectedAccount}
                                            isActive={apiKeysData.find((_key) => _key.exchange_id === _subaccount.id)}
                                            handleSelect={(key) => {
                                                if (apiKeysData.find((_key) => _key.exchange_id === _subaccount.id))
                                                    setExchangeSelectedAccount('');
                                                else
                                                    setExchangeSelectedAccount(key);
                                            }}
                                            handleRemove={() => console.log("Remove")}
                                        />
                                        )
                                    }
                                </Box>
                                :
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    mt: 2,
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    maxHeight: '300px',
                                }}>
                                    {
                                        allServiceAccounts.filter((_service) => _service.is_exchange === false).map((_subaccount) => <SubaccountCardItem
                                            key={`platform-${_subaccount.id}`}
                                            data={_subaccount}
                                            isSelected={_subaccount.id === exchangeSelectedAccount}
                                            isActive={apiKeysData.find((_key) => _key.exchange_id === _subaccount.id)}
                                            handleSelect={(key) => {
                                                if (apiKeysData.find((_key) => _key.exchange_id === _subaccount.id))
                                                    setExchangeSelectedAccount('');
                                                else
                                                    setExchangeSelectedAccount(key);
                                            }}
                                            handleRemove={() => console.log("Remove")}
                                        />
                                        )
                                    }
                                </Box>
                        }

                        <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={() => handleAddSubAccount()}>Add</Button>
                            <Button variant="outlined" color="primary" onClick={() => exchangeAddDialogVisible.onFalse()}>Cancel</Button>
                        </Stack>
                    </Box>
                </StyledDialog>

                <StyledDialog open={addKeysDialogVisible.value} onClose={() => addKeysDialogVisible.onFalse()}>
                    <Box sx={{
                        width: '400px',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}>
                        <Typography variant="h6" sx={{
                            textAlign: 'center',
                            mb: 1,
                        }}>Add API Key for {exchangeSelectedAccount && allServiceAccounts.find((_) => _.id === exchangeSelectedAccount)?.name}</Typography>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <TextField
                            label="API Key"
                            variant="outlined"
                            value={newApikey}
                            onChange={(e) => setNewApikey(e.target.value)}
                        />
                        <TextField
                            label="Secret Key"
                            variant="outlined"
                            value={newSecretkey}
                            onChange={(e) => setNewSecretkey(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={() => handleAdd()}>Add</Button>
                    </Box>
                </StyledDialog>
            </Box>
        </>
    );
}
