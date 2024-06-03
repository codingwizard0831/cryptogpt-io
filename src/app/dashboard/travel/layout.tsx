'use client';

import DashboardTravelLayout from 'src/layouts/dashboard/travel';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <DashboardTravelLayout>{children}</DashboardTravelLayout>
    );
}
