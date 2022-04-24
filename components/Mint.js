import { useEffect, useState } from "react";
import { BigNumber} from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Input, Button } from "@chakra-ui/react";
import {getMaxSupply,getCurrentSupply,getPrice,getPreSalePrice,isSaleActive,isPreSaleActive,publicSale,preSale,verifyWhitelist, getMaxPerTxnPresale, getMaxPerTxn} from "./ContractFunction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { buySuccessRender, buyErrorRender } from './ContractFunction';

const Mint = () => {
  const {
    active,
    chainId,
    account,
    library:provider,
  } = useWeb3React();
  
  
  const [mintAmount, setMintAmount] = useState(1);
  const [whitelistMintAmount, setWhitelistMintAmount] = useState(1);

  const [totalMinted, setTotalMinted] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);

  const [price, setPrice] = useState(0);
  const [preSalePrice, setPresalePrice] = useState(0);

  const [maxPerTxn,setMaxPerTxn] = useState(1);
  const [maxPerTxnPreSale, setMaxPerTxnPresale] = useState(1);
  
  const [saleActive, setSaleActive] = useState(false);
  const [presaleIsActive, setPresaleIsActive] = useState(false);

  const [transactionUrl, setTransactionUrl] = useState("");
  const [pending, setPending] = useState(false);
  const [contractUrl, setContractUrl] = useState("");

  const [isWhitelisted, setIsWhitelisted] = useState(false);

  async function handleStats(){
    getCurrentSupply().then(setTotalMinted);
    getMaxSupply().then(setMaxSupply);
    getPrice().then(setPrice);
    getMaxPerTxn().then(setMaxPerTxn);
    getMaxPerTxnPresale().then(setMaxPerTxnPresale);
    getPreSalePrice().then(setPresalePrice);
    isPreSaleActive().then(setPresaleIsActive);
    verifyWhitelist(account).then(setIsWhitelisted);
    isSaleActive().then(setSaleActive);
 
  }

  useEffect(() => {
    if (active) {
      handleStats();
    }
  }, [active]); 
  
  async function handleWhitelistMint() {
    if (active) {
      try {
        toast.promise(preSale(BigNumber.from(whitelistMintAmount),account), {
          pending: 'Buying...',
          success: {render: renderAndGetData(buySuccessRender)},
          error: {render: renderAndGetError(buyErrorRender)},
          });
        } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  async function handlePublicMint() {
    if (active) {
      try {
        toast.promise(publicSale(BigNumber.from(mintAmount)), {
          pending: 'Buying...',
          success: {render: renderAndGetData(buySuccessRender)},
          error: {render: renderAndGetError(buyErrorRender)},
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  const handleMintDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleMintIncrement = () => {
    if (mintAmount >= maxPerTxn) return;
    setMintAmount(mintAmount + 1);
  };

  const handleWhitelistMintIncrement = () => {
    if (whitelistMintAmount >= maxPerTxnPreSale) return;
    setWhitelistMintAmount(whitelistMintAmount + 1);
  };
    
  const renderAndGetData =
  (aFunction, callBefore = () => {}) =>
  (result) => {
    callBefore();

    return aFunction(result?.data);
  };
  
  const renderAndGetError =
  (aFunction, callBefore = () => {}) =>
  (result) => {
    callBefore();
    return aFunction(result?.data);
  };

  return (
    <div className="flex flex-col justify-center text-center">
      {active? (
      <div>
        {saleActive? (
        <div>
          {active ? (  
          <div>
            {isWhitelisted? (
            <div>
              <p> Whitelist price : {preSalePrice} ETH + GAS</p>
              {active ? (
                
                <div>
                  {process.env.NEXT_PUBLIC_MODE == chainId ? (
                    <div>
                      <div>
                        <Button
                          onClick={handleMintDecrement}
                          borderRadius="5px"
                          color="white"
                          cursor="pointer"
                          fontFamily="inherit"
                          padding="10px"
                          marginBottom="10px"
                          backgroundColor="black"
                          boxShadow="0px 2px 2px 1px #0F0F0F"
                        >
                          {" "}
                          -{" "}
                        </Button>
                        <Input
                          textAlign="center"
                          readOnly
                          type="number"
                          value={whitelistMintAmount}
                          height="40px"
                          width="100px"
                          fontFamily="inherit"
                          paddingLeft="19px"
                        />
                        <Button
                          onClick={handleWhitelistMintIncrement}
                          borderRadius="5px"
                          color="white"
                          cursor="pointer"
                          fontFamily="inherit"
                          padding="10px"
                          marginBottom="10px"
                          backgroundColor="black"
                          boxShadow="0px 2px 2px 1px #0F0F0F"
                        >
                          {" "}
                          +{" "}
                        </Button>
                      </div>
                      <Button
                        onClick={handleWhitelistMint}
                        borderRadius="5px"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="10px"
                        marginTop="10px"
                        marginBottom="10px"
                        backgroundColor="black"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                      >
                        {" "}
                        WHITELIST MINT NOW!
                      </Button>
                    </div>
                  ) : (
                    <p className="font-bold">
                      {" "}
                      You must be connected to the ethereum mainnet. Check Metamask
                      network.{" "}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="font-bold">
                    {" "}
                    You must be connected to MetaMask to mint.{" "}
                  </p>
                </div>
            )}
            </div>
            ):(
              <p>You are not eligible for the whitelist. Try public minting instead.</p>
            )
            }
            <br/>
            <br/>
            <div>
            <p>Public price : {price} ETH + GAS</p>
            {active ? (
              <div>
                {process.env.NEXT_PUBLIC_MODE == chainId ? (
                  <div>
                    <div>
                      <Button
                        onClick={handleMintDecrement}
                        borderRadius="5px"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="10px"
                        marginBottom="10px"
                        backgroundColor="black"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                      >
                        {" "}
                        -{" "}
                      </Button>
                      <Input
                        textAlign="center"
                        readOnly
                        type="number"
                        value={mintAmount}
                        height="40px"
                        width="100px"
                        fontFamily="inherit"
                        paddingLeft="19px"
                      />
                      <Button
                        onClick={handleMintIncrement}
                        borderRadius="5px"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="10px"
                        marginBottom="10px"
                        backgroundColor="black"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                      >
                        {" "}
                        +{" "}
                      </Button>
                    </div>
                    <Button
                      onClick={handlePublicMint}
                      borderRadius="5px"
                      color="white"
                      cursor="pointer"
                      fontFamily="inherit"
                      padding="10px"
                      marginTop="10px"
                      marginBottom="10px"
                      backgroundColor="black"
                      boxShadow="0px 2px 2px 1px #0F0F0F"
                    >
                      {" "}
                      PUBLIC MINT NOW!
                    </Button>
                  </div>
                ) : (
                  <p className="font-bold">
                    {" "}
                    You must be connected to the ethereum mainnet. Check Metamask
                    network.{" "}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p className="font-bold">
                  {" "}
                  You must be connected to MetaMask to mint.{" "}
                </p>
              </div>
            )}
            </div>
            <br/>
            <p> TOTAL MINTED: { totalMinted } / { maxSupply }</p>

          </div>
          ):
        (
          <p> You must be connected to MetaMask to mint!</p>
        )
          }   
        </div>
        ) :
        (<p>Sale is not active yet! Come back later please</p>)
        }
      </div>
      ) :(
        <p> Connect your wallet to mint !</p>
      )}  
    </div>
  );
};

export default Mint;