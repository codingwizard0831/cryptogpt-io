import { Autocomplete } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    '& .MuiInputBase-root': {
        // Style for the input part
        color: theme.palette.text.primary,
    },
    '& .MuiAutocomplete-popupIndicator': {
        // Style for the popup indicator
        color: theme.palette.text.secondary,
    },
    '& .MuiAutocomplete-paper': {
        // This targets the paper component inside the dropdown
        backgroundColor: alpha(theme.palette.primary.main, 0.25), // Light primary color background
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', // Optional shadow for dropdown
        border: `1px solid ${theme.palette.divider}`, // Clean border around the dropdown
    },
    '& .MuiAutocomplete-option': {
        // This targets individual options inside the dropdown
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.35), // Hover effect
        },
        '&[data-focus="true"]': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2), // Focus state
        },
        '&[aria-selected="true"]': {
            backgroundColor: alpha(theme.palette.primary.main, 0.3), // Selected option
        },
    },
}));

export default StyledAutocomplete;