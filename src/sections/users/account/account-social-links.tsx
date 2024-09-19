
import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Select, MenuItem, TextField, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';


// ----------------------------------------------------------------------

const SOCIAL_LINKS = [
  {
    name: 'facebook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
  },
  {
    name: 'instagram',
    icon: 'ant-design:instagram-filled',
    color: '#DF3E30',
  },
  {
    name: 'linkedin',
    icon: 'eva:linkedin-fill',
    color: '#006097',
  },
  {
    name: 'twitter',
    icon: 'eva:twitter-fill',
    color: '#1C9CEA',
  }
]

export default function AccountSocialLinks() {
  const { enqueueSnackbar } = useSnackbar();
  const [socialLinks, setSocialLinks] = useState<{
    [key: string]: string;
  }[]>([
    {
      name: 'facebook',
      value: "socialLinks.facebook",
    },
    {
      name: 'instagram',
      value: 'socialLinks.instagram',
    },
  ]);
  const [newSocialSite, setNewSocialSite] = useState<string>('');
  const [newSocialLink, setNewSocialLink] = useState<string>('');
  const restSocialLinks = useMemo(() => {
    const updatedRestSocialLinks = SOCIAL_LINKS.filter((social) => !socialLinks.find((_link) => _link.name === social.name));
    setNewSocialSite(updatedRestSocialLinks[0]?.name || '');
    return updatedRestSocialLinks;
  }, [socialLinks]);
  const isAddingPartVisible = useBoolean();

  const handleSaveNewSocialLink = () => {
    setSocialLinks([...socialLinks, {
      name: newSocialSite,
      value: newSocialLink,
    }]);
    setNewSocialSite('');
    setNewSocialLink('');
    isAddingPartVisible.onFalse();
  }

  const handleDeleteSocialLink = (name: string) => {
    setSocialLinks(socialLinks.filter((link) => link.name !== name));
  }

  const handleChangeSocialLink = (name: string, value: string) => {
    setSocialLinks(socialLinks.map((link) => link.name === name ? { ...link, value } : link));
  }

  const handleCancelNewSocialLink = () => {
    setNewSocialSite('');
    isAddingPartVisible.onFalse();
  }

  const handleSubmit = () => {
    console.log(socialLinks);
  }

  return (
    <Stack component={Card} spacing={3} sx={{
      p: 3,
      backdropFilter: 'none',
    }}>
      {SOCIAL_LINKS.map((social) => {
        const link = socialLinks.find((_link) => _link.name === social.name);
        if (!link) {
          return null;
        }
        return <TextField
          key={social.name}
          name={social.name}
          value={link.value}
          onChange={(e) => handleChangeSocialLink(social.name, e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  width={24}
                  icon={
                    social.icon || ''
                  }
                  color={
                    social.color || ''
                  }
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleDeleteSocialLink(social.name)}>
                  <Iconify icon="ph:trash" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      })}

      {
        isAddingPartVisible.value &&
        <TextField
          name="New Social Link"
          value={newSocialLink}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Select
                  size="small"
                  disableUnderline
                  value={newSocialSite}
                  onChange={(e) => {
                    setNewSocialSite(e.target.value);
                  }}
                  sx={{
                    '& .MuiSelect-select': {
                      p: 0,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                >
                  {
                    restSocialLinks.map((social) => <MenuItem key={social.name} value={social.name}>
                      <Iconify icon={social.icon} width={24} color={social.color} />
                    </MenuItem>
                    )}
                </Select>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleSaveNewSocialLink()}>
                  <Iconify icon="material-symbols:check" />
                </IconButton>
                <IconButton onClick={() => handleCancelNewSocialLink()}>
                  <Iconify icon="material-symbols:close" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setNewSocialLink(e.target.value);
          }}
        />
      }

      <Stack direction="row" justifyContent="flex-end" spacing={2}>

        {
          socialLinks.length !== SOCIAL_LINKS.length && !isAddingPartVisible.value && (
            <LoadingButton type="submit" variant="contained" onClick={isAddingPartVisible.onTrue}>
              Add
            </LoadingButton>
          )
        }

        <LoadingButton type="submit" variant="contained" onClick={handleSubmit}>
          Save Changes
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
