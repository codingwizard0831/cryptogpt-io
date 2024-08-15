import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';

// import Scene from 'src/components/background-graphic/background-graphic';

import Main from './main';
import Header from './header';
import NavMini from './nav-mini';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const nav = useBoolean();

  return (
    <>
      <Box sx={{
        zIndex: -1,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        backgroundImage: 'url(/images/bg-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* <Scene /> */}

      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <NavMini />

        <Main>{children}</Main>
      </Box>
    </>
  );
}
