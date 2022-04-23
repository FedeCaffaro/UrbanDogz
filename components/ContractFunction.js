import React from 'react';
import { ethers , utils,BigNumber} from "ethers";
import NFTAbi from "../constants/NFTAbi.json";
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

const ETHERSCAN_URL = 'https://rinkeby.etherscan.io';
const contractAddress = NFTAbi.address;
const contractABI = NFTAbi.abi;

const whitelistAddresses = [
  "0x399Db9b924bC348BfC3bD777817631eb5A79b152",  
  "0x547b4BF7f39FAE562d2d0d5CFc329B05ec3694F2",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
  "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
  "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
  "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
  "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
  "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
  "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
  "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
  "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
  "0xcd3B766CCDd6AE721141F452C550Ca635964ce71",
  "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
  "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
  "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
  "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  "0xa4FC2997ef316f82Ba5396f22AdbAE62aba991c2"
];


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
    return utils.formatEther(parseInt(price)).toString();
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
    return utils.formatEther(parseInt(preSalePrice)).toString();
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
    const publicMintTxn = await contract.publicMint(quantity,{value:(ethers.utils.parseEther(await getPrice()))* quantity});
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
    const whitelistMintTxn = await contract.whitelistMint(quantity,{value:(ethers.utils.parseEther(await getPreSalePrice()))* quantity});
    console.log(whitelistMintTxn)
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
  return (reason?.length ? (reason[1]) : 'Try again later.');
};