pragma solidity ^0.5.11;

// implements on this documentation https://eips.ethereum.org/EIPS/eip-20
contract DappToken {
    //Constructor
    //set the total number of tokens
    //Read the total number of tokens
    uint256 public totalSupply; //state variables
    
    constructor() public {
        totalSupply = 1000000;
    }
}