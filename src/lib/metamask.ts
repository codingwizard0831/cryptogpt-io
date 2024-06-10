// utils/metamask.js
const ethers = require('ethers');

declare global {
  interface Window { ethereum: any; }
}

export const signInWithMetamask = async () => {
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
      // Update state with the results
      // setAccountData({
      //   address,
      //   balance: ethers.formatEther(balance),
      //   // The chainId property is a bigint, change to a string
      //   chainId: network.chainId.toString(),
      //   network: network.name,
      // });

      // Create a provider and get the signer
      const signer = await provider.getSigner();

      // Get the wallet address
      const wallet = await signer.getAddress();
      console.log('Wallet address:', wallet);

      // Generate a message to sign
      console.log('ethers', ethers);
      console.log('random:', ethers.randomBytes(16));
      console.log('nonce:', ethers.hexlify(ethers.randomBytes(16)));
      const message = {
        address: await signer.getAddress(),
        nonce: ethers.hexlify(ethers.randomBytes(16)),
        expiration: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
      };
      const messageString = JSON.stringify(message);
      const signature = await signer.signMessage(messageString);
      console.log('Signature:', signature);
      return { address, balance, network, wallet, signature };
    } catch (error: Error | any) {
      alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
    }
  } else {
    alert("MetaMask not installed");
  }
  return null;
};
