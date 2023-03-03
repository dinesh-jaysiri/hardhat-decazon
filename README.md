### Decazon decentralized e-comerce dapp

This is a smart contract for Decazon, an online marketplace where users can buy and sell products using cryptocurrency. The contract is built on the Ethereum blockchain using Solidity v0.8.9.

#### Features

The Decazon contract includes the following features:

- List products for sale
- Buy products using cryptocurrency
- Track orders and order history
- Withdraw cryptocurrency from the contract

#### Contract Overview

The Decazon contract includes the following state variables:

owner: the address of the contract owner
items: a mapping of Item structs, where each item is identified by its id
orderCount: a mapping of the number of orders placed by each user, identified by their address
orders: a mapping of Order structs, where each order is identified by the user's address and order number
The contract includes the following structs:

Item: a struct representing a product for sale, with the following fields:
id: a unique identifier for the product
name: the name of the product
category: the category of the product
image: a string representing the image URL for the product
cost: the cost of the product in cryptocurrency
rating: the rating of the product
stock: the number of items in stock
Order: a struct representing an order, with the following fields:
time: the time the order was placed
item: an Item struct representing the product ordered
The contract includes the following functions:

`list()`: a function for listing products for sale, which can only be called by the contract owner
`buy()`: a function for buying products, which requires the buyer to send cryptocurrency, checks that the buyer has sent enough cryptocurrency and that the product is in stock, creates an order, and emits a Buy event
`withdraw()`: a function for withdrawing cryptocurrency from the contract, which can only be called by the contract owner
The contract also includes the following events:

`List`: an event emitted when a product is listed for sale, with the product name, cost, and quantity as parameters
`Buy`: an event emitted when a product is purchased, with the buyer's address, order ID, and item ID as parameters

#### Usage

To use the Decazon contract, you can deploy it on the Ethereum blockchain and interact with it using a Web3-enabled browser or application. You can call the list() function to list products for sale, the buy() function to buy products, and the withdraw() function to withdraw cryptocurrency from the contract. You can also listen for the List and Buy events to track product listings and purchases.

```shell
npx hardhat help
npx hardhat test
npx hardhat node
npx hardhat deploy
```
