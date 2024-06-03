'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { MESSAGE_RIGHT_PANEL } from 'src/layouts/config-layout';

import { useSettingsContext } from 'src/components/settings';
import Carousel, { useCarousel } from 'src/components/carousel';

import MessageView from './message/view';
import SearchBarView from './search-bar/view';
import ConversationView from './conversation/view';
import KnowledgebaseView from './knowledgebase/view';

// ----------------------------------------------------------------------

export default function ChatView() {
  const settings = useSettingsContext();
  const rightPanelToggle = useBoolean();
  const upMd = useResponsive('up', 'md');

  const carousel = useCarousel({
    // autoplay: true,
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
      height: '100%',
      pb: 2,
    }}>
      <Stack
        direction="row"
        flexShrink={0}
        sx={{
          height: "100%",
          position: "relative",
        }}
      >
        <IconButton size="small" onClick={rightPanelToggle.onToggle}
          sx={{
            position: 'absolute',
            right: 0,
            zIndex: 99,
            transition: (theme) => theme.transitions.create('left', {
              duration: 1000,
              easing: 'ease-in-out',
            }),
            rotate: rightPanelToggle.value ? 0 : '180deg',
            display: { sm: 'block', md: 'none' },
          }}>
          <ArrowForwardIosIcon fontSize='small' />
        </IconButton>

        <Stack
          onClick={() => carousel.onTogo(2)}
          sx={{
            pt: 2,
            pr: 2,
            width: 1,
            borderRadius: 2,
            height: "100%",
            position: 'relative',
            left: rightPanelToggle.value ? `-${MESSAGE_RIGHT_PANEL.W_MOBILE}` : 0,
            transition: (theme) => theme.transitions.create('left', {
              duration: 1000,
              easing: 'ease-in-out',
            }),
          }}
        >
          <MessageView />
        </Stack>
        <Box
          sx={{
            pt: 2,
            width: upMd ? MESSAGE_RIGHT_PANEL.W_DESKTOP : MESSAGE_RIGHT_PANEL.W_MOBILE,
            minWidth: upMd ? MESSAGE_RIGHT_PANEL.W_DESKTOP : MESSAGE_RIGHT_PANEL.W_MOBILE,
            height: "100%",
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
            overflow: 'hidden',
            position: upMd ? 'relative' : 'absolute',
            left: (rightPanelToggle.value || upMd) ? 0 : `${MESSAGE_RIGHT_PANEL.W_MOBILE}`,
            transition: (theme) => theme.transitions.create('left', {
              duration: 1000,
              easing: 'ease-in-out',
            }),
          }}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            <ConversationView />
            <SearchBarView />
            <KnowledgebaseView />
          </Carousel>
        </Box>
      </Stack>
    </Container>
  );
}
