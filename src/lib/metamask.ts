import { ethers } from 'ethers';
import { supabase } from './supabase';


interface MetaMaskLoginResponse {
  user: any;
  session: any;
  error: any;
}

export async function signInWithMetaMask(): Promise<MetaMaskLoginResponse | undefined> {
  if (!window.ethereum) {
    alert('MetaMask is not installed');
    return;
  }

  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Get provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Get user's Ethereum address
    const address = await signer.getAddress();

    // Sign a message
    const message = 'Sign this message to log in to the app';
    const signature = await signer.signMessage(message);

    // Send address and signature to Supabase
    const { data, error } = await supabase.auth.signIn({
      provider: 'ethereum',
      options: {
        address,
        signature,
      },
    });

    if (error) {
      console.error('Error signing in with MetaMask:', error);
      return;
    }

    return data;
  } catch (error) {
    console.error('MetaMask login error:', error);
  }
}
