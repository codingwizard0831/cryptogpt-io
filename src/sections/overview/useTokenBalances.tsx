import { formatUnits } from 'viem'
import { useToken, useAccount, useBalance } from 'wagmi'

// Define token addresses (use mainnet addresses)
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const CRGPT_ADDRESS = '0x50739bd5b6aff093ba2371365727c48a420a060d'
const DOT_ADDRESS = '0x7083609fce4d1d8dc0c979aab8c869ea2c873402'
const AVAX_ADDRESS = '0x85f138bfEE4ef8e540890CFb48F620571d67Eda3'
const SOL_ADDRESS = '0xD31a59c85aE9D8edEFeC411D448f90841571b89c'

export function useTokenBalances() {
    const { address } = useAccount()

    const { data: ethBalance } = useBalance({
        address,
    })

    const { data: usdtBalance } = useBalance({
        address,
        token: USDT_ADDRESS,
    })

    const { data: usdcBalance } = useBalance({
        address,
        token: USDC_ADDRESS,
    })

    const { data: crgptBalance } = useBalance({
        address,
        token: CRGPT_ADDRESS,
    })

    const { data: dotBalance } = useBalance({
        address,
        token: DOT_ADDRESS,
    })

    const { data: solBalance } = useBalance({
        address,
        token: SOL_ADDRESS,
    })

    const { data: avaxBalance } = useBalance({
        address,
        token: AVAX_ADDRESS,
    })

    // For custom tokens, fetch decimals
    const { data: crgptToken } = useToken({
        address: CRGPT_ADDRESS,
    })



    return {
        eth: ethBalance?.formatted || '0',
        usdt: usdtBalance ? formatUnits(usdtBalance.value, usdtBalance.decimals) : '0',
        usdc: usdcBalance ? formatUnits(usdcBalance.value, usdcBalance.decimals) : '0',
        crgpt: crgptBalance ? formatUnits(crgptBalance.value, crgptToken?.decimals || 18) : '0',
        dot: dotBalance ? formatUnits(dotBalance.value, dotBalance?.decimals) : '0',
        sol: solBalance ? formatUnits(solBalance.value, solBalance?.decimals) : '0',
        avax: avaxBalance ? formatUnits(avaxBalance.value, avaxBalance?.decimals) : '0',
    }
}