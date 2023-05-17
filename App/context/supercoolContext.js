import React, { useState, createContext, useEffect, useRef } from "react";
import { BigNumber, providers } from 'ethers';
import { SUPER_COOL_NFT_CONTRACT, abi } from "../constant/constant";
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';
import { RandomPrompts } from "../components/RandomImgs";
import localforage from 'localforage'
import axios from 'axios';

export const SupercoolAuthContext = createContext(undefined);

export const SupercoolAuthContextProvider = (props) => {

  const web3ModalRef = useRef();

  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allNfts, setAllNfts] = useState([]);
  const [prompt, setPrompt] = useState(null);
  const [userAdd, setUserAdd] = useState();
  const [genRanImgLoding, setGenRanImgLoding] = useState(false);

  let provider;
  let signer;
  if (typeof window !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }

  const login = async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAdd(accounts[0]);
      localforage.setItem('address', accounts[0]);
      if (window.ethereum.networkVersion === '80001') {
        setWalletConnected(true);
      } else {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }] // Polygon Mumbai chain ID
        });

        setWalletConnected(true);
      }
    } catch (error) {
      console.error('Login error:', error);
    }

  }

  const logout = async () => {
    localforage.removeItem('address');
    setWalletConnected(false);
    localforage.getItem('address').then((value) => {
      console.log(value)
    })
  }

  const auth =
    "Basic " +
    Buffer.from(
      process.env.infuraProjectKey + ":" + process.env.infuraSecretKey
    ).toString("base64");

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });


  const contract = new ethers.Contract(
    SUPER_COOL_NFT_CONTRACT,
    abi,
    signer
  );
 
  const GenerateNum = async () => {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log(accounts);
    setGenRanImgLoding(true);
    const tx = await contract.getRandomNumber();
    await tx.wait();
    const num = await contract.ranNum();
    setPrompt(RandomPrompts[num]);
    setGenRanImgLoding(false);
    // console.log(num.toString());
  }

  const getProfileData = async (add) => {
    console.log('use add--',add);
    if(add !== undefined){
      const dataurl = await contract.getUserProfile(add);
      console.log(dataurl);
      const response = await axios.get(dataurl);
      console.log(response.data);
      return response;
    }
	
  }


  const getAllNfts = async () => {

    console.log('getting all nfts ...');
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
    setTimeout(() => {
    console.log('running usestate');
      getAllNfts();
    }, 5000);
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


  // Edit profile

  const uploadDatainIpfs = async (e) => {
    let dataStringify = JSON.stringify(e);
    const ipfsResult = await client.add(dataStringify);
    const contentUri = `https://superfun.infura-ipfs.io/ipfs/${ipfsResult.path}`;
    console.log('contentUri', contentUri);
    return contentUri;

  }


  const getProfile = async () => {

  }


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
        userAdd,
        uploadDatainIpfs,
        getAllNfts,
        getProfileData
      }}
      {...props}
    >
      {props.children}
    </SupercoolAuthContext.Provider>
  );
};
