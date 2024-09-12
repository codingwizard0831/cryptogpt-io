'use client';

import * as marked from 'marked';
import { useRef, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import { alpha, TextField, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';

import { IUserProfile, IUserProfilePost } from 'src/types/user';


// ----------------------------------------------------------------------


type Props = {
  info: IUserProfile;
  posts: IUserProfilePost[];
};

export default function ProfileHome({ info, posts }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const isEditSummary = useBoolean();
  const [readmeHtml, setReadmeHtml] = useState(README_CONTENT);
  const [activeTab, setActiveTab] = useState(0);

  const renderFollows = (
    <Card sx={{
      py: 3,
      textAlign: 'center',
      typography: 'h4',
      backdropFilter: 'none',
    }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {fNumber(info.totalFollowers)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Follower
          </Box>
        </Stack>

        <Stack width={1}>
          {fNumber(info.totalFollowing)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Following
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAbout = (
    <Card sx={{
      backdropFilter: 'none',
    }}>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: 'body2' }}>{info.quote}</Box>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {`Live at `}
            <Link variant="subtitle2" color="inherit">
              {info.country}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          {info.email}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {info.role} {`at `}
            <Link variant="subtitle2" color="inherit">
              {info.company}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {`Studied at `}
            <Link variant="subtitle2" color="inherit">
              {info.school}
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderSocials = (
    <Card sx={{
      backdropFilter: 'none',
    }}>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link) => (
          <Stack
            key={link.name}
            spacing={2}
            direction="row"
            sx={{ wordBreak: 'break-all', typography: 'body2' }}
          >
            <Iconify
              icon={link.icon}
              width={24}
              sx={{
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link color="inherit">
              {link.value === 'facebook' && info.socialLinks.facebook}
              {link.value === 'instagram' && info.socialLinks.instagram}
              {link.value === 'linkedin' && info.socialLinks.linkedin}
              {link.value === 'twitter' && info.socialLinks.twitter}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );

  const renderReadme = useMemo(() => marked.parse(readmeHtml), [readmeHtml]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          {renderFollows}

          {renderAbout}

          {renderSocials}
        </Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Card sx={{
          backdropFilter: 'none',
          p: 1,
          position: 'relative',
        }}>
          {
            !isEditSummary.value && <Box>
              <IconButton onClick={isEditSummary.onTrue} size="small" sx={{
                position: 'absolute', top: 4, right: 4,
                color: theme => theme.palette.text.primary,
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                '&:hover': {
                  backgroundColor: theme => alpha(theme.palette.primary.main, 0.8),
                },
              }}>
                <Iconify icon="mdi:pencil" />
              </IconButton>
              {
                renderReadme.toString().trim().length > 0
                  ?
                  <Box dangerouslySetInnerHTML={{ __html: renderReadme }} sx={{
                    minHeight: 200,
                  }} />
                  :
                  <Box sx={{
                    minHeight: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'text.secondary',
                  }}>
                    No Preview
                  </Box>
              }
            </Box>
          }

          {
            isEditSummary.value && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Edit" />
                    <Tab label="Preview" />
                  </Tabs>
                  <Button variant="soft" color="primary" onClick={isEditSummary.onFalse}>OK</Button>
                </Box>
                {activeTab === 0 && (
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={200}
                    value={readmeHtml}
                    placeholder="Write your readme here..."
                    onChange={(e) => {
                      if (e.target.value.length < 1000) {
                        setReadmeHtml(e.target.value);
                      }
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    InputProps={{
                      style: { resize: 'none' },
                    }}
                  />
                )}
                {activeTab === 1 && (
                  renderReadme.toString().trim().length > 0
                    ?
                    <Box dangerouslySetInnerHTML={{ __html: renderReadme }} sx={{
                      minHeight: 200,
                    }} />
                    :
                    <Box sx={{
                      minHeight: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'text.secondary',
                    }}>
                      No Preview
                    </Box>
                )
                }
              </Box>
            )
          }
        </Card>
      </Grid>
    </Grid>
  );
}

const README_CONTENT = `

<p align="center">
With a proven track record as a full-stack developer, I specialize in delivering innovative solutions that drive reliable results. My professional journey is marked by efficient execution and the development of high-quality software that meets and exceeds project objectives. As a dedicated professional, I bring a thorough understanding of technology stacks to each challenge, ensuring a holistic approach to problem-solving.

I am recognized for my ability to communicate complex concepts effectively to all stakeholders, ensuring alignment and understanding across diverse teams. This skill has made me an enthusiastic collaborator and a key contributor to successful projects.

Deadline-driven and committed to excellence, I strive to remain at the cutting edge of technology, constantly integrating the latest innovations into my work to enhance outcomes. My commitment to this dynamic field is fueled by a passion for creating software solutions that not only perform exceptionally but also deliver significant value to users.
</p>

<h3 align="center">🏆 Github Profile Trophy</h3>
<h3 align="center">Tech & Tools</h3>

 <table>
  <tr>
    <td valign="center" width="100px"><b>Blockchain<b></td>
    <td valign="center" width="100px"><b>DEV OPS<b></td>
    <td valign="center" width="100px"><b>Database<b></td>
  </tr>
  <tr>
    <td valign="center" align="center" width="300px">
      <img src="https://img.shields.io/badge/Web3.js-blue" /> 
      <img src="https://img.shields.io/badge/Ethers.js-blue" /> 
      <img src="https://img.shields.io/badge/Solidity-blue" />
      <img src="https://img.shields.io/badge/Smart Contract-blue" /> 
      <img src="https://img.shields.io/badge/Bitcoin-blue" />
      <img src="https://img.shields.io/badge/NFT Marketplace/Auction-blue" />
      <img src="https://img.shields.io/badge/Launchpad/DEX/CEX/Defi-blue" />
    </td>
    <td valign="center" align="center" width="300px">
      <img src="https://img.shields.io/badge/AWS-blue" /> 
      <img src="https://img.shields.io/badge/GCP-blue" /> 
      <img src="https://img.shields.io/badge/Heroku-blue" /> 
      <img src="https://img.shields.io/badge/Netlify-blue" /> 
      <img src="https://img.shields.io/badge/Vercel-blue" />
      <img src="https://img.shields.io/badge/Hostinger-blue" />
      <img src="https://img.shields.io/badge/CI/CD-blue" />
      <img src="https://img.shields.io/badge/Docker-blue" />
    </td>
    <td valign="center" align="center" width="300px">
      <img src="https://img.shields.io/badge/MongoDB-blue" /> 
      <img src="https://img.shields.io/badge/PostgreSQL-blue" />
      <img src="https://img.shields.io/badge/MySQL-blue" /> 
      <img src="https://img.shields.io/badge/Redis-blue" /> 
      <img src="https://img.shields.io/badge/SQLite-blue" /> 
      <img src="https://img.shields.io/badge/Dynamodb-blue" /> 
    </td>
  </tr>
</table>

`;