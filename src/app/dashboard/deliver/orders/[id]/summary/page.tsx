import { DeliverOrderSummaryView } from 'src/sections/deliver/view';

// ----------------------------------------------------------------------

export const metadata = {
    title: 'Dashboard: Deliver - Order Summary',
};

type Props = {
    params: {
        id: string;
    };
};

export default function Page({ params }: Props) {
    const { id } = params;

    return <DeliverOrderSummaryView id={id} />;
}
