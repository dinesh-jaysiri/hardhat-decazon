// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Decazon {
    address public owner;
    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    event List(
        string indexed name,
        uint256 indexed cost,
        uint256 indexed quantity
    );

    event Buy(
        address indexed buyer,
        uint256 indexed orderId,
        uint256 indexed itemId
    );

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // list products
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        // Create Item struct
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        // save item to the blockchain
        items[_id] = item;

        // Emit on event
        emit List(_name, _cost, _stock);
    }

    // Buy Products

    function buy(uint256 _id) public payable {
        // recive Cripto

        // fetch item
        Item memory item = items[_id];

        // Require Enough ether to buy item
        require(msg.value >= item.cost);

        // require item is i stock
        require(item.stock > 0);

        // create order
        Order memory order = Order(block.timestamp, item);

        // save order to chain
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        //  Substract Stack
        items[_id].stock = item.stock - 1;

        // emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
