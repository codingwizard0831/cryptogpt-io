import { DeliverRestaurantCheckoutView } from "src/sections/deliver/view";

export const metadata = {
    title: 'Dashboard: Deliver Checkout',
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
        <DeliverRestaurantCheckoutView country={country} address={address} id={id} />
    );
}