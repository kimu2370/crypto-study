import React, { useState } from 'react';
import { ethers } from 'ethers';

export const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string>('');

  const connectWalletHandler = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const ethereum = window.ethereum;

    try {
      // 요청하여 계정을 가져옵니다.
      const accounts = await ethereum.request!({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      console.log(signer.address);
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={connectWalletHandler}>Connect Wallet</button>
      {account && <p>Connected Account: {account}</p>}
    </div>
  );
};
