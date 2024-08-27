import { create } from "zustand";

export interface CoinType {
    name: string,
    symbol: string,
    [key: string]: string,
}

interface StrategyState {
    isShowSummary: boolean,
    step: string,
    coin1: CoinType,
    coin2: CoinType,
    isPreview: boolean,
    topAmountCase: any,
    selectedPair: string,
    timeframe: string,
    setIsPreview: (v: boolean) => void,
    setStep: (v: string) => void,
    setCoin1: (v: CoinType) => void,
    setCoin2: (v: CoinType) => void,
    setIsShowSummary: (v: boolean) => void,
    setTopAmountCase: (v: any) => void,
    setSelectedPair: (v: string) => void,
    setTimeframe: (v: string) => void,
}

export const useStrategy = create<StrategyState>((set, get) => ({
    isShowSummary: false,
    step: '1.2.choose-pair',
    coin1: {
        name: 'USDT',
        symbol: 'Tether'
    },
    coin2: {
        name: 'Bitcoin',
        symbol: 'Bitcon'
    },
    isPreview: false,
    topAmountCase: {
        value: 100,
        label: '100',
    },
    selectedPair: 'BTC/USDT',
    timeframe: '1h',
    setIsShowSummary: (v: boolean) => {
        set(() => ({
            isShowSummary: v,
        }))
    },
    setStep: (step: string) => {
        set(() => ({
            step
        }))
    },
    setCoin1: (coin1: CoinType) => {
        set(() => ({
            coin1,
        }));
    },
    setCoin2: (coin2: CoinType) => {
        set(() => ({
            coin2,
        }));
    },
    setIsPreview: (v: boolean) => {
        set(() => ({
            isPreview: v,
        }))
    },
    setTopAmountCase: (v: { value: number, label: string }) => {
        set((state) => ({
            ...state,
            topAmountCase: v,
        }));
    },
    setSelectedPair: (v: string) => {
        set(() => ({
            selectedPair: v,
        }))
    },
    setTimeframe: (v: string) => {
        set(() => ({
            timeframe: v,
        }))
    }
}))