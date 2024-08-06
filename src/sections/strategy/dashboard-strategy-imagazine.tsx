import { Box, BoxProps } from "@mui/material";

interface DashboardStrategyImaganizeProps extends BoxProps {

}

export default function DashboardStrategyImaganize({
    sx,
    ...other
}: DashboardStrategyImaganizeProps) {
    return <Box sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
        borderRadius: 1,
        backgroundColor: 'white',
        p: 1,
        ...sx,
    }} {...other}>
        Q & A
    </Box>
}