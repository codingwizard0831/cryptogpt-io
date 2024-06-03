import { useState } from "react";

import { Box, alpha, styled, Button, useTheme, TextField, IconButton, DialogTitle, DialogActions, DialogContent, InputAdornment } from "@mui/material";

import { paths } from 'src/routes/paths';
import { useActiveLink } from 'src/routes/hooks';

import { useBoolean } from "src/hooks/use-boolean";
import { useResponsive } from "src/hooks/use-responsive";

import Iconify from "src/components/iconify";
import { StyledDialog as StyledBasicDialog } from "src/components/styled-component";

const StyledDialog = styled(StyledBasicDialog)({
    '& .MuiDialog-container': {
        '& .MuiDialog-paper': {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
        },
    },
});

export default function DeliverSearchBar() {
    const isFocused = useBoolean(false);
    const downMd = useResponsive('down', 'md');
    const theme = useTheme();
    const searchDialog = useBoolean(false);
    const [searchText, setSearchText] = useState('');
    const isRestaurant = useActiveLink(`${paths.dashboard.deliver.restaurant}`);
    const isStore = useActiveLink(`${paths.dashboard.deliver.store}`);
    return (
        <>
            <IconButton color="primary" sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                display: downMd ? 'inline-flex' : 'none',
            }} onClick={searchDialog.onTrue}>
                <Iconify icon="ic:outline-search" sx={{
                    color: 'text.primary',
                }} />
            </IconButton>

            <Box color='primary'
                sx={{
                    width: '200px',
                    display: downMd ? 'none' : 'flex',
                    alignItems: 'center',
                    transition: 'all 1s ease',
                    cursor: 'pointer',
                    ...(isFocused.value ? { flex: 1, width: '100%' } : {}),
                }}
            >
                <TextField size="small"
                    fullWidth
                    placeholder="Search..."
                    color="primary"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="ic:outline-search" sx={{
                                    color: 'primary.main',
                                }} />
                            </InputAdornment>
                        ),
                    }}
                    onFocus={isFocused.onTrue}
                    onBlur={isFocused.onFalse}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            backdropFilter: 'blur(10px)',
                        },
                    }} />
            </Box>

            <StyledDialog open={searchDialog.value} onClose={searchDialog.onFalse} fullWidth maxWidth="sm">
                <Box sx={{
                    boxShadow: theme.customShadows.dialog,
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: alpha(theme.palette.background.default, 0.6),
                    position: 'relative',
                    pt: '50px',
                    mt: '50px',
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: '-50px',
                        left: 'calc(50% - 50px)',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        border: `5px solid ${alpha(theme.palette.divider, 0.2)}`,
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: `1px solid transparent`,
                            position: 'relative',
                        }}>
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                border: `2px solid ${alpha(theme.palette.divider, 0.2)}`,
                                position: 'relative',
                                overflowY: 'hidden',
                            }}>
                                <Box sx={{
                                    width: '100%',
                                    height: '50%',
                                    backdropFilter: 'blur(10px)',
                                    backgroundColor: alpha(theme.palette.background.default, 0.6),
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                }} />
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Iconify icon="ic:outline-search" sx={{
                                        width: 'calc(100% - 24px)',
                                        height: 'calc(100% - 24px)',
                                        color: 'primary.main',
                                    }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <DialogTitle>Search {isRestaurant ? "the restaurants" : ""}{isStore ? "the stores" : ""} near you</DialogTitle>

                    <DialogContent sx={{ color: 'text.secondary' }}>
                        <TextField
                            fullWidth
                            placeholder="Search..."
                            variant="outlined"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Iconify icon="ic:outline-search" sx={{
                                        }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button variant="outlined" onClick={searchDialog.onFalse}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={searchDialog.onFalse} autoFocus>
                            Search
                        </Button>
                    </DialogActions>
                </Box>
            </StyledDialog>
        </>
    );
}