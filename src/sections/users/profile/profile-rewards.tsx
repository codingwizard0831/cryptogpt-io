import { Box, Card, Table, BoxProps, TableRow, TableHead, TableBody, TableCell, Typography } from '@mui/material';

interface ProfileRewardsProps extends BoxProps { }


interface RewardType {
    name: string;
    amount: number;
}

export default function ProfileRewards({ sx, ...other }: ProfileRewardsProps) {

    const rewards: RewardType[] = [
        { name: 'Strategy Perfomance', amount: 1000 },
        { name: 'Monthly Diamond Holder', amount: 1000 },
        { name: 'Referrals/Affiliates', amount: 1000 },
        { name: 'Trading 1,000+', amount: 1000 },
        { name: '+5 Trading Strategy Owner', amount: 800 },
        { name: 'Daily Active User', amount: 600 },
        { name: 'Continue Trading User', amount: 600 },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mb: 2,
                ...sx,
            }}
            {...other}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>Rewards</Typography>

            <Card sx={{
                backdropFilter: 'none',
            }}>
                <Typography variant="h6" sx={{ m: 2, color: 'text.primary' }}>
                    Total: 1,000,000 tokens
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'text.primary' }}>Reward</TableCell>
                            <TableCell sx={{ color: 'text.primary' }} align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rewards.map((reward, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                        {reward.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                                        {reward.amount} tokens
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </Box>
    );
}