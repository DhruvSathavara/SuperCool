require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const QUICKNODE_HTTP_URL = "https://neat-newest-putty.matic-testnet.discover.quiknode.pro/c25c07f578926c8303dce090ce12850ab5debcf4/";
const NEXT_PUBLIC_PRIVATE_KEY = "022cee959834961a1d85fe253789846d986ed1e375ea7f5cf5d2d170e1b31e7c";
const POLYGONSCAN_KEY = '6MK7IU8PX7BN5NII42EEVYCHT3MMHZJWTN';
// "966c795f897d55458df19abdb9d18f064071e8a30e82406af959943ffcd062ce";
// 
// console.log('NEXT_PUBLIC_PRIVATE_KEY', NEXT_PUBLIC_PRIVATE_KEY);
module.exports = {
  solidity: "0.8.1",
  networks: {
    mumbai: {
      url: QUICKNODE_HTTP_URL,
      accounts: [NEXT_PUBLIC_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
    },
  },
};