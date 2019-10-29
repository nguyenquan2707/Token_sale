pragma solidity ^0.5.8;

// implements on this documentation https://eips.ethereum.org/EIPS/eip-20
contract DappToken {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    constructor(string memory _name, uint256 _totalSupply) public {
        balanceOf[msg.sender] = _totalSupply;
        totalSupply = _totalSupply;
        name = _name;
    }
}