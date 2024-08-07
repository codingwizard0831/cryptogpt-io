'use client';

import { Leva, button, useControls } from 'leva';
import { degToRad } from 'three/src/math/MathUtils';
import { Canvas, useThree } from '@react-three/fiber';
import { useRef, Suspense, useEffect, FunctionComponent } from 'react';
import { Gltf, Html, Float, Loader, useGLTF, Environment, CameraControls } from '@react-three/drei';

import { Box, Card, Button } from '@mui/material';
// import { BoardSettings } from "./BoardSettings";
// import { MessagesList } from "./MessagesList";
// import { Teacher } from "./Teacher";
// import { TypingBox } from "./TypingBox";

import { AmbientLight, DirectionalLight } from 'three';

import CanvasLayout from 'src/layouts/common/canvas-layout';
import { useStrategy } from 'src/store/strategy/useStrategy';
import { useAITeacher } from 'src/store/strategy/useAITeacher';

import StrategyCoinModel from '../dashboard-strategy-coin';
import DashboardStrategyTeacher from '../dashboard-strategy-teacher';
import DashboardStrategyContent from '../dashboard-strategy-content';

interface ItemPlacement {
  [key: string]: {
    classroom: {
      position: [number, number, number];
      rotation?: [number, number, number];
      scale?: number;
    };
    teacher: {
      position: [number, number, number];
      scale?: number;
      rotation?: [number, number, number];
    };
    board: {
      position: [number, number, number];
    };
    coin1: {
      position: [number, number, number];
      scale?: number;
      rotation?: [number, number, number];
    },
    coin2: {
      position: [number, number, number];
      scale?: number;
      rotation?: [number, number, number];
    },
  };
}

const itemPlacement: ItemPlacement = {
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
    coin1: {
      position: [-0.24, 0.2, -4],
      scale: 0.007,
      rotation: [degToRad(90), degToRad(0), degToRad(-30)],
    },
    coin2: {
      position: [0.84, 0.2, -4],
      scale: 0.007,
      rotation: [degToRad(90), degToRad(0), degToRad(30)],
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
    coin1: {
      position: [0.45, 0.382, -6],
      scale: 0.5,
      rotation: [degToRad(70), degToRad(0), degToRad(-20)],
    },
    coin2: {
      position: [0.45, 0.3082, -6],
    },
  },
};

export default function DashboardStrategyView() {
  const teacher = useAITeacher((state) => state.teacher);
  const classroom = useAITeacher((state) => state.classroom);
  const step = useStrategy((state) => state.step);
  const coin1 = useStrategy((state) => state.coin1);
  const coin2 = useStrategy((state) => state.coin2);

  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
        pb: 2,
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Card
        sx={{
          p: 1,
          flex: 1,
          borderRadius: 1,
          boxShadow: 2,
          height: '100%',
          // display: 'none',
        }}
      >
        <div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
          {/* <TypingBox /> */}
          <Button>TEST</Button>
        </div>
        <Leva hidden />
        <Loader />
        <Canvas
          shadows
          camera={{
            position: [0, 0, 0.0001],
          }}
        >
          <CameraManager />
          <Suspense>
            <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
              <Html transform {...itemPlacement[classroom].board} distanceFactor={1}>
                <CanvasLayout>
                  <DashboardStrategyContent />
                </CanvasLayout>
              </Html>

              <Environment preset="sunset" background blur={1} />

              <Gltf
                src={`/models/classroom_${classroom}.glb`}
                {...itemPlacement[classroom].classroom}
              />

              <DashboardStrategyTeacher
                teacher={teacher}
                key={teacher}
                {...itemPlacement[classroom].teacher}
                scale={1.5}
                rotation-y={degToRad(20)}
                castShadow
                receiveShadow
              />


              {
                step === '1.choose-pair' && (
                  <>
                    <StrategyCoinModel
                      key="pair-coin1"
                      name={coin1.symbol}
                      {...itemPlacement[classroom].coin1}
                      castShadow
                      receiveShadow
                    />

                    <StrategyCoinModel
                      key="pair-coin2"
                      name={coin2.symbol}
                      {...itemPlacement[classroom].coin2}
                      castShadow
                      receiveShadow
                    />
                  </>
                )
              }

              <LightsManager />
            </Float>
          </Suspense>
        </Canvas>
      </Card>
    </Box>
  );
}

interface CameraPositions {
  [key: string]: [number, number, number];
}

interface CameraZooms {
  [key: string]: number;
}

const CAMERA_POSITIONS: CameraPositions = {
  default: [0, 6.123233995736766e-21, 0.0001],
  loading: [0.00002621880610890309, 0.00000515037441056466, 0.00009636414192870058],
  speaking: [0, -1.6481333940859815e-7, 0.00009999846226827279],
};

const CAMERA_ZOOMS: CameraZooms = {
  default: 1,
  loading: 1.3,
  speaking: 2.1204819420055387,
};

const CameraManager: FunctionComponent = () => {
  const controls = useRef<CameraControls>(null);
  const loading = useAITeacher((state) => state.loading);
  const currentMessage = useAITeacher((state) => state.currentMessage);

  useEffect(() => {
    if (loading) {
      controls.current?.setPosition(...CAMERA_POSITIONS.loading, true);
      controls.current?.zoomTo(CAMERA_ZOOMS.loading, true);
    } else if (currentMessage) {
      controls.current?.setPosition(...CAMERA_POSITIONS.speaking, true);
      controls.current?.zoomTo(CAMERA_ZOOMS.speaking, true);
    }
  }, [loading, currentMessage]);

  useControls('Helper', {
    getCameraPosition: button(() => {
      // @ts-ignore
      const position = controls.current?.getPosition();
      const zoom = controls.current?.camera.zoom;
      // Assuming you want to do something with position and zoom, like returning them
      return { position, zoom };
    }),
  });

  return (
    <CameraControls
      ref={controls}
      minZoom={1}
      maxZoom={4.2}
      polarRotateSpeed={-0.3} // REVERSE FOR NATURAL EFFECT
      azimuthRotateSpeed={-0.3} // REVERSE FOR NATURAL EFFECT
      mouseButtons={{
        left: 1, // ACTION.ROTATE
        wheel: 16, // ACTION.ZOOM
        middle: 4, // Assuming 4 is the action code for the middle button action
        right: 2, // Assuming 2 is the action code for the right button action
      }}
      touches={{
        one: 32, // ACTION.TOUCH_ROTATE
        two: 512, // ACTION.TOUCH_ZOOM
        three: 64, // Assuming 64 is the action code for the missing action
      }}
    />
  );
};

function LightsManager() {
  const { scene } = useThree();

  useEffect(() => {
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 2, 4);
    // directionalLight.castShadow = true;
    // directionalLight.shadow.mapSize.width = 10240;
    // directionalLight.shadow.mapSize.height = 10240;
    // directionalLight.shadow.camera.far = 500;
    // directionalLight.shadow.camera.left = -10;
    // directionalLight.shadow.camera.right = 10;
    // directionalLight.shadow.camera.top = 10;
    // directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // const pointLight = new PointLight(0xffffff, 1, 12);
    // pointLight.castShadow = true;
    // pointLight.position.set(2, 2, 4);
    // scene.add(pointLight);

    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
      // scene.remove(pointLight);
    }
  }, [scene]);

  return null;
}

useGLTF.preload('/models/classroom_default.glb');
useGLTF.preload('/models/classroom_alternative.glb');
