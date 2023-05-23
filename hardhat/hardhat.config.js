const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });


module.exports = {
  solidity: "0.8.1",
  networks: {
    mumbai: {
      url: process.env.quicknodehttpurl,
      accounts: [process.env.accountprivetkey],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.polygonkey,
    },
  },
};