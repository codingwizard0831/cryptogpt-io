import { create } from "zustand";

import { USER_STATUS, UserStatusType } from "src/components/user-status/user-status-item";


interface UserProfileState {
    status: string[],
    statusData: UserStatusType[],
    setStatus: (v: string[]) => void,
    setStatusData: (v: UserStatusType[]) => void,
}

export const useUserProfile = create<UserProfileState>((set, get) => ({
    status: ["online", "focused", "working"],
    statusData: USER_STATUS,
    setStatus: ((_data: string[]) => {
        set((state) => ({
            ...state,
            status: [..._data]
        }))
    }),
    setStatusData: ((_data: UserStatusType[]) => {
        set((state) => ({
            ...state,
            statusData: [..._data]
        }))
    })
}))