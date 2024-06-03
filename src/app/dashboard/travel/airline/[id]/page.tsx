

import { TravelAirlineDetailView } from 'src/sections/travel/airline/airline-detail-view';

export const metadata = {
    title: 'Dashboard: Travel Airline Detail',
};

type Props = {
    params: {
        id: string;
    };
};

export default function Page({ params }: Props) {
    const { id } = params;
    return (
        <TravelAirlineDetailView id={id} />
    );
}