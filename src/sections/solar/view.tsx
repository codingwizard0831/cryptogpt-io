'use client';

import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import LayersIcon from '@mui/icons-material/Layers';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { styled, useTheme, Accordion, Typography, IconButton, AccordionDetails, AccordionSummary } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { ScrollCustomStyle } from 'src/theme/css';

import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';
import WeatherCard from 'src/components/effect-items/weather-card/weather-card';

import SolarInput from './solar-input/solar-input';
import SolarCostContent from './solar-cost/solar-cost-content';
import ChatbotSelector from '../chat/message/chatbot-selector';
import SolarSliderBox from './solar-slider-box/solar-silder-box';
import SolarBuildingResult1 from './solar-building/solar-building-result1';
import SolarBuildingResult2 from './solar-building/solar-building-result2';
import SolarBuildingContent from './solar-building/solar-building-content';
import SolarDataLayerResult from './solar-data-layer/solar-data-layer-result';
import SolarPotentialContent from './solar-potential/solar-potential-content';
import SolarPotentialResult1 from './solar-potential/solar-potential-result1';
import SolarPotentialResult2 from './solar-potential/solar-potential-result2';
import SolarDataLayerContent from './solar-data-layer/solar-data-layer-content';

// ----------------------------------------------------------------------
const StyledAccordion = styled(Accordion)(({ theme }) => ({
    '&.MuiAccordion-root': {
        boxShadow: 'none',
        '&.Mui-expanded': {
            margin: '0px', // Adjust this value to your needs
            backgroundColor: 'transparent',
            '& .MuiAccordionSummary-root': {
                margin: '0',
                paddingRight: '0px !improtant',
                minHeight: '48px',
                '& .MuiAccordionSummary-content': {
                    margin: '0',
                },
            },
        },
    },
}));

export default function SolarView() {
    const theme = useTheme();
    const settings = useSettingsContext();
    const mapElementRef = useRef();
    const mapRef = useRef<google.maps.Map | null>(null);
    const apiKey = "AIzaSyBHwG4ztR1_J_UA8zOSBhpv3W7HvU_G0vY";
    const [controlled, setControlled] = useState<string | false>(false);
    const leftPanel = useBoolean();
    const rightPanel = useBoolean();

    const handleChangeControlled =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setControlled(isExpanded ? panel : false);
        };

    // Load the Google Maps script and initialize the map
    useEffect(() => {
        const loadGoogleMaps = async () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
            document.head.appendChild(script);

            script.onload = () => {
                const mapOptions = {
                    center: { lat: 57.623147493770105, lng: 11.931981013011718 },
                    mapTypeId: 'satellite',
                    zoom: 19,
                    // ... other map options ...
                };

                if (mapElementRef.current) {
                    const newMap = new google.maps.Map(mapElementRef.current, mapOptions);
                    mapRef.current = newMap;
                }

            };

            script.onerror = (e) => {
                console.error('Error loading Google Maps:', e);
            };
        };

        loadGoogleMaps();
    }, [apiKey]);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <Box
                // onTouchStart={handleTouchStart}
                // onTouchMove={handleTouchMove}
                sx={{
                    width: 1,
                    height: 1,
                    borderRadius: 2,
                    overflowX: "hidden",
                    overflowY: "auto",
                    bgcolor: alpha(theme.palette.background.default, 0.2),
                    backdropFilter: 'blur(10px)',
                    border: `dashed 1px ${theme.palette.divider}`,
                    position: 'relative',
                }}
            >
                <Box ref={mapElementRef} sx={{
                    width: '100%',
                    height: '100%',
                }} />

                <Box sx={{
                    position: 'absolute',
                    left: '5px',
                    top: '5px',
                    p: 1,
                    backdropFilter: "blur(10px)",
                    background: alpha(theme.palette.background.default, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    {/* <Image src="/assets/icons/project/crypto/binance_usd_busd_logo.svg" alt="logo" sx={{ width: 32, height: 32 }} />
                    <Typography variant="h6" sx={{ color: theme.palette.primary.main, ml: 1 }}>Updated AI Solar</Typography> */}
                    <ChatbotSelector />

                </Box>

                {/* Left Panel */}
                <IconButton color='primary' size="small" sx={{
                    position: 'absolute',
                    top: '64px',
                    left: leftPanel.value ? '5px' : 'calc(305px + 5px)',
                    transition: 'all 0.5s',
                    backdropFilter: "blur(10px)",
                    border: `solid 1px ${theme.palette.divider}`,
                    zIndex: 1,
                    display: controlled ? 'block' : 'none',
                }} onClick={leftPanel.onToggle}>
                    <Iconify icon="eva:arrow-ios-back-fill" sx={{ color: 'white', transform: `rotate(${leftPanel.value ? 180 : 0}deg)`, transition: 'all 0.5s', }} />
                </IconButton>
                <Box sx={{
                    position: 'absolute',
                    left: leftPanel.value ? '-300px' : '5px',
                    top: '64px',
                    width: "300px",
                    maxHeight: 'calc(100% - 64px - 58px)',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    borderRadius: "10px",
                    transition: 'all 0.5s',
                    zIndex: 2,
                    ...ScrollCustomStyle(theme, {}),
                }}>
                    <Scrollbar>
                        {
                            controlled === 'building' && <>
                                <SolarBuildingResult1 />
                                <SolarBuildingResult2 />
                            </>
                        }
                        {
                            controlled === 'data-layer' && <SolarDataLayerResult />
                        }
                        {
                            controlled === 'solar-potential' && <>
                                <SolarPotentialResult1 />
                                <SolarPotentialResult2 />
                            </>
                        }
                    </Scrollbar>
                </Box>

                {/* Right Panel */}
                <IconButton color='primary' size="small" sx={{
                    position: 'absolute',
                    top: '5px',
                    right: rightPanel.value ? '5px' : 'calc(305px + 5px)',
                    transition: 'all 0.5s',
                    backdropFilter: "blur(10px)",
                    border: `solid 1px ${theme.palette.divider}`,
                    zIndex: 1,
                }} onClick={rightPanel.onToggle}>
                    <Iconify icon="eva:arrow-ios-back-fill" sx={{ color: 'white', transform: `rotate(${rightPanel.value ? 0 : 180}deg)`, transition: 'all 0.5s', }} />
                </IconButton>

                <WeatherCard
                    city="Dunmore, Ireland"
                    temperature={23}
                    weather="sun"
                    sx={{
                        position: 'absolute',
                        right: rightPanel.value ? '-300px' : '5px',
                        top: '5px',
                        width: "300px",
                        transition: 'all 0.5s',
                    }} />
                <SolarSliderBox
                    sx={{
                        position: 'absolute',
                        right: rightPanel.value ? '-300px' : '5px',
                        top: '65px',
                        width: "300px",
                        transition: 'all 0.5s',
                    }}
                />

                <Box sx={{
                    position: 'absolute',
                    right: rightPanel.value ? '-300px' : '5px',
                    top: '172px',
                    width: "300px",
                    height: 'calc(100% - 230px)',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    backdropFilter: "blur(10px)",
                    background: alpha(theme.palette.background.default, 0.1),
                    borderRadius: "10px",
                    padding: '4px',
                    zIndex: 1,
                    transition: 'all 0.5s 0.3s',
                }}>
                    <Scrollbar>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            height: '100%',
                        }}>
                            <StyledAccordion
                                expanded={controlled === 'building'}
                                onChange={handleChangeControlled('building')}>
                                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                    <Box sx={{
                                        display: 'flex',
                                    }}>
                                        <HomeIcon color='primary' />
                                        <Box sx={{ ml: 1 }}>
                                            <Typography variant="subtitle1" sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: 900,
                                            }}>Building Insights endpoint</Typography>
                                            <Typography variant="caption" sx={{
                                                fontSize: "12px",
                                                fontWeight: 300,
                                            }}>Yearly energy: 14.00MWh</Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SolarBuildingContent />
                                </AccordionDetails>
                            </StyledAccordion>

                            <StyledAccordion
                                expanded={controlled === 'data-layer'}
                                onChange={handleChangeControlled('data-layer')}>
                                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                    <Box sx={{
                                        display: 'flex',
                                    }}>
                                        <LayersIcon color='primary' />
                                        <Box sx={{ ml: 1 }}>
                                            <Typography variant="subtitle1" sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: 900,
                                            }}>Data Layers endpoint</Typography>
                                            <Typography variant="caption" sx={{
                                                fontSize: "12px",
                                                fontWeight: 300,
                                            }}>Annual sunshine</Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SolarDataLayerContent />
                                </AccordionDetails>
                            </StyledAccordion>

                            <StyledAccordion
                                expanded={controlled === 'solar-potential'}
                                onChange={handleChangeControlled('solar-potential')}>
                                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                    <Box sx={{
                                        display: 'flex',
                                    }}>
                                        <AutoGraphIcon color='primary' />
                                        <Box sx={{ ml: 1 }}>
                                            <Typography variant="subtitle1" sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: 900,
                                            }}>Solar Potential analysis</Typography>
                                            <Typography variant="caption" component='p' sx={{
                                                fontSize: "12px",
                                                lineHeight: "15px",
                                                fontWeight: 300,
                                            }}>Values are only placeholders.</Typography>
                                            <Typography variant="caption" component='p' sx={{
                                                fontSize: "12px",
                                                lineHeight: "15px",
                                                fontWeight: 300,
                                            }}>Update with your own values.</Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SolarPotentialContent />
                                </AccordionDetails>
                            </StyledAccordion>

                            <StyledAccordion
                                expanded={controlled === 'data-cost'}
                                onChange={handleChangeControlled('data-cost')}>
                                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                    <Box sx={{
                                        display: 'flex',
                                    }}>
                                        <RequestQuoteIcon color='primary' />
                                        <Box sx={{ ml: 1 }}>
                                            <Typography variant="subtitle1" sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: 900,
                                            }}>Acquiring it Costs</Typography>
                                            <Typography variant="caption" component='p' sx={{
                                                fontSize: "12px",
                                                lineHeight: "15px",
                                                fontWeight: 300,
                                            }}>Your new Solar System will included (after  verification & inspection and final agreement signed)</Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SolarCostContent />
                                </AccordionDetails>
                            </StyledAccordion>
                        </Box>
                    </Scrollbar>
                </Box>

                {/* Bottom Input Panel */}
                <SolarInput />

                {/* Center Message Panel */}
                {/* <SolarMessageContent leftPanel={leftPanel.value} rightPanel={rightPanel.value} /> */}

                {/* Center Panel */}
                {/* <SolarCenterPanel leftPanel={leftPanel.value && Boolean(controlled)} rightPanel={rightPanel.value} /> */}
            </Box>
        </Container>
    );
}
