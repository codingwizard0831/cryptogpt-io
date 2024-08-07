import Grid from '@mui/material/Unstable_Grid2';

import AccountMembershipPlan from './account-membership-plan';

// ----------------------------------------------------------------------

export default function AccountMembership() {
  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={12}>
        <AccountMembershipPlan />
      </Grid>
    </Grid>
  );
}
