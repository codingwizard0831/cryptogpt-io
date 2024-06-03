import { DeliverRestaurantsByGroupView } from "src/sections/deliver/view";

export const metadata = {
    title: 'Dashboard: Deliver Restaurants By Group',
};

type Props = {
    params: {
        country: string;
    };
};

export default function Page({ params }: Props) {
    const { country } = params;
    return (
        <DeliverRestaurantsByGroupView title={country} />
    );
}