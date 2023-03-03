const { ethers } = require("hardhat");
const { items } = require("../items.json");
async function main() {
  // number ether to wei converter
  const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether");
  };

  // get acounts
  const [deployer] = await ethers.getSigners();

  const Decazon = await ethers.getContractAt("Decazon", deployer.address);
  
  // const transaction = await Decazon.list("1","Puma Shoes", "electrical","sample image",tokens("0.2") ,"4","3")
  // await transaction.wait(1)
  for (let i = 0; i < items.length; i++) {
    const transaction = await Decazon.list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      items[i].price,
      items[i].rating,
      items[i].stock
    );

    await transaction.wait(1);

    console.log(transaction)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
