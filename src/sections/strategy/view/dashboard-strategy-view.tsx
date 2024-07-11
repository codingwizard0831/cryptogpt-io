'use client';

import { Canvas } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";
import { useMemo, Suspense, useState, useEffect, useCallback } from 'react';
import {
    Gltf,
    Html,
    Float,
    Environment,
} from "@react-three/drei";

import { Card, Button, Box as MuiBox } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { NAV, SPACING } from 'src/layouts/config-layout';

import { useCarousel } from 'src/components/carousel';

// import { DashboardStrategyTeacher } from "../dashboard-strategy-teacher";


const itemPlacement = {
    default: {
        classroom: {
            position: [0.2, -1.7, -2],
        },
        teacher: {
            position: [-1, -1.7, -3],
        },
        board: {
            position: [0.45, 0.382, -6],
        },
    },
    alternative: {
        classroom: {
            position: [0.3, -1.7, -1.5],
            rotation: [0, degToRad(-90), 0],
            scale: 0.4,
        },
        teacher: { position: [-1, -1.7, -3] },
        board: { position: [1.4, 0.84, -8] },
    },
};


export default function DashboardTrackingView() {
    const [currentTab, setCurrentTab] = useState('overview');
    const smUp = useResponsive('up', 'sm');
    const [currentWidth, setCurrentWidth] = useState(0);
    const isTradeWindowFull = useBoolean(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const trackerDetailDrawer = useBoolean(false);
    const isAIChatWindowFull = useBoolean(false);

    useEffect(() => {
        const handleResize = () => {
            setCurrentWidth(window.innerWidth);
        };

        // Set initial width
        handleResize();

        // Correctly listen for resize events
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const handleChangleSelectedDate = (newDate: Date) => {
        console.log('newDate', newDate);
        setSelectedDate(newDate);

        if (
            (newDate.getFullYear() === new Date().getFullYear() &&
                newDate.getMonth() === new Date().getMonth() &&
                newDate.getDate() === new Date().getDate()) ||
            newDate.getTime() > new Date().getTime()
        ) {
            trackerDetailDrawer.onTrue();
        }
    }

    const chatAreaFullWidth = useMemo(() => {
        if (smUp) return currentWidth - NAV.W_SIDE_BAR_MENU - SPACING.md;
        return currentWidth - SPACING.sm;
    }, [currentWidth, smUp]);

    const carousel = useCarousel({});

    return (
        <MuiBox sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Card sx={{
                p: smUp ? 2 : 1,
                flex: 1,
                borderRadius: 1,
                boxShadow: 2,
                height: '100%',
            }}>
                <Canvas
                    camera={{
                        position: [0, 0, 0.0001],
                    }}
                >

                    <Suspense>
                        <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
                            <Html
                                transform
                                {...itemPlacement.default.board}
                                distanceFactor={1}
                            >
                                <MuiBox sx={{
                                    width: '800px',
                                    height: '800px',
                                    backgroundColor: 'red',
                                }}>
                                    <Button variant="contained" color="primary">It's test button</Button>
                                </MuiBox>
                            </Html>
                            <Environment preset="sunset" />
                            <ambientLight intensity={0.8} color="pink" />

                            <Gltf
                                src="/models/classroom_default.glb"
                                {...itemPlacement.default.classroom}
                            />


                            {/* <DashboardStrategyTeacher
                                teacher="Nanami"
                                key="Nanami"
                                {...itemPlacement.default.teacher}
                                scale={1.5}
                                rotation-y={degToRad(20)}
                            /> */}
                        </Float>
                    </Suspense>
                </Canvas>
            </Card>
        </MuiBox>
    );
}
