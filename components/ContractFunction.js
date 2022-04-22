import React from 'react';
import { ethers , utils,BigNumber} from "ethers";
import NFTAbi from "../constants/NFTAbi.json";
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

const ETHERSCAN_URL = 'https://rinkeby.etherscan.io';
const contractAddress = NFTAbi.address;
const contractABI = NFTAbi.abi;

const whitelistAddresses = [
    "0x547b4BF7f39FAE562d2d0d5CFc329B05ec3694F2",
    "0x399Db9b924bC348BfC3bD777817631eb5A79b152",
  ];

function getWhitelistCost(whitelistPrice, mintAmount) {
    return utils.formatEther((whitelistPrice).mul(mintAmount));
}
function getPublicCost(publicPrice, mintAmount) {
    return utils.formatEther((publicPrice).mul(mintAmount));
}

export const getMaxSupply = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const maxSupply = await contract.maxSupply();
    return parseInt(maxSupply);
}

export const getCurrentSupply = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const currentSupply = await contract.totalSupply();
    return parseInt(currentSupply);
}

export const getMaxPerTxn = async() => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  const maxPerTxn = await contract.maxMintAmountPerTx();
  return parseInt(maxPerTxn);
}

export const getMaxPerTxnPresale = async() => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  const maxPerTxnPreSale = await contract.maxMintAmountPerTxPreSale();
  return parseInt(maxPerTxnPreSale);
}

export const getPrice = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const price = await contract.price();
    return utils.formatEther(parseInt(price));
}

export const getPreSalePrice = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const preSalePrice = await contract.preSalePrice();
    return utils.formatEther(parseInt(preSalePrice));
}

export const isPreSaleActive = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const saleActive = await contract.paused();
    const whitelistEnabled = await contract.onlyWhitelist();
    return !saleActive && whitelistEnabled;
}

export const isSaleActive = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const whitelistEnabled = await contract.onlyWhitelist();
    const saleActive = await contract.paused();
    return !whitelistEnabled && saleActive;
}


export const publicSale = async(quantity) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const price = await getPrice();
    const publicMintTxn = await contract.publicMint(quantity,{value:getPublicCost(price,quantity)});
    return publicMintTxn;
}

export const preSale = async(quantity) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const price = await getPreSalePrice();
    const publicMintTxn = await contract.publicMint(quantity,{value:getWhitelistCost(price,quantity)});
    return publicMintTxn;
}

export const verifyWhitelist = async(account)=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const merkleProof = merkleTree.getHexProof(keccak256(account));
    const whitelisted = await contract.verify(merkleProof,account);
    return whitelisted;
}

const getTransactionLink = (hash) => `${ETHERSCAN_URL}/tx/${hash}`;

const successMessageWithLink = (text, hash) => (
    <>
      <span>{text}</span>
      <a style={{ 'text-decoration': 'underline' }} href={getTransactionLink(hash) } target="_blank" rel="noopener noreferrer">
      See transaction
      </a>
    </>
  );

export const buySuccessRender = ({ hash }) =>
  successMessageWithLink("Purchase successful: " ,hash);

export const buyErrorRender = (error) => {
  const reason = error?.error?.message?.split(':');
  return (reason?.length ? (reason[1] +reason[2]) : 'Try again later.').toUpperCase();
};