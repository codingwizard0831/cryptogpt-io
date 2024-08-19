'use client';

import { useState } from 'react';
import { degToRad } from 'three/src/math/MathUtils';

import { Box, Card, Link, Button, styled } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useStrategy } from 'src/store/strategy/useStrategy';
import { useAITeacher } from 'src/store/strategy/useAITeacher';

import DashboardStrategyContent from '../dashboard-strategy-content';



const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
box-sizing: border-box;
width: 100%;
font-size: 0.875rem;
font-weight: 400;
line-height: 1.5;
border: none;
outline: none;
resize: none;
color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
background: transparent;
`,
);

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
    card: {
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
    card: {
      position: [0.45, -1.22, -6],
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
    card: { position: [1.4, 0.84, -8] },
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
  const [text, setText] = useState('');
  const isFocus = useBoolean();

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
          gap: 1,
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <Link href={paths.dashboard.strategy.beta} component={RouterLink}>
            <Button variant="outlined">
              Beta (3D)
            </Button>
          </Link>
        </Box>

        <DashboardStrategyContent sx={{
          flex: 1,
          height: 0,
        }} />
      </Card>
    </Box>
  );
}
