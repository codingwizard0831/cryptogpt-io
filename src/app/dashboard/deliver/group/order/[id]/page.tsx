import { DeliverGroupOrderDetailView } from 'src/sections/deliver/view';

// ----------------------------------------------------------------------

export const metadata = {
    title: 'Dashboard: Deliver - Group Order Detail',
};

type Props = {
    params: {
        id: string;
    };
};

export default function Page({ params }: Props) {
    const { id } = params;

    return <DeliverGroupOrderDetailView id={id} />;
}
