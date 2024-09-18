import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProfileContainer from 'src/sections/users/profile/profile-container';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: 'User Profile',
    description: 'View user profile details',
};

// ----------------------------------------------------------------------

type Props = {
    params: {
        id: string;
    };
};

export default function UserProfilePage({ params }: Props) {
    const { id } = params;

    if (!id) {
        notFound();
    }

    return <ProfileContainer user_id={id} />;
}
