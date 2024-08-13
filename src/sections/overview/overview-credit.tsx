import React from 'react';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    alpha,
    Card
} from '@mui/material';

interface CreditGrant {
    received: string;
    state: string;
    balance: string;
    expires: string;
}

interface CreditGrantsProps {
    grants: CreditGrant[];
}

const OverviewCredit: React.FC<CreditGrantsProps> = ({ grants }) => {
    return (
        <Card sx={{
            color: 'text.primary',
            p: 2,
            borderRadius: 2,
            width: '100%'
        }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Credit Grants USD
            </Typography>

            <Table sx={{
                "& tr": {
                    px: 1,
                },
                "& td,th": {
                    py: 0.5,
                    px: 2,
                },
                "& tbody tr": {
                    py: 0.5,
                    transition: 'background-color 0.3s',
                    "&:hover": {
                        backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1)
                    },
                },
            }} aria-label="credit grants table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary' }}>Received</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>State</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>Balance/Total Balance</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>Expires</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {grants.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ color: 'text.secondary' }}>
                                There are no credit grants
                            </TableCell>
                        </TableRow>
                    ) : (
                        grants.map((grant, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ color: 'text.primary' }}>{grant.received}</TableCell>
                                <TableCell sx={{ color: 'text.primary' }}>{grant.state}</TableCell>
                                <TableCell sx={{ color: 'text.primary' }}>{grant.balance}</TableCell>
                                <TableCell sx={{ color: 'text.primary' }}>{grant.expires}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default OverviewCredit;