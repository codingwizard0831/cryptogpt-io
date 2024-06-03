'use client';

import DashboardDeliverLayout from 'src/layouts/dashboard/deliver';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <DashboardDeliverLayout>{children}</DashboardDeliverLayout>
    );
}
