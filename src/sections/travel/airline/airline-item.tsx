import React from 'react';

import { Box, Link, alpha, BoxProps, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

export type AirlineItemData = {
    key: string,
    status: string,
    showAirlineInDashboard: boolean,
    name: string,
    iataCode: string,
    sourceId: string,
    direct: boolean,
    market: string,
    continent: string,
    parentCarrier: string,
    alliance: string,
    flagCarrier: string,
    type: string,
    destinationCount: string,
    countriesCount: string,
    hub: string,
    exampleOrigin: string,
    exampleDestination: string,
    featureSeatSelection: string,
    featureBaggage: string,
    featureBaggageAllowance: string,
    featurePrivateFares: string,
    featureVoid: string,
    featureCancellation: string,
    featureLoyaltyProgramme: string,
    featureHoldOrderPayLater: string,
    featureChanges: string,
    featureOfferAndOrderConditions: string,
    copy: string,
    logosMarqueeRank: string,
    offersPublicApi: boolean,
    pax2019: string,
}

export interface AirlineItemProps extends BoxProps {
    data: AirlineItemData;
}

export default function AirlineItem({ data, sx, ...other }: AirlineItemProps) {
    return (
        <Link href={`${paths.dashboard.travel.airline}/${data.iataCode}`} component={RouterLink} underline="none">
            <Box sx={{
                border: theme => `solid 1px ${alpha(theme.palette.divider, 0.2)}`,
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                transition: 'all .3s',
                cursor: 'pointer',
                p: 2,
                '&:hover': {
                    border: theme => `solid 1px ${alpha(theme.palette.divider, 0.4)}`,
                },
            }}>
                <Image src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BP.svg" alt="solar-slider-1" sx={{
                    width: '32px',
                    height: '32px',
                    objectFit: 'cover',
                    mb: 2,
                }} />
                <Typography variant='subtitle1' sx={{ color: theme => theme.palette.text.primary }}>Alaska Airlines</Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 4,
                }}>
                    <Typography variant='caption' sx={{
                        color: theme => theme.palette.text.primary,
                        mr: 2,
                    }}>Europe</Typography>
                    <Typography variant='caption' sx={{
                        color: theme => theme.palette.text.secondary,
                        mr: 2,
                    }}>Star Alliance</Typography>
                    <Label variant="filled" sx={{
                        backgroundColor: theme => alpha(theme.palette.divider, 0.2),
                        color: theme => theme.palette.text.secondary,
                        fontWeight: '400',
                    }}>GDS</Label>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: theme => theme.palette.text.secondary,

                }}>
                    <Iconify icon="solar:star-fall-bold-duotone" />
                    <Iconify icon="mdi:search" />
                    <Iconify icon="gridicons:refund" />
                    <Iconify icon="mdi:bag-suitcase-outline" />
                    <Iconify icon="mdi:seat-passenger" />
                    <Iconify icon="material-symbols:airplane-ticket-outline" />
                    <Iconify icon="fluent:payment-20-regular" />
                </Box>
            </Box>
        </Link>
    );
}