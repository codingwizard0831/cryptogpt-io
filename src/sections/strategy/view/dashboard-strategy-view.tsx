'use client';



import { Box, Card, Link, Grid, alpha, Stack, Button, Typography } from '@mui/material';

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Iconify from 'src/components/iconify';
import Carousel, { useCarousel } from 'src/components/carousel';

import DashboardStrategyCard from '../dashboard-strategy-card';


export default function DashboardStrategyView() {
  const isShowSummary = useStrategy((state) => state.isShowSummary);
  const setIsShowSummary = useStrategy((state) => state.setIsShowSummary);
  const smUp = useResponsive("up", 'sm');

  const carousel = useCarousel({
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  })
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
          gap: 2,
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <Link href={paths.dashboard.strategy.create} component={RouterLink}>
            <Button variant="contained" size='small' color="primary">New Strategy</Button>
          </Link>
        </Box>

        <Box>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => <Box key={`key-${index}`} sx={{
                px: 0.5,
                width: '300px',
              }}>
                <DashboardStrategyCard />
              </Box>)
            }
          </Carousel>
        </Box>

        <Box sx={{
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={{
                backgroundColor: theme => alpha(theme.palette.error.main, 0.08),
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 1,
              }}>
                <Typography variant="h6" sx={{
                  color: 'primary.main',
                }}>BITCOIN</Typography>
                <Typography variant="body2">Sentiment: Bullish</Typography>
                <Typography variant="body2">Value: 0.75</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={{
                backgroundColor: theme => alpha(theme.palette.info.main, 0.08),
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 1,
              }}>
                <Typography variant="h6" sx={{
                  color: 'primary.main',
                }}>BITCOIN</Typography>
                <Typography variant="body2">Sentiment: Bullish</Typography>
                <Typography variant="body2">Value: 0.75</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={{
                backgroundColor: theme => alpha(theme.palette.success.main, 0.08),
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 1,
              }}>
                <Typography variant="h6" sx={{
                  color: 'primary.main',
                }}>BITCOIN</Typography>
                <Typography variant="body2">Sentiment: Bullish</Typography>
                <Typography variant="body2">Value: 0.75</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={{
                backgroundColor: theme => alpha(theme.palette.warning.main, 0.08),
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 1,
              }}>
                <Typography variant="h6" sx={{
                  color: 'primary.main',
                }}>BITCOIN</Typography>
                <Typography variant="body2">Sentiment: Bullish</Typography>
                <Typography variant="body2">Value: 0.75</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}>
          <Typography variant="h6">TOP Strategies</Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            cursor: 'pointer',
          }}>
            <Box sx={{
              borderRadius: 1,
              p: 1.5,
              backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              position: 'relative',
            }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <Typography variant="subtitle1" sx={{
                  color: 'primary.main',
                }}>Stratege 1</Typography>
                <Typography variant="body1" sx={{
                  color: 'success.main',
                }}>+90%</Typography>
              </Box>
              <Typography variant="body2" sx={{
                color: 'text.primary',
              }}>Success Rate: 78%</Typography>
              <Typography variant="body1" sx={{
                color: 'text.primary',
              }}>Assets: BTC/USDT</Typography>


              <Box
                sx={{
                  width: '240px',
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  transition: 'all 0.3s',
                  position: 'absolute',
                  right: '16px',
                  bottom: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="hugeicons:chart-average"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Avg.Price:
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      flexGrow: 1,
                      textAlign: 'right',
                    }}
                  >
                    ≈ $0
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="mdi:bitcoin"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Sum BTC:
                  </Typography>

                  <Typography
                    variant="caption"
                    color="success"
                    sx={{
                      display: 'block',
                      flexGrow: 1,
                      textAlign: 'right',
                    }}
                  >
                    0.0
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="token:usdt"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Sum USDT:
                  </Typography>

                  <Typography
                    variant="caption"
                    color="success"
                    sx={{
                      display: 'block',
                      flexGrow: 1,
                      textAlign: 'right',
                    }}
                  >
                    0
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>

        <Typography variant="h6">My Strategies</Typography>
      </Card>
    </Box>
  );
}
