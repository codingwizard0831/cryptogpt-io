import { useState } from 'react';

import { Box, alpha, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function DeliverRestaurantsTipCourier() {
    const [tipType, setTipType] = useState<'tip0' | 'tip1' | 'tip1.5' | 'tip2.5' | 'tipother'>('tip0');
    const [tip, setTip] = useState(1.00);

    return <Box>

        <Typography variant="h4" sx={{
            mb: 2,
        }}>Tip the courier</Typography>
        <Box sx={{
            p: 2,
            borderRadius: 1,
            border: theme => `1px solid ${theme.palette.divider}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
            }}>
                <Typography variant="body2" sx={{
                }}>They&apos;ll get 100% of your tip after the delivery.</Typography>
                <Typography variant="body2" sx={{
                }}>€{tip.toFixed(2)}</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
            }}>
                <Button fullWidth variant="outlined" color={tipType === 'tip0' ? 'primary' : undefined} size="small" sx={{
                    borderRadius: '30px',
                }} onClick={() => {
                    setTipType('tip0');
                    setTip(0);
                }}>€0</Button>
                <Button fullWidth variant="outlined" color={tipType === 'tip1' ? 'primary' : undefined} size="small" sx={{
                    borderRadius: '30px',
                }} onClick={() => {
                    setTipType('tip1');
                    setTip(1);
                }}>€1</Button>
                <Button fullWidth variant="outlined" color={tipType === 'tip1.5' ? 'primary' : undefined} size="small" sx={{
                    borderRadius: '30px',
                }} onClick={() => {
                    setTipType('tip1.5');
                    setTip(1.5);
                }}>€1.5</Button>
                <Button fullWidth variant="outlined" color={tipType === 'tip2.5' ? 'primary' : undefined} size="small" sx={{
                    borderRadius: '30px',
                }} onClick={() => {
                    setTipType('tip2.5');
                    setTip(2.5);
                }}>€2.5</Button>
                <Button fullWidth variant="outlined" color={tipType === 'tipother' ? 'primary' : undefined} size="small" sx={{
                    borderRadius: '30px',
                }} onClick={() => {
                    setTipType('tipother');
                }}>Other</Button>
            </Box>
            {
                tipType === 'tipother' &&
                <TextField placeholder="5.00" fullWidth
                    value={tip}
                    onChange={(e) => {
                        setTip(parseFloat(e.target.value));
                    }}
                    sx={{
                        textAlign: 'center',
                        '& input': {
                            textAlign: 'center',
                        },
                    }} InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <IconButton color='primary' size="small" sx={{
                                backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                            }}>
                                <Iconify icon="ion:remove-outline" />
                            </IconButton>
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton color='primary' size="small" sx={{
                                backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                            }}>
                                <Iconify icon="ion:add-outline" />
                            </IconButton>
                        </InputAdornment>,
                    }} />
            }
        </Box>
    </Box>
}