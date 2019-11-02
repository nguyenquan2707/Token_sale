pragma solidity ^0.5.8;

import "./DappToken.sol";

contract DappTokenSale {
    address admin; // dont want outside the world know me
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    constructor(DappToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        //Token price
        tokenPrice = _tokenPrice;
    }

    event buyTokensEvent(uint256 _amount, address _buyer);

    //payable: we want someone to be able to send ether via transaction with this function
    function buyTokens(uint256 _amount) public payable{
        //require that value is equal to tokens, ex: I want to buy 10 tokens then value is 10* 0.001 ether
        require(msg.value == _amount*tokenPrice, "value is wei  equal to tokens");
        //require that the contact have enough tokens, ex: if this contract have 1  mil, but i want to buy 2 mil then throw exception

        //require transfer is successful, ex: call transfer function and to be sure it return true

        //keep track the number of token sold
        tokenSold += _amount;
        //trigger sellEvent
        emit buyTokensEvent(_amount, msg.sender);
        //tokenContract.transfer(msg.sender, _amount);
    }
}