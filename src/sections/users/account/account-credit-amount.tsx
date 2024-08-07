import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const AccountCreditAmount = ({ isLoading }: { isLoading: boolean }) => {
  const { user } = useAuthContext();
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    if (user?.id) {
      axios.post(endpoints.credits.credits, { user_id: user.id })
        .then((response: any) => {
          const { statusText, data } = response.data;
          console.log("finally", statusText, data);
          if (statusText === "OK") {
            setCurrentAmount(data[0]?.amount);
          } else {
            console.error(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching credits:", error);
        });
    }
  }, [user, isLoading]);

  return (
    <Card>
      <CardHeader title={`My Credit: ${currentAmount}`} sx={{ marginBottom: "20px" }} />
    </Card >
  )
}

export default AccountCreditAmount;