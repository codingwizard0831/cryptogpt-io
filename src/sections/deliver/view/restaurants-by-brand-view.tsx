'use client';


import { Container } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';

import DeliverRestaurantsGridByName from '../restaurants/restaurants-grid-by-name';


type Props = {
    brand: string;
};

export default function RestaurantsByBrandView({ brand = "" }: Props) {
    const settings = useSettingsContext();
    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{
            height: '100%',
            pb: 2,
        }}>
            <DeliverRestaurantsGridByName title={brand} />
        </Container>
    )
}