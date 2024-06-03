import { DeliverGroupOrderJoinView } from "src/sections/deliver/view";

export const metadata = {
    title: 'Dashboard: Deliver Group Order - Join Group Order',
};

type Props = {
    params: {
        id: string;
    };
};

export default function Page({ params }: Props) {
    const { id } = params;
    return (
        <DeliverGroupOrderJoinView id={id} />
    );
}