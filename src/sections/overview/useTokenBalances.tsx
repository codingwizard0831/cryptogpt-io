import { formatUnits } from 'viem'
import { useToken, useAccount, useBalance } from 'wagmi'

// Define token addresses (use mainnet addresses)
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const CRGPT_ADDRESS = '0x50739bd5b6aff093ba2371365727c48a420a060d'

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

    // For custom tokens, fetch decimals
    const { data: crgptToken } = useToken({
        address: CRGPT_ADDRESS,
    })

    return {
        eth: ethBalance?.formatted || '0',
        usdt: usdtBalance ? formatUnits(usdtBalance.value, usdtBalance.decimals) : '0',
        usdc: usdcBalance ? formatUnits(usdcBalance.value, usdcBalance.decimals) : '0',
        crgpt: crgptBalance ? formatUnits(crgptBalance.value, crgptToken?.decimals || 18) : '0',
    }
}