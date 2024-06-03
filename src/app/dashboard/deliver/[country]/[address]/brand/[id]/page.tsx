import { DeliverRestaurantsByBrandView } from 'src/sections/deliver/view';

// ----------------------------------------------------------------------

export const metadata = {
    title: 'Dashboard: Deliver - Restaurants By Brand',
};

type Props = {
    params: {
        id: string;
    };
};

export default function Page({ params }: Props) {
    const { id } = params;

    return <DeliverRestaurantsByBrandView brand={id} />;
}
