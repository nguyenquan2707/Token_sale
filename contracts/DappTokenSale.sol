pragma solidity ^0.5.8;

import "./DappToken.sol";

contract DappTokenSale {
    address public admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    constructor(DappToken _tokenContract) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        //Token price
        tokenPrice = 1000000000000000;


    }
}