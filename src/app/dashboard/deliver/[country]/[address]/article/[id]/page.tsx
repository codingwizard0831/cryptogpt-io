

import { DeliverArticleView } from 'src/sections/deliver/view';

export const metadata = {
    title: 'Dashboard: Deliver Article',
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
        <DeliverArticleView id={id} country={country} address={address} />
    );
}