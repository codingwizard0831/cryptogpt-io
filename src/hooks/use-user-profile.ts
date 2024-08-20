import { useState, useEffect } from 'react';

import axios, { endpoints } from 'src/utils/axios';

// export type UserProfile = {
//     id: string;
//     username: string;
//     email: string;
//     languages: string[];
//     birthdate: string | null;
//     avatarUrl: string | null;
//     // Add any other fields that your user profile contains
// };

export const useUserProfile = () => {
    const [profile, setProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(endpoints.profile.index);
                console.log('response', response)
                setProfile(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch user profile');
                console.error('Error fetching user profile:', err);
            }
        };

        fetchProfile();
    }, [loading]);

    return { profile, loading, setLoading, error };
};