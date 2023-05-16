const hre = require("hardhat");
const { FEE, VRF_COORDINATOR, KEY_HASH, LINK_TOKEN } = require('../constant')

async function main() {

  const SuperCoolNFT = await hre.ethers.getContractFactory("SUPCool");
  const supercool = await SuperCoolNFT.deploy("supercool", "SC", VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE);

  await supercool.deployed();

  console.log('deploy contract to', supercool.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
