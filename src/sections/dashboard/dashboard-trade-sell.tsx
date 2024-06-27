import { Box, Stack, Button, InputLabel, Typography, FormControl, OutlinedInput, InputAdornment } from '@mui/material';

export default function DashboardTradeSell() {
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        justifyContent: 'flex-end',
    }}>
        <Stack direction="row" spacing={1}>
            <Typography sx={{
                color: 'text.secondary',
                fontSize: '14px',
            }}>Avbl</Typography>
            <Typography sx={{
                fontSize: '14px',
                ml: 1,
            }}>BTC</Typography>
        </Stack>
        <FormControl sx={{ width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="buy-price">Price</InputLabel>
            <OutlinedInput
                id="buy-price"
                type='text'
                endAdornment={
                    <InputAdornment position="end">
                        <Typography>USDT</Typography>
                    </InputAdornment>
                }
                label="Price"
            />
        </FormControl>
        <FormControl sx={{ width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="buy-amount">Amount</InputLabel>
            <OutlinedInput
                id="buy-amount"
                type='text'
                endAdornment={
                    <InputAdornment position="end">
                        <Typography>BTC</Typography>
                    </InputAdornment>
                }
                label="Price"
            />
        </FormControl>
        <Button variant='contained' color="error" fullWidth>SELL</Button>
    </Box>;
}