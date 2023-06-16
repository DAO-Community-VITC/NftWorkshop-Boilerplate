import React, { useContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import * as eth from "ethers";
import { NFTStorage, Blob } from "nft.storage";
import { Contract } from "ethers";
import abi from "./utils";

export const BlockchainConfig = React.createContext();

export const BlockchainProvider = ({ children }) => {
  
  const contr_addr = process.env.REACT_APP_CONTRACT;
  const NFT_STORAGE_TOKEN = process.env.REACT_APP_PUBLIC_NFT_STORAGE_TOKEN;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const provider = new eth.JsonRpcProvider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new Contract(contr_addr, abi, signer);

  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);


  return (
    <BlockchainConfig.Provider value={{}}>{children}</BlockchainConfig.Provider>
  );
};
