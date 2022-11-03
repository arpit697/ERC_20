const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("ERC20");
  const token = await Token.deploy();

  await token.deployed();

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//npx hardhat run scripts/deploy.js --network goerli
