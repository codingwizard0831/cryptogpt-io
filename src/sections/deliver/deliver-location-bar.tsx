import { Box, alpha, Typography, ButtonBase } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import Iconify from "src/components/iconify";

import DeliverAddAddressSection from "./address-section/deliver-add-address-section";
import DeliverChooseAddressSection from "./address-section/deliver-choose-address-section";
import DeliverChangeOrderDetailSection from "./order-section/deliver-change-order-details-section";

export default function DeliverLocationBar() {
    const downMd = useResponsive('down', 'md');

    return (
        <>
            <ButtonBase color='primary' sx={{
                display: 'flex',
                alignItems: 'center',
                width: downMd ? '0px' : 'auto',
                maxWidth: '300px',
                cursor: 'pointer',
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                ...(downMd ? { flex: 1 } : {}),
            }}>
                <Box sx={{
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Iconify icon="akar-icons:location" sx={{
                        color: 'primary.main',
                    }} />
                </Box>

                <Typography color="primary" variant="subtitle2" sx={{
                    flex: 1,
                    px: 2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>Greece, Athena, test, 24 test, test , test, test, test stress</Typography>
            </ButtonBase>

            <DeliverChooseAddressSection />
            <DeliverAddAddressSection />
            <DeliverChangeOrderDetailSection />
        </>
    );
}