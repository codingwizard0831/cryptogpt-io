
import { Box, Stack, Button, BoxProps, Typography } from '@mui/material';

interface SubaccountDetailProps extends BoxProps {

}

export default function SubaccountDetail1({
    sx,
    ...other
}: SubaccountDetailProps) {
    return <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
        ...sx,
    }} {...other}>
        <Stack direction='column' spacing={0.5} sx={{ width: '100%' }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>Configuration</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                <Typography variant='body2' sx={{ flex: 1 }}>API KEY:</Typography>
                <Typography variant='body2'>**********</Typography>
                <Button color="primary" variant="soft" size="small">Edit</Button>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
                <Typography variant='body2' sx={{ flex: 1 }}>SECRET KEY:</Typography>
                <Typography variant='body2'>**********</Typography>
                <Button color="primary" variant="soft" size="small">Edit</Button>
            </Stack>
        </Stack>

        <Stack direction='column' sx={{ width: '100%' }} spacing={0.5}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>History</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{}}>
                <Typography variant='body2'>12-12-12: </Typography>
                <Typography variant='body2' color="success">Login successfully</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{}}>
                <Typography variant='body2'>12-12-12: </Typography>
                <Typography variant='body2' color="success">Login successfully</Typography>
            </Stack>
        </Stack>
    </Box>
}