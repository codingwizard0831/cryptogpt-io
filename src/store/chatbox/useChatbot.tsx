import { create } from "zustand";

interface ChatbotState {
    isShow: boolean,
    setIsShow: (v: boolean) => void,
}

export const useChatbot = create<ChatbotState>((set, get) => ({
    isShow: false,
    setIsShow: ((isShow) => {
        set(() => ({
            isShow
        }))
    })
}))