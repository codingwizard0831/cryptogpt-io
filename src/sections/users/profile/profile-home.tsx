'use client';

import { useRef } from 'react';
import * as marked from 'marked';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader'; // Import marked

import { alpha } from '@mui/system';

import { fNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';

import { IUserProfile, IUserProfilePost } from 'src/types/user';


// ----------------------------------------------------------------------

const README_CONTENT = `
<h1 align="center">
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="28">
    Welcome
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="28">
</h1>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?lines=Creative,%20enthusiastic%20and%20Results-driven%20Full%20Stack%20Developer;%2B6%20years%20of%20hands-on%20experience;&center=true&width=800&height=45">
</p>

<p align="center">
With a proven track record as a full-stack developer, I specialize in delivering innovative solutions that drive reliable results. My professional journey is marked by efficient execution and the development of high-quality software that meets and exceeds project objectives. As a dedicated professional, I bring a thorough understanding of technology stacks to each challenge, ensuring a holistic approach to problem-solving.

I am recognized for my ability to communicate complex concepts effectively to all stakeholders, ensuring alignment and understanding across diverse teams. This skill has made me an enthusiastic collaborator and a key contributor to successful projects.

Deadline-driven and committed to excellence, I strive to remain at the cutting edge of technology, constantly integrating the latest innovations into my work to enhance outcomes. My commitment to this dynamic field is fueled by a passion for creating software solutions that not only perform exceptionally but also deliver significant value to users.
</p>

<h3 align="center">🏆 Github Profile Trophy</h3>


<table>
<td>

![](http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=codingenchanter725&theme=blueberry)
</td>
<td>

![](http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=codingenchanter725&theme=blueberry)
</td>
</tr>
</table>



</div>

<h3 align="center">Tech & Tools</h3>

<table>
  <tr>
    <td valign="center"><b>*<b></td>
  </tr>
  <tr>
    <td valign="center" align="center">
      <img src="https://img.shields.io/badge/8+hours per day-blue" />
      <img src="https://img.shields.io/badge/Attention to detail-blue" />
      <img src="https://img.shields.io/badge/Willingness to learn-blue" />
      <img src="https://img.shields.io/badge/Collaborative mindset-blue" />
      <img src="https://img.shields.io/badge/Customer centric approach-blue" />
      <img src="https://img.shields.io/badge/Dedication to quzlity-blue" />
      <img src="https://img.shields.io/badge/String work ethic-blue" />
      <img src="https://img.shields.io/badge/Creative problem solving skills-blue" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="center" width="200px"><b>Language<b></td>
    <td valign="center" width="200px"><b>Sepcial<b></td>
  </tr>
  <tr>
    <td valign="center" align="center" width="400px">
      <img src="https://img.shields.io/badge/HTML-blue" /> 
      <img src="https://img.shields.io/badge/CSS-blue" /> 
      <img src="https://img.shields.io/badge/JavaScript-blue" /> 
      <img src="https://img.shields.io/badge/TypeScript-blue" /> 
      <img src="https://img.shields.io/badge/PHP-blue" /> 
      <img src="https://img.shields.io/badge/Python-blue" /> 
      <img src="https://img.shields.io/badge/C-blue" /> 
      <img src="https://img.shields.io/badge/C++-blue" /> 
      <img src="https://img.shields.io/badge/Liquid-blue" /> 
      <img src="https://img.shields.io/badge/Solidity-blue" /> 
      <img src="https://img.shields.io/badge/Rust-blue" /> 
    </td>      
    <td valign="center" align="center" width="400px">
      <img src="https://img.shields.io/badge/WebRTC-blue" />
      <img src="https://img.shields.io/badge/Socket.io-blue" />
      <img src="https://img.shields.io/badge/websocket-blue" />
      <img src="https://img.shields.io/badge/ChatGPT-blue" />
      <img src="https://img.shields.io/badge/Web Scrapping-blue" />
      <img src="https://img.shields.io/badge/Firebase-blue" />
      <img src="https://img.shields.io/badge/Graphql-blue" />
      <img src="https://img.shields.io/badge/Convex-blue" />
    </td>
  </tr>
</table>
<table>
  <tr>
    <td valign="center" width="100px"><b>Frontend<b></td>
    <td valign="center" width="100px"><b>Backend<b></td>
    <td valign="center" width="100px"><b>Mobile<b></td>
  </tr>
  <tr>
    <td valign="center" align="center" width="300px">
      <img src="https://img.shields.io/badge/React-blue" /> 
      <img src="https://img.shields.io/badge/Next-blue" /> 
      <img src="https://img.shields.io/badge/Vue-blue" /> 
      <img src="https://img.shields.io/badge/Nuxt-blue" /> 
      <img src="https://img.shields.io/badge/Angular-blue" /> 
      <img src="https://img.shields.io/badge/Svelte-blue" /> 
      <img src="https://img.shields.io/badge/Solidjs-blue" /> 
      <img src="https://img.shields.io/badge/Bootstrap-blue" /> 
      <img src="https://img.shields.io/badge/Tailwind-blue" />
      <img src="https://img.shields.io/badge/MUI-blue" /> 
      <img src="https://img.shields.io/badge/Chart.js-blue" />
      <img src="https://img.shields.io/badge/Jquery-blue" />
      <img src="https://img.shields.io/badge/Antd-blue" />
      <img src="https://img.shields.io/badge/Headless-blue" />
    </td>      
    <td valign="center" align="center" width="300px">
      <img src="https://img.shields.io/badge/Node.js-blue" /> 
      <img src="https://img.shields.io/badge/Express-blue" /> 
      <img src="https://img.shields.io/badge/Laravel-blue" /> 
      <img src="https://img.shields.io/badge/Django-blue" /> 
      <img src="https://img.shields.io/badge/Flask-blue" /> 
      <img src="https://img.shields.io/badge/Fastapi-blue" /> 
      <img src="https://img.shields.io/badge/Nest-blue" /> 
      <img src="https://img.shields.io/badge/ASP.NET-blue" /> 
      <img src="https://img.shields.io/badge/Spring Boot-blue" /> 
    </td>
    <td valign="center" align="center" width="300px">
      <img src="https://img.shields.io/badge/Flutter-blue" /> 
      <img src="https://img.shields.io/badge/React Native-blue" /> 
      <img src="https://img.shields.io/badge/React Ionic-blue" /> 
      <img src="https://img.shields.io/badge/Angular Ionic-blue" /> 
      <img src="https://img.shields.io/badge/Swift-blue" /> 
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="center"><b>AI & Bot & Automation<b></td>
    <td valign="center"><b>Interesting<b></td>
  </tr>
  <tr>
    <td valign="center" align="center">
      <img src="https://img.shields.io/badge/AI Chatbot-blue" />
      <img src="https://img.shields.io/badge/ChatGPT-blue" />
      <img src="https://img.shields.io/badge/Telegram Bot-blue" />
      <img src="https://img.shields.io/badge/Langchain-blue" />
      <img src="https://img.shields.io/badge/Deep learning-blue" />
      <img src="https://img.shields.io/badge/OpenCV-blue" />
      <img src="https://img.shields.io/badge/Machine Learning-blue" />
      <img src="https://img.shields.io/badge/TensorFlow-blue" />
      <img src="https://img.shields.io/badge/LLM Prompt Engineering-blue" />
      <img src="https://img.shields.io/badge/Generative AI Prompt Engineering-blue" />
    </td>
    <td valign="center" align="center">
      <img src="https://img.shields.io/badge/Ruby-blue" />
      <img src="https://img.shields.io/badge/Golang-blue" />
      <img src="https://img.shields.io/badge/Unity-blue" />
    </td>
  </tr>
</table>
  
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


## Language

[![My Skills](https://skillicons.dev/icons?i=js,html,css,js,ts,python,php,c,cpp,cs,solidity)](https://skillicons.dev)

## Frameworks & Experience
[![My Skills](https://skillicons.dev/icons?i=react,next,solidjs,vue,nuxt,angular,svelte)](https://skillicons.dev)

[![My Skills](https://skillicons.dev/icons?i=nodejs,nestjs,laravel,django,flask,fastapi)](https://skillicons.dev)

## Library & Experience
[![My Skills](https://skillicons.dev/icons?i=tailwind,mui,vuetify,gatsby,bootstrap,jquery,sass,less,threejs,d3,redux,regex)](https://skillicons.dev)
[![My Skills](https://skillicons.dev/icons?i=supabase,prisma,sequelize,vite,jest,cypress,electron,tensorflow,opencv,graphql,firebase,ipfs)](https://skillicons.dev)


## Database & Experience
[![My Skills](https://skillicons.dev/icons?i=mysql,mongodb,sqlite,postgresql,redis,dynamodb)](https://skillicons.dev)

## Dev Ops
[![My Skills](https://skillicons.dev/icons?i=aws,gcp,vercel,netlify,nginx,docker,ubuntu,linux,heroku,npm,yarn,github,gitlab,bitbucket)](https://skillicons.dev)

`;

type Props = {
  info: IUserProfile;
  posts: IUserProfilePost[];
};

export default function ProfileHome({ info, posts }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const renderFollows = (
    <Card sx={{
      py: 3,
      textAlign: 'center',
      typography: 'h4',
      // backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
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
      // backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
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
      // backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
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

  const readmeHtml = marked.parse(README_CONTENT);

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
          // backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
          backdropFilter: 'none',
          p: 1,
        }}>
          <div dangerouslySetInnerHTML={{ __html: readmeHtml }} />
        </Card>
      </Grid>
    </Grid>
  );
}
