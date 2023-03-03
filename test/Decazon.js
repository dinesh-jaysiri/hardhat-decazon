const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Decazon", () => {
  let decazon, deployer, buyer;
  beforeEach(async () => {
    // Setup Accounts
    [deployer, buyer] = await ethers.getSigners();

    // Deploy contract
    const Decazon = await ethers.getContractFactory("Decazon");
    decazon = await Decazon.deploy();
  });

  describe("Deployment", () => {
    it("set the owner ", async () => {
      expect(await decazon.owner()).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    let transaction;
    beforeEach(async () => {
      transaction = await decazon
        .connect(deployer)
        .list(1, "Shoes", "Clothing", "Image", 1, 4, 5);
      await transaction.wait(1);
    });

    it("Returns item attributes", async () => {
      const item = await decazon.items(1);
      expect(item.id).to.equal(1);
    });

    it("Emits List event", () => {
      expect(transaction).to.emit("List");
    });
  });

  describe("Buy", () => {
    let listTransaction, buyTransaction;
    const cost = tokens(4);
    beforeEach(async () => {
      const id = 1;
      // list item
      listTransaction = await decazon.connect(deployer)
        .list(id, "Shoes", "Clothing", "Image", 1, cost.toString(), 5);

      await listTransaction.wait(1);

      // buy item
      buyTransaction = await decazon.connect(buyer).buy(id, { value: cost });
      buyTransaction.wait(1)
    });

    it("Updates the contract balance", async () => {
      const balance = await ethers.provider.getBalance(decazon.address)

      expect(balance).to.equal(cost)
    })

    it("updates buyer's order count", async ()=> {
      const orderCount = await decazon.orderCount(buyer.address)

      expect(orderCount).to.equal(1)
    })
    it("Adds the order", async ()=> {
      const order = await decazon.orders(buyer.address,1)

      expect(order.item.name).to.equal("Shoes")
    })

    it("Emits Buy event", ()=> {
      expect(buyTransaction).to.emit(decazon, "Buy")
    })
  });

  describe("withdraw", ()=>{
    let transaction,balanceBefore
    const cost = tokens(4);
    const id = 1
    beforeEach(async ()=>{

      // list item
      transaction = await decazon
        .connect(deployer)
        .list(id, "Shoes", "Clothing", "Image", 1, cost.toString(), 5);

      await transaction.wait()

      // Buy a item
      transaction = await decazon.connect(buyer).buy(id,{value:cost})
      await transaction.wait()

      // Get Deployer balance before 
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      // withdraw
      transaction = await decazon.connect(deployer).withdraw()
      await transaction.wait();
    })

    it("Update the owner balance", async  () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it("Update the contract balance", async () => {
      const result = await ethers.provider.getBalance(decazon.address)
      expect(result).to.equal(0)
    })

  })
});
