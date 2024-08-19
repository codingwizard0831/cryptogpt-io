import { mainnet, sepolia } from 'wagmi/chains'
import { http, createConfig, cookieStorage, createStorage } from 'wagmi'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

import { WEB3_WALLET_CONNECT_PROJECT_ID } from 'src/config-global'

// Get projectId at https://cloud.walletconnect.com
export const projectId = WEB3_WALLET_CONNECT_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
export const config = createConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http()
    },
    connectors: [
        coinbaseWallet({
            appName: metadata.name,
            appLogoUrl: metadata.icons[0]
        }),
        walletConnect({ projectId, metadata, showQrModal: false }),
        injected({ shimDisconnect: true }),
    ],
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
})