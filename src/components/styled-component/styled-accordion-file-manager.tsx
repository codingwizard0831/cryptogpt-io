import { Accordion } from "@mui/material";
import { styled } from "@mui/material/styles";


const StyledAccordionFileManager = styled(Accordion)(({ theme }) => ({
    '&.MuiAccordion-root': {
        boxShadow: 'none',
        '&.Mui-expanded': {
            margin: '0px', // Adjust this value to your needs
            backgroundColor: 'transparent',
            '& .MuiAccordionSummary-root': {
                margin: '0',
                paddingRight: '0px !improtant',
                minHeight: '48px',
                '& .MuiAccordionSummary-content': {
                    margin: '0',
                },
            },
            '& .MuiAccordionDetails-root': {
                padding: '0px 0px 0px 20px !important',
            },
        },
    },
}));

export default StyledAccordionFileManager;
