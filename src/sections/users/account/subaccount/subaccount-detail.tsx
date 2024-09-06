import { useState, useEffect } from 'react';

import { Box, alpha, Stack, Input, Button, BoxProps, Typography, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

interface SubaccountDetailProps extends BoxProps {
    apiKeys: any[];
}

export default function SubaccountDetail({
    sx,
    apiKeys: defaultApiKeys,
    ...other
}: SubaccountDetailProps) {
    const [apiKeys, setApiKeys] = useState<any[]>([...defaultApiKeys]);
    const [editFlag, setEditFlag] = useState<boolean[]>([]);

    useEffect(() => {
        setApiKeys([...defaultApiKeys]);
        setEditFlag(new Array(defaultApiKeys.length).fill(false));
    }, [defaultApiKeys]);

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
                "&:hover": {
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                },
            }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>{_apiKey.name}</Typography>

                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                    <Typography variant='body2' sx={{
                        whiteSpace: 'nowrap',
                    }}>API KEY:</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 0.5,
                    }}>
                        {
                            editFlag[index] ? <>
                                <Input type="text" value={_apiKey.api_key} sx={{
                                    "& input": {
                                        textAlign: 'right'
                                    },
                                }} />
                                <IconButton size='small' color='primary'
                                    onClick={() => setEditFlag((prev) => prev.map((_, i) => i !== index))}
                                >
                                    <Iconify icon="material-symbols:save-outline" width={20} height={20} />
                                </IconButton>
                                <IconButton size='small' color='primary'
                                    onClick={() => setEditFlag((prev) => prev.map((_, i) => i !== index))}
                                >
                                    <Iconify icon="material-symbols:close" width={20} height={20} />
                                </IconButton>
                            </>
                                : <>
                                    <Typography variant='body2'>**********</Typography>
                                    <Button color="primary" variant="soft" size="small"
                                        onClick={() => setEditFlag((prev) => prev.map((_, i) => i === index))}
                                    >Edit</Button>
                                </>
                        }
                    </Box>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                    <Typography variant='body2' sx={{ flex: 1 }}>SECRET KEY:</Typography>
                    <Typography variant='body2'>**********</Typography>
                    <Button color="primary" variant="soft" size="small">Edit</Button>
                </Stack>
            </Box>
            )
        }
    </Box>
}