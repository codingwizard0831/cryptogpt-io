import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { useResponsive } from 'src/hooks/use-responsive';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { IUserProfileFriend } from 'src/types/user';

// ----------------------------------------------------------------------

export default function ProfileFriends() {
  const [friends, setFriends] = useState<IUserProfileFriend[]>([]);
  const [network, setNetwork] = useState<IUserProfileFriend[]>([]);
  const [searchFriends, setSearchFriends] = useState('');
  const [followed, setFollowed] = useState<string[]>([]);

  const smUp = useResponsive('up', 'sm');
  const [friendSearchValue, setFriendSearchValue] = useState<any>(null);
  const [friendSearchInputValue, setFriendSearchInputValue] = useState('');

  useEffect(() => {
    // Simulating API call to fetch friends and network
    const fetchData = async () => {
      // Replace this with actual API calls
      const friendsResponse = await new Promise<IUserProfileFriend[]>((resolve) =>
        setTimeout(() => resolve([
          { id: '1', name: 'John Doe', role: 'Developer', avatarUrl: '/path/to/avatar1.jpg' },
          { id: '2', name: 'Jane Smith', role: 'Designer', avatarUrl: '/path/to/avatar2.jpg' },
        ]), 1000)
      );
      const networkResponse = await new Promise<IUserProfileFriend[]>((resolve) =>
        setTimeout(() => resolve([
          { id: '3', name: 'Alice Johnson', role: 'Manager', avatarUrl: '/path/to/avatar3.jpg' },
          { id: '4', name: 'Bob Williams', role: 'Analyst', avatarUrl: '/path/to/avatar4.jpg' },
        ]), 1000)
      );
      setFriends(friendsResponse);
      setNetwork(networkResponse);
      setFollowed(friendsResponse.map(f => f.id));
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
    inputData: [...friends, ...network],
    query: searchFriends,
  });

  const notFound = !dataFiltered.length && !!searchFriends;

  const handleSearchFriends = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFriends(event.target.value);
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
          mb: 2,
        }}
      >
        <Typography variant="h4">Friends</Typography>

        <Autocomplete
          id="friend-autocomplete"
          options={[...friends, ...network]}
          groupBy={(option) => friends.includes(option) ? 'My Friends' : 'Network'}
          value={friendSearchValue}
          onChange={(event: any, newValue: any) => {
            setFriendSearchValue(newValue);
          }}
          inputValue={friendSearchInputValue}
          onInputChange={(event, newInputValue) => {
            setFriendSearchInputValue(newInputValue);
            handleSearchFriends({ target: { value: newInputValue } } as React.ChangeEvent<HTMLInputElement>);
          }}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component="li" sx={{ p: 1, cursor: 'pointer' }} {...props}>
              <Avatar alt={option.name} src={option.avatarUrl} sx={{ width: 32, height: 32, mr: 2 }} />
              <Box flexGrow={1}>
                <Typography variant="subtitle2">{option.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {option.role}
                </Typography>
              </Box>
              <Button
                size="small"
                variant={followed.includes(option.id) ? 'text' : 'outlined'}
                color={followed.includes(option.id) ? 'success' : 'inherit'}
                onClick={() => handleClick(option.id)}
                sx={{ ml: 'auto' }}
              >
                {followed.includes(option.id) ? 'Followed' : 'Follow'}
              </Button>
            </Box>
          )}
          renderGroup={(params) => (
            <li key={params.key}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 'bold', p: 1, backgroundColor: 'background.neutral' }}
              >
                {params.group}
              </Typography>
              <Divider />
              <ul>{params.children}</ul>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search friends"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
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
        <SearchNotFound query={searchFriends} sx={{ mt: 10 }} />
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
          {dataFiltered.map((friend) => (
            <FriendCard key={friend.id} friend={friend} followed={followed.includes(friend.id)} onFollow={() => handleClick(friend.id)} />
          ))}
        </Box>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type FriendCardProps = {
  friend: IUserProfileFriend;
  followed: boolean;
  onFollow: () => void;
};

function FriendCard({ friend, followed, onFollow }: FriendCardProps) {
  const { name, role, avatarUrl } = friend;

  const popover = usePopover();

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', name);
  };

  const handleEdit = () => {
    popover.onClose();
    console.info('EDIT', name);
  };

  return (
    <>
      <Card
        sx={{
          py: 5,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'column',
          backdropFilter: 'none',
        }}
      >
        <Avatar alt={name} src={avatarUrl} sx={{ width: 64, height: 64, mb: 3 }} />

        <Link variant="subtitle1" color="text.primary">
          {name}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, mt: 0.5 }}>
          {role}
        </Typography>

        <Button
          size="small"
          variant={followed ? 'text' : 'outlined'}
          color={followed ? 'success' : 'inherit'}
          onClick={onFollow}
          sx={{ mt: 1 }}
        >
          {followed ? 'Followed' : 'Follow'}
        </Button>

        <Stack alignItems="center" justifyContent="center" direction="row" sx={{ mt: 2 }}>
          {_socials.map((social) => (
            <IconButton
              key={social.name}
              sx={{
                color: social.color,
                '&:hover': {
                  bgcolor: alpha(social.color, 0.08),
                },
              }}
            >
              <Iconify icon={social.icon} />
            </IconButton>
          ))}
        </Stack>

        <IconButton
          color={popover.open ? 'inherit' : 'default'}
          onClick={popover.onOpen}
          sx={{ top: 8, right: 8, position: 'absolute' }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, query }: {
  inputData: IUserProfileFriend[];
  query: string
}) {
  if (query) {
    return inputData.filter(
      (friend) => friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}