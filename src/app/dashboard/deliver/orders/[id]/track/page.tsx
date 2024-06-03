import { DeliverOrderTrackView } from 'src/sections/deliver/view';

// ----------------------------------------------------------------------

export const metadata = {
    title: 'Dashboard: Deliver - Order Track',
};

type Props = {
    params: {
        id: string;
    };
};

export default function Page({ params }: Props) {
    const { id } = params;

    return <DeliverOrderTrackView id={id} />;
}
