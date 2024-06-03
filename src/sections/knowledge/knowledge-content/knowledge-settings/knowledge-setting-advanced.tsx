import React, { useMemo } from 'react';

import { Box, alpha, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Toggle from 'src/components/toggle/toggle';
import { CodeEditor } from 'src/components/code-editor';
import Cube3dEffect from 'src/components/effect-items/cube-3d-effect';
import World3dEffect from 'src/components/effect-items/world-3d-effect';
import Pyramid3DEffect from 'src/components/effect-items/pyramid-3d-effect';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

const knowledgeSettingFileAccessData = [
    {
        id: 1,
        title: "Private",
        icon: <Pyramid3DEffect />,
        checked: true,
    },
    {
        id: 2,
        title: "Public",
        icon: <World3dEffect />,
        checked: true,
    },
    {
        id: 3,
        title: "Other",
        icon: <Cube3dEffect />,
        checked: true,
    },
];

const KnowledgeSettingAdvanced = () => {

    const carousel = useCarousel({
        autoplay: true,
        slidesToShow: 3,
        swipe: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, centerPadding: '0' },
            },
        ],
    })

    return <Box sx={{
        width: "100%",
        pt: 2,
    }}>
        <Box sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 1,
            mb: 2,
        }}>
            {knowledgeSettingFileAccessData.map((item) => (
                <Box key={item.id} sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: theme => alpha(theme.palette.background.default, 0.4),
                    boxShadow: theme => `0 0 -3px ${alpha(theme.palette.primary.main, 0.1)}`,
                    backdropFilter: "blur(10px)",
                    borderRadius: "10px",
                    p: 2,
                }}>
                    <IconFilter icon={item.title} />
                    <Typography variant="h6" sx={{
                        textAlign: "center",
                        mb: 2,
                    }}>{item.title}</Typography>
                    <Toggle checked={item.checked} />
                </Box>
            ))}
        </Box>

        <Box sx={{
            width: "100%",
            position: "relative",
            overflow: 'hidden',
        }}>
            <CarouselArrows
                icon="ic:round-navigate-next"
                onNext={carousel.onNext}
                onPrev={carousel.onPrev}
            >
                <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                    {
                        [1, 2, 3, 4].map((item, index) => <Box key={index} sx={{
                            px: 0.5
                        }}>
                            <Box sx={{
                                backgroundColor: theme => alpha(theme.palette.background.default, 0.4),
                            }}>
                                <CodeEditor />
                            </Box>
                        </Box>)
                    }
                </Carousel>
            </CarouselArrows>
        </Box>
    </Box>
}

const IconFilter = ({ icon }: { icon: string }) => {
    const upSmall = useResponsive('up', 'sm');
    const iconElement = useMemo(() => {
        switch (icon) {
            case "Private":
                return <Pyramid3DEffect />
            case "Public":
                return <World3dEffect />
            case "Other":
                return <Cube3dEffect size={upSmall ? 'md' : 'sm'} />
            default:
                return <World3dEffect />
        }
    }, [icon, upSmall]);

    return <Box sx={{
        width: upSmall ? "120px" : "80px",
        height: upSmall ? "120px" : "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 1,
        position: "relative",
    }}>
        {/* <Iconify icon='noto-v1:bell' sx={{
            position: "absolute",
            top: '0px',
            right: "0px",
            width: "30px",
            height: "30px",
            zIndex: 2,
        }} /> */}
        {iconElement}
    </Box>
};

export default KnowledgeSettingAdvanced;