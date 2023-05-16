import React, { useState, createContext, useEffect, useRef } from "react";
import { BigNumber, providers } from 'ethers';
import { SUPER_COOL_NFT_CONTRACT, abi } from "../constant/constant";
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';
import { RandomPrompts } from "../components/RandomImgs";
import localforage from 'localforage'

export const SupercoolAuthContext = createContext(undefined);

export const SupercoolAuthContextProvider = (props) => {

  const web3ModalRef = useRef();

  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allNfts, setAllNfts] = useState([]);
  const [prompt, setPrompt] = useState(null);
  const [userAdd, setUserAdd] = useState();
  const [genRanImgLoding, setGenRanImgLoding] = useState(false);

  if (allNfts.length > 0) {
    console.log('here all nfts', allNfts);
  }

  const login = async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAdd(accounts[0]);
      localforage.setItem('address',accounts[0]);
      // Check if the user is connected to the Polygon Mumbai network
      if (window.ethereum.networkVersion === '80001') {
        // User is already connected to the Polygon Mumbai network
        setWalletConnected(true);
      } else {
        // Prompt the user to switch to the Polygon Mumbai network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }] // Polygon Mumbai chain ID
        });

        // User has switched the network
        setWalletConnected(true);
      }
    } catch (error) {
      // Handle error during account request or network switch
      console.error('Login error:', error);
      // Inform the user or perform error handling
    }

  }

  const logout = async () => {
    localforage.removeItem('address');
    setWalletConnected(false);
    localforage.getItem('address').then((value) => {
      console.log(value) 
    })
  }

  const INFURA_KEY = "2DQRq820rLbznhFlkIbTkuYAyCS"
  const INFURA_SECRET_KEY = "33d97cf6366f9565421e36ff7e018e60"

  // console.log(INFURA_KEY, INFURA_SECRET_KEY);
  const auth =
    "Basic " +
    Buffer.from(
      INFURA_KEY + ":" + INFURA_SECRET_KEY
    ).toString("base64");

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  let provider;
  let signer;
  // Connect to the Ethereum network using ethers.js
  if (typeof window !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }

  const contract = new ethers.Contract(
    SUPER_COOL_NFT_CONTRACT,
    abi,
    signer
  );
localforage.getItem('address').then((value) => {
  console.log(value) // Output: { name: 'John', age: 30 }
})
  const GenerateNum = async () => {
    setGenRanImgLoding(true);
    const tx = await contract.getRandomNumber();
    await tx.wait();
    const num = await contract.ranNum();
    setPrompt(RandomPrompts[num]);
    setGenRanImgLoding(false);
    // console.log(num.toString());
  }

  const getAllNfts = async () => {
    const totalNfts = await contract.getTotalSupply();
    const metadatas = [];
    for (let i = 1; i <= totalNfts.toString(); i++) {
      const tokenURI = await contract.tokenURI(i);
      const response = await fetch(tokenURI);
      const metadata = await response.json();
      const owner = await contract.ownerOf(i);
      const maticToUsdPricee = await contract.convertMaticUsd(ethers.utils.parseUnits(metadata.price, 'ether'));

      const newMetadata = { ...metadata, owner: owner, tokenId: i, maticToUSD: maticToUsdPricee._hex / 100000000 }

      metadatas.push(newMetadata);
    }
    setAllNfts(metadatas);
    setLoading(!loading);

  }


  useState(() => {
    console.log('running usestate');
    getAllNfts();
  }, [loading])
  const uploadOnIpfs = async (e) => {
    let dataStringify = JSON.stringify(e);
    const ipfsResult = await client.add(dataStringify);
    const contentUri = `https://superfun.infura-ipfs.io/ipfs/${ipfsResult.path}`;

    console.log(contentUri, 'img link');
    return contentUri;
    // console.log('ipfs result', ipfsResult);
  }

  const handleImgUpload = async (file) => {
    const added = await client.add(file);
    const hash = added.path;
    const ipfsURL = `https://superfun.infura-ipfs.io/ipfs/${hash}`;
    return ipfsURL;
  };


  return (
    <SupercoolAuthContext.Provider
      value={{
        login,
        logout,
        uploadOnIpfs,
        allNfts,
        handleImgUpload,
        client,
        loading,
        setLoading,
        contract,
        GenerateNum,
        prompt,
        setPrompt,
        genRanImgLoding,
        userAdd
      }}
      {...props}
    >
      {props.children}
    </SupercoolAuthContext.Provider>
  );
};
