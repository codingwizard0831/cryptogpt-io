'use client';


import { Box, Card } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';

import DashboardStrategyCard from '../dashboard-strategy-card';


export default function DashboardStrategyView() {
  const isShowSummary = useStrategy((state) => state.isShowSummary);
  const setIsShowSummary = useStrategy((state) => state.setIsShowSummary);
  const smUp = useResponsive("up", 'sm');

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
        pb: 2,
      }}
    >
      <Card
        sx={{
          p: 1,
          flex: 1,
          borderRadius: 1,
          boxShadow: 2,
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          overflowY: 'hidden',
          overflowX: 'auto',
        }}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => <DashboardStrategyCard key={`card-key-${index}`} sx={{
              width: '200px',
              flexGrow: 0,
              flexShrink: 0,
            }} />)
          }
        </Box>
      </Card>
    </Box>
  );
}
