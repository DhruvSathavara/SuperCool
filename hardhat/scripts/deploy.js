const hre = require('hardhat');
async function main() {

  const Gamesets = await hre.ethers.deployContract("SuperCool",);

  console.log('deploying SuperCool... ');

  await Gamesets.waitForDeployment();

  console.log('deploy SuperCool contract to', Gamesets.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
