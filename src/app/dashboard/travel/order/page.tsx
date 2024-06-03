import React from 'react';

import { TravelOrdersView } from 'src/sections/travel/order/view';

export const metadata = {
    title: 'Dashboard: Travel Orders',
};

export default function Page() {
    return (
        <TravelOrdersView />
    );
}