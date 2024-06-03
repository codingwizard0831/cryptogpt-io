

import { DeliverRestaurantDetailView } from 'src/sections/deliver/view';

export const metadata = {
    title: 'Dashboard: Deliver Restaurant Detail Page',
};

type Props = {
    params: {
        id: string;
        country: string;
        address: string;
    };
};

export default function Page({ params }: Props) {
    const { country, address, id } = params;
    return (
        <DeliverRestaurantDetailView id={id} country={country} address={address} />
    );
}