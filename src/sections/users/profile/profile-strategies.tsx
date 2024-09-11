import { alpha, Box, CardProps, Card, Rating, Typography, useTheme } from '@mui/material';
import Image from 'src/components/image/image';

import Iconify from 'src/components/iconify';
import StrategyListCard from 'src/sections/strategy/dashboard-strategy-list-card';

interface DataPoint {
  date: string;
  price: number;
  change: number;
  action?: 'Buy' | 'Sell';
}

interface ProfileStrategiesProps extends CardProps {}

export default function ProfileStrategies({ sx, ...other }: ProfileStrategiesProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h4" sx={{ my: 5 }}>
        Strategies
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          // md: 'repeat(3, 1fr)',
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 1,
              backdropFilter: 'none',
              p: 1,
            }}
          >
            <StrategyListCard />
          </Card>
        ))}
      </Box>
    </Box>
  );
}
