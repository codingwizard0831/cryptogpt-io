import { create } from "zustand";


interface UserProfileState {
    status: string[],
    setStatus: (v: string[]) => void,
}

export const useUserProfile = create<UserProfileState>((set, get) => ({
    status: ["online", "focused", "working"],
    setStatus: ((_data: string[]) => {
        set((state) => ({
            ...state,
            status: [..._data]
        }))
    })
}))