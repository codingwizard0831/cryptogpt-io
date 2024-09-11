'use client';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import { Box, Card, alpha } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAuthContext } from 'src/auth/hooks';
import { getUserProfileInfo } from 'src/auth/context/jwt/utils';
import { _userAbout, _userFeeds, _userFriends, _userFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfilePosts from '../profile-posts';
import ProfileFriends from '../profile-friends';
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
        icon: <Iconify icon="et:strategy" width={24} />,
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
        icon: <Iconify icon="material-symbols:rewarded-ads" width={24} />,
    },
    {
        value: 'posts',
        label: 'Posts',
        icon: <Iconify icon="ic:baseline-post-add" width={24} />,
    },
];
// ---------------------------------------------------------------------

export default function DashboardProfileView() {
    const smUp = useResponsive('up', 'sm');

    const settings = useSettingsContext();

    const { user } = useAuthContext();

    const user_profile = getUserProfileInfo();

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
                // maxWidth: settings.themeStretch ? false : 'lg',
                p: smUp ? 2 : 1,
                flex: 1,
                borderRadius: 1,
                boxShadow: 2,
                overflowX: "hidden",
                overflowY: 'auto',
            }}>
                <Card
                    sx={{
                        mb: 3,
                        height: 290,
                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
                    }}
                >
                    <ProfileCover
                        role={_userAbout.role}
                        name={user_profile?.user_name}
                        avatarUrl={user_profile?.avatar}
                        coverUrl=""
                    />

                    <Tabs
                        value={currentTab}
                        onChange={handleChangeTab}
                        sx={{
                            width: 1,
                            bottom: 0,
                            zIndex: 9,
                            position: 'absolute',
                            [`& .${tabsClasses.flexContainer}`]: {
                                pr: { md: 3 },
                                justifyContent: {
                                    sm: 'center',
                                    md: 'flex-end',
                                },
                            },
                            "& .MuiTabs-indicator": {
                                backgroundColor: 'primary.main',
                            },
                            '& .MuiTab-root': {
                                fontSize: '14px',
                                px: 1,
                                py: 0.5,
                                width: {
                                    md: '96px',
                                    sm: 'auto',
                                },
                                height: {
                                    md: '86px',
                                    sm: 'auto',
                                },
                                ".MuiTab-iconWrapper": {
                                    mr: 0.25,
                                    fontSize: '28px',
                                },
                                "&.Mui-selected": {
                                    color: 'primary.main',
                                    backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
                                    borderRadius: '4px 4px 0px 0px',
                                    "& .MuiTab-iconWrapper": {
                                        color: 'primary.main',
                                    },
                                },
                            }
                        }}
                    >
                        {
                            TABS.map((tab) => (
                                <Tab key={tab.value} value={tab.value} icon={tab.icon} iconPosition={smUp ? "top" : 'start'} label={tab.label} />
                            ))
                        }
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

                {currentTab === 'posts' && <ProfilePosts />}
            </Card>
        </Box >
    );
}
