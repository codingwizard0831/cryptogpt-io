import { Box, Link, alpha, BoxProps, Typography } from "@mui/material";

import { RouterLink } from "src/routes/components";

import Image from "src/components/image";

export type DeliverDiscoveryItemType = {
    type: string;
    title: string;
    description: string;
    image: string;
    link: string;
};

export interface DeliverDiscoveryItemProps extends BoxProps {
    data: DeliverDiscoveryItemType,
}

export default function DeliverDiscoveryItem({ data, sx, ...other }: DeliverDiscoveryItemProps) {
    return (
        <Link href={data.link} component={RouterLink} sx={{
            width: '100%',
            display: 'block'
        }}>
            <Box sx={{
                width: '100%',
                aspectRatio: '16 / 9',
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover': {
                    '.wallpaper': {
                        transform: 'scale(1.2)',
                    }
                },
                ...sx,
            }} {...other}>
                <Image src={data.image} className="wallpaper" sx={{
                    width: '100%',
                    height: '100%',
                    transition: 'all 0.5s ease',
                }} />

                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '60%',
                    left: 0,
                    p: 2,
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.008) 8.1%, rgba(0, 0, 0, 0.024) 15.5%, rgba(0, 0, 0, 0.05) 22.5%, rgba(0, 0, 0, 0.086) 29%, rgba(0, 0, 0, 0.125) 35.3%, rgba(0, 0, 0, 0.173) 41.2%, rgba(0, 0, 0, 0.22) 47.1%, rgba(0, 0, 0, 0.27) 52.9%, rgba(0, 0, 0, 0.318) 58.8%, rgba(0, 0, 0, 0.365) 64.7%, rgba(0, 0, 0, 0.404) 71%, rgba(0, 0, 0, 0.44) 77.5%, rgba(0, 0, 0, 0.467) 84.5%, rgba(0, 0, 0, 0.482) 91.9%, rgba(0, 0, 0, 0.49) 100%)",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                    <Typography variant="overline" sx={{
                        color: theme => alpha(theme.palette.text.primary, 0.7),
                        mb: 2,
                    }}>{data.type}</Typography>
                    <Typography variant="h3" sx={{
                        color: 'text.primary',
                        lineHeight: '100%',
                        fontWeight: '900',
                        mb: 1,
                    }}>{data.title}</Typography>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                    }}>{data.description}</Typography>
                </Box>
            </Box>
        </Link>
    );
}