import Grid from '@mui/material/Unstable_Grid2';

import AccountCreditAmount from './account-credit-amount';
import AccountCreditDeposit from './account-credit-deposit';

// ----------------------------------------------------------------------

export default function AccountCredit() {
  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={12}>
        <AccountCreditAmount />
      </Grid>
      <Grid xs={12} md={12}>
        <AccountCreditDeposit />
      </Grid>
    </Grid>
  );
}
