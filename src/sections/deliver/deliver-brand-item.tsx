import { Box, Link, alpha, BoxProps, Typography } from "@mui/material";

import { RouterLink } from "src/routes/components";

import Image from "src/components/image";

export type DeliverBrandItemType = {
    title: string;
    image: string;
    link: string;
};

export interface DeliverBrandItemProps extends BoxProps {
    data: DeliverBrandItemType,
}

export default function DeliverBrandItem({ data, sx, ...other }: DeliverBrandItemProps) {
    return (
        <Link href={data.link} component={RouterLink} sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
        }}>
            <Box sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                color: 'text.primary',
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                backdropFilter: 'blur(4px)',
                '&:hover': {
                    '.wallpaper': {
                        transform: 'scale(1.2)',
                    }
                },
                ...sx,
            }} {...other}>
                <Box sx={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    position: 'relative',
                }}>
                    <Image src={data.image} className="wallpaper" sx={{
                        width: '100%',
                        height: '100%',
                        transition: 'all 0.5s ease',
                    }} />
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                }}>
                    <Box sx={{
                        flex: 1,
                        width: 0,
                    }}>
                        <Typography variant="subtitle1" sx={{
                            color: 'text.primary',
                            width: '100%',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                        }}>{data.title}</Typography>
                    </Box>
                </Box>
            </Box>
        </Link>
    );
}