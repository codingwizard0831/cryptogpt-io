'use client';

import { Box, Link, alpha, Avatar, Typography, IconButton, Breadcrumbs } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import Image from 'src/components/image';
import Iconify from "src/components/iconify";

type Props = {
    id: string;
    country: string;
    address: string;
};

export default function DeliverArticleView({ id, country, address }: Props) {
    const upSm = useResponsive('up', 'sm');

    return (
        <Box sx={{
            width: 1,
            height: 1,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
            }}>
                <Breadcrumbs>
                    <Link color="inherit" href="#">
                        Deliver
                    </Link>
                    <Link color="inherit" href='#'>
                        {country}
                    </Link>
                    <Link color="inherit" href='#'>
                        {address}
                    </Link>
                    <Link color="inherit" href='#'>
                        article
                    </Link>
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.primary',
                        }}
                    >
                        {id}
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Box maxWidth="lg" sx={{
                mx: 'auto',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        width: upSm ? 'calc(100% - 48px)' : 'calc(100% - 32px)',
                        my: 2,
                    }}>
                        <Typography variant="body2" sx={{
                            color: 'text.secondary',
                            mb: 2,
                        }}>6€ for your friend, 6€ for you</Typography>
                        <Typography variant="h3">BRING YOUR FRIENDS TO WOLT</Typography>
                    </Box>

                    <Image src="/assets/images/deliver/2.avif" alt="Alaska Airlines"
                        sx={{
                            width: 1,
                            my: 2,
                        }}
                    />

                    <Box sx={{
                        width: upSm ? 'calc(100% - 48px)' : 'calc(100% - 32px)',
                        my: 2,
                    }}>
                        <Typography variant="body2">Published:</Typography>
                        <Typography variant="body2" sx={{
                            mb: 4,
                        }}>February 26, 2024</Typography>

                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            mb: 4,
                        }}>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                p: 2,
                                backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                                backdropFilter: 'blur(10px)',
                                boxShadow: 3,
                                borderRadius: 1,
                                gap: 1,
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}>
                                    <Avatar src="/assets/images/icons/facebook.svg" alt="Facebook" />
                                    <Box>
                                        <Typography variant="subtitle1" sx={{
                                            fontWeight: 600,
                                        }}>Kassandra</Typography>
                                        <Typography variant="body2" sx={{
                                            color: 'text.secondary',
                                        }}>part of the welcome squad 💙</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}>
                                    <Link href="#">
                                        <IconButton sx={{
                                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                                        }}>
                                            <Iconify icon="ic:baseline-facebook" sx={{
                                                color: theme => theme.palette.primary.main,
                                            }} />
                                        </IconButton>
                                    </Link>
                                    <Link href="#">
                                        <IconButton sx={{
                                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                                        }}>
                                            <Iconify icon="mdi:twitter" sx={{
                                                color: theme => theme.palette.primary.main,
                                            }} />
                                        </IconButton>
                                    </Link>
                                </Box>
                            </Box>
                        </Box>

                        <Typography variant="h5" sx={{ mb: 2 }}>Win-win! Share your code with a friend and you&apos;ll both get a gift </Typography>
                        <Typography sx={{ mb: 2 }}>It&apos;s the definition of a win-win situation! Invite your friend to Wolt (or your mum, your boss, your weird neighbor, whoever one you want) using your referral code and you&apos;ll both win Wolt credits.</Typography>

                        <Typography>🤔 How are you going to do that, you ask?</Typography>
                        <Typography>1. Go to your profile by pressing the icon on the far right corner of your screen</Typography>
                        <Typography>2. Choose &quot;Earn Wolt credits&quot;</Typography>
                        <Typography>3. Click &quot;Share your referral code&quot; and send it to anyone you like</Typography>
                        <Typography sx={{ mb: 2 }}>4. Your friends win 2€ for each of their first 3 orders and you win 2€ for each of these 3 orders when they&apos;re delivered.</Typography>

                        <Typography>Spread the word! 💙</Typography>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}