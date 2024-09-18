'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from '@mui/material/Autocomplete';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';

import { IUserProfileFollower } from 'src/types/user';

// ----------------------------------------------------------------------

export default function ProfileFollowers() {
  const [followers, setFollowers] = useState<IUserProfileFollower[]>([]);
  const [followed, setFollowed] = useState<string[]>([]);
  const [searchFollowers, setSearchFollowers] = useState('');
  const [followerSearchValue, setFollowerSearchValue] = useState<IUserProfileFollower | null>(null);
  const [followerSearchInputValue, setFollowerSearchInputValue] = useState('');

  const smUp = useResponsive('up', 'sm');

  useEffect(() => {
    // Simulating API call to fetch followers
    const fetchData = async () => {
      // Replace this with actual API call
      const followersResponse = await new Promise<IUserProfileFollower[]>((resolve) =>
        setTimeout(() => resolve([
          { id: '1', name: 'John Doe', country: 'USA', avatarUrl: '/path/to/avatar1.jpg' },
          { id: '2', name: 'Jane Smith', country: 'UK', avatarUrl: '/path/to/avatar2.jpg' },
          { id: '3', name: 'Alice Johnson', country: 'Canada', avatarUrl: '/path/to/avatar3.jpg' },
          { id: '4', name: 'Bob Williams', country: 'Australia', avatarUrl: '/path/to/avatar4.jpg' },
        ]), 1000)
      );
      setFollowers(followersResponse);
      setFollowed(followersResponse.slice(2, 4).map(f => f.id));
    };

    fetchData();
  }, []);

  const handleClick = useCallback(
    (item: string) => {
      const selected = followed.includes(item)
        ? followed.filter((value) => value !== item)
        : [...followed, item];

      setFollowed(selected);
    },
    [followed]
  );

  const dataFiltered = applyFilter({
    inputData: followers,
    query: searchFollowers,
  });

  const notFound = !dataFiltered.length && !!searchFollowers;

  const handleSearchFollowers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFollowers(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: smUp ? 'center' : 'flex-start',
          justifyContent: 'space-between',
          flexDirection: smUp ? 'row' : 'column',
          gap: 1,
          mb: 5,
        }}
      >
        <Typography variant="h4">Followers</Typography>

        <Autocomplete
          id="follower-autocomplete"
          options={followers}
          value={followerSearchValue}
          onChange={(event: any, newValue: IUserProfileFollower | null) => {
            setFollowerSearchValue(newValue);
          }}
          inputValue={followerSearchInputValue}
          onInputChange={(event, newInputValue) => {
            setFollowerSearchInputValue(newInputValue);
            handleSearchFollowers({ target: { value: newInputValue } } as React.ChangeEvent<HTMLInputElement>);
          }}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => {
            const isFollowed = followed.includes(option.id);
            return (
              <Box component="li" sx={{ p: 1, cursor: 'pointer' }} {...props}>
                <Avatar alt={option.name} src={option.avatarUrl} sx={{ width: 32, height: 32, mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2">{option.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {option.country}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant={isFollowed ? 'text' : 'outlined'}
                  color={isFollowed ? 'success' : 'inherit'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(option.id);
                  }}
                >
                  {isFollowed ? 'Followed' : 'Follow'}
                </Button>
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search followers..."
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <Iconify icon="eva:search-fill" sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
                ),
              }}
            />
          )}
          sx={{
            width: '100%',
            maxWidth: '500px',
          }}
        />
      </Box>

      {notFound ? (
        <SearchNotFound query={searchFollowers} sx={{ mt: 10 }} />
      ) : (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {dataFiltered.map((follower) => (
            <FollowerItem
              key={follower.id}
              follower={follower}
              selected={followed.includes(follower.id)}
              onSelected={() => handleClick(follower.id)}
            />
          ))}
        </Box>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type FollowerItemProps = {
  follower: IUserProfileFollower;
  selected: boolean;
  onSelected: VoidFunction;
};

function FollowerItem({ follower, selected, onSelected }: FollowerItemProps) {
  const { name, country, avatarUrl } = follower;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: (theme) => theme.spacing(3, 2, 3, 3),
        backdropFilter: 'none',
      }}
    >
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48, mr: 2 }} />

      <ListItemText
        primary={name}
        secondary={
          <>
            <Iconify icon="mingcute:location-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
            {country}
          </>
        }
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          display: 'flex',
          component: 'span',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />

      <Button
        size="small"
        variant={selected ? 'text' : 'outlined'}
        color={selected ? 'success' : 'inherit'}
        startIcon={
          selected ? <Iconify width={18} icon="eva:checkmark-fill" sx={{ mr: -0.75 }} /> : null
        }
        onClick={onSelected}
        sx={{ flexShrink: 0, ml: 1.5 }}
      >
        {selected ? 'Followed' : 'Follow'}
      </Button>
    </Card>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, query }: {
  inputData: IUserProfileFollower[];
  query: string
}) {
  if (query) {
    return inputData.filter(
      (follower) => follower.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}
