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

    function multiply(uint256 a, uint256 b) internal pure returns(uint256 success){
        require(b == 0 || (success = a * b) / b == a, '');
    }

    //payable: we want someone to be able to send ether via transaction with this function
    function buyTokens(uint256 _amount) public payable{
        //require that value is equal to tokens, ex: I want to buy 10 tokens then value is 10* 0.001 ether
        require(msg.value == multiply(_amount, tokenPrice), "value is wei  equal to tokens");
        //require that the contact have enough tokens, ex: if this contract have 1  mil, but i want to buy 2 mil then throw exception
        require(tokenContract.balanceOf(address(this)) >= _amount, "check balance");
        //require transfer is successful, ex: call transfer function and to be sure it return true
        require(tokenContract.transfer(msg.sender, _amount), 'transfer tokens to buyer');
        //keep track the number of token sold
        tokenSold += _amount;
        //trigger sellEvent
        emit buyTokensEvent(_amount, msg.sender);
        //tokenContract.transfer(msg.sender, _amount);
    }

    // End Tokens Sale
    function endSale() public {
        //Require admin
        require(msg.sender == admin, 'only admin can call this');
        //transfer remain tokens to admin
        selfdestruct(msg.sender);
    }
}