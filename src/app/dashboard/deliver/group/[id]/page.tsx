'use client';

import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

type Props = {
    params: {
        id: string;
    };
};

export default function Page({ params }: Props) {
    const { id } = params;
    console.log(id);
    console.log(paths);

    if (id === "xxx") {
        redirect("/dashboard/deliver/group-order/xxx/join");
    } else {
        redirect("/404");
    }
}