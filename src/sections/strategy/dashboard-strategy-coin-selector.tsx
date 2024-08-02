// Desc: This file contains the content of the strategy dashboard.

import { Box, alpha, BoxProps, MenuItem, TextField, ButtonBase, Typography } from '@mui/material';

import Image from 'src/components/image/image';
import Iconify from 'src/components/iconify/iconify';
import { usePopover } from 'src/components/custom-popover';
import StyledPopover from 'src/components/styled-component/styled-popover';

interface DashboardStrategyCoinSelectorProps extends BoxProps {
    currency: string,
    handleChange?: (v: string) => void,
}

export default function DashboardStrategyCoinSelector({
    currency = "BNB",
    handleChange,
    sx,
    ...other }: DashboardStrategyCoinSelectorProps) {
    const coinListPopover = usePopover();

    const handleChangeCurrency = (v: string) => {
        if (handleChange) {
            handleChange(v);
        }
    }

    return <Box sx={{
        ...sx
    }} {...other}>
        <ButtonBase sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: 2,
            gap: 1,
            borderRadius: 1,
            border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
        }} onClick={coinListPopover.onOpen}>
            <Typography>{currency}</Typography>
            <Iconify icon="mingcute:down-fill" />
        </ButtonBase>

        <StyledPopover
            open={!!coinListPopover.open}
            anchorEl={coinListPopover.open}
            onClose={coinListPopover.onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: 2,
                // border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                borderRadius: 1,
                p: 1,
            }}>
                <TextField />
                <Box sx={{
                    width: '100%',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    maxHeight: '200px',
                }}>
                    {
                        ["BNB", "Bitcoin", "USDT", "USDC", "BNB", "BEBE", "TETE", "BEBE", "TETE"].map((item: any, index: number) =>
                            <MenuItem key={`key-${index}`} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s',
                                backgroundColor: 'transparent',
                                ...(item === currency && {
                                    backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.2),
                                })
                            }} onClick={() => handleChangeCurrency(item)}>
                                <Typography>{item}</Typography>
                                <Image src="/assets/images/bitcoin.png" alt="coin" sx={{
                                    width: '24px',
                                    height: '24px',
                                }} />
                            </MenuItem>
                        )
                    }
                </Box>
            </Box>
        </StyledPopover>
    </Box>
}