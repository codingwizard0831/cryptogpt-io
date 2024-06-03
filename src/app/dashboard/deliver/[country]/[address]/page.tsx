import { DeliverFindYourTasteView } from 'src/sections/deliver/view';

// ----------------------------------------------------------------------

export const metadata = {
    title: 'Dashboard: Deliver - Discovery',
};

type Props = {
    params: {
        country: string;
        address: string;
    };
};

export default function Page({ params }: Props) {
    const { country, address } = params;
    return <DeliverFindYourTasteView />;
}
