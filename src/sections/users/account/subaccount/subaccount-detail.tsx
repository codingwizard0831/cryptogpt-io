import { useState, useEffect } from 'react';

import { Box, alpha, Stack, Input, Button, BoxProps, TextField, Typography, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { StyledDialog } from 'src/components/styled-component';

interface SubaccountDetailProps extends BoxProps {
    accountInfo: any;
    apiKeys: any[];
    allApiKeys: any[];
    handleSetAllApiKeys: (v: any[]) => void;
}

export default function SubaccountDetail({
    accountInfo,
    apiKeys: defaultApiKeys,
    allApiKeys,
    handleSetAllApiKeys,
    sx,
    ...other
}: SubaccountDetailProps) {
    const [apiKeys, setApiKeys] = useState<any[]>([...defaultApiKeys]);
    const [editFlag, setEditFlag] = useState<boolean[]>([]);
    const [deleteFlag, setDeleteFlag] = useState<boolean[]>([]);
    const [apikeyText, setApikeyText] = useState<string[]>([]);
    const [secretkeyText, setSecretkeyText] = useState<string[]>([]);
    const [nameText, setNameText] = useState<string[]>([]);
    const [newName, setNewName] = useState<string>('');
    const [newApikey, setNewApikey] = useState<string>('');
    const [newSecretkey, setNewSecretkey] = useState<string>('');
    const addKeysDialogVisible = useBoolean();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setApiKeys([...defaultApiKeys]);
        setEditFlag(new Array(defaultApiKeys.length).fill(false));
        setDeleteFlag(new Array(defaultApiKeys.length).fill(false));
        setApikeyText(defaultApiKeys.map((item) => item.api_key));
        setSecretkeyText(defaultApiKeys.map((item) => item.secret_key));
        setNameText(defaultApiKeys.map((item) => item.name));
    }, [defaultApiKeys]);

    const handleEdit = (index: number) => {
        setEditFlag((prev) => prev.map((_, i) => i === index ? true : _));
    }

    const handleDeleteConfirm = (index: number) => {
        setDeleteFlag((prev) => prev.map((_, i) => i === index ? true : _));
    }

    const handleSave = (index: number) => {
        setEditFlag((prev) => prev.map((_, i) => i === index ? false : _));
        axios.post(endpoints.exchange.key, {
            id: apiKeys[index].id,
            exchange_id: apiKeys[index].exchange_id,
            api_key: apikeyText[index],
            secret_key: secretkeyText[index],
            name: nameText[index],
        }).then((response) => {
            const updatedApiKeys = [...apiKeys];
            updatedApiKeys[index] = {
                ...updatedApiKeys[index],
                api_key: apikeyText[index],
                secret_key: secretkeyText[index],
                name: nameText[index],
            };
            setApiKeys(updatedApiKeys);

            const updatedAllApiKeys = [...allApiKeys];
            updatedAllApiKeys[allApiKeys.findIndex((_) => _.id === apiKeys[index].id)] = {
                ...updatedAllApiKeys[allApiKeys.findIndex((_) => _.id === apiKeys[index].id)],
                api_key: apikeyText[index],
                secret_key: secretkeyText[index],
                name: nameText[index],
            };
            handleSetAllApiKeys([...updatedAllApiKeys]);
            enqueueSnackbar('Updated successfully', { variant: 'success' });
        }).catch((error) => {
            console.error(error);
            enqueueSnackbar('Failed to update', { variant: 'error' });
        });
    }

    const handleDelete = (index: number) => {
        setDeleteFlag((prev) => prev.map((_, i) => i === index ? false : _));
        axios.delete(`${endpoints.exchange.key}/?id=${apiKeys[index].id}`)
            .then((response) => {
                const updatedApiKeys = [...apiKeys];
                updatedApiKeys.splice(index, 1);
                setApiKeys(updatedApiKeys);

                const updatedAllApiKeys = [...allApiKeys];
                updatedAllApiKeys.splice(allApiKeys.findIndex((_) => _.id === apiKeys[index].id), 1);
                handleSetAllApiKeys([...updatedAllApiKeys]);
                enqueueSnackbar('Deleted successfully', { variant: 'success' });
            }).catch((error) => {
                console.error(error);
                enqueueSnackbar('Failed to delete', { variant: 'error' });
            });
    }

    const handleCancel = (index: number) => {
        setEditFlag((prev) => prev.map((_, i) => i === index ? false : _));
        setDeleteFlag((prev) => prev.map((_, i) => i === index ? false : _));
        setApikeyText(apiKeys.map((item) => item.api_key));
        setSecretkeyText(apiKeys.map((item) => item.secret_key));
        setNameText(apiKeys.map((item) => item.name));
    }

    const handleAdd = () => {
        axios.post(endpoints.exchange.key, {
            exchange_id: accountInfo.id,
            api_key: newApikey,
            secret_key: newSecretkey,
            name: newName,
        }).then((response) => {
            const updatedApiKeys = [...apiKeys];
            updatedApiKeys.push({
                id: response.data.id,
                exchange_id: 1,
                api_key: newApikey,
                secret_key: newSecretkey,
                name: newName,
            });
            setApiKeys(updatedApiKeys);
            handleSetAllApiKeys([...allApiKeys, {
                id: response.data.id,
                exchange_id: accountInfo.id,
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

    return <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        flexWrap: 'wrap',
        mb: 2,
        ...sx,
    }} {...other}>
        {
            apiKeys.map((_apiKey, index) => <Box key={`api-key-${index}`} sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                borderRadius: 1,
                border: (theme: any) => `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
                width: '100%',
                maxWidth: '320px',
                px: 2,
                py: 1,
                transition: 'border-color 0.25s',
                cursor: 'pointer',
                position: 'relative',
                "&:hover": {
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                },
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                }}>
                    {
                        editFlag[index] === false && deleteFlag[index] === false && <>
                            <IconButton className="edit" size='small' color='primary'
                                onClick={() => handleEdit(index)}
                            >
                                <Iconify icon="material-symbols:edit-outline" width={20} height={20} />
                            </IconButton>
                            <IconButton size='small' color='primary' sx={{
                            }}
                                onClick={() => handleDeleteConfirm(index)}
                            >
                                <Iconify icon="ic:baseline-delete" width={20} height={20} />
                            </IconButton>
                        </>
                    }

                    {
                        // Edit
                        editFlag[index] === true && deleteFlag[index] === false && <>
                            <IconButton className="edit" size='small' color='primary'
                                onClick={() => handleSave(index)}
                            >
                                <Iconify icon="material-symbols:check" width={20} height={20} />
                            </IconButton>
                            <IconButton size='small' color='primary' sx={{
                            }}
                                onClick={() => handleCancel(index)}
                            >
                                <Iconify icon="material-symbols:close" width={20} height={20} />
                            </IconButton>
                        </>
                    }
                    {
                        // Delete
                        editFlag[index] === false && deleteFlag[index] === true && <>
                            <IconButton className="edit" size='small' color='primary'
                                onClick={() => handleDelete(index)}
                            >
                                <Iconify icon="material-symbols:check" width={20} height={20} />
                            </IconButton>
                            <IconButton size='small' color='primary' sx={{
                            }}
                                onClick={() => handleCancel(index)}
                            >
                                <Iconify icon="material-symbols:close" width={20} height={20} />
                            </IconButton>
                        </>
                    }
                </Box>

                <Input value={nameText[index]} disableUnderline
                    readOnly={!editFlag[index]}
                    onChange={(e) => setNameText((prev) => prev.map((_, i) => i === index ? e.target.value : _))}
                    sx={{
                        width: '100%',
                        '& input': {
                            color: 'primary.main',
                        },
                    }} />

                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                    <Typography variant='body2' sx={{
                        whiteSpace: 'nowrap',
                    }}>API KEY:</Typography>

                    {
                        editFlag[index] ?
                            <Input type="text" value={apikeyText[index]}
                                onChange={(e) => setApikeyText((prev) => prev.map((_, i) => i === index ? e.target.value : _))}
                                disableUnderline
                                sx={{
                                    width: '180px',
                                    "& input": {
                                        textAlign: 'right'
                                    },
                                }} />
                            :
                            <Typography variant='body2'>**********</Typography>
                    }
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                    <Typography variant='body2' sx={{
                        whiteSpace: 'nowrap',
                    }}>SECRET KEY:</Typography>

                    {
                        editFlag[index] ?
                            <Input type="text"
                                value={secretkeyText[index]}
                                onChange={(e) => setSecretkeyText((prev) => prev.map((_, i) => i === index ? e.target.value : _))}
                                disableUnderline
                                sx={{
                                    width: '180px',
                                    "& input": {
                                        textAlign: 'right'
                                    },
                                }} />
                            :
                            <Typography variant='body2'>**********</Typography>
                    }
                </Stack>
            </Box>
            )
        }
        <Button variant="soft" color="primary" startIcon={<Iconify icon="material-symbols:add" />} onClick={() => addKeysDialogVisible.onTrue()}>
            Add
        </Button>

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
                }}>Add API Key</Typography>
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
}