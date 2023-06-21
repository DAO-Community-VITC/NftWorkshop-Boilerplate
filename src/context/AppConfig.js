import React, { useEffect, useState, createContext } from "react";
import * as eth from "ethers";
import axios from "axios";
import { NFTStorage, Blob } from "nft.storage";
import { abi } from './utils'
import * as dotenv from 'dotenv'
// to configure the enivronment variables
dotenv.config()

export const BlockchainConfig = createContext();

export const BlockchainProvider = ({ children }) => {

  // define useState for currentAccount
  ``
  // define environment variables here... 
  const contr_addr
  const NFT_STORAGE_TOKEN

  // define NFTStorage client here
  const client;


  const provider;
  const signer;
  const contract;

  // function to connect to the ethereum wallet
  const connectWallet = async () => {

  };

  // auto wallet connection method (fn definition same as the connectWallet function) and this method is to be used only inside the useEffect hooks
  const checkIfWalletIsConnect = async () => {

  };

  // define uploadToIPFS method to upload our image file to the NFT Storage and get the file url for it
  const uploadToIPFS = async (file) => {

  };

  // define createNFT method to send the nft metadata to IPFS, get the cid and finally call the create sale function to mint our final token
  const createNFT = async (formInput, fileUrl) => {

  };

  // createsale function defintion here, to create token 
  const createSale = async (url, formInputPrice, isReselling, id) => {

  };

  // this function is used for our marketplace page
  const fetchNFTs = async (setLoading) => {
    setLoading(true);
    const data = await contract.fetchMarketItems();
    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        const price = eth.utils.formatUnits(
          unformattedPrice.toString(),
          "ether"
        );
        image.replace("https:ipfs.io", "https://infura-ipfs.io");
        console.log(image);
        return {
          price,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );
    return items;
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);



  return (
    <BlockchainConfig.Provider value={{ fetchNFTs, uploadToIPFS, createNFT, createSale, currentAccount, checkIfWalletIsConnect, connectWallet }}>{children}</BlockchainConfig.Provider>
  );
};
