import { create } from "zustand";

export interface CoinType {
    name: string,
    symbol: string,
    [key: string]: string,
}

interface StrategyState {
    isShowSummary: boolean,
    step: string,
    settingTypeIn1step: string,
    coin1: CoinType,
    coin2: CoinType,
    isPreview: boolean,
    topAmountCase: any,
    selectedPair: string,
    timeframe: string,
    internetNoise: any[],
    dataSources: any[],
    strategyForge: any[],
    setIsPreview: (v: boolean) => void,
    setStep: (v: string) => void,
    setSettingTypeIn1step: (v: string) => void,
    setCoin1: (v: CoinType) => void,
    setCoin2: (v: CoinType) => void,
    setIsShowSummary: (v: boolean) => void,
    setTopAmountCase: (v: any) => void,
    setSelectedPair: (v: string) => void,
    setTimeframe: (v: string) => void,
    setInternetNoise: (v: any[]) => void,
    addInternetNoise: (v: any) => void,
    removeInternetNoise: (v: number) => void,
    toggleInternetNoise: (v: number) => void,
    updateDataSource: (index: number, value: any) => void,
    setStrategyForge: (v: any[]) => void,
}

export const useStrategy = create<StrategyState>((set, get) => ({
    isShowSummary: false,
    step: '1.2.choose-pair',
    settingTypeIn1step: "basic",
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
    internetNoise: [
        {
            name: 'Ai news',
            logo: '/images/news-publishing-svgrepo-com.svg',
            startColor: '#fff',
            endColor: '#000',
            isActive: true,
        },
        {
            name: 'Google Trends',
            logo: '/images/google-icon-logo-svgrepo-com.svg',
            startColor: '#4285F4',
            endColor: '#34A853',
            isActive: false,
        },
        {
            name: 'Reddit',
            logo: '/images/reddit-svgrepo-com.svg',
            startColor: '#FF4500',
            endColor: '#FF5700',
            isActive: true,
        },
        {
            name: 'X Tweets',
            logo: '/images/twitter-svgrepo-com.svg',
            startColor: '#1DA1F2',
            endColor: '#14171A',
            isActive: false,
        },
    ],
    dataSources: [
        {
            name: 'Pyth Network',
            logo: '/images/logo-pyth.svg',
            startColor: '#fff',
            endColor: '#000',
            isSelected: true,
            apiKey: '',
            secretKey: '',
        },
        {
            name: 'Binance',
            logo: '/images/logo-binance.svg',
            startColor: "#F0B90B",
            endColor: "#14171A",
            isSelected: false,
            apiKey: '',
            secretKey: '',
        },
        {
            name: 'MEXC',
            logo: '/images/twitter-svgrepo-com.svg',
            startColor: '#1DA1F2',
            endColor: '#14171A',
            isSelected: true,
            apiKey: '',
            secretKey: '',
        },
        {
            name: 'OKX',
            logo: '/images/logo-okex.svg',
            startColor: '#1DA1F2',
            endColor: '#14171A',
            isSelected: false,
            apiKey: '',
            secretKey: '',
        },
    ],
    strategyForge: [],
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
    setSettingTypeIn1step: (v: string) => {
        set(() => ({
            settingTypeIn1step: v,
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
    },
    setInternetNoise: (v: any[]) => {
        set(() => ({
            internetNoise: [...v],
        }))
    },
    addInternetNoise: (v: any) => {
        set((state) => ({
            internetNoise: [...state.internetNoise, v],
        }))
    },
    removeInternetNoise: (v: number) => {
        set((state) => ({
            internetNoise: state.internetNoise.filter((_, index) => index !== v),
        }))
    },
    toggleInternetNoise: (v: number) => {
        set((state) => ({
            internetNoise: state.internetNoise.map((item, index) => {
                if (index === v) {
                    return {
                        ...item,
                        isActive: !item.isActive,
                    }
                }
                return item;
            })
        }))
    },
    updateDataSource: (index: number, value: any) => {
        set((state) => ({
            dataSources: state.dataSources.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        ...value,
                    }
                }
                return item;
            })
        }))
    },
    setStrategyForge: (v: any[]) => {
        set(() => ({
            strategyForge: [...v],
        }))
    }
}))