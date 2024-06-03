import React from "react";
import Link from "next/link";

import { Box, alpha, Radio, Button, Divider, Checkbox, IconButton, Typography, RadioGroup } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import Label from "src/components/label";
import Iconify from "src/components/iconify";
import Image from "src/components/image/image";
import CountInput from "src/components/count-input";
import { useLightBox } from "src/components/lightbox";
import Lightbox from "src/components/lightbox/lightbox";
import { StyledDialog } from "src/components/styled-component";


export default function DeliverProductDetailItem() {
    const changeOrderDetailsDialog = useBoolean(true);

    const slides = [{
        src: '/assets/images/deliver/restaurant/1.avif',
    }, {
        src: '/assets/images/deliver/restaurant/2.avif',
    }]

    const lightbox = useLightBox(slides);

    return <StyledDialog open={changeOrderDetailsDialog.value}>
        <Box sx={{
            width: '90vw',
            maxWidth: '500px',
            borderRadius: '8px',
            overflow: 'hidden',
        }}>
            <Box sx={{
                overflowX: 'hidden',
                overflowY: 'auto',
                maxHeight: '80vh',
                position: 'relative',
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 10,
                }}>
                    <IconButton sx={{
                        color: theme => theme.palette.error.main,
                        backgroundColor: theme => alpha(theme.palette.error.main, 0.9),
                    }} onClick={changeOrderDetailsDialog.onFalse}>
                        <Iconify icon="material-symbols:close" sx={{
                            color: theme => theme.palette.grey[50],
                        }} />
                    </IconButton>
                </Box>

                <Box sx={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    zIndex: 10,
                }}>
                    <IconButton sx={{
                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.9),
                    }} onClick={() => lightbox.onOpen("/assets/images/deliver/restaurant/1.avif")}>
                        <Iconify icon="lucide:zoom-in" sx={{
                            color: theme => theme.palette.grey[50],
                        }} />
                    </IconButton>
                </Box>

                <Box sx={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                }}>
                    <Image src="/assets/images/deliver/restaurant/1.avif" alt="Alaska Airlines" sx={{
                        width: '100%',
                        height: '100%',
                    }} />
                </Box>


                <Lightbox
                    index={lightbox.selected}
                    slides={slides}
                    open={lightbox.open}
                    close={lightbox.onClose}
                    disabledZoom={false}
                    disabledTotal
                    disabledVideo
                    disabledCaptions
                    disabledSlideshow
                    disabledThumbnails={false}
                    disabledFullscreen
                />


                <Box sx={{
                    px: 2,
                }}>
                    <Typography variant="h4" sx={{
                        fontWeight: 600,
                        mt: 2,
                        mb: 1,
                    }}>Sailor Jerry Rum 70cl
                    </Typography>
                    <Typography variant="body2" sx={{
                        fontSize: '12px',
                        fontWeight: 400,
                        color: theme => theme.palette.text.primary,
                    }}>1 pc, 1% vol</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        mb: 2,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}>
                            <Typography variant="body2" sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                                color: theme => theme.palette.primary.main,
                            }}>€22.20</Typography>
                            <Label color="warning" sx={{ ml: 1 }}>18+</Label>
                        </Box>
                        <Typography variant="body2" sx={{
                            flex: 1,
                            fontSize: '12px',
                            textAlign: 'right',
                            fontWeight: 400,
                            color: theme => theme.palette.text.secondary,
                        }}>€22.20/pc</Typography>
                    </Box>

                    <Button sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 1,
                        overflow: 'hidden',
                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                        transition: 'all 0.3s',
                        boxShadow: 3,
                        py: 1,
                        pl: 2,
                        pr: 1,
                        gap: 1,
                        mb: 2,
                        '&:hover': {
                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                            transform: 'scale(1.02)',
                        }
                    }}>
                        <Typography variant="body2" sx={{
                            fontSize: '12px',
                            width: '100%',
                            lineHeight: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'left',
                            color: theme => theme.palette.text.primary,
                        }}>-5€ on your 1st order. Minimum order value 10€.</Typography>
                        <Iconify icon="iconamoon:discount" sx={{
                            color: theme => theme.palette.primary.main,
                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                            width: '36px',
                            height: '36px',
                            p: 0.5,
                            borderRadius: '50%',
                            transform: 'scale(2)',
                            position: 'relative',
                        }} />
                    </Button>

                    <Typography variant="body2" sx={{
                        fontSize: '12px',
                        fontWeight: 400,
                        color: theme => theme.palette.text.secondary,
                        mb: 2,
                    }}>Sailor Jerry is a straight-up, no-nonsense rum. We craft the spirit from a selection of rums distilled in the Caribbean. Our master blenders the rums to our exacting recipe, then infuse it with our one-of-a-kind mix of spices and other natural flavors, most notably vanilla and a touch of cinnamon. The result is high-quality, old-school spiced rum. An enduring classic, not a fly-by-night fancy
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{
                        mb: 2,
                    }}>
                        <Box sx={{
                            mb: 2,
                        }}>
                            <Typography variant="subtitle2" sx={{
                                fontWeight: 600,
                                my: 1,
                            }}>Choose base for medium pizza</Typography>
                            <RadioGroup name="pizza" value="tomato" onChange={(e) => { }}>
                                {
                                    pizzaDummyData.map((item) => (
                                        <Box key={item.id} sx={{
                                            display: 'flex',
                                        }}>
                                            <Radio />
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}>
                                                <Typography variant="body2">{item.title}</Typography>
                                                <Typography variant="body2">{item.cost}</Typography>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </RadioGroup>
                        </Box>

                        <Box sx={{
                            mb: 2,
                        }}>
                            <Typography variant="subtitle2" sx={{
                                fontWeight: 600,
                                my: 1,
                            }}>Choose base for medium pizza</Typography>
                            {
                                pizzaDummyData.map((item) => (
                                    <Box key={item.id} sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 1,
                                    }}>
                                        <Checkbox />
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            flex: 1,
                                        }}>
                                            <Typography variant="body2">{item.title}</Typography>
                                            <Typography variant="body2">{item.cost}</Typography>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                        <Divider />
                    </Box>

                    <Link href="/" target="_blank">
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}>
                            <Typography variant="body2" sx={{
                                fontSize: '16px',
                                fontWeight: 400,
                                mb: 1,
                                color: theme => theme.palette.primary.main,
                            }}>Report</Typography>
                            <Iconify icon="iconamoon:arrow-right-2-duotone" sx={{
                                color: theme => theme.palette.primary.main,
                            }} />
                        </Box>
                    </Link>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                gap: 2,
            }}>
                <CountInput value={1} onValueChange={(v) => { }} />
                <Button variant='contained' sx={{
                    flex: 1,
                    borderRadius: 1,
                    backgroundColor: theme => theme.palette.primary.main,
                    color: theme => theme.palette.primary.contrastText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': {
                        backgroundColor: theme => theme.palette.primary.dark,
                    }
                }}>
                    <Typography variant="body1">Add to cart</Typography>
                    <Typography variant="body1">1.10</Typography>
                </Button>
            </Box>
        </Box>
    </StyledDialog>
}

const pizzaDummyData = [
    {
        id: '1',
        title: 'tomato sauce',
        cost: 1.10,
    },
    {
        id: '2',
        title: 'white garlic sauce',
        cost: 1.10,
    },
    {
        id: '3',
        title: 'white garlic sauce',
        cost: 1.10,
    },
    {
        id: '4',
        title: 'white garlic sauce',
        cost: 1.10,
    },
    {
        id: '5',
        title: 'white garlic sauce',
        cost: 1.10,
    },
    {
        id: '6',
        title: 'white garlic sauce',
        cost: 1.10,
    },
    {
        id: '7',
        title: 'white garlic sauce',
        cost: 1.10,
    },
    {
        id: '8',
        title: 'white garlic sauce',
        cost: 1.10,
    },
]