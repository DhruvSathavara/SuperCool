const hre = require("hardhat");
const { FEE, VRF_COORDINATOR, KEY_HASH, LINK_TOKEN } = require('../constant')

async function main() {

  // const priceFeedAddress = "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676";
  const SuperCoolNFT = await hre.ethers.getContractFactory("SUPCool");
  const supercool = await SuperCoolNFT.deploy("supercool", "SC", VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE);

  await supercool.deployed();

  console.log('deploy contract to', supercool.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
