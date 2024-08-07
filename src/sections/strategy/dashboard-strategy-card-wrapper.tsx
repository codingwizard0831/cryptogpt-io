// Desc: This file contains the content of the strategy dashboard.




import { Box, BoxProps } from '@mui/material';

import { useStrategy } from "src/store/strategy/useStrategy";


interface DashboardStrategyCardWrapperProps extends BoxProps {

};

export default function DashboardStrategyCardWrapper({ sx, ...other }: DashboardStrategyCardWrapperProps) {
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);


    return <Box sx={{
        width: '1280px',
        height: '400px',
        border: "1px solid white",
        backdropFilter: "blur(10px)",
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
        backgroundColor: 'black',
        ...sx,
    }} {...other}>
        test
    </Box>
}