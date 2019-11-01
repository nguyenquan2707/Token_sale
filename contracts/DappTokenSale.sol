pragma solidity ^0.5.8;

import "./DappToken.sol";

contract DappTokenSale {
    address public admin;
    DappToken public tokenContract;
    constructor(DappToken _tokenContract) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        //Token contract
        //Token price

    }
}