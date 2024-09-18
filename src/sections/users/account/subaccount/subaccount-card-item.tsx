
import { Box, alpha, BoxProps, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';

interface SubaccountCardItemProps extends BoxProps {
    data: any;
    isSelected?: boolean;
    isActive?: boolean;
    handleSelect: (data: any) => void;
    handleRemove: (data: any) => void;
}

export default function SubaccountCardItem({
    data,
    isSelected = false,
    isActive = false,
    handleSelect,
    handleRemove,
    sx,
    ...other
}: SubaccountCardItemProps) {
    return <Box sx={{
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 1,
        backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.03),
        border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
        width: '190px',
        p: 1.5,
        cursor: 'pointer',
        transition: 'all 0.3s',
        position: 'relative',
        ":hover": {
            backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.05),
            border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
            color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
            '& .badge': {
                backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.4),
            },
            '& .logo': {
                opacity: 1,
            },
            '& h6': {
                color: (theme: any) => alpha(theme.palette.primary.main, 0.8),
            },
            '& p': {
                color: (theme: any) => alpha(theme.palette.primary.main, 0.8),
            },
            "& .remove-btn": {
                opacity: 1,
                color: 'primary.main',
            },
        },
        ...(isActive && {
            backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.05),
            border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
            color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.8)}`,
            "& .remove-btn": {
                opacity: 1,
            },
        }),
        ...(isSelected && {
            backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.05),
            border: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
            color: (theme: any) => `solid 1px ${alpha(theme.palette.primary.main, 0.8)}`,
            "& .remove-btn": {
                opacity: 1,
            },
        }),
        ...sx,
    }}
        {...other}
        onClick={() => {
            handleSelect(data.id);
        }}
    >
        <Box className="badge" component="span" sx={{
            position: 'absolute',
            left: '6px',
            top: '6px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            transition: 'all 0.3s',
            backgroundColor: 'transparent',
            ...(isSelected && {
                backgroundColor: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
            }),
        }} />
        <Image className="logo" src={data.icon} alt={data.name} sx={{
            width: '36px',
            height: '36px',
            transition: 'all 0.3s',
            opacity: 0.5,
            ...((isSelected || isActive) && {
                opacity: 1,
            }),
        }} />
        <Typography variant='subtitle2' sx={{
            transition: 'all 0.3s',
            fontWeight: 'bold',
            ...(isSelected && {
                color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
            }),
        }}>{data.name}</Typography>
        <Typography variant='body2' sx={{
            transition: 'all 0.3s',
            fontSize: '12px',
            ...(isSelected && {
                color: (theme: any) => `${alpha(theme.palette.primary.main, 0.8)}!important`,
            }),
        }}>{data.link}</Typography>

        <Iconify icon="ep:select" className="remove-btn" sx={{
            position: 'absolute',
            right: '6px',
            top: '6px',
            transition: 'all 0.3s',
            color: 'primary.main',
            opacity: 0,
        }} onClick={() => {
            handleRemove(data.id);
        }} />
    </Box>
}