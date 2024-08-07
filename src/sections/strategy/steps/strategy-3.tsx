// Desc: This file contains the content of the strategy dashboard.






import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Stack, styled, Select, BoxProps, MenuItem, TextField, Typography, InputLabel, IconButton, FormControl } from '@mui/material';

import { useStrategy } from "src/store/strategy/useStrategy";

import Iconify from 'src/components/iconify';

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

export default function DashboardStrategyStep3({ sx, ...other }: DashboardStrategyStep1Props) {
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);

    return <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Typography variant="h4" color="primary" sx={{ textAlign: "center", my: 2 }}>Review and Adjust Strategy</Typography>
        <Stack direction='row' alignItems="center" spacing={2} sx={{ width: '90%', mb: 2 }}>
            <Typography variant="h4" sx={{
                whitespace: 'nowrap',
            }}>3. Configure Indicators for {coin1.name}/{coin2.name}</Typography>
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
                <Stack direction="row" alignItems='center' spacing={2}>
                    <FormControl variant="outlined" sx={{ width: '100%' }}>
                        <InputLabel htmlFor="indicator-label">indicators</InputLabel>
                        <Select labelId="indicator-label" id="indicator" label="Time frame" value="5m" sx={{
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                        }}>
                            <MenuItem value="SMA">SMA</MenuItem>
                            <MenuItem value="EMA">EMA</MenuItem>
                            <MenuItem value="RSI">RSI</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField />
                    <Stack direction="row" alignItems='center' spacing={2}>
                        <FormControl variant="outlined" sx={{ width: '100%' }}>
                            <InputLabel htmlFor="add-indicator-label">Operator</InputLabel>
                            <Select labelId="add-indicator-label" id="add-indicator" label="Operator" value="5m" sx={{
                                border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                            }}>
                                <MenuItem value="plus">plus</MenuItem>
                                <MenuItem value="minus">minus</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <IconButton>
                        <Iconify icon="fa:trash" />
                    </IconButton>
                </Stack>
            </Box>

            <DashboardStrategyImaganize />
        </Box>
    </Box>
}