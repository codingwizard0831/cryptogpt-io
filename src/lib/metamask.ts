
// utils/metamask.js
const ethers = require('ethers');

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

export const connectWalletWithMetamask = async () => {
  const ethereum = window.ethereum as any;
  // Check if MetaMask is installed
  if (typeof ethereum !== "undefined" && ethereum.isMetaMask) {
    try {
      // Request access to the user's MetaMask accounts
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      // Get the connected Ethereum address
      const address = accounts[0];
      // Create an ethers.js provider using the injected provider from MetaMask
      const provider = new ethers.BrowserProvider(ethereum);
      // Get the account balance
      const balance = await provider.getBalance(address);
      // Get the network ID from MetaMask
      const network = await provider.getNetwork();
      console.log('Connected with Metamask:', address, balance, network);
      return { address, balance, network, error: null };
    } catch (e) {
      console.error(e);
      return { address: null, balance: null, network: null, error: e.message };
    }
  } else {
    console.error("MetaMask is not installed");
    return { address: null, balance: null, network: null, error: "MetaMask is not installed" };
  }
}

export const signMessageWithMetamask = async (nonce: string) => {
  const { ethereum } = window;
  // Check if MetaMask is installed
  if (typeof ethereum !== "undefined") {
    try {
      // Request access to the user's MetaMask accounts
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      // Get the connected Ethereum address
      const address = accounts[0];
      // Create an ethers.js provider using the injected provider from MetaMask
      const provider = new ethers.BrowserProvider(ethereum);
      // Get the account balance
      const balance = await provider.getBalance(address);
      // Get the network ID from MetaMask
      const network = await provider.getNetwork();
      console.log('Connected with Metamask:', address, balance, network);

      // Create a provider and get the signer
      const signer = await provider.getSigner();

      // Get the wallet address
      const wallet = await signer.getAddress();
      console.log('Wallet address:', wallet);

      const message = {
        address: await signer.getAddress(),
        nonce,
        expiration: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
      };
      const messageString = ethers.hashMessage(JSON.stringify(message));
      console.log('messageString:', messageString);
      const signature = await signer.signMessage(messageString);
      console.log('Signature:', signature);
      return { address, balance, network, wallet, signature, message, error: null };
    } catch (e) {
      console.log('1', e.info);
      let errorMesssage = e.message;
      if (e.info.error.code === 4001) {
        errorMesssage = "User rejected the request";
      } else {
        console.error(e);
      }
      return { address: null, balance: null, network: null, wallet: null, signature: null, message: null, error: errorMesssage };
    }
  } else {
    console.error("MetaMask is not installed");
    return { address: null, balance: null, network: null, wallet: null, signature: null, message: null, error: "MetaMask is not installed" };
  }
};

export const verifyMessageWithMetamask = async (message: any, signature: string) => {
  try {
    const messageString = JSON.stringify(message);
    const signerAddress = ethers.verifyMessage(ethers.hashMessage(messageString), signature);
    // Check if the message has expired
    if (message.expiration < Math.floor(Date.now() / 1000)) {
      console.log("Message expired");
      return {
        status: "error",
        error: "Message expired",
        signerAddress,
        originalAddress: message.address,
      };
    }

    console.log("Signer Address:", signerAddress);
    console.log("Original Address:", message.address);
    const isValid = signerAddress.toLowerCase() === message.address.toLowerCase();
    console.log("Verification result:", isValid);
    return {
      status: isValid ? "success" : "error",
      error: isValid ? "" : "Signature verification failed",
      signerAddress,
      originalAddress: message.address,
    };
  } catch (e) {
    console.error(e);
    return { status: "error", error: e.message, signerAddress: null, originalAddress: null };
  }
}