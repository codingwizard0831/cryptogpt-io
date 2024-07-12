'use client';

import { Canvas } from '@react-three/fiber';
import { Leva, button, useControls } from 'leva';
import { degToRad } from 'three/src/math/MathUtils';
import { useRef, Suspense, useEffect, FunctionComponent } from 'react';
import { Gltf, Html, Float, Loader, useGLTF, Environment, CameraControls } from '@react-three/drei';

import { Card, Box as MuiBox } from '@mui/material';
// import { BoardSettings } from "./BoardSettings";
// import { MessagesList } from "./MessagesList";
// import { Teacher } from "./Teacher";
// import { TypingBox } from "./TypingBox";

import { useAITeacher } from 'src/store/strategy/useAITeacher';

import DashboardStrategyTeacher from '../dashboard-strategy-teacher';

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

export default function DashboardStrategyView() {
  const teacher = useAITeacher((state) => state.teacher);
  const classroom = useAITeacher((state) => state.classroom);

  return (
    <MuiBox
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
        }}
      >
        <div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
          {/* <TypingBox /> */}
        </div>
        <Leva hidden />
        <Loader />
        <Canvas
          camera={{
            position: [0, 0, 0.0001],
          }}
        >
          <CameraManager />
          <Suspense>
            <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
              <Html transform {...itemPlacement[classroom].board} distanceFactor={1} />
              <Environment preset="sunset" />
              <ambientLight color="pink" />

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
              />
            </Float>
          </Suspense>
        </Canvas>
      </Card>
    </MuiBox>
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
      maxZoom={3}
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

useGLTF.preload('/models/classroom_default.glb');
useGLTF.preload('/models/classroom_alternative.glb');
