import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { alpha, Box, CardProps, Card, Rating, Typography, useTheme, Button, TextField } from '@mui/material';
import { Pie, Line, Area, Cell, XAxis, YAxis, Tooltip, PieChart, LineChart, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';
import Image from 'src/components/image/image';

import Iconify from 'src/components/iconify';
import StrategyListCard from 'src/sections/strategy/dashboard-strategy-list-card';
import { useState, useEffect } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';

interface DataPoint {
  date: string;
  price: number;
  change: number;
  action?: 'Buy' | 'Sell';
}

interface Strategy {
  value: string;
  logo: string;
  name: string;
  description: string;
}

const filter = createFilterOptions<Strategy>();

interface ProfileStrategiesProps extends CardProps { }

export default function ProfileStrategies({ sx, ...other }: ProfileStrategiesProps) {
  const smUp = useResponsive('up', 'sm');
  const theme = useTheme();
  const [strategySearchValue, setStrategySearchValue] = useState<Strategy | null>(null);
  const [strategySearchInputValue, setStrategySearchInputValue] = useState('');
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [filteredStrategies, setFilteredStrategies] = useState<Strategy[]>([]);

  useEffect(() => {
    // Simulating API call to fetch strategies
    const fetchStrategies = async () => {
      // Replace this with actual API call
      const response = await new Promise<Strategy[]>((resolve) =>
        setTimeout(() => resolve(strategyDummyData), 1000)
      );
      setStrategies(response);
      setFilteredStrategies(response);
    };

    fetchStrategies();
  }, []);

  const handleSearch = (searchValue: string) => {
    const filtered = strategies.filter(
      (strategy) =>
        strategy.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        strategy.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredStrategies(filtered);
  };

  return (
    <Box
      sx={{
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: smUp ? 'center' : 'flex-start',
          justifyContent: 'space-between',
          flexDirection: smUp ? 'row' : 'column',
          gap: 1,
          mb: 2,
        }}
      >
        <Typography variant="h4">
          Strategies
        </Typography>

        <Autocomplete
          id="strategy-autocomplete"
          options={filteredStrategies}
          value={strategySearchValue}
          onChange={(event: any, newValue: Strategy | null) => {
            setStrategySearchValue(newValue);
          }}
          inputValue={strategySearchInputValue}
          onInputChange={(event, newInputValue) => {
            setStrategySearchInputValue(newInputValue);
            handleSearch(newInputValue);
          }}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{
                  p: 1,
                  cursor: 'pointer',
                }}
                {...optionProps}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                  }}
                >
                  <Image
                    src={option.logo}
                    sx={{
                      width: '32px',
                      height: '32px',
                    }}
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <Typography variant="subtitle2">{option.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {option.description}
                    </Typography>
                  </Box>

                  <Typography sx={{ color: 'success.main', textAlign: 'right' }}>+7%</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '120px',
                      gap: 1,
                    }}
                  >
                    <Iconify
                      icon="mingcute:time-line"
                      sx={{
                        color: 'success.main',
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.primary',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Active: 29.1h
                    </Typography>
                  </Box>
                  <Rating name="half-rating" size="small" defaultValue={2.5} precision={0.5} />
                </Box>
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search the strategy"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
          sx={{
            width: '100%',
            maxWidth: '500px',
          }}
        />
      </Box>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
        }}
      >
        {filteredStrategies.map((strategy, index) => (
          <Card
            key={strategy.value}
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

const data: DataPoint[] = [
  { date: '2023-01', price: 16500, change: 0 },
  { date: '2023-02', price: 21000, change: 0 },
  { date: '2023-03', price: 18500, change: -0.1, action: 'Sell' },
  { date: '2023-04', price: 15500, change: 0.1, action: 'Buy' },
  { date: '2023-05', price: 17500, change: 0.1 },
  { date: '2023-06', price: 11000, change: -0.1, action: 'Sell' },
  { date: '2023-07', price: 19500, change: 0.0 },
  { date: '2023-08', price: 16500, change: -0.1, action: 'Sell' },
];

const strategyDummyData: Strategy[] = [
  {
    value: '1',
    logo: '/images/Goldie.png',
    name: 'Strate 1',
    description: 'Moving Average',
  },
  {
    value: '2',
    logo: '/images/Goldie.png',
    name: 'Strate 2',
    description: 'Moving Average',
  },
  {
    value: '3',
    logo: '/images/Goldie.png',
    name: 'Strate 3',
    description: 'Moving Average',
  },
];