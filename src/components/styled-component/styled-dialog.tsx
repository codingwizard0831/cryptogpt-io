import { Dialog } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
    backgroundColor: 'transparent',
    '& .MuiBackdrop-root': {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(10px)',
    },
    '& .MuiDialog-container': {
        backgroundColor: 'transparent',
        '& .MuiDialog-paper': {
            backgroundColor: alpha(theme.palette.background.default, 0.4),
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            boxShadow: theme.shadows[10],
        },
    },
}));

export default StyledDialog;