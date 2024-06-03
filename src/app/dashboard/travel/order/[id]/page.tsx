import React from 'react';

import TravelOrderDetailView from 'src/sections/travel/order/view/travel-order-detail-view';


export const metadata = {
    title: 'Dashboard: Travel Orders',
};

type Props = {
    params: {
        id: string;
    };
};

export default function Page({ params }: Props) {
    const { id } = params;

    return (
        <TravelOrderDetailView id={id} />
    );
}