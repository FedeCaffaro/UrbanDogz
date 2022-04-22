import Image from "next/image";
import Mint from './Mint';

function NFTs ()  {

return(
<div className="flex flex-col items-center justify-center w-screen h-screen" >
			<Image src="/../public/Logo.png" width={220} height={220} alt="nft1" /> 
      <h3> Mint an UrbanDogz and become part of the club!</h3> 
      <br/>
      <Mint />
</div>
);
}

export default NFTs;
