import { useCallback } from 'react';

import { Box, Button, Divider, Tooltip, TextField, IconButton, Typography, InputAdornment } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

export default function GroupOrderCreateStepInvite() {
    const downMd = useResponsive('down', 'md');
    const { enqueueSnackbar } = useSnackbar();
    const { copy } = useCopyToClipboard();

    const onCopy = useCallback(
        (text: string) => {
            if (text) {
                enqueueSnackbar('Copied!');
                copy(text);
            }
        },
        [copy, enqueueSnackbar]
    );

    return <Box sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexDirection: downMd ? 'column' : 'row',
        gap: 6,
    }}>
        <Box sx={{
            width: '100%',
            order: downMd ? 2 : 1,
        }}>
            <Typography variant="h3" sx={{ mb: 4 }}>Invite to order together?</Typography>
            <Typography variant="body2" sx={{ mb: 4 }}>Share the link with your guests. When everyone has added their choices, confirm the order and a courier will deliver it your way!</Typography>

            <TextField
                fullWidth
                value="https://wolt.com/en/invite/123456"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title="Copy">
                                <IconButton onClick={() => onCopy('https://wolt.com/en/invite/123456')}>
                                    <Iconify icon="eva:copy-fill" width={24} />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    mb: 4,
                }}
            />

            <Button variant="contained" fullWidth color="primary" size="large" sx={{ mb: 6 }}>OK</Button>
            <Typography variant="h6" sx={{ mb: 2 }}>Suggested people to invite</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ fontWeight: 300, mb: 6 }}>Your guests will show up here</Typography>
        </Box>
        <Box sx={{
            width: '100%',
            order: downMd ? 1 : 2,
        }}>
            <Image src="/assets/images/deliver/1.avif" sx={{
                width: 1,
            }} />
        </Box>
    </Box>
}