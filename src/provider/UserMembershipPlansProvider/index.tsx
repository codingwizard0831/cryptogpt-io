'use client';

import React, { useMemo, useState, useEffect, useReducer, useContext, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import UserMembershipPlansContext from './context';
import { State, Action, UserMembershipPlan, UserMembershipPlanResult, CancelUserMembershipPlanResult } from './types';

const initState = () => ({
    userMembershipPlanList: [],
    userMembershipPlanDict: {},
    loadRequest: false,
    loadFailure: false,
    loadSuccess: false,
    loadHandles: [],
    loadError: null,
    loaded: false,
});

const handlers = {
    LOAD_REQUEST(state: State, action: Action): State {
        if (action.type === 'LOAD_REQUEST') {
            const { resolve, reject } = action.payload;
            if (state.loadRequest) {
                return {
                    ...state,
                    loadHandles: [...state.loadHandles, { resolve, reject }],
                }
            }
            return {
                ...state,
                loadRequest: true,
                loadFailure: false,
                loadSuccess: false,
                loadError: null,
                loadHandles: [{ resolve, reject }],
            }
        }
        return state;
    },

    LOAD_FAILURE(state: State, action: Action): State {
        if (action.type === 'LOAD_FAILURE' && state.loadRequest) {
            const { error } = action.payload;
            return {
                ...state,
                loadRequest: false,
                loadFailure: true,
                loadSuccess: false,
                loadError: error,
            };
        }
        return state;
    },

    LOAD_SUCCESS(state: State, action: Action): State {
        if (action.type === 'LOAD_SUCCESS' && state.loadRequest) {
            const { userMembershipPlanList } = action.payload;
            const userMembershipPlanDict: { [key: string]: UserMembershipPlan } = {};
            userMembershipPlanList.forEach(item => {
                userMembershipPlanDict[item.id] = item;
            })
            return {
                ...state,
                loadRequest: false,
                loadFailure: false,
                loadSuccess: true,
                loaded: true,
                userMembershipPlanList,
                userMembershipPlanDict,
            }
        }
        return state;
    },

    CANCEL_SUBSCRIPTION_SUCCESS(state: State, action: Action): State {
        if (action.type === 'CANCEL_SUBSCRIPTION_SUCCESS') {
            const { userMembershipPlan } = action.payload;
            const userMembershipPlanDict = { ...state.userMembershipPlanDict };
            const userMembershipPlanList = (() => {
                let changed = false;
                const filtered = state.userMembershipPlanList.map(item => {
                    if (item.id === userMembershipPlan.id) {
                        changed = true;
                        userMembershipPlanDict[item.id] = userMembershipPlan;
                        return userMembershipPlan;
                    }
                    return item;
                });
                return changed ? filtered : state.userMembershipPlanList;
            })();
            if (userMembershipPlanList === state.userMembershipPlanList) {
                return state;
            }
            return {
                ...state,
                userMembershipPlanList,
                userMembershipPlanDict,
            }

        }
        return state;
    },

    REMOVE_SUBSCRIPTION_SUCCESS(state: State, action: Action): State {
        if (action.type === 'REMOVE_SUBSCRIPTION_SUCCESS') {
            const { user_plan_id } = action.payload;
            const userMembershipPlanDict = { ...state.userMembershipPlanDict };
            const userMembershipPlanList = (() => {
                let changed = false;
                const filtered = state.userMembershipPlanList.map(item => {
                    if (item.id === user_plan_id) {
                        changed = true;
                        const changedItem = {
                            ...item,
                            is_active: false,
                            status: 'cancelled',
                        }
                        userMembershipPlanDict[item.id] = changedItem;
                        return changedItem;
                    }
                    return item;
                });
                return changed ? filtered : state.userMembershipPlanList;
            })();
            if (userMembershipPlanList === state.userMembershipPlanList) {
                return state;
            }
            return {
                ...state,
                userMembershipPlanList,
                userMembershipPlanDict,
            }

        }
        return state;
    }
}

function reducer(state: State, action: Action): State {
    const handler = handlers[action.type];
    return typeof handler === 'function' ? handler(state, action) : state;
}

interface Props {
    children: React.ReactNode;
}

export function UserMembershipPlansProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, null, initState);

    const {
        loadRequest, loadFailure, loadSuccess, loadHandles, loadError, userMembershipPlanList, userMembershipPlanDict, loaded
    } = state;

    const fetchUserMembershipPlans = (() => {
        const fn = async (resolve: (value: any) => void, reject: (reason?: any) => void) => {
            try {
                const res = await axios.post(endpoints.membership.userPlans);
                const { statusText, data }: UserMembershipPlanResult = res.data;
                if (statusText === "OK") {
                    resolve(data.map(item => item));
                } else if (res.status === 401) {
                    reject({
                        message: 'Unauthorized'
                    });
                } else {
                    setTimeout(() => {
                        fn(resolve, reject);
                    }, 500);
                }
            } catch (e) {
                reject(e);

            }
        }
        return () => new Promise(fn)
    })();

    const loadUserMembershipPlans = useCallback(() => new Promise((resolve, reject) => {
        dispatch({
            type: 'LOAD_REQUEST',
            payload: {
                resolve,
                reject,
            }
        })
    }), [dispatch]);

    const cancelUserMembershipPlan = useCallback((user_plan_id: number) => axios.post(endpoints.membership.cancelUserPlan, { user_plan_id })
        .then(({ status, data }) => {
            const { success, result }: CancelUserMembershipPlanResult = data;
            if (success) {
                dispatch({
                    type: 'CANCEL_SUBSCRIPTION_SUCCESS',
                    payload: {
                        userMembershipPlan: result,
                    }
                });
            } else if (status === 404) {
                dispatch({
                    type: 'REMOVE_SUBSCRIPTION_SUCCESS',
                    payload: {
                        user_plan_id
                    }
                });
            }
            return { status, success, result };
        })
        .catch((error) => {
            console.error('Error cancelling user membership plan:', error);
            throw error;
        }), [dispatch]);

    useEffect(() => {
        if (loadRequest) {
            fetchUserMembershipPlans().then((item) => {
                dispatch({
                    type: 'LOAD_SUCCESS',
                    payload: {
                        userMembershipPlanList: item
                    }
                })
            }).catch(e => {
                dispatch({
                    type: 'LOAD_FAILURE',
                    payload: {
                        error: e
                    }
                })
            });
        }
    }, [loadRequest, fetchUserMembershipPlans]);

    useEffect(() => {
        if (loadFailure) {
            loadHandles.forEach(item => {
                try {
                    item.reject(loadError);
                } catch (e) {
                    console.warn(e)
                }
            })
        }
    }, [loadFailure, loadHandles, loadError]);

    useEffect(() => {
        if (loadSuccess) {
            loadHandles.forEach(item => {
                try {
                    item.resolve(userMembershipPlanList)
                } catch (e) {
                    console.warn(e);
                }
            })
        }
    }, [loadSuccess, loadHandles, userMembershipPlanList]);

    const memoizedValue = useMemo(
        () => ({
            loadRequest,
            loadFailure,
            loadSuccess,
            loadHandles,
            loadError,
            userMembershipPlanList,
            userMembershipPlanDict,
            loaded,
            loadUserMembershipPlans,
            cancelUserMembershipPlan
        }),
        [loadRequest, loadSuccess, loadFailure, loadHandles, loadError, userMembershipPlanList, userMembershipPlanDict, loaded, loadUserMembershipPlans, cancelUserMembershipPlan]
    );

    return (
        <UserMembershipPlansContext.Provider value={memoizedValue}>{children}</UserMembershipPlansContext.Provider>
    );
}

export function useUserMembershipPlansContext() {
    const context = useContext(UserMembershipPlansContext);

    if (!context) throw new Error('useMembershipPlansContext context must be use inside MembershipPlansProvider');

    return context;
}

export function useLoadUserMembershipPlans() {
    const { loadUserMembershipPlans } = useUserMembershipPlansContext();
    return loadUserMembershipPlans;
}

export function useUserMembershipPlanList() {
    const { userMembershipPlanList } = useUserMembershipPlansContext();
    return userMembershipPlanList;
}

export function useActiveUserMembershipPlanList(): UserMembershipPlan[] {
    const userMembershipPlanList: UserMembershipPlan[] = useUserMembershipPlanList();

    const filter = useCallback((list: UserMembershipPlan[]): UserMembershipPlan[] => list
        .filter(item => item.is_active)
        .sort((a, b) => b.created_at - a.created_at), []);

    const [list, setList] = useState<UserMembershipPlan[]>(() => filter(userMembershipPlanList));

    useEffect(() => {
        setList(filter(userMembershipPlanList));
    }, [userMembershipPlanList, filter]);

    return list;
}

export function usePossibleSubsriptionUserMembershipPlanList(): UserMembershipPlan[] {
    const userMembershipPlanList = useUserMembershipPlanList();
    const filter = React.useCallback((list: UserMembershipPlan[]): UserMembershipPlan[] => list.filter(item => {
        if (item.is_active) {
            return true;
        }
        if (item.complete === false && item.status === 'open') {
            const created_at = new Date(item.created_at);
            if ((Date.now() - created_at.getTime()) < 5000) {
                return true;
            }
        }
        return false;
    }).sort((a, b) => b.created_at - a.created_at), []);
    const [list, setList] = React.useState(() => filter(userMembershipPlanList));
    React.useEffect(() => {
        setList(filter(userMembershipPlanList));
    }, [filter, userMembershipPlanList, setList]);
    return list;
}

export function useLastPossibleSubsriptionUserMembershipPlan() {
    const userMembershipPlanList = usePossibleSubsriptionUserMembershipPlanList();
    const getLastOne = useCallback((list: UserMembershipPlan[]) => list.length > 0 ? list[0] : null, []);
    const [lastOne, setLastOne] = React.useState(() => getLastOne(userMembershipPlanList));
    React.useEffect(() => {
        setLastOne(getLastOne(userMembershipPlanList));
    }, [getLastOne, userMembershipPlanList, setLastOne]);
    return lastOne;
}

export function useCancelUserMembershipPlan() {
    const { cancelUserMembershipPlan } = useUserMembershipPlansContext();
    return cancelUserMembershipPlan;
}