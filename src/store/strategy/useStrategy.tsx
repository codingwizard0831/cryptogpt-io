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
    setStep: (v: string) => void,
    setCoin1: (v: CoinType) => void,
    setCoin2: (v: CoinType) => void,
    setIsShowSummary: (v: boolean) => void,
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
}))