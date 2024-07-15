'use client';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import { Box, Card } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAuthContext } from 'src/auth/hooks';
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfileFriends from '../profile-friends';
import ProfileGallery from '../profile-gallery';
import ProfileFollowers from '../profile-followers';

// ---------------------------------------------------------------------

const TABS = [
    {
        value: 'profile',
        label: 'Profile',
        icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    {
        value: 'strategies',
        label: 'Strategies',
        icon: <Iconify icon="ant-design:project-outlined" width={24} />,
    },
    {
        value: 'followers',
        label: 'Followers',
        icon: <Iconify icon="solar:heart-bold" width={24} />,
    },
    {
        value: 'friends',
        label: 'Friends',
        icon: <Iconify icon="tabler:friends" width={24} />,
    },
    {
        value: 'team',
        label: 'Team',
        icon: <Iconify icon="fluent:people-team-16-filled" width={24} />,
    },
    {
        value: 'group',
        label: 'Group',
        icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
    },
    {
        value: 'organization',
        label: 'Organization',
        icon: <Iconify icon="clarity:organization-line" width={24} />,
    },
    {
        value: 'rewards',
        label: 'Rewards',
        icon: <Iconify icon="clarity:organization-line" width={24} />,
    },
];
// ---------------------------------------------------------------------

export default function DashboardProfileView() {
    const smUp = useResponsive('up', 'sm');

    const settings = useSettingsContext();

    const { user } = useAuthContext();

    const [searchFriends, setSearchFriends] = useState('');

    const [currentTab, setCurrentTab] = useState('profile');

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const handleSearchFriends = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFriends(event.target.value);
    }, []);

    return (
        <Box sx={{
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Card sx={{
                width: '100%',
                maxWidth: settings.themeStretch ? false : 'lg',
                p: smUp ? 2 : 1,
                flex: 1,
                borderRadius: 1,
                boxShadow: 2,
                overflowX: "hidden",
                overflowY: 'auto',
            }}>
                <CustomBreadcrumbs
                    heading="Profile"
                    links={[
                        { name: 'Dashboard', href: paths.dashboard.root },
                        { name: 'User' },
                        { name: 'user1' },
                    ]}
                    sx={{
                        mb: { xs: 3, md: 5 },
                    }}
                />

                <Card
                    sx={{
                        mb: 3,
                        height: 290,
                    }}
                >
                    <ProfileCover
                        role={_userAbout.role}
                        name={user?.displayName}
                        avatarUrl={user?.photoURL}
                        coverUrl={_userAbout.coverUrl}
                    />

                    <Tabs
                        value={currentTab}
                        onChange={handleChangeTab}
                        sx={{
                            width: 1,
                            bottom: 0,
                            zIndex: 9,
                            position: 'absolute',
                            bgcolor: 'background.paper',
                            [`& .${tabsClasses.flexContainer}`]: {
                                pr: { md: 3 },
                                justifyContent: {
                                    sm: 'center',
                                    md: 'flex-end',
                                },
                            },
                        }}
                    >
                        {TABS.map((tab) => (
                            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
                        ))}
                    </Tabs>
                </Card>

                {currentTab === 'profile' && <ProfileHome info={_userAbout} posts={_userFeeds} />}

                {currentTab === 'followers' && <ProfileFollowers followers={_userFollowers} />}

                {currentTab === 'friends' && (
                    <ProfileFriends
                        friends={_userFriends}
                        searchFriends={searchFriends}
                        onSearchFriends={handleSearchFriends}
                    />
                )}

                {currentTab === 'gallery' && <ProfileGallery gallery={_userGallery} />}
            </Card>
        </Box>
    );
}
