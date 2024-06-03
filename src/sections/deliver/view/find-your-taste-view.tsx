'use client';


import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

import FindYourTasteBrand from '../find-your-taste/find-your-taste-brand';
import FindYourTasteSocial from '../find-your-taste/find-your-taste-social';
import FindYourTasteCategory from '../find-your-taste/find-your-taste-category';
import FindYourTasteHelloWolter from '../find-your-taste/find-your-taste-hello-wolter';
import DeliverRestaurantsCarouselByName from '../restaurants/restaurants-carousel-by-name';

// ----------------------------------------------------------------------

export default function FindYourTasteView() {
    const settings = useSettingsContext();


    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <Box sx={{
                width: 1,
                height: 1,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <FindYourTasteHelloWolter />
                <DeliverRestaurantsCarouselByName title='Popular right now' />
                <DeliverRestaurantsCarouselByName title='Fast delivery' />
                <FindYourTasteCategory />
                <DeliverRestaurantsCarouselByName title='New restaurants on Wolt' />
                <DeliverRestaurantsCarouselByName title='Offers near you' />
                <DeliverRestaurantsCarouselByName title='Popular right now' />
                <FindYourTasteSocial />
                <DeliverRestaurantsCarouselByName title='Wallet friendly' />
                <FindYourTasteBrand />
                <DeliverRestaurantsCarouselByName title='Live tracking' />
            </Box>
        </Container>
    );
}