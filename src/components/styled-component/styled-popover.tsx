import { Popover } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const StyledPopover = styled(Popover)(({ theme }) => ({
    '&.MuiPopover-root': {
        zIndex: 101,
        '& .MuiPaper-root': {
            backdropFilter: "blur(10px)",
            backgroundColor: alpha(theme.palette.background.default, 0.1),
            boxShadow: `0px 2px 5px 0px ${alpha(theme.palette.divider, 0.2)}`,
            padding: "0px",
        }
    },
}));

export default StyledPopover;