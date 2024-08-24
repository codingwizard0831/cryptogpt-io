import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useSDK } from '@metamask/sdk-react';

export const useMetaMask = () => {
  const { sdk, connected, connecting, provider } = useSDK();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [currentBalance, setCurrentBalance] = useState<string | null>(null); // TODO: Cache in db in the future

  const fetchBalance = async (account: string) => {
    if (provider == null || account == null) {
      return;
    }
    const ethersProvider = new ethers.BrowserProvider(provider);
    const balance = await ethersProvider.getBalance(account);
    setCurrentBalance(ethers.formatEther(balance));
  };

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();

      const account = accounts?.[0];

      setCurrentAccount(account);

      await fetchBalance(account);

      return account;
    } catch (ex) {
      console.warn('[MetaMask] Failed to connect.', ex);
    }

    return null;
  };

  useEffect(() => {
    if (provider == null) {
      return;
    }

    connect();

    provider.on('accountsChanged', (accounts: any) => {
      if (accounts.length === 0) {
        setCurrentAccount(null);
        setCurrentBalance(null);
      } else {
        setCurrentAccount(accounts[0]);
        connect();
      }
    });

    provider.on('disconnect', () => {
      setCurrentAccount(null);
      setCurrentBalance(null);
    });
  }, []);

  return { currentAccount, currentBalance, connect, connected, connecting, provider };
};
