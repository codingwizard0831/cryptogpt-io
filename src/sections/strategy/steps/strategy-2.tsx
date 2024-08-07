// Desc: This file contains the content of the strategy dashboard.




import { useState } from 'react';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Stack, Select, styled, BoxProps, MenuItem, TextField, Typography, InputLabel, FormControl } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { useStrategy } from "src/store/strategy/useStrategy";

import DashboardStrategyImaganize from '../dashboard-strategy-imagazine';


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

interface DashboardStrategyStep1Props extends BoxProps {

};

export default function DashboardStrategyStep2({ sx, ...other }: DashboardStrategyStep1Props) {
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);
    const [value, setValue] = useState("Please input the message here");
    const isFocus = useBoolean();


    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    const handleSwapCoin = () => {
        const [temp1, temp2] = [coin1, coin2];
        setCoin1(temp2);
        setCoin2(temp1);
    }

    return <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Typography variant="h4" color="primary" sx={{ textAlign: "center", my: 2 }}>Input the details for your strategy</Typography>
        <Stack direction='row' alignItems="center" spacing={2} sx={{ width: '90%', mb: 2 }}>
            <Typography variant="h4" sx={{
                whitespace: 'nowrap',
            }}>2. Strategy detail for {coin1.name}/{coin2.name}</Typography>
        </Stack>


        <Box sx={{
            flex: 1,
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
        }}>
            <Box sx={{
                width: '100%',
                maxHeight: '460px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: 4,
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                <TextField label="Name" />
                <Box sx={{
                    width: '100%',
                    borderRadius: 1,
                    border: (theme: any) => `1px solid rgba(145, 158, 171, 0.2)`,
                    transition: 'all 0.3s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                    p: 1.5,
                    ...(isFocus.value ? {
                        border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                    } : {}),
                }}>
                    <Textarea
                        value={value}
                        placeholder="Desecription"
                        onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} sx={{
                            width: '100%'
                        }} />
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="space-around" spacing={4} sx={{ width: '100%' }}>
                    <TextField fullWidth label="Investment" />
                    <TextField fullWidth label="Stop loss" />
                    <TextField fullWidth label="Take profit" />
                </Stack>

                <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <InputLabel htmlFor="time-frame-label">Time frame</InputLabel>
                    <Select labelId="time-frame-label" id="time-frame" label="Time frame" value="5m" sx={{
                        border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                    }}>
                        <MenuItem value="5m">5m</MenuItem>
                        <MenuItem value="10m">10m</MenuItem>
                        <MenuItem value="15m">15m</MenuItem>
                        <MenuItem value="30m">30m</MenuItem>
                        <MenuItem value="1h">1h</MenuItem>
                        <MenuItem value="4h">4h</MenuItem>
                    </Select>
                </FormControl>

            </Box>

            <DashboardStrategyImaganize />
        </Box>
    </Box>
}