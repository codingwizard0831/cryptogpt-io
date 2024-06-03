import { DeliverRestaurantCreateGroupOrderView } from "src/sections/deliver/view";

export const metadata = {
    title: 'Dashboard: Deliver Restaurant - Create Group Order',
};

type Props = {
    params: {
        country: string;
        address: string;
        id: string;
    };
};

export default function Page({ params }: Props) {
    const { country, address, id } = params;
    return (
        <DeliverRestaurantCreateGroupOrderView />
    );
}