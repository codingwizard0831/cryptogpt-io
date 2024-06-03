import React from 'react';

import { Box, Stack, alpha, styled, keyframes, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

interface StyleCircleProps {
  backgroundColor?: string;
  size?: number;
}


const animate = keyframes`
  0% {
    box-shadow: 1px 0px 2px black
  }
  50% {
    box-shadow: 1px 0px 2px white
  }
  100% {
    box-shadow: 1px 0px 2px black
  }
`;

const StyleCircle = styled(Box)<StyleCircleProps>(({ theme, backgroundColor = '#fff', size = 0 }) => ({
  width: `${6 + 3 * size}px`,
  height: `${6 + 3 * size}px`,
  backgroundColor: alpha(theme.palette.grey[100], 0.1),
  boxShadow: `1px 0px 2px white`,
  borderRadius: '50%',
  animation: `${animate} 1s infinite ${0.2 * size}s ease-in-out`
}));

const SearchAgentBar: React.FC = () => {
  console.log();
  return <Stack direction="row" alignItems="center" justifyContent="space-between">
    <IconButton>
      <Iconify icon="eva:search-fill" />
    </IconButton>

    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <StyleCircle />
      <StyleCircle size={1} />
      <StyleCircle size={2} />
      <StyleCircle size={3} />
      <StyleCircle size={4} />
    </Stack>
  </Stack>
}

export default SearchAgentBar;