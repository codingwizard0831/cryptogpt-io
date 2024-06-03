import { DeliverRestaurantsByGroupView } from "src/sections/deliver/view";

export const metadata = {
    title: 'Dashboard: Deliver Restaurants By Group',
};

type Props = {
    params: {
        country: string;
        address: string;
        title: string;
    };
};

export default function Page({ params }: Props) {
    const { country, address, title } = params;
    return (
        <DeliverRestaurantsByGroupView title={title} />
    );
}