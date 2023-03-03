const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const developmentChains = ["hardhat", "localhost"];

  // Constractor arguments
  const args = [];

  //deploy contract
  const decazone = await deploy("Decazon", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmation || 1,
  });

  log(
    "----------- deploying decazone contract is successfully -----------"
  );

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("----------- starting verification process -----------");

    await verify(decazone.address, args);
  }
};

module.exports.tags = ["all", "decazone"];
