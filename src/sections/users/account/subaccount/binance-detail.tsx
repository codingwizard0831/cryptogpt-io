
import { Box, alpha, Stack, Button, BoxProps, Typography } from '@mui/material';




interface BinanceDetailProps extends BoxProps {
}

export default function BinanceDetail({
    sx,
    ...other
}: BinanceDetailProps) {
    return <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        flexWrap: 'wrap',
        mb: 2,
        ...sx,
    }} {...other}>
        {
            Array.from({ length: 5 }).map((_, index) => <Box key={`binance-key-${index}`} sx={{
                display: 'flex',
                flexDirection: 'column',
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
                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>Binance BTC 1</Typography>

                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                    <Typography variant='body2' sx={{ flex: 1 }}>API KEY:</Typography>
                    <Typography variant='body2'>**********</Typography>
                    <Button color="primary" size="small">Edit</Button>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                    <Typography variant='body2' sx={{ flex: 1 }}>SECRET KEY:</Typography>
                    <Typography variant='body2'>**********</Typography>
                    <Button color="primary" size="small">Edit</Button>
                </Stack>
            </Box>
            )
        }
    </Box>
}