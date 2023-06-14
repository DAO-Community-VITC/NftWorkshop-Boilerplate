import React, { useContext, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import  * as eth  from 'ethers';
import contr from '../Contracts/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import axios from 'axios';

import { NFTStorage, Blob } from 'nft.storage'
import { FirebaseConfig } from './FirebaseConfig';
const NFT_STORAGE_TOKEN = process.env.REACT_APP_PUBLIC_NFT_STORAGE_TOKEN
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
const MarketAddress = process.env.REACT_APP_NFTMARKETPLACE_CONTRACT ;
const MarketAddressABI=contr.abi;
const fetchContract = (signerOrProvider) => new eth.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const BlockchainConfig = React.createContext();

export const BlockchainProvider = ({ children }) => {
  const nftCurrency = 'MATIC';
  const [currentAccount, setCurrentAccount] = useState('');
  // const {uploadArtOffChain} = useContext(FirebaseConfig)
  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };


 
  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);
  return (
    <BlockchainConfig.Provider
      value={{
       
      }}
    >
      {children}
    </BlockchainConfig.Provider>
  );
};
